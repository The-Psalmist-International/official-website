import Image from "next/image";
import YouTubeStreamCard from "@/components/YouTubeStreamCard";

import ScrollRevealStatement from "@/components/ScrollRevealStatement";

import GlobalPresence from "@/components/GlobalPresence";

import PurpleParallaxSection from "@/components/PurpleParallaxSection";

import StackedSections from "@/components/StackedSections";

import MinistriesSection from "@/components/MinistriesSection";
import TestimoniesSection from "@/components/TestimoniesSection";
import SocialPreviewSection from "@/components/SocialPreviewSection";
import HomepageMotion from "@/components/HomepageMotion";
import ChurchSiteEnding from "@/components/ChurchSiteEnding";

const youtube = "https://www.youtube.com/@ChurchOfTheMartyrs";

export default function HomePage() {
  return (
    <main>
      <HomepageMotion />
      <section data-nav-theme="hero" className="relative isolate flex min-h-svh items-end overflow-hidden bg-stone-950 text-white">
        <Image src="/assets/church-bg-2.jpg" alt="Baptism at The Martyrs Church" fill priority sizes="100vw" className="-z-20 object-cover object-[center_30%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/35 to-black/20" />
        <div className="grid w-full items-end gap-12 px-6 pb-10 pt-40 sm:px-12 sm:pb-14 lg:grid-cols-[1fr_280px] lg:gap-24">
          <div className="max-w-[720px]">
            <h1 className="max-w-[12ch] text-[clamp(3rem,5.5vw,5.5rem)] font-normal leading-[.98] tracking-[-.045em]">Preparing God&rsquo;s endtime army</h1>
            <p className="mt-7 max-w-[450px] text-md leading-snug text-white/70 sm:text-lg">Church of The Martyrs is an apostolic movement raising a prophetic generation and revealing the witness of God to the nations.</p>
            <a href={youtube} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex min-h-12 items-center gap-6 bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-[#ede3fa] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Fellowship with us <span aria-hidden="true">&#8594;</span></a>
          </div>
          <YouTubeStreamCard />
        </div>
      </section>
      <ScrollRevealStatement />
      <StackedSections beneath={<GlobalPresence />} above={<PurpleParallaxSection />} />
      <MinistriesSection />
      <TestimoniesSection />
      <SocialPreviewSection />
      <ChurchSiteEnding />
    </main>
  );
}
