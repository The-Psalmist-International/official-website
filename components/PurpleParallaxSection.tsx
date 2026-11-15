"use client";

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import Image from '@/components/cms/CmsImage';
import { useEffect, useRef, useState } from "react";

type ChurchEvent = { name: string; image: string; alt: string; action: "Subscribe" | "Register"; href: string | null };

const fallbackevents: ChurchEvent[] = [
  { name: "Nouthesia S10 Day 2", image: "/assets/IMG_7289.JPG", alt: "The church gathered in worship", action: "Subscribe", href: "https://www.youtube.com/@ChurchOfTheMartyrs?sub_confirmation=1" },
  { name: "Adullam", image: "/assets/IMG_7234.JPG", alt: "A gathering of The Martyrs Church", action: "Register", href: null },
];

export default function PurpleParallaxSection() {
  const events = useCmsCollection("events", fallbackevents);
  const root = useRef<HTMLElement>(null);
  const visible = useInView(root, { amount: .3 });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const progress = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!visible || paused || interacting || reduced || !pageVisible) return;
    const animation = animate(progress, 1, {
      duration: (1 - progress.get()) * 7, ease: "linear",
      onComplete: () => { progress.set(0); setActive(index => (index + 1) % events.length); },
    });
    return () => animation.stop();
  }, [active, visible, paused, interacting, reduced, pageVisible, progress, events.length]);

  useEffect(() => {

    // Replace the slide while the layered sweep covers the image.
    const timer = window.setTimeout(() => setDisplayed(active), reduced ? 0 : 320);
    return () => window.clearTimeout(timer);
  }, [active, reduced]);

  function select(index: number) { progress.set(0); setActive(index); }

  return (
    <section ref={root} data-nav-theme="dark" aria-labelledby="events-title" className="relative min-h-svh bg-[#75538f] px-6 pb-8 pt-28 text-white sm:px-12 md:h-svh md:min-h-0 lg:px-20">
      <div className="mx-auto flex h-full max-w-[1160px] flex-col">
        <div className="mb-7 flex shrink-0 items-end justify-between gap-6">
          <div>

            <h2 id="events-title" className="text-3xl font-normal leading-tight tracking-[-.035em] sm:text-4xl lg:text-5xl"><CmsText id="components/PurpleParallaxSection:a7f95b69f7636e93" fallback="Upcoming Events." /></h2>
          </div>
          <div className="flex items-center gap-1" role="group" aria-label="Choose event">
            {events.map((event, index) => <button key={event.name} type="button" aria-label={`Show ${event.name}`} aria-current={active === index ? "true" : undefined} onClick={() => { setPaused(true); select(index); }} className="site-button flex size-10 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"><span className={`size-2 rounded-full transition-opacity ${active === index ? "bg-white" : "bg-white/60 hover:bg-white/80"}`} /></button>)}
          </div>
        </div>
        <div className="min-h-0 flex-1">
          <div className="relative h-[55svh] min-h-0 overflow-hidden bg-black/15 md:h-full" onPointerEnter={e => { if (e.pointerType === "mouse") setInteracting(true); }} onPointerMove={e => {
            if (e.pointerType !== "mouse") return;
            const bounds = e.currentTarget.getBoundingClientRect();
            cursorX.set(e.clientX - bounds.left);
            cursorY.set(e.clientY - bounds.top);
            setCursorVisible(!(e.target as HTMLElement).closest("[data-slideshow-control]"));
          }} onPointerLeave={() => { setInteracting(false); setCursorVisible(false); }}>
            <div data-slideshow-control className="absolute right-4 top-4 z-10 flex items-center gap-1 bg-black/25 p-1 backdrop-blur-sm">
              {!reduced && <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} aria-pressed={paused} onClick={() => setPaused(value => !value)} className="site-button flex size-10 items-center justify-center text-xs focus-visible:outline-2"><svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paused ? <path d="m8 5 11 7-11 7Z" /> : <><path d="M8 5v14" /><path d="M16 5v14" /></>}</svg></button>}
            </div>
            {events.map((event, index) => (
              <motion.div data-motion-custom key={event.name} id={`event-panel-${index}`} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${events.length}: ${event.name}`} aria-hidden={displayed !== index} inert={displayed !== index} initial={false} animate={{ opacity: displayed === index ? 1 : 0, filter: reduced ? "none" : displayed === index ? "blur(0px)" : "blur(4px)" }} transition={{ duration: reduced ? 0 : displayed === index ? .5 : .2, ease: [.22, 1, .36, 1] }} className="absolute inset-0">
                <Image src={event.image} alt={event.alt} loading="eager" fill sizes="(max-width: 1280px) 100vw, 1160px" className="object-cover object-[center_30%]" />
                <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <span className="mb-4 inline-block border border-white/30 px-3 py-1.5 text-[10px] uppercase tracking-[.14em]"><CmsText id="components/PurpleParallaxSection:5f1a2542e4e4ca5e" fallback="Upcoming" /></span>
                  <h3 className="text-3xl font-normal leading-tight tracking-tight sm:text-4xl">{event.name}</h3>
                </div>
                {event.href ? (
                  <CmsLink href={event.href} target="_blank" rel="noopener noreferrer" aria-label={`${event.action}: ${event.name}`} onFocus={() => setPaused(true)} className="event-action absolute inset-0 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white" />
                ) : (
                  <button type="button" aria-label={`${event.action} for ${event.name}`} aria-disabled="true" onFocus={() => setPaused(true)} className="site-button event-action absolute inset-0 w-full focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white" />
                )}
              </motion.div>
            ))}
            {!reduced && <div key={active} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
              {["#b897da", "#c9abe6", "#dfcbf1"].map((color, index) => <motion.span key={color} initial={{ x: "-100%" }} animate={{ x: ["-100%", "0%", "100%"] }} transition={{ duration: .85, delay: index * .07, times: [0, .45, 1], ease: [.22, 1, .36, 1] }} className="absolute inset-0" style={{ backgroundColor: color }} />)}
            </div>}
            <motion.span aria-hidden="true" style={{ left: cursorX, top: cursorY, opacity: cursorVisible ? 1 : 0 }} className="pointer-events-none absolute z-20 hidden -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-white [@media(hover:hover)_and_(pointer:fine)]:block">{events[displayed].action}</motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
