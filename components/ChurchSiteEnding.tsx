import FooterSocials from '@/components/FooterSocials';
import { getCmsContent } from '@/lib/cms/server';
import { resolveCollection } from '@/lib/cms/types';
import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import Link from '@/components/cms/CmsLink';
import Button from '@/components/ui/Button';

const fallbackquickLinks = [
  { label: 'About the church', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Missions', href: '/missions' },
  { label: 'Discipleship', href: '/discipleship' },
  { label: 'Resources', href: '/resources' },
  { label: 'Leadership', href: '/about-us#leadership' },
  { label: 'The testimony wall', href: '/testimony-wall' },
];

export default async function ChurchSiteEnding() {
  const quickLinks = resolveCollection((await getCmsContent()).collections["footerLinks"], fallbackquickLinks);
  return <footer data-nav-theme="dark" aria-label="Church footer" className="bg-[#24132e] px-6 text-white sm:px-12 lg:px-20">
    <div className="mx-auto max-w-[1280px]">
      <section aria-labelledby="closing-heading" className="flex flex-col items-center border-b border-white/15 py-20 text-center sm:py-28">
        <h2 id="closing-heading" className="max-w-[18ch] text-balance text-[clamp(2.75rem,5vw,5rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="components/ChurchSiteEnding:a28162df04f8c19e" fallback="Partner with us." /></h2>
        <p className="mt-6 max-w-[660px] text-base leading-relaxed text-white/70 sm:text-lg"><CmsText id="components/ChurchSiteEnding:cd42de8d778ff388" fallback="Help carry the gospel further. Partner with The Martyrs Church as we raise a prophetic generation and reveal the witness of God to the nations." /></p>
        <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button disabled title="Partnership details coming soon" className="w-full sm:w-auto" variant="primary"><CmsText id="components/ChurchSiteEnding:eded8902f15c92e4" fallback="Partner with us" /></Button>
          <Button href="/contact" variant="secondary" className="w-full sm:w-auto"><CmsText id="components/ChurchSiteEnding:115e410f01dc4013" fallback="Get in touch" /></Button>
        </div>
      </section>
      <div className="grid gap-10 py-16 sm:grid-cols-2 sm:py-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12">
        <div><Link href="/" className="text-2xl tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/ChurchSiteEnding:0e603afb4d23eed1" fallback="The Martyrs Church" /></Link><p className="mt-5 max-w-[290px] text-sm leading-relaxed text-white/65"><CmsText id="components/ChurchSiteEnding:a1f4e4ec5bd29b99" fallback="An apostolic movement raising a prophetic generation and revealing the witness of God to the nations." /></p><FooterSocials /></div>
        <nav aria-label="Footer navigation"><h2 className="mb-5 text-sm font-normal text-white/45"><CmsText id="components/ChurchSiteEnding:3cbfe44ebc2194d2" fallback="Quick links" /></h2><ul className="space-y-3">{quickLinks.map(link => <li key={link.href}><Link href={link.href} className="inline-flex min-h-7 items-center text-sm text-white/85 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{link.label}</Link></li>)}</ul></nav>
        <div><h2 className="mb-5 text-sm font-normal text-white/45"><CmsText id="components/ChurchSiteEnding:115e410f01dc4013-2" fallback="Get in touch" /></h2><CmsLink href="tel:+233509081558" className="inline-flex min-h-7 items-center text-sm text-white/85 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id={"components/ChurchSiteEnding:5d994f039420afb2"} fallback={"+233 50 908 1558"} /></CmsLink><Link href="/contact" className="mt-3 flex min-h-7 w-fit items-center text-sm text-white/85 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/ChurchSiteEnding:4d7c144d408933d6" fallback="Send an enquiry ↗" /></Link></div>
        <div><h2 className="mb-5 text-sm font-normal text-white/45"><CmsText id="components/ChurchSiteEnding:15b61974b2707a7b" fallback="Location" /></h2><address className="text-sm not-italic leading-relaxed text-white/85"><CmsText id="components/ChurchSiteEnding:74479df5201f9d72" fallback="Adjiringanor–East Legon / Madina," /><br /><CmsText id="components/ChurchSiteEnding:dde3e355e75b87d5" fallback="Accra, Ghana" /></address><p className="mt-4 text-sm text-white/65"><CmsText id="components/ChurchSiteEnding:ed1d53de835bf592" fallback="Open daily, 24 hours" /></p><CmsLink href="https://share.google/ONIqoMH5HO69gJyGj" target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-7 items-center text-sm text-white/85 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/ChurchSiteEnding:108acb501cfe7c73" fallback="Get directions ↗" /></CmsLink></div>
      </div>
      <div className="flex flex-col gap-6 border-t border-white/15 py-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between"><p>&copy; {new Date().getFullYear()}<CmsText id="components/ChurchSiteEnding:0e603afb4d23eed1-2" fallback="The Martyrs Church" /></p><div className="flex flex-wrap items-center gap-5"><Link href="/privacy-policy" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/ChurchSiteEnding:ba445cff3898a3f2" fallback="Privacy policy" /></Link><Link href="/terms-and-conditions" className="hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/ChurchSiteEnding:b9b8461b32dad59d" fallback="Terms & conditions" /></Link></div><p><CmsText id="components/ChurchSiteEnding:ab877d08d3ca8c23" fallback="Powered by the Mystic Engineering Team." /></p></div>
    </div>
  </footer>;
}
