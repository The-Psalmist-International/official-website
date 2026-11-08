"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";

const locations = [
  { name: "Ghana", region: "West Africa", landmark: "Black Star Gate, Accra", background: "#eee5f6", image: "/assets/landmarks/ghana.svg", imageClass: "-right-3 -bottom-2 h-[290px] w-[425px] lg:h-[325px] lg:w-[475px]" },
  { name: "Canada", region: "North America", landmark: "CN Tower, Toronto", background: "#eee5f6", image: "/assets/landmarks/canada.svg", imageClass: "-right-16 -bottom-2 h-[325px] w-[245px] lg:h-[370px] lg:w-[280px]" },
  { name: "United States", region: "North America", landmark: "Statue of Liberty, New York", background: "#eee5f6", image: "/assets/landmarks/usa.svg", imageClass: "-right-5 -bottom-2 h-[320px] w-[225px] lg:h-[365px] lg:w-[260px]" },
  { name: "London", region: "United Kingdom", landmark: "Elizabeth Tower, London", background: "#eee5f6", image: "/assets/landmarks/london.svg", imageClass: "-right-8 -bottom-2 h-[325px] w-[245px] lg:h-[370px] lg:w-[280px]" },
  { name: "Nigeria", region: "West Africa", landmark: "National Theatre, Lagos", background: "#eee5f6", image: "/assets/landmarks/nigeria.svg", imageClass: "-right-3 -bottom-2 h-[290px] w-[425px] lg:h-[325px] lg:w-[475px]" },
];

function AnimatedLandmark({ src, label }: { src: string; label: string }) {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { once: true, amount: .2 });
  return (
    <div ref={root} className="relative h-full w-full">
      {visible && <img src={src} alt={`Animated vector illustration of ${label}`} className="h-full w-full object-contain object-bottom" />}
    </div>
  );
}

export default function GlobalPresence() {
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft < 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const card = element.firstElementChild as HTMLElement | null;
    element.scrollBy({ left: direction * ((card?.offsetWidth ?? element.clientWidth) + 16), behavior: reduced ? "instant" : "smooth" });
  }
  return (
    <section data-nav-theme="light" aria-labelledby="presence-title" className="bg-white px-6 pb-28 pt-16 text-stone-950 sm:px-12 sm:pb-40 lg:px-20">
      <div className="mx-auto max-w-[1160px]">
        <div className="mb-12 flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div className="max-w-[650px]">
            <p className="mb-5 text-xs font-medium uppercase tracking-[.16em] text-stone-400">Our presence</p>
            <h2 id="presence-title" className="text-4xl font-normal leading-[1.08] tracking-[-.035em] sm:text-5xl lg:text-6xl">One church, across nations.</h2>
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-stone-500">Across borders, we gather as one family to worship, grow in the Word, and reveal the witness of God to the nations.</p>
          </div>
          <a href="https://share.google/ONIqoMH5HO69gJyGj" target="_blank" rel="noopener noreferrer" className="group relative isolate inline-flex min-h-12 shrink-0 items-center justify-center gap-8 self-start overflow-hidden border border-black/15 px-6 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 sm:self-auto">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-[#b897da] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-[#c9abe6] transition-transform delay-75 duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 -translate-x-full bg-[#dfcbf1] transition-transform delay-150 duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
            Join us <span aria-hidden="true">&#8594;</span>
          </a>
        </div>
        <div ref={track} id="location-carousel" role="region" aria-roledescription="carousel" aria-label="Our locations" tabIndex={0} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }} className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a283bc]">
          {locations.map((location, index) => (
            <motion.article key={location.name} initial={false} animate={{ opacity: 1 }} transition={{ duration: .5, delay: index * .08 }} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${locations.length}: ${location.name}`} className="group relative w-[88%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)] min-h-[370px] overflow-hidden p-7 lg:min-h-[420px]" style={{ backgroundColor: location.background }}>
              <p className="text-[10px] font-medium uppercase tracking-[.14em] text-black/40">{location.region}</p>
              <h3 className="mt-2 text-3xl font-normal tracking-[-.025em]">{location.name}</h3>
              <motion.div initial={reduced ? false : { opacity: 0, y: 30, scale: .97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, delay: .12 + index * .08, ease: [.22, 1, .36, 1] }} className={`absolute origin-bottom-right ${location.imageClass}`}>
                <div className="relative h-full w-full origin-bottom-right transition-transform duration-700 ease-out group-hover:scale-[1.025] motion-reduce:transition-none">
                  <AnimatedLandmark src={location.image} label={location.landmark} />
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-end">
          <div className="flex gap-2">
            <button type="button" aria-label="Previous locations" aria-controls="location-carousel" disabled={edges.start} onClick={() => move(-1)} className="flex size-11 items-center justify-center border border-black/15 transition-colors hover:bg-[#eee5f6] disabled:opacity-25 disabled:hover:bg-transparent">&#8592;</button>
            <button type="button" aria-label="Next locations" aria-controls="location-carousel" disabled={edges.end} onClick={() => move(1)} className="flex size-11 items-center justify-center border border-black/15 transition-colors hover:bg-[#eee5f6] disabled:opacity-25 disabled:hover:bg-transparent">&#8594;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
