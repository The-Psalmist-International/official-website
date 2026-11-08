import Link from "next/link";
import { testimonies } from "@/content/testimonies";

export default function TestimoniesSection() {
  return (
    <section data-nav-theme="light" aria-labelledby="testimonies-heading" className="bg-[#f7f4fa] px-6 py-20 text-[#24132e] sm:px-12 sm:py-28">
      <div className="mx-auto max-w-[1440px]">
        <h2 id="testimonies-heading" className="mb-10 max-w-[18ch] text-balance text-[clamp(2.75rem,5vw,5rem)] font-normal leading-none tracking-[-.045em] sm:mb-14">Testaments of God&rsquo;s Goodness and Mercy</h2>
        <div className="space-y-6 sm:space-y-8">
          {testimonies.map((testimony, index) => (
            <article key={testimony.title} aria-labelledby={`testimony-${index}`} className="grid overflow-hidden bg-white md:grid-cols-2">
              <div data-reveal-media className="relative aspect-video bg-[#24132e] md:aspect-auto md:min-h-[360px]">
                {testimony.youtubeId ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${testimony.youtubeId}`}
                    title={testimony.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/60">
                    <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="size-12" stroke="currentColor" strokeWidth="1.25">
                      <path d="M6 10h36v28H6z" />
                      <path d="m20 17 11 7-11 7V17Z" />
                    </svg>
                    <p className="text-sm">Video coming soon</p>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start p-7 sm:p-10 lg:p-14">
                <h3 id={`testimony-${index}`} className="max-w-[20ch] text-balance text-[clamp(1.8rem,3vw,3.25rem)] font-normal leading-[1.08] tracking-[-.035em]">{testimony.title}</h3>
                <p className="mt-5 text-base text-[#725d80]">{testimony.program}</p>
                <div className="mt-auto pt-10">
                  {testimony.youtubeId ? (
                    <a href={`https://www.youtube.com/watch?v=${testimony.youtubeId}`} target="_blank" rel="noopener noreferrer" aria-label={`Watch full video: ${testimony.title} (opens in a new tab)`} className="wall-action relative overflow-hidden inline-flex min-h-12 items-center gap-8 bg-[#24132e] px-5 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#51335f]">
                      <span className="relative z-10">Watch full video</span> <span className="relative z-10" aria-hidden="true">&#8594;</span>
                    </a>
                  ) : (
                    <button type="button" disabled className="wall-action relative overflow-hidden inline-flex min-h-12 items-center gap-8 bg-[#eee8f2] px-5 text-sm font-medium text-[#796987] disabled:cursor-not-allowed">
                      <span className="relative z-10">Watch full video</span> <span className="relative z-10" aria-hidden="true">&#8594;</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:mt-14">
          <Link href="/testimony-wall" className="wall-action relative overflow-hidden inline-flex min-h-14 items-center gap-10 bg-[#24132e] px-7 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#51335f]">
            <span className="relative z-10">Explore all testimonies</span> <span className="relative z-10" aria-hidden="true">&#8594;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
