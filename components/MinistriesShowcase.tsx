'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ministries } from '@/data/ministries';
import Button from '@/components/ui/Button';

export default function MinistriesShowcase() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const goTo = (index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.children.item(index) as HTMLElement | null;
    if (!scroller || !card) return;

    scroller.scrollTo({
      left: card.offsetLeft - scroller.offsetLeft,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
    setActiveIndex(index);
  };

  const updateActiveCard = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.children) as HTMLElement[];
    const nearest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.offsetLeft - scroller.offsetLeft - scroller.scrollLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY }
    );

    setActiveIndex(nearest.index);
  };

  return (
    <section
      aria-labelledby="ministries-showcase-heading"
      className="overflow-hidden bg-white py-28 text-[#17243b] sm:py-36 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-7 lg:mb-12 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7028a8]">
              Find your place
            </p>
            <h2
              id="ministries-showcase-heading"
              className="text-balance text-4xl font-medium leading-none tracking-[-0.05em] sm:text-5xl lg:text-6xl"
            >
              Life in our ministries
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-base font-light leading-relaxed text-slate-500 sm:text-lg">
              Serve, grow, and build community through a ministry shaped around your gifts and calling.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="flex size-12 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-[color,background-color,border-color,transform,opacity] duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Previous ministry"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(ministries.length - 1, activeIndex + 1))}
              disabled={activeIndex === ministries.length - 1}
              className="flex size-12 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-[color,background-color,border-color,transform,opacity] duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950 active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-35"
              aria-label="Next ministry"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <Button href="/ministries" variant="black" className="ml-2">
              Explore all ministries
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={updateActiveCard}
        className="mx-auto flex max-w-7xl snap-x snap-mandatory gap-8 overflow-x-auto px-4 pb-4 sm:px-6 lg:gap-10 lg:px-8 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
      >
        {ministries.map((ministry) => (
          <article
            key={ministry.id}
            className="grid h-[600px] w-[86vw] max-w-[820px] shrink-0 snap-start grid-rows-[0.8fr_1.2fr] overflow-hidden rounded-lg shadow-[0_16px_45px_rgba(15,23,42,0.1)] sm:h-[560px] sm:w-[78vw] lg:w-[820px] lg:grid-cols-2 lg:grid-rows-1"
          >
            <div
              className="relative order-2 flex min-h-0 flex-col justify-between overflow-hidden p-7 sm:p-10 lg:order-1"
              style={{ backgroundColor: ministry.background, color: ministry.foreground }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(${ministry.accent} 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <p className="mb-9 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em]" style={{ color: ministry.accent }}>
                  <span className="flex size-7 items-center justify-center rounded-full border border-current/30">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                    </svg>
                  </span>
                  {ministry.eyebrow}
                </p>
                <h3 className="max-w-[11ch] text-balance text-4xl font-normal leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                  {ministry.summary}
                </h3>
                <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed opacity-75 sm:text-base">
                  {ministry.description}
                </p>
              </div>

              <Button
                href={`/ministries#${ministry.id}`}
                variant="secondary"
                className="relative z-10 mt-7 shadow-sm hover:shadow-md"
              >
                Meet {ministry.name}
              </Button>
            </div>

            <div className="relative order-1 min-h-0 bg-stone-200 lg:order-2">
              <Image
                src={ministry.image}
                alt={`${ministry.name} ministry`}
                fill
                sizes="(max-width: 1024px) 88vw, 430px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
              <div className="absolute left-5 top-5 rounded-lg bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md lg:hidden">
                {ministry.name}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
