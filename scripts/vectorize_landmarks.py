"""Trace the approved landmark artwork into standalone animated SVG paths."""
from pathlib import Path
import sys
import cv2
import numpy as np
from PIL import Image

root = Path('public/assets/landmarks')
for name in (sys.argv[1:] or ['ghana', 'canada', 'usa']):
    source = Image.open(root / f'{name}.png').convert('RGBA')
    source.thumbnail((520, 620))
    pixels = np.asarray(source)
    rgb = pixels[:, :, :3]
    mask = pixels[:, :, 3] > 180
    # Retain monument shapes while dropping the translucent surrounding glow.
    samples = np.float32(rgb[mask])
    cv2.setRNGSeed(7)
    _, labels, palette = cv2.kmeans(samples, 10, None, (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 35, .3), 3, cv2.KMEANS_PP_CENTERS)
    indexed = np.full(mask.shape, -1, np.int16)
    indexed[mask] = labels.ravel()
    height, width = mask.shape
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" role="img" aria-label="{name} landmark illustration">', '''<style>
path { stroke-dasharray:1; stroke-dashoffset:1; fill-opacity:0; animation:draw 1.8s ease-out forwards,paint 1.2s ease-out .5s forwards; }
@keyframes draw { to { stroke-dashoffset:0; } }
@keyframes paint { to { fill-opacity:1; } }
@media(prefers-reduced-motion:reduce) { path { animation:none; stroke-dashoffset:0; fill-opacity:1; } }
</style>''']
    count = 0
    for index, color in enumerate(palette):
        layer = np.uint8(indexed == index) * 255
        contours, hierarchy = cv2.findContours(layer, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
        if hierarchy is None:
            continue
        luminance = float(np.dot(color, [.2126, .7152, .0722])) / 255
        low, high = (125, 99, 151), (183, 157, 204)
        colorhex = '#' + ''.join(f'{round(a + (b - a) * luminance):02x}' for a, b in zip(low, high))
        for i, contour in enumerate(contours):
            if hierarchy[0][i][3] != -1 or cv2.contourArea(contour) < 8:
                continue
            shapes = [contour]
            child = hierarchy[0][i][2]
            while child != -1:
                if cv2.contourArea(contours[child]) > 4:
                    shapes.append(contours[child])
                child = hierarchy[0][child][0]
            commands = []
            for shape in shapes:
                points = cv2.approxPolyDP(shape, .65, True).reshape(-1, 2)
                if len(points) < 3: continue
                commands.append('M' + 'L'.join(f'{x},{y}' for x,y in points) + 'Z')
            if not commands: continue
            delay = index * .045
            parts.append(f'<path d="{"".join(commands)}" fill="{colorhex}" fill-rule="evenodd" stroke="{colorhex}" stroke-width=".5" stroke-linejoin="round" pathLength="1" style="animation-delay:{delay:.2f}s,{delay+.5:.2f}s"/>')
            count += 1
    parts.append('</svg>')
    target = root / f'{name}.svg'
    target.write_text('\n'.join(parts), encoding='utf-8')
    print(f'{target}: {count} vector paths, {target.stat().st_size} bytes')
