"use client";

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import Image from '@/components/cms/CmsImage';
import { useEffect, useRef, useState } from "react";

const fallbackframes = ["IMG_6718.JPG", "IMG_7174.JPG", "IMG_7234.JPG", "IMG_7289.JPG", "IMG_7295.JPG", "church-bg-4.jpg", "IMG_7194.JPG", "church-bg-2.jpg"];

export default function HomepageIntro() {
  const frames = useCmsCollection("introFrames", fallbackframes);
  const dialog = useRef<HTMLDialogElement>(null);
  const [finished, setFinished] = useState(false);
  const [playing, setPlaying] = useState(false);
  const loaded = useRef(new Set<string>());
  const start = useRef<(() => void) | null>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) {
      element.close();
      const frame = requestAnimationFrame(() => setFinished(true));
      return () => cancelAnimationFrame(frame);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element.removeAttribute("open");
    element.showModal();
    let endTimer: ReturnType<typeof setTimeout>;
    let started = false;
    const begin = () => {
      if (started) return;
      started = true;
      setPlaying(true);
      endTimer = setTimeout(() => setFinished(true), 4100);
    };
    start.current = begin;
    if (loaded.current.size === frames.length) begin();
    // Never hold the homepage indefinitely on a slow image connection.
    const fallback = setTimeout(begin, 1200);
    const onPreference = () => { if (preference.matches) setFinished(true); };
    preference.addEventListener("change", onPreference);
    return () => {
      clearTimeout(fallback);
      clearTimeout(endTimer);
      start.current = null;
      document.body.style.overflow = previousOverflow;
      preference.removeEventListener("change", onPreference);
      element.close();
    };
  }, [frames.length]);

  useEffect(() => {
    if (!finished) return;
    dialog.current?.close();
    document.body.style.overflow = "";
    // Restart keyboard navigation at the top of the page (skip link, then nav), not inside <main>.
    const body = document.body;
    body.setAttribute("tabindex", "-1");
    body.focus({ preventScroll: true });
    body.removeAttribute("tabindex");
  }, [finished]);

  if (finished) return null;
  return <>
    <noscript><style>{`.homepage-intro { display: none !important; }`}</style></noscript>
    <dialog ref={dialog} open aria-label="Welcome to The Martyrs Church" onCancel={event => { event.preventDefault(); setFinished(true); }} data-motion-custom className={`homepage-intro ${playing ? "is-playing" : ""}`}>
      <div className="intro-film" aria-hidden="true">
        {frames.map((frame, index) => <div key={frame} className={`intro-frame ${index === frames.length - 1 ? "intro-frame-final" : ""}`} style={{ "--frame-delay": `${index * 180}ms` } as React.CSSProperties}>
          <Image src={frame.startsWith("http") || frame.startsWith("/") ? frame : `/assets/${frame}`} alt="" fill sizes="100vw" quality={65} loading="eager" preload={index === 0} className="object-cover object-center" onLoad={() => { loaded.current.add(frame); if (loaded.current.size === frames.length) start.current?.(); }} />
        </div>)}
        <div className="intro-shade" />
        <div className="intro-grain" />
      </div>
      <div className="intro-title-wrap"><h2 className="intro-title"><span><CmsText id="components/HomepageIntro:0e603afb4d23eed1" fallback="The Martyrs Church" /></span><span aria-hidden="true" className="intro-title-light"><CmsText id="components/HomepageIntro:0e603afb4d23eed1-2" fallback="The Martyrs Church" /></span></h2></div>
      <div className="intro-bottom"><span aria-hidden="true" className="intro-caption"><CmsText id="components/HomepageIntro:1e974a82e61251e0" fallback="Preparing God’s endtime army" /></span></div>
    </dialog>
  </>;
}
