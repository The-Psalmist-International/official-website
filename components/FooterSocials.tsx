'use client';

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsLink from '@/components/cms/CmsLink';

const fallback = [
  { name: 'Instagram', href: '' },
  { name: 'TikTok', href: '' },
  { name: 'YouTube', href: 'https://www.youtube.com/@ChurchOfTheMartyrs' },
  { name: 'Facebook', href: '' },
];
const paths: Record<string, string> = {
  Instagram: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5-2h.01',
  TikTok: 'M14 3v12a4.5 4.5 0 1 1-4-4.47M14 3c.5 4 3 6 7 6',
  YouTube: 'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm6 3v8l6-4-6-4Z',
  Facebook: 'M15 21v-8h3l.5-4H15V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H8v4h3v8',
};

export default function FooterSocials() {
  const socials = useCmsCollection('socialProfiles', fallback);
  return <div className="mt-5 flex items-center gap-1" aria-label="Social media">{socials.map(social => {
    const icon = <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d={paths[social.name] || paths.Instagram} /></svg>;
    return social.href ? <CmsLink key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="flex size-10 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2">{icon}</CmsLink> : <span key={social.name} role="img" aria-label={`${social.name}: profile coming soon`} title={`${social.name}: profile coming soon`} className="flex size-10 items-center justify-center text-white/30">{icon}</span>;
  })}</div>;
}
