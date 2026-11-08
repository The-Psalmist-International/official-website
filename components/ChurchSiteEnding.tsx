"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useState } from "react";

const aboutLinks = [
  { label: "Our mandate", href: "" },
  { label: "Our vision", href: "" },
  { label: "Our mission", href: "" },
  { label: "Our values", href: "" },
  { label: "Ministries", href: "#ministries-heading" },
  { label: "Leadership", href: "" },
  { label: "The testimony wall", href: "/testimony-wall" },
];
const resources = [
  { label: "Resources", href: "" },
];
const socials = [
  { name: "Instagram", href: "", path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5-2h.01" },
  { name: "TikTok", href: "", path: "M14 3v12a4.5 4.5 0 1 1-4-4.47M14 3c.5 4 3 6 7 6" },
  { name: "YouTube", href: "https://www.youtube.com/@ChurchOfTheMartyrs", path: "M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm6 3v8l6-4-6-4Z" },
  { name: "Facebook", href: "", path: "M15 21v-8h3l.5-4H15V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H8v4h3v8" },
];

export default function ChurchSiteEnding() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 170, damping: 30 });
  const y = useSpring(pointerY, { stiffness: 170, damping: 30 });
  return (
    <footer data-nav-theme="dark" aria-label="Church footer" className="relative isolate bg-[#1a0d22] text-white">
      <div className="flex min-h-svh flex-col">
        <section aria-labelledby="closing-heading" onPointerMove={event => {
          if (reduced || event.pointerType === "touch") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 20);
          pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
        }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} className="group relative z-10 isolate overflow-hidden border-b border-white/15 bg-[#75538f] px-6 py-12 sm:px-12 sm:py-16 lg:px-20">
          <motion.div aria-hidden="true" style={{ x: reduced ? 0 : x, y: reduced ? 0 : y }} animate={{ opacity: active ? 1 : .65, scale: active && !reduced ? 1.04 : 1 }} transition={{ duration: reduced ? 0 : .5 }} className="pointer-events-none absolute -bottom-8 -right-24 w-[500px] text-[#dfcbf1] opacity-30 max-md:opacity-20 md:right-0 md:w-[48%]">
            <svg viewBox="0 0 500 360" fill="none" className="h-auto w-full" stroke="currentColor">{Array.from({ length: 16 }, (_, index) => <path key={index} d={`M${60 + index * 16} 410 C${-130 + index * 21} 180, ${430 + index * 13} 260, ${260 + index * 18} -70`} strokeWidth={index % 4 === 0 ? 2 : 1} opacity={.25 + index * .035} />)}</svg>
          </motion.div>
          <div className="relative mx-auto max-w-[1376px]">
            <p className="mb-5 text-xs uppercase tracking-[.16em] text-white/60">Be part of the mission</p>
            <h2 id="closing-heading" className="max-w-[18ch] text-balance text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]">Partner with us.</h2>
            <p className="mt-5 max-w-[470px] text-base leading-relaxed text-white/75">Help carry the gospel further. Partner with The Martyrs Church as we raise a prophetic generation and reveal the witness of God to the nations.</p>
            <button type="button" disabled title="Partnership details coming soon" onPointerEnter={() => setActive(true)} onPointerLeave={() => setActive(false)} onFocus={() => setActive(true)} onBlur={() => setActive(false)} className="wall-action relative mt-7 inline-flex min-h-12 items-center gap-8 overflow-hidden bg-white px-6 text-sm font-medium text-[#24132e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"><span className="relative z-10">Partner with us</span><span aria-hidden="true" className="relative z-10">&#8594;</span></button>
          </div>
        </section>
        <div className="sticky bottom-0 flex flex-1 flex-col justify-between motion-reduce:relative">
          <div className="mx-auto grid w-full max-w-[1536px] gap-10 px-6 py-12 sm:px-12 md:grid-cols-[1fr_1.6fr] lg:px-20">
            <div>
              <Link href="/" className="inline-block text-2xl tracking-[-.045em] focus-visible:outline-2 focus-visible:outline-offset-4">The Martyrs Church</Link>
              <p className="mt-4 max-w-[33ch] text-sm leading-relaxed text-white/55">An apostolic movement raising a prophetic generation and revealing the witness of God to the nations.</p>
            </div>
            <nav aria-label="Footer navigation" className="grid grid-cols-2 content-start items-start gap-x-8 gap-y-4 text-sm sm:grid-cols-3 lg:gap-x-12">
              {[...aboutLinks, ...resources].map(link => link.href ? (
                link.href.startsWith("https") ? <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="w-fit text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{link.label}</a> : <Link key={link.label} href={link.href} className="w-fit text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{link.label}</Link>
              ) : <span key={link.label} aria-disabled="true" title="Page coming soon" className="text-white/45">{link.label}</span>)}
            </nav>
          </div>
          <div className="mx-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 py-7 text-xs text-white/40 sm:mx-12 lg:mx-20">
            <p>&copy; {new Date().getFullYear()} The Martyrs Church</p>
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1" aria-label="Social media">
                {socials.map(social => {
                  const icon = <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d={social.path} /></svg>;
                  return social.href ? <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="wall-action relative flex size-10 items-center justify-center overflow-hidden text-white/75 focus-visible:outline-2 focus-visible:outline-offset-2"><span className="relative z-10">{icon}</span></a> : <span key={social.name} role="img" aria-label={`${social.name}: profile coming soon`} title={`${social.name}: profile coming soon`} className="flex size-10 items-center justify-center text-white/30">{icon}</span>;
                })}
              </div>
              <p>Powered by the Mystic Engineering Team.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
