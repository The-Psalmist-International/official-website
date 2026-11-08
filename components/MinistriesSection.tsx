"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { ministries } from "@/data/ministries";

export default function MinistriesSection() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, value => Math.min(1, value * ministries.length - Math.min(ministries.length - 1, Math.floor(value * ministries.length))));
  useMotionValueEvent(scrollYProgress, "change", value => setActive(Math.min(ministries.length - 1, Math.floor(value * ministries.length))));
  function select(index: number) {
    setActive(index);
    const section = root.current;
    if (!section || window.innerWidth < 768) return;
    const start = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: start + distance * (index + .05) / ministries.length, behavior: reduced ? "instant" : "smooth" });
  }

  return (
    <section ref={root} data-nav-theme="light" aria-labelledby="ministries-heading" className="relative bg-white text-stone-950 md:h-[550svh]">
      <div className="px-6 pb-8 pt-28 sm:px-12 md:sticky md:top-0 md:flex md:h-svh md:flex-col lg:px-20">
      <div className="mx-auto w-full max-w-[1160px] md:flex md:min-h-0 md:flex-1 md:flex-col">
        <div className="mb-7 shrink-0 max-w-[650px]">
          <p className="mb-3 text-xs font-medium uppercase tracking-[.16em] text-stone-400">Find your place</p>
          <h2 id="ministries-heading" className="text-4xl font-normal leading-tight tracking-[-.035em] sm:text-5xl">Life in our ministries</h2>
          <p className="mt-3 max-w-[520px] text-base leading-relaxed text-stone-500">Serve, grow, and build community through a ministry shaped around your gifts and calling.</p>
        </div>
        <div className="grid min-h-0 flex-1 gap-10 md:grid-cols-[minmax(240px,1fr)_1.45fr] md:grid-rows-[minmax(0,1fr)] lg:gap-24">
          <div className="min-h-0 md:overflow-hidden">
            <motion.div animate={{ y: active > 2 ? -(active - 2) * 48 : 0 }} transition={{ duration: reduced ? 0 : .35 }}>
            {ministries.map((ministry, index) => (
              <div key={ministry.id} className="relative border-b border-stone-200">
                <button id={`ministry-trigger-${ministry.id}`} type="button" aria-expanded={active === index} aria-controls={`ministry-copy-${ministry.id}`} onClick={() => select(index)} className={`flex min-h-12 w-full items-center gap-4 py-3 text-left text-lg font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${active === index ? "text-black" : "text-stone-400 hover:text-black"}`}><span className="text-xs tabular-nums">{String(index + 1).padStart(2, "0")}</span>{ministry.name}</button>
                <AnimatePresence initial={false}>
                  {active === index && <motion.div id={`ministry-copy-${ministry.id}`} data-motion-custom role="region" aria-labelledby={`ministry-trigger-${ministry.id}`} initial={{ height: 0, opacity: 0, filter: reduced ? "none" : "blur(4px)" }} animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }} exit={{ height: 0, opacity: 0, filter: reduced ? "none" : "blur(4px)", transition: { duration: reduced ? 0 : .2 } }} transition={{ duration: reduced ? 0 : .3, ease: [.22, 1, .36, 1] }} className="overflow-hidden"><p className="max-w-[370px] pb-7 pl-8 text-sm leading-relaxed text-stone-500">{ministry.description}</p></motion.div>}
                </AnimatePresence>
                {active === index && <motion.span aria-hidden="true" className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-black" style={{ scaleX: reduced ? 1 : progress }} />}
              </div>
            ))}
            </motion.div>
          </div>
          <div className="relative h-[440px] overflow-hidden bg-[#eee5f6] md:h-full md:min-h-0" aria-label={ministries[active].name}>
            {ministries.map((ministry, index) => <motion.div data-motion-custom key={ministry.id} aria-hidden={active !== index} initial={false} animate={{ opacity: active === index ? 1 : 0, scale: reduced || active === index ? 1 : 1.035, filter: reduced ? "none" : active === index ? "blur(0px)" : "blur(4px)" }} transition={{ duration: reduced ? 0 : active === index ? .5 : .2, ease: [.22, 1, .36, 1] }} className="absolute inset-0"><Image src={ministry.image} alt={ministry.name} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover object-[center_30%]" /><div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/65 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-7 text-white"><p className="mb-3 text-[10px] uppercase tracking-[.14em] text-white/65">{ministry.eyebrow}</p><h3 className="text-3xl font-normal leading-tight">{ministry.summary}</h3></div></motion.div>)}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
