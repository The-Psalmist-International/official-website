"use client";

import Image from '@/components/cms/CmsImage';

import CmsLink from '@/components/cms/CmsLink';
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Preserved hero card. Fetches the live stream, falling back to the latest completed stream. */
export default function YouTubeStreamCard() {
  const [liveStream, setLiveStream] = useState<{ title: string; url: string; isLive: boolean; thumbnail: string } | null>(null);
  const [pillDismissed, setPillDismissed] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const marker = useRef<HTMLSpanElement>(null);

  // Reveal the pill only once the hero section has scrolled out of view.
  useEffect(() => {
    const hero = marker.current?.closest("section");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, [liveStream]);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      for (const status of ['live', 'completed'] as const) {
        try {
          const response = await fetch(`/api/services?status=${status}`, { signal: controller.signal });
          if (!response.ok) continue;
          const data = await response.json() as { videos?: { id: string; title: string; thumbnail: string }[] };
          const video = data.videos?.[0];
          if (video) {
            setLiveStream({ title: video.title, url: `https://www.youtube.com/watch?v=${video.id}`, isLive: status === 'live', thumbnail: video.thumbnail });
            return;
          }
        } catch { if (controller.signal.aborted) return; }
      }
      if (!controller.signal.aborted) setLiveStream(null);
    }
    void load();
    return () => controller.abort();
  }, []);

  if (!liveStream) return null;

  const label = liveStream.isLive ? "Watch Live" : "Watch Latest Sermon";

  return (
    <>
      <span ref={marker} hidden />
      {/* Mobile: floating pill, portalled to <body> so it stays fixed across the whole page. */}
      {!pillDismissed && createPortal(
        <div
          aria-hidden={!pastHero}
          inert={!pastHero}
          className={`fixed inset-x-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 transition-[translate,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${pastHero ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0"}`}
        >
          <div className="flex items-center gap-3 rounded-full border border-white/15 bg-stone-950/85 p-1.5 pr-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <CmsLink
              href={liveStream.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 items-center gap-3 rounded-full"
            >
              <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-white/10">
                {liveStream.thumbnail && (
                  <Image unoptimized fill sizes="44px" src={liveStream.thumbnail} alt="" className="object-cover" />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-0.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                </span>
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/90">
                  {liveStream.isLive && <span aria-hidden="true" className="size-1.5 rounded-full bg-red-500 motion-safe:animate-pulse" />}
                  {label}
                </span>
                <span className="truncate text-sm text-white/65">{liveStream.title}</span>
              </span>
            </CmsLink>
            <button
              type="button"
              aria-label="Dismiss stream link"
              onClick={() => setPillDismissed(true)}
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
            </button>
          </div>
        </div>,
        document.body
      )}

<div className="group hidden md:flex flex-col gap-3 w-full max-w-[280px] shrink-0">
              <CmsLink
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="self-end inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white transition-colors"
              >
                {label}
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5 "><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </CmsLink>
              <CmsLink
                href={liveStream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="site-card block relative bg-white/10 backdrop-blur-sm rounded-sm p-2.5 w-full active:scale-[0.98] transition-[transform,box-shadow] duration-200 ease-out overflow-hidden border border-white/15"
              >
                <div className="relative rounded-md overflow-hidden aspect-[16/9] mb-3 bg-stone-100 border border-black/[0.08]">
                  {liveStream.thumbnail ? (
                    <Image unoptimized fill sizes="260px" src={liveStream.thumbnail} alt={liveStream.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center backdrop-blur-sm shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                    </div>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <h3 className="text-white/70 font-normal text-[15px] leading-snug line-clamp-2">
                    {liveStream.title}
                  </h3>
                </div>
              </CmsLink>
            </div>
    </>
  );
}
