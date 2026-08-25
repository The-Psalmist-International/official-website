'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface Branch {
  name: string;
  address: string;
  time?: string;
}

interface Country {
  id: 'gh' | 'ca' | 'us';
  name: string;
  shortName: string;
  eyebrow: string;
  description: string;
  image: string;
  imagePosition: string;

  branches: Branch[];
}

const countries: Country[] = [
  {
    id: 'gh',
    name: 'Ghana',
    shortName: 'Ghana',
    eyebrow: 'Our home',
    description:
      'From Accra to Cape Coast, our Ghana campuses are communities of worship, discipleship, and spiritual formation.',
    image: '/assets/landmark-ghana.jpg',
    imagePosition: 'center 45%',

    branches: [
      { name: 'Accra — Dzorwulu', address: 'Christ Temple, Ring Road, Dzorwulu', time: 'Sun 9:00 AM' },
      { name: 'Accra — East Legon', address: 'Community Centre, East Legon', time: 'Sun 8:00 AM' },
      { name: 'Kumasi', address: 'Adum Central Hall, Kumasi', time: 'Sun 10:00 AM' },
      { name: 'Takoradi', address: 'Harbour Chapel, Takoradi', time: 'Sun 9:30 AM' },
      { name: 'Cape Coast', address: 'UCC Chapel, Cape Coast', time: 'Sun 8:30 AM' },
    ],
  },
  {
    id: 'ca',
    name: 'Canada',
    shortName: 'Canada',
    eyebrow: 'North America',
    description:
      'Gather with our growing Canadian church family in Toronto and Calgary for worship, fellowship, and the Word.',
    image: '/assets/landmark-canada.jpg',
    imagePosition: 'center',

    branches: [
      { name: 'Toronto, ON', address: '2 Bloor St W, Toronto, Ontario', time: 'Sun 10:30 AM' },
      { name: 'Calgary, AB', address: '100 Centre St S, Calgary, Alberta', time: 'Sun 9:00 AM' },
    ],
  },
  {
    id: 'us',
    name: 'United States',
    shortName: 'USA',
    eyebrow: 'North America',
    description:
      'Find a Church of The Martyrs community in New York, Houston, or Washington D.C. and worship with us this Sunday.',
    image: '/assets/landmark-usa.jpg',
    imagePosition: 'center 38%',

    branches: [
      { name: 'New York City', address: '150 W 46th St, Manhattan, NY', time: 'Sun 11:00 AM' },
      { name: 'Houston, TX', address: '3800 Southwest Fwy, Houston, TX', time: 'Sun 10:00 AM' },
      { name: 'Washington D.C.', address: '1700 Rhode Island Ave NW, DC', time: 'Sun 9:00 AM' },
    ],
  },
];

export default function LocationsSection() {
  const [activeCountryId, setActiveCountryId] = useState<Country['id']>('gh');

  return (
    <section
      aria-labelledby="locations-heading"
      className="w-full overflow-hidden bg-[#f8f6f2] px-4 py-20 text-[#2b0835] sm:px-6 sm:py-24 lg:px-8 lg:py-28 font-['Stack_Sans_Headline',sans-serif]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex flex-col justify-between gap-5 md:mb-14 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a3688]">
              Our reach
            </p>
            <h2
              id="locations-heading"
              className="text-balance text-4xl font-medium leading-none tracking-[-0.045em] sm:text-5xl lg:text-6xl"
            >
              One church, across nations
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base font-light leading-relaxed text-stone-500 sm:text-lg">
            Select a country to discover our campuses and weekly gatherings.
          </p>
        </div>

        <div className="flex min-h-[680px] flex-col gap-3 md:h-[620px] md:min-h-0 md:flex-row lg:h-[650px]">
          {countries.map((country) => {
            const isActive = country.id === activeCountryId;

            return (
              <motion.button
                layout
                key={country.id}
                type="button"
                onClick={() => setActiveCountryId(country.id)}
                aria-expanded={isActive}
                aria-label={`${country.name}: ${country.branches.length} campus locations`}
                transition={{ type: 'spring', duration: 0.55, bounce: 0 }}
                className={`group relative min-h-[150px] overflow-hidden rounded-2xl text-left shadow-[0_12px_45px_rgba(43,8,53,0.08)] outline-none transition-[flex-grow,height,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:ring-2 focus-visible:ring-[#7a3688] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f8f6f2] active:scale-[0.99] md:h-full md:min-w-0 ${
                  isActive
                    ? 'h-[520px] flex-[3.4] md:h-full'
                    : 'h-[150px] flex-1 md:h-full'
                }`}
              >
                <Image
                  src={country.image}
                  alt=""
                  fill
                  sizes={isActive ? '(max-width: 768px) 100vw, 65vw' : '(max-width: 768px) 100vw, 22vw'}
                  className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    isActive ? 'scale-100' : 'scale-105 group-hover:scale-[1.02]'
                  }`}
                  style={{ objectPosition: country.imagePosition }}
                />

                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive
                      ? 'bg-[linear-gradient(180deg,rgba(20,4,24,0.42)_0%,rgba(20,4,24,0.02)_46%,rgba(20,4,24,0.48)_100%)]'
                      : 'bg-[linear-gradient(180deg,rgba(20,4,24,0.6)_0%,rgba(20,4,24,0.18)_100%)]'
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]" />

                <div className="absolute left-0 right-0 top-0 z-10 flex items-start justify-between p-6 sm:p-7">
                  <div>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
                      {country.eyebrow}
                    </p>
                    <h3 className="max-w-[8ch] text-2xl font-medium leading-[1.05] tracking-[-0.035em] text-white sm:text-[28px]">
                      {isActive ? country.name : country.shortName}
                    </h3>
                  </div>
                  <span
                    className={`flex size-10 items-center justify-center rounded-full border border-white/25 bg-black/10 text-white backdrop-blur-md transition-transform duration-500 ${
                      isActive ? 'rotate-45' : 'rotate-0'
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key={`details-${country.id}`}
                      initial={{ opacity: 0, transform: 'translateY(18px)' }}
                      animate={{ opacity: 1, transform: 'translateY(0px)' }}
                      exit={{ opacity: 0, transform: 'translateY(10px)' }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="absolute bottom-4 left-4 right-4 z-10 rounded-xl bg-white p-5 text-[#2b0835] shadow-[0_14px_40px_rgba(20,4,24,0.2)] sm:bottom-6 sm:left-6 sm:right-6 sm:rounded-2xl sm:p-6"
                    >
                      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                        <div className="max-w-2xl">
                          <div className="mb-3 flex items-center gap-3">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f1e7f3] text-[#6c2a7b]">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 21s6-4.35 6-11a6 6 0 1 0-12 0c0 6.65 6 11 6 11Z" />
                                <circle cx="12" cy="10" r="2" />
                              </svg>
                            </span>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7a3688]">
                              {country.branches.length} campus{country.branches.length === 1 ? '' : 'es'}
                            </p>
                          </div>
                          <p className="text-pretty text-sm leading-relaxed text-stone-600 sm:text-base">
                            {country.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 lg:max-w-[46%] lg:justify-end">
                          {country.branches.map((branch) => (
                            <span
                              key={branch.name}
                              className="rounded-full bg-[#f5f1f5] px-3 py-1.5 text-[11px] font-medium text-[#5b2667] sm:text-xs"
                              title={`${branch.address}${branch.time ? ` · ${branch.time}` : ''}`}
                            >
                              {branch.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
