"use client";

import CmsText from '@/components/cms/CmsText';
import { useCallback, useEffect, useRef, useState } from "react";
import Link from '@/components/cms/CmsLink';
import { usePathname } from "next/navigation";

import { useCmsCollection } from "@/components/cms/ContentProvider";
import contentCollections from "@/content/cms-collections.json";
import MobileNavigation from "./MobileNavigation";
import UpcomingService from "./UpcomingService";




export default function FloatingNavbar() {
  const navigation = useCmsCollection("navigation", contentCollections.navigation);
  const items = navigation.map(item => item.label);
  const destinations: Record<string, string> = Object.fromEntries(navigation.map(item => [item.label, item.href]));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bannerOffset, setBannerOffset] = useState(64);
  const [onLight, setOnLight] = useState(false);
  const [onHero, setOnHero] = useState(false);
  const pathname = usePathname();




  useEffect(() => {
    const updateTheme = () => {
      const sections = document.querySelectorAll('[data-nav-theme]');
      const nav = root.current;
      if (!nav) return;
      const center = nav.offsetTop + nav.offsetHeight / 2;
      const visibleSection = Array.from(sections).reverse().find(section => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= center && bounds.bottom > center;
      });
      setOnLight(visibleSection?.getAttribute("data-nav-theme") === "light");
      setOnHero(visibleSection?.getAttribute("data-nav-theme") === "hero");
    };
    let previousY = Math.max(0, window.scrollY);
    const update = () => {
      updateTheme();
      const currentY = Math.max(0, window.scrollY);
      setScrolled(currentY > 24);
      setBannerOffset(Math.max(0, 64 - currentY));
      const difference = currentY - previousY;
      if (currentY < 160 || open || root.current?.contains(document.activeElement)) {
        setHidden(false);
        previousY = currentY;
      } else if (Math.abs(difference) >= 8) {
        setHidden(difference > 0);
        previousY = currentY;
      }
    };
    const frame = window.requestAnimationFrame(() => {
      updateTheme();
      setScrolled(window.scrollY > 24);
      setBannerOffset(Math.max(0, 64 - Math.max(0, window.scrollY)));
      setHidden(false);
    });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", updateTheme);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", updateTheme);
    };
  }, [pathname, open]);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
    <nav ref={root} aria-label="Main navigation" onFocusCapture={() => setHidden(false)} data-scrolled={scrolled} data-hidden={hidden} style={{ '--mobile-nav-top': `${bannerOffset}px` } as React.CSSProperties} className={`fixed inset-x-0 top-[var(--mobile-nav-top)] lg:top-0 z-50 w-full ${onLight ? "text-black" : "text-white"} transition-[translate,opacity] duration-200 ease-out motion-reduce:transition-none ${hidden && !open ? "-translate-y-full opacity-0 pointer-events-none focus-within:translate-y-0 focus-within:opacity-100 focus-within:pointer-events-auto" : "translate-y-0 opacity-100"}`}>
      <div className={`flex flex-wrap items-center justify-between rounded-none border-b pl-5 py-0 sm:pl-12 transition-[background-color,border-color,backdrop-filter] duration-200 motion-reduce:transition-none ${scrolled ? `${onLight ? "bg-white/75" : "bg-[#24132e]/70"} backdrop-blur-xl` : onHero ? "bg-transparent" : onLight ? "bg-white" : "bg-[#24132e]"} ${onLight ? "border-black/15" : "border-white/15"}`}>
        <div className="flex items-stretch">
          <Link href="/" className="flex min-h-16 items-center pr-6 text-sm font-medium tracking-tight sm:pr-10"><CmsText id="components/FloatingNavbar:0e603afb4d23eed1" fallback="The Martyrs Church" /></Link>
          <div className="hidden items-stretch lg:flex">
            {items.map(item => destinations[item] ? <Link key={item} href={destinations[item]} aria-current={pathname === (destinations[item]) ? "page" : undefined} style={{ borderRadius: 0 }} className={`flex min-h-16 items-center gap-2 border-l ${onLight ? "border-black/15" : "border-white/15"} px-6 text-sm font-medium transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px]`}>{item}</Link> : <button key={item} type="button" aria-disabled="true" style={{ borderRadius: 0 }} className={`group flex items-center gap-2 border-l ${onLight ? "border-black/15" : "border-white/15"} px-6 text-sm font-medium`}>{item}<svg aria-hidden="true" width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 -translate-x-2 opacity-0 transition-[transform,opacity] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"><path d="m5 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>)}
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 pr-4">
        <button ref={trigger} type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="floating-navigation" aria-haspopup="dialog" onClick={() => setOpen(!open)} className="relative flex lg:hidden size-11 items-center justify-center text-current transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9874b8]">
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
        </button>
        </div>
        <div className="hidden lg:block"><UpcomingService onLight={onLight} /></div>
      </div>
    </nav>
    <MobileNavigation open={open} onClose={closeMenu} pathname={pathname} links={navigation} triggerRef={trigger} />
    </>
  );
}
