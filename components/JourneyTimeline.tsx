"use client";

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import Image from '@/components/cms/CmsImage';
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { churchHistory as fallbackchurchHistory } from "@/content/church-history";

function Milestone({ event, index, total }: { event: (typeof fallbackchurchHistory)[number]; index: number; total: number }) {
  const root = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start 80%", "center 65%"] });
  const markerColor = useTransform(scrollYProgress, [0, 1], ["#ddd0e7", "#75538f"]);
  const rightImage = index % 2 === 1;
  return <li ref={root} className="relative grid items-center gap-7 pl-10 pb-16 last:pb-0 md:grid-cols-[1fr_80px_1fr] md:gap-0 md:pl-0 md:pb-24">
    <motion.span aria-hidden="true" style={{ backgroundColor: reduced ? "#75538f" : markerColor }} className={`absolute left-[5px] top-6 z-10 size-4 rounded-full ring-[6px] ring-white md:left-1/2 md:-translate-x-1/2 ${index === total - 1 ? "md:top-1/2" : "md:top-[calc(50%-48px)]"}`} />
    <motion.div initial={reduced ? false : { opacity: 0, x: rightImage ? 24 : -24, y: 12 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: reduced ? 0 : .7, ease: [.22, 1, .36, 1] }} className={`relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#e9dff0] md:row-start-1 ${rightImage ? "md:col-start-3" : "md:col-start-1"}`}>
      <Image src={event.image} alt={`Church community: ${event.title}`} fill sizes="(max-width: 767px) 85vw, 45vw" className="object-cover" />
    </motion.div>
    <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: reduced ? 0 : .6, delay: reduced ? 0 : .1, ease: [.22, 1, .36, 1] }} className={`md:row-start-1 ${rightImage ? "md:col-start-1 md:pr-8" : "md:col-start-3 md:pl-8"}`}>
      <time dateTime={event.dateTime} className="text-xs font-medium uppercase tracking-[.14em] text-[#75538f]">{event.date}</time>
      <h3 className="mt-4 max-w-[18ch] text-balance text-3xl leading-[1.08] tracking-[-.035em] sm:text-4xl">{event.title}</h3>
      <p className="mt-5 max-w-[420px] text-base leading-relaxed text-[#49345f]/85">{event.description}</p>
    </motion.div>
  </li>;
}

export default function JourneyTimeline() {
  const churchHistory = useCmsCollection("churchHistory", fallbackchurchHistory);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start 65%", "end 65%"] });
  return <section id="history" data-nav-theme="light" data-motion-custom aria-labelledby="journey-heading" className="overflow-hidden scroll-mt-32 bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
    <div className="mx-auto max-w-[1160px]">
      <div className="mb-16 max-w-[660px] sm:mb-24"><h2 id="journey-heading" className="text-balance text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="components/JourneyTimeline:5daa47c4bb3e8860" fallback="Our journey so far." /></h2></div>
      <div ref={root} className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-3 top-0 w-px bg-[#ddd0e7] md:left-1/2"><motion.div className="absolute inset-0 origin-top bg-[#75538f]" style={{ scaleY: reduced ? 1 : scrollYProgress }} /></div>
        <ol>{churchHistory.map((event, index) => <Milestone key={event.title} event={event} index={index} total={churchHistory.length} />)}</ol>
      </div>
    </div>
  </section>;
}
