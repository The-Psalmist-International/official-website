"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UpcomingService from "./UpcomingService";

const items = ["About", "Events", "Contact"];

export default function FloatingNavbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [onLight, setOnLight] = useState(false);
  const [onHero, setOnHero] = useState(false);
  const pathname = usePathname();
  const floating = compact || pathname === "/testimony-wall";



  useEffect(() => {
    const updateTheme = () => {
      const sections = document.querySelectorAll('[data-nav-theme]');
      const nav = root.current;
      if (!nav) return;
      const navBounds = nav.getBoundingClientRect();
      const center = navBounds.top + navBounds.height / 2;
      const visibleSection = Array.from(sections).reverse().find(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= center && bounds.bottom > center;
      });
      setOnLight(visibleSection?.getAttribute("data-nav-theme") === "light");
      setOnHero(visibleSection?.getAttribute("data-nav-theme") === "hero");
    };
    const update = () => {
      updateTheme();
      const currentY = Math.max(0, window.scrollY);
      setCompact(currentY > 80);


    };
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    function dismiss(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    function escape(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <nav ref={root} aria-label="Main navigation" className={`fixed top-0 left-1/2 z-50 -translate-x-1/2 ${onLight ? "text-black" : "text-white"} transition-[width,max-width,margin-top] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none ${floating ? "mt-4 w-[calc(100%-32px)] max-w-[1160px]" : "mt-0 w-full max-w-full"}`}>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div id="floating-navigation" initial={{ opacity: 0, y: reduced ? 0 : -12, scale: reduced ? 1 : .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : -8, scale: reduced ? 1 : .98 }} transition={{ duration: .22, ease: [.22, 1, .36, 1] }} className="absolute top-full right-0 mt-3 w-[280px] origin-top-right rounded-[24px] border border-black/[.06] bg-white p-3 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]">
            {items.map((item, index) => (
              <motion.button key={item} type="button" aria-disabled="true" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : .06 + index * .055, duration: .22 }} className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-base font-medium text-black transition-colors duration-200  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9874b8]">
                {item}<svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 -translate-x-2 opacity-0 transition-[transform,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"><path d="m5 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`flex flex-wrap items-center justify-between ${onHero && pathname === "/" ? "bg-transparent" : onLight ? "bg-white" : "bg-[#24132e]"} transition-[padding,border-radius,box-shadow,border-color,background-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none border ${onLight ? "border-black/15" : "border-white/15"} ${floating ? `rounded-none overflow-hidden pl-5 ${onLight ? "shadow-[0_1px_5px_-3px_rgba(0,0,0,0.04)]" : "shadow-[0_2px_10px_-4px_rgba(0,0,0,0.07)]"}` : "rounded-none pl-5 py-0 sm:pl-12"}`}>
        <div className="flex items-stretch">
          <Link href="/" className="flex min-h-16 items-center pr-6 text-sm font-medium tracking-tight sm:pr-10">The Martyrs Church</Link>
          <div className="hidden items-stretch md:flex">
            {items.map(item => <button key={item} type="button" aria-disabled="true" className={`group flex items-center gap-2 border-l ${onLight ? "border-black/15" : "border-white/15"} px-6 text-sm font-medium`}>{item}<svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 -translate-x-2 opacity-0 transition-[transform,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"><path d="m5 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>)}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 pr-4">
        <button ref={trigger} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="floating-navigation" onClick={() => setOpen(!open)} className="relative flex md:hidden size-11 items-center justify-center rounded-full bg-[#d8c1ef] text-[#49345f] transition-transform active:scale-[.96] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9874b8]">
          <span className={`absolute h-px w-4 bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
          <span className={`absolute h-px w-4 bg-current transition-transform duration-200 motion-reduce:transition-none ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
        </button>
        </div>
        <UpcomingService onLight={onLight} />
      </div>
    </nav>
  );
}
