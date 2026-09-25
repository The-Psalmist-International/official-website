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
      <section className="px-4 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7028a8]">
            Ministries
          </p>
          <h1 className="max-w-[13ch] text-balance text-5xl font-medium leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-[88px]">
            Many expressions, one complete witness
          </h1>
          <div className="mt-8 flex flex-col justify-between gap-7 border-t border-[#2b0835]/15 pt-7 md:flex-row md:items-start">
            <p className="max-w-2xl text-pretty text-lg font-light leading-relaxed text-stone-600 sm:text-xl">
              Every ministry is a place to be formed, use your gifts, and participate in what God is building through His church.
            </p>
            <Button href="/connect">Find your ministry</Button>
          </div>

          <nav aria-label="Ministry sections" className="mt-12 flex gap-2 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
            {ministries.map((ministry) => (
              <a
                key={ministry.id}
                href={`#${ministry.id}`}
                className="inline-flex min-h-10 shrink-0 items-center rounded-lg border border-[#2b0835]/15 bg-white px-4 text-xs font-medium text-[#2b0835] transition-[background-color,color,border-color,transform] duration-200 hover:border-[#7028a8]/30 hover:bg-[#f2e7f4] active:scale-[0.96]"
              >
                {ministry.name}
              </a>
            ))}
          </nav>
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
