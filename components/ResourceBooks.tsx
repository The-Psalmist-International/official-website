"use client";

import CmsText from '@/components/cms/CmsText';
import CmsLink from "@/components/cms/CmsLink";
import { safeContentUrl } from "@/lib/cms/types";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Resource = { id: string; title: string; edition: string; type: string; color: string; pdfUrl?: string };

function Book({ resource, index, progress }: { resource: Resource; index: number; progress: MotionValue<number> }) {
  const root = useRef<HTMLElement>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = root.current;
    const parent = element?.parentElement;
    if (!element || !parent) return;
    const observer = new ResizeObserver(() => setOrigin({
      x: (parent.clientWidth - element.offsetWidth) / 2 - element.offsetLeft + (index - 1.5) * 15,
      y: 32 - element.offsetTop + index * 7,
    }));
    observer.observe(parent);
    observer.observe(element);
    return () => observer.disconnect();
  }, [index]);
  const x = useTransform(progress, [0, .8], [origin.x, 0]);
  const y = useTransform(progress, [0, .8], [origin.y, 0]);
  const rotate = useTransform(progress, [0, .85], [[-12, -4, 7, 15][index % 4], 0]);
  const scale = useTransform(progress, [0, .85], [.88, 1]);
  const detailsOpacity = useTransform(progress, [.45, .9], [0, 1]);
  return <motion.article ref={root} id={resource.id} aria-labelledby={`${resource.id}-title`} className="resource-book-item scroll-mt-36" style={reduced ? undefined : { x, y, rotate, scale, zIndex: 4 - index }}>
    <div className="resource-book" style={{ backgroundColor: resource.color }}>
      <div aria-hidden="true" className="resource-book-pages" />
      <div className="resource-book-cover" style={{ backgroundColor: resource.color }}>
        <span aria-hidden="true" className="resource-book-spine" />
        <p className="relative text-[10px] uppercase leading-relaxed tracking-[.17em]"><CmsText id="components/ResourceBooks:08b87eb1ccc59216" fallback="The Martyrs" /><br /><CmsText id="components/ResourceBooks:837aa0d985b27908" fallback="Church" /></p>
        <div className="relative"><p className="mb-4 text-[10px] uppercase tracking-[.16em] opacity-60">{resource.type}</p><h3 id={`${resource.id}-title`} className="text-[clamp(1.75rem,2.4vw,2.6rem)] leading-[1.06] tracking-[-.045em]">{resource.title}</h3></div>
        <div className="relative flex items-center justify-between gap-3"><span className="text-xs uppercase tracking-[.16em]">{resource.edition}</span><svg aria-hidden="true" viewBox="0 0 30 30" fill="none" className="size-8 opacity-50"><path d="M15 2v26M2 15h26M6 6l18 18M6 24 24 6" stroke="currentColor" strokeWidth=".7" /></svg></div>
      </div>
    </div>
    <motion.div className="pt-7" style={reduced ? undefined : { opacity: detailsOpacity }}>
      {resource.pdfUrl && safeContentUrl(resource.pdfUrl, "") ? <CmsLink href={resource.pdfUrl} target="_blank" rel="noopener noreferrer" className="site-button inline-flex min-h-12 items-center gap-6 bg-[#49345f] px-5 text-sm font-medium text-white">Download PDF <span aria-hidden="true">&#8599;</span></CmsLink> : <button type="button" disabled title="PDF file has not been added yet" aria-label={`Download PDF: ${resource.title} ${resource.edition} (not available yet)`} className="site-button inline-flex min-h-12 items-center gap-6 bg-[#49345f] px-5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"><CmsText id="components/ResourceBooks:6183be0883d2a89c" fallback="Download PDF" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M12 3v12m-4-4 4 4 4-4M5 16v5h14v-5" /></svg></button>}
    </motion.div>
  </motion.article>;
}

export default function ResourceBooks({ resources }: { resources: Resource[] }) {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: root, offset: ["start 95%", "start 25%"] });
  return <div ref={root} data-motion-custom className="relative isolate grid gap-x-8 gap-y-16 px-2 pb-6 pt-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
    {resources.map((resource, index) => <Book key={resource.id} resource={resource} index={index} progress={scrollYProgress} />)}
  </div>;
}
