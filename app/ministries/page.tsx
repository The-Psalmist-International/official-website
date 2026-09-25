import type { Metadata } from 'next';
import Image from 'next/image';
import { ministries } from '@/data/ministries';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Ministries | The Martyrs Church',
  description: 'Discover the ministries of The Martyrs Church and find a community where you can serve, grow, and belong.',
};

export default function MinistriesPage() {
  return (
    <main className="min-h-screen bg-[#f8f6f2] text-[#2b0835]">
      <section className="px-4 pb-28 pt-40 sm:px-6 sm:pb-36 sm:pt-48 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7028a8]">
            Ministries
          </p>
          <h1 className="max-w-[13ch] text-balance text-5xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[88px]">
            Many expressions, one complete witness
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-7 md:flex-row md:items-start">
            <p className="max-w-2xl text-pretty text-base font-light leading-relaxed text-stone-600 sm:text-lg">
              Every ministry is a place to be formed, use your gifts, and participate in what God is building through His church.
            </p>
            <Button href="/connect">Find your ministry</Button>
          </div>

          <div className="relative mt-16 w-full overflow-hidden py-8">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#f8f6f2] to-transparent sm:w-32" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#f8f6f2] to-transparent sm:w-32" />
            
            <div className="flex w-max animate-marquee items-center gap-16 pr-16 sm:gap-24 sm:pr-24">
              {[...ministries, ...ministries].map((ministry, idx) => (
                <a
                  key={`${ministry.id}-${idx}`}
                  href={`#${ministry.id}`}
                  className="shrink-0 text-2xl font-bold tracking-tight text-[#2b0835]/30 transition-[color,transform] duration-300 hover:scale-105 hover:text-[#7028a8] sm:text-3xl lg:text-4xl"
                >
                  {ministry.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] space-y-4 px-4 pb-24 sm:space-y-6 sm:px-6 lg:px-8 lg:pb-32">
        {ministries.map((ministry, index) => (
          <section
            id={ministry.id}
            key={ministry.id}
            className="scroll-mt-24 overflow-hidden rounded-lg shadow-[0_16px_50px_rgba(43,8,53,0.08)] lg:grid lg:min-h-[620px] lg:grid-cols-2"
          >
            <div className={`relative min-h-[420px] bg-stone-200 lg:min-h-0 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <Image
                src={ministry.image}
                alt={`${ministry.name} ministry community`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]" />
            </div>

            <div
              className={`relative flex min-h-[500px] flex-col justify-between overflow-hidden p-7 sm:p-10 lg:min-h-0 lg:p-14 ${index % 2 === 1 ? 'lg:order-1' : ''}`}
              style={{ backgroundColor: ministry.background, color: ministry.foreground }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(${ministry.accent} 1px, transparent 1px)`,
                  backgroundSize: '22px 22px',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <p className="mb-12 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: ministry.accent }}>
                  {String(index + 1).padStart(2, '0')} · {ministry.eyebrow}
                </p>
                <h2 className="max-w-[10ch] text-balance text-5xl font-normal leading-[0.98] tracking-[-0.05em] sm:text-6xl">
                  {ministry.name}
                </h2>
                <p className="mt-7 max-w-[20ch] text-balance text-2xl font-normal leading-tight opacity-95 sm:text-3xl">
                  {ministry.summary}
                </p>
                <p className="mt-6 max-w-lg text-pretty text-base font-light leading-relaxed opacity-70 sm:text-lg">
                  {ministry.description}
                </p>
              </div>

              <Button href="/connect" variant="secondary" className="relative z-10 mt-12">
                Join this ministry
              </Button>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
