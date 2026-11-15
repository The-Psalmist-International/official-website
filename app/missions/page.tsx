import { getCmsMetadata } from '@/lib/cms/metadata';
import { getCmsContent } from '@/lib/cms/server';
import { resolveCollection } from '@/lib/cms/types';
import CmsText from '@/components/cms/CmsText';
import type { Metadata } from 'next';
import Image from '@/components/cms/CmsImage';
import ChurchSiteEnding from '@/components/ChurchSiteEnding';
import HomepageMotion from '@/components/HomepageMotion';
import MissionsSupportButton from '@/components/MissionsSupportButton';
import MissionsImpact from '@/components/MissionsImpact';
import MissionsJoinButton from '@/components/MissionsJoinButton';
import MissionsGallery from '@/components/MissionsGallery';
import { missionActivities as fallbackmissionActivities } from '@/content/missions';

const fallbackMetadata: Metadata = {
  title: 'Missions | The Martyrs Church',
  description: 'A vision for the nations: discipling believers, raising leaders, and carrying the witness of Christ.',
};

export default async function MissionsPage() {
  const missionActivities = resolveCollection((await getCmsContent()).collections["missionActivities"], fallbackmissionActivities);
  return <main>
    <HomepageMotion />
    <section data-nav-theme="light" aria-labelledby="missions-title" className="bg-white px-6 pb-12 pt-48 text-[#24132e] sm:px-12 sm:pb-16 lg:px-20">
      <div className="mx-auto w-full max-w-[1160px]">

        <h1 id="missions-title" className="max-w-[17ch] text-balance text-[clamp(2.5rem,5.1vw,5rem)] font-normal leading-[1.02] tracking-[-.045em]"><CmsText id="app/missions/page:53d6141920e6661d" fallback="A vision for the nations." /></h1>
        <p className="mt-7 max-w-[490px] text-base leading-relaxed text-[#49345f]/75 sm:text-lg"><CmsText id="app/missions/page:aa670f39d521df25" fallback="To disciple believers, raise leaders, and establish God's influence across every sphere of life." /></p>
        <MissionsSupportButton />
        <div className="relative mb-8 mt-12 min-h-[440px] sm:mt-16 sm:min-h-[480px] lg:aspect-[2/1]">
          <div className="absolute inset-0 overflow-hidden rounded-2xl bg-[#eee5f6]">
            <Image src="/assets/church-bg-2.jpg" alt="The church gathered in worship" fill priority sizes="(max-width: 1279px) 90vw, 1160px" className="object-cover" />
          </div>
          <MissionsImpact />
        </div>
      </div>
    </section>

    <section id="our-mission" data-nav-theme="light" aria-labelledby="mission-heading" className="scroll-mt-40 bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">
          <div><h2 id="mission-heading" className="max-w-[17ch] text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="app/missions/page:708451645cd401ad" fallback="The Great Commission." /></h2></div>
          <blockquote className="max-w-[480px] self-end">
            <p className="text-lg leading-relaxed text-[#49345f]/75"><CmsText id="app/missions/page:daa96f42ca9ba61d" fallback="“Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.”" /></p>
            <p className="mt-4 text-xs uppercase tracking-[.12em] text-[#75538f]"><cite className="not-italic"><CmsText id="app/missions/page:2a0eb55c387d37c1" fallback="Matthew 28:19–20 (KJV)" /></cite></p>
          </blockquote>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {missionActivities.map(item => <article key={item.title} className="site-card group relative isolate flex min-h-[380px] items-end overflow-hidden rounded-2xl bg-[#24132e] p-6 text-white sm:min-h-[420px]">
            <Image src={item.image} alt="" fill sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 280px" className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-[#24132e]/95 via-[#24132e]/35 to-[#24132e]/10" />
            <div><h3 className="text-2xl tracking-tight">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/80">{item.description}</p></div>
          </article>)}
        </div>
        <MissionsJoinButton />
      </div>
    </section>
    <section data-nav-theme="light" aria-labelledby="upcoming-outreach-heading" className="bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto grid max-w-[1160px] gap-10 md:grid-cols-2 md:gap-16">
        <div><h2 id="upcoming-outreach-heading" className="text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="app/missions/page:ced8def7d102621e" fallback="Upcoming outreach." /></h2><p className="mt-6 max-w-[420px] text-base leading-relaxed text-[#49345f]/70"><CmsText id="app/missions/page:fb3cdfe630d14f2c" fallback="Our next outreach will be announced here. Check back for the date, location, and ways to take part." /></p></div>
        <article className="site-card rounded-2xl bg-[#eee5f6] p-7 sm:p-9"><h3 className="text-3xl tracking-tight"><CmsText id="app/missions/page:5b05c5a5a0f6804d" fallback="The next mission." /></h3><dl className="mt-8 grid gap-5 border-t border-[#49345f]/15 pt-6 sm:grid-cols-2"><div><dt className="text-xs text-[#75538f]"><CmsText id="app/missions/page:99c40ab405926cb5" fallback="Date" /></dt><dd className="mt-2 text-base"><CmsText id="app/missions/page:934363fbc2f80ebe" fallback="To be announced" /></dd></div><div><dt className="text-xs text-[#75538f]"><CmsText id="app/missions/page:15b61974b2707a7b" fallback="Location" /></dt><dd className="mt-2 text-base"><CmsText id="app/missions/page:934363fbc2f80ebe-2" fallback="To be announced" /></dd></div></dl></article>
      </div>
    </section>
    <MissionsGallery />
    <ChurchSiteEnding />
  </main>;
}

export async function generateMetadata() { return getCmsMetadata("missions", fallbackMetadata); }
