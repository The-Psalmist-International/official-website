import Image from "next/image";


const moments = [
  { image: "/assets/IMG_7289.JPG", alt: "The church gathered in worship" },
  { image: "/assets/IMG_7174.JPG", alt: "A moment in the church community" },
  { image: "/assets/church-bg-2.jpg", alt: "Baptism at The Martyrs Church" },
  { image: "/assets/IMG_7234.JPG", alt: "A gathering of The Martyrs Church" },
  { image: "/assets/IMG_7178.JPG", alt: "Life together at The Martyrs Church" },
  { image: "/assets/IMG_7283.JPG", alt: "A moment from a church gathering" },
];

export default function SocialPreviewSection() {

  return (
    <section data-nav-theme="dark" aria-labelledby="social-heading" className="overflow-hidden bg-[#24132e] py-20 text-white sm:py-28">
      <div className="mx-auto mb-10 flex max-w-[1536px] flex-wrap items-end justify-between gap-8 px-6 sm:mb-14 sm:px-12">
        <div>
          <p className="mb-5 text-xs uppercase tracking-[.16em] text-[#cbb6dc]">Beyond the gathering</p>
          <h2 id="social-heading" className="max-w-[16ch] text-balance text-[clamp(2.75rem,5vw,5rem)] leading-none tracking-[-.045em]">A little closer to our world.</h2>
        </div>
        <div className="max-w-[300px]">
          <p className="text-base leading-relaxed text-white/65">Moments of worship, words of faith, and life together.</p>
        </div>
      </div>
      <div id="community-carousels" className="space-y-4">
        {[0, 1].map(row => {
          const images = row === 0 ? moments : [...moments.slice(3), ...moments.slice(0, 3)].reverse();
          return <div data-reveal-media key={row} tabIndex={0} aria-label={`Community photo carousel ${row + 1}. Focus to pause.`} className="social-marquee overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#dfcbf1]">
            <div className={`social-marquee-track flex w-max ${row === 1 ? "social-marquee-reverse" : ""}`}>
              {[0, 1].map(copy => <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex min-w-[100vw] shrink-0 gap-4 pr-4">
                {images.map((moment, index) => <div key={moment.image} className="relative h-[210px] w-[170px] shrink-0 overflow-hidden bg-white/5 sm:h-[280px] sm:w-[230px] lg:h-[320px] lg:w-[270px]">
                  <Image src={moment.image} alt={copy === 1 ? "" : moment.alt} fill sizes="(max-width: 640px) 170px, (max-width: 1024px) 230px, 270px" className="object-cover" style={{ objectPosition: index % 2 ? "center 25%" : "center" }} />
                </div>)}
              </div>)}
            </div>
          </div>;
        })}
      </div>
    </section>
  );
}