"use client";

import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ShelfBook = { id: string; title: string; edition: string; color: string };

export default function ResourceShelfHero({ resources }: { resources: ShelfBook[] }) {
  const root = useRef<HTMLElement>(null);
  const shelf = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, moved: false, x: 0, scroll: 0 });
  const [selected, setSelected] = useState(Math.floor((resources.length * 4 - 1) / 2));
  const books = Array.from({ length: 4 }, (_, copy) => resources.map(resource => ({ ...resource, shelfKey: `${resource.id}-${copy}` }))).flat();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, .5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, .5], [0, -35]);
  useLayoutEffect(() => {
    const viewport = shelf.current;
    if (!viewport) return;
    const center = () => {
      const book = viewport.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
      if (book) viewport.scrollLeft = book.offsetLeft - (viewport.clientWidth - book.offsetWidth) / 2;
      viewport.dataset.centered = "true";
    };
    center();
    const observer = new ResizeObserver(center);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);
  function selectBook(index: number, focus = false) {
    const next = Math.max(0, Math.min(books.length - 1, index));
    setSelected(next);
    const viewport = shelf.current;
    const book = viewport?.querySelectorAll<HTMLButtonElement>("button")[next];
    if (!viewport || !book) return;
    viewport.scrollTo({ left: book.offsetLeft - (viewport.clientWidth - book.offsetWidth) / 2, behavior: reduced ? "instant" : "smooth" });
    if (focus) book.focus({ preventScroll: true });
  }
  return <section ref={root} data-nav-theme="light" data-motion-custom aria-labelledby="resources-heading" className="resource-shelf-hero relative flex flex-col items-center justify-center overflow-hidden bg-white px-6 text-[#24132e] sm:px-12">
    <div className="resource-shelf" role="group" aria-label="Books from our resource library">
      <div ref={shelf} className="resource-shelf-books" onKeyDown={event => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        selectBook(event.key === "Home" ? 0 : event.key === "End" ? books.length - 1 : selected + (event.key === "ArrowRight" ? 1 : -1), true);
      }} onPointerDown={event => {
        if (event.pointerType !== "mouse" || event.button !== 0) return;
        drag.current = { active: true, moved: false, x: event.clientX, scroll: event.currentTarget.scrollLeft };
      }} onPointerMove={event => {
        if (!drag.current.active) return;
        const distance = event.clientX - drag.current.x;
        if (Math.abs(distance) > 5) { drag.current.moved = true; event.currentTarget.setPointerCapture(event.pointerId); }
        if (drag.current.moved) event.currentTarget.scrollLeft = drag.current.scroll - distance;
      }} onPointerUp={event => { drag.current.active = false; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }} onPointerCancel={() => { drag.current.active = false; }} onClickCapture={event => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}>
          {books.map((resource, index) => <motion.button initial={false} animate={{ y: selected === index ? -12 : 0, rotate: selected === index ? -2 : 0 }} transition={reduced ? { duration: 0 } : { type: "spring", duration: .45, bounce: 0 }} type="button" key={resource.shelfKey} onClick={() => selectBook(index)} aria-pressed={selected === index} aria-label={`Select ${resource.title} ${resource.edition}, book ${index + 1} of ${books.length}`} className="shelf-book-spine focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f]" style={{ backgroundColor: resource.color, height: `${[94, 100, 96, 90, 98, 92][index % 6]}%`, flexBasis: `${[34, 42, 38, 30, 40][index % 5]}px` }}>
              <span aria-hidden="true" className="shelf-spine-band" />
              <span className="shelf-spine-title">{resource.title}</span>
              <span className="shelf-spine-edition">{resource.edition}</span>
            </motion.button>)}
      </div>
      <div aria-hidden="true" className="resource-shelf-board" />
    </div>
    <motion.div className="shelf-hero-copy relative flex max-w-[800px] flex-col items-center text-center" style={reduced ? undefined : { opacity, y }}>
      <h1 id="resources-heading" className="max-w-[17ch] text-balance font-normal leading-[1.02] tracking-[-.045em]"><CmsText id="components/ResourceShelfHero:6ccbe5336e4c3f8d" fallback="Rooted in the Word. Growing in faith." /></h1>
      <p className="max-w-[490px] leading-relaxed text-[#24132e]/75"><CmsText id="components/ResourceShelfHero:5d3e2f1e001cd475" fallback="Discipleship manuals, devotionals, and resources to help you know God more deeply and live out your faith every day." /></p>
      <CmsLink href="#library" className="inline-flex min-h-11 items-center gap-6 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f]"><CmsText id="components/ResourceShelfHero:f7ac1a99518f873d" fallback="Explore resources" /></CmsLink>
    </motion.div>
  </section>;
}
