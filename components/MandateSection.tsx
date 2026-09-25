'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const mandates = [
  {
    text: 'Training men and women into experiential knowledge of God.',
    image: '/assets/IMG_7289.JPG',
    alt: 'Church members gathered for spiritual training',
  },
  {
    text: 'Discipling believers into a full understanding of their divine purpose.',
    image: '/assets/IMG_7172.JPG',
    alt: 'Believers sharing a discipleship moment',
  },
  {
    text: 'Restoring the apostolic tradition of martyrdom by the Spirit.',
    image: '/assets/IMG_6744.JPG',
    alt: 'The church gathered in prayer and worship',
  },
  {
    text: 'Raising a prophetic generation capable of discerning and manifesting the desires of God in every sphere of life.',
    image: '/assets/IMG_7234.JPG',
    alt: 'A joyful generation gathered in church',
  },
];

export default function MandateSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % mandates.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [activeIndex, reduceMotion]);

  const activeMandate = mandates[activeIndex];

  return (
    <section
      aria-labelledby="mandate-heading"
      className="relative overflow-hidden bg-[#fbfaf8] px-4 py-20 text-[#2b0835] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-5xl sm:mb-14">
          <span className="mb-5 inline-flex rounded-lg bg-[#f7d5f4] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.08em] text-[#4a0752]">
            Our mandate
          </span>
          <h2
            id="mandate-heading"
            className="max-w-[22ch] text-balance text-[34px] font-normal leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-[62px]"
          >
            We exist to bring the complete witness of God to the nations by
          </h2>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.72fr)] lg:gap-16 xl:grid-cols-[minmax(0,1.25fr)_440px]">
          <div className="flex flex-col border-t border-[#2b0835]/15">
            {mandates.map((mandate, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={mandate.text}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className="group relative flex min-h-20 w-full items-center border-b border-[#2b0835]/15 py-5 pr-9 text-left outline-none focus-visible:bg-[#f5edf5] sm:min-h-24 sm:py-6"
                >
                  <span
                    className={`text-pretty text-[15px] leading-[1.2] transition-[color,opacity,transform] duration-300 sm:max-w-[38ch] sm:text-lg ${
                      isActive
                        ? 'translate-x-0 text-[#4a0752] opacity-100'
                        : 'translate-x-0 text-stone-400 opacity-55 group-hover:translate-x-1 group-hover:text-[#4a0752] group-hover:opacity-80'
                    }`}
                  >
                    {mandate.text}
                  </span>

                  <span
                    className={`absolute right-1 flex size-8 items-center justify-center rounded-lg transition-[opacity,transform,background-color] duration-300 ${
                      isActive
                        ? 'scale-100 bg-[#f3e2f3] text-[#6c2a7b] opacity-100'
                        : 'scale-90 text-stone-400 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </span>

                  {isActive && (
                    <motion.span
                      key={`progress-${activeIndex}`}
                      initial={{ transform: 'scaleX(0)' }}
                      animate={{ transform: 'scaleX(1)' }}
                      transition={{
                        duration: reduceMotion ? 0.2 : 4.5,
                        ease: 'linear',
                      }}
                      className="absolute -bottom-px left-0 h-0.5 w-full origin-left bg-[#6c2a7b]"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative aspect-[3/4] w-full max-w-[520px] justify-self-center overflow-hidden rounded-lg bg-[#f4f1f2] shadow-[0_16px_50px_rgba(43,8,53,0.08),inset_0_0_0_1px_rgba(43,8,53,0.05)] lg:justify-self-end">
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={activeMandate.image}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'scale(1.035)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.985)' }}
                transition={{ duration: reduceMotion ? 0.2 : 0.65, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeMandate.image}
                  alt={activeMandate.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#25052b]/35 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </section>
  );
}
