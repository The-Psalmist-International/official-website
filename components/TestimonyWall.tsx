"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { wallTestimonies } from "@/content/testimonies";

export default function TestimonyWall() {
  const viewport = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const [edges, setEdges] = useState({ left: false, right: false });
  useEffect(() => {
    const nav = document.querySelector('nav[aria-label="Main navigation"]');
    if (!nav) return;
    const update = () => root.current?.style.setProperty("--wall-nav-bottom", `${nav.getBoundingClientRect().bottom + 24}px`);
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    update();
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    node.scrollLeft = (node.scrollWidth - node.clientWidth) / 2;
    const update = () => setEdges({ left: node.scrollLeft <= 2, right: node.scrollLeft + node.clientWidth >= node.scrollWidth - 2 });
    update();
    node.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { node.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  function move(direction: number) {
    const node = viewport.current;
    node?.scrollBy({ left: direction * node.clientWidth * .65, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return (
    <main ref={root} data-nav-theme="light" className="wall-page relative h-svh overflow-hidden bg-[#f7f4fa] text-[#24132e]">
      <div ref={viewport} id="testimony-wall" tabIndex={0} aria-label="Testimony wall. Scroll horizontally to explore." className="wall-viewport h-full overflow-auto focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
        <div className="wall-canvas grid h-full min-h-[860px] w-[max(2200px,180vw)] grid-cols-[1fr_1.1fr_1.4fr_1.1fr_1fr] grid-rows-[1fr_1.3fr_1fr] gap-[3px] py-12">
          {Array.from({ length: 15 }, (_, index) => {
            const testimony = wallTestimonies[index > 7 ? index - 1 : index];
            if (index === 7) return <figure key="scripture" className="relative z-10 flex flex-col items-center justify-center bg-[#f7f4fa] px-8 py-6 text-center">
              <h1 className="mb-6 text-xs uppercase tracking-[.2em] text-[#725d80]">The Testimony Wall</h1>
              <blockquote className="text-balance font-primary text-[clamp(1.7rem,2.6vw,3rem)] leading-[1.13] tracking-[-.035em]">And they overcame him by the blood of the Lamb, and by the word of their testimony&hellip;</blockquote>
              <figcaption className="mt-6 text-[10px] uppercase tracking-[.16em] text-[#725d80]">Revelation 12:11 · KJV</figcaption>
            </figure>;
            return <article key={index} tabIndex={0} className="wall-brick group relative flex min-w-0 flex-col justify-center overflow-hidden p-8 focus-visible:outline-2 focus-visible:outline-offset-[-5px]" style={{ backgroundColor: ["#ded0e8", "#e8dfee", "#d3bfdf", "#eee7f2"][index % 4] }}>
              <h2 className="max-w-[20ch] text-balance text-[clamp(1.3rem,2vw,2rem)] leading-[1.12] tracking-[-.035em]">{testimony.title}</h2>
              <p className="mt-4 text-xs text-[#725d80]">{testimony.program}</p>
              <div className="wall-reveal absolute inset-0 flex flex-col justify-end bg-[#24132e] p-7 text-white">
                {/* Only actual testimony thumbnails are shown once video IDs are supplied. */}
                {testimony.youtubeId && <Image unoptimized fill sizes="500px" src={`https://i.ytimg.com/vi/${testimony.youtubeId}/hqdefault.jpg`} alt="" className="object-cover" />}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                <div className="relative">
                  <p className="mb-4 text-xl leading-tight">{testimony.title}</p>
                  {testimony.youtubeId ? <a className="wall-action relative inline-flex min-h-11 items-center gap-5 overflow-hidden bg-white px-4 text-sm text-[#24132e] focus-visible:outline-2" href={`https://www.youtube.com/watch?v=${testimony.youtubeId}`} target="_blank" rel="noopener noreferrer"><span className="relative z-10">Watch full video &#8594;</span></a> : <><p className="mb-3 text-xs text-white/65">Video coming soon</p><button disabled className="inline-flex min-h-11 items-center bg-white/15 px-4 text-sm text-white/60">Watch full video</button></>}
                </div>
              </div>
              <div aria-hidden="true" className="wall-sweep pointer-events-none absolute inset-0 bg-[#b897da]" />
              <div aria-hidden="true" className="wall-sweep wall-sweep-two pointer-events-none absolute inset-0 bg-[#dfcbf1]" />
            </article>;
          })}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-5 z-20 mx-auto flex w-fit items-center gap-5 border border-black/10 bg-[#f7f4fa] p-2 shadow-lg">
        {[-1, 1].map(direction => <button key={direction} type="button" aria-label={`Explore ${direction === -1 ? "left" : "right"} side of wall`} aria-controls="testimony-wall" disabled={direction === -1 ? edges.left : edges.right} onClick={() => move(direction)} className="wall-action relative flex min-h-12 items-center gap-4 overflow-hidden bg-[#24132e] px-5 text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-30"><span className="relative z-10">{direction === -1 ? "←" : "→"}</span><span className="relative z-10 text-xs">{direction === -1 ? "Explore left" : "Explore right"}</span></button>)}
      </div>
    </main>
  );
}
