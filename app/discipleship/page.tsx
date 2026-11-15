import { getCmsContent } from '@/lib/cms/server';
import { resolveCollection, safeContentUrl } from '@/lib/cms/types';
import collectionFallbacks from '@/content/cms-collections.json';
import { getCmsMetadata } from '@/lib/cms/metadata';
import CmsText from '@/components/cms/CmsText';
import type { Metadata } from 'next';
import HomepageMotion from '@/components/HomepageMotion';
import ChurchSiteEnding from '@/components/ChurchSiteEnding';
import Button from '@/components/ui/Button';

const fallbackMetadata: Metadata = {
  title: 'Discipleship | The Martyrs Church',
  description: 'Grow in the Word and be equipped through discipleship at The Martyrs Church. Applications are currently closed.',
};

export default async function DiscipleshipPage() {
  const settings = resolveCollection((await getCmsContent()).collections.publishingSettings, collectionFallbacks.publishingSettings)[0];
  const registrationUrl = safeContentUrl(settings.discipleshipApplicationUrl, "");
  const applicationsOpen = settings.discipleshipApplicationsOpen && Boolean(registrationUrl);
  return <main>
    <HomepageMotion />
    <section data-nav-theme="light" aria-labelledby="discipleship-heading" className="flex min-h-[85svh] flex-col items-center justify-center bg-white px-6 pb-24 pt-48 text-center text-[#24132e] sm:px-12 sm:pb-32">
      <p className="mb-6 w-fit rounded-sm bg-[#49345f] px-3 py-2 text-xs font-medium text-white sm:text-sm">{applicationsOpen ? "Applications open" : <CmsText id="app/discipleship/page:5005c469f76c48a0" fallback="Applications closed" />}</p>
      <h1 id="discipleship-heading" className="max-w-[20ch] text-balance text-[clamp(2.5rem,5.1vw,5rem)] font-normal leading-[1.02] tracking-[-.045em]"><CmsText id="app/discipleship/page:e28035971c87f853" fallback="Discipleship at The Martyrs Church." /></h1>
      <p className="mt-6 max-w-[680px] text-base leading-relaxed text-[#49345f]/70 sm:text-lg"><CmsText id="app/discipleship/page:d2c35bc184a1e895" fallback="Grow in your understanding of the Word, deepen your walk with God, and be equipped to live out your faith through discipleship." /></p>
      <p id="discipleship-status" className="mt-4 max-w-[580px] text-sm leading-relaxed text-[#49345f]/60">{applicationsOpen ? "Applications are now open. Follow the registration link to apply for discipleship." : <CmsText id="app/discipleship/page:45dfdc51802b33f2" fallback="Registration is currently closed. Details of the next intake will be shared here when applications reopen." />}</p>
      <div className="mt-8 flex w-full max-w-[520px] flex-col justify-center gap-4 sm:flex-row">
        {applicationsOpen ? <Button href={registrationUrl} className="w-full sm:w-auto">Register for discipleship</Button> : <Button disabled aria-describedby="discipleship-status" showIcon={false} className="w-full sm:w-auto"><CmsText id="app/discipleship/page:5005c469f76c48a0-2" fallback="Applications closed" /></Button>}
        <Button href="/" variant="outline-dark" className="w-full sm:w-auto"><CmsText id="app/discipleship/page:76c5505ff2e27ef4" fallback="Back to home" /></Button>
      </div>
    </section>
    <ChurchSiteEnding />
  </main>;
}

export async function generateMetadata() { return getCmsMetadata("discipleship", fallbackMetadata); }
