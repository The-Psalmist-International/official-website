import { getCmsMetadata } from '@/lib/cms/metadata';
import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import type { Metadata } from 'next';
import Image from '@/components/cms/CmsImage';
import ContactForm from '@/components/ContactForm';
import HomepageMotion from '@/components/HomepageMotion';
import ChurchSiteEnding from '@/components/ChurchSiteEnding';
import { isContactDeliveryConfigured } from '@/lib/contact';

export const revalidate = 300;
const fallbackMetadata: Metadata = {
  title: 'Contact | The Martyrs Church',
  description: 'Find The Martyrs Church in Accra, get directions, call us, or make an enquiry.',
};

const directions = 'https://share.google/ONIqoMH5HO69gJyGj';
const mapQuery = encodeURIComponent('Church of the Martyrs Mountain of Light Auditorium Adjiringanor East Legon Accra Ghana');

export default function ContactPage() {
  return <main>
    <HomepageMotion />
    <section data-nav-theme="light" aria-labelledby="contact-heading" className="bg-white px-6 pb-20 pt-44 text-[#24132e] sm:px-12 sm:pb-28 lg:px-20">
      <div className="mx-auto grid max-w-[1280px] items-start gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-24">
        <div>
          <h1 id="contact-heading" className="max-w-[16ch] text-balance text-[clamp(2.5rem,4vw,3.75rem)] font-normal leading-[1.06] tracking-[-.045em]"><CmsText id="app/contact/page:300b663cde291133" fallback="We'd love to hear from you." /></h1>
          <p className="mt-6 max-w-[460px] text-base leading-relaxed text-[#49345f]/65"><CmsText id="app/contact/page:254bcfc6ba0fd88a" fallback="Planning a visit, looking for a community, or have a question? Get in touch with The Martyrs Church." /></p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2">
            <div className="flex gap-3"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-1 size-5 shrink-0 text-[#75538f]/60"><path d="M5 3h4l2 5-3 2a15 15 0 0 0 6 6l2-3 5 2v4c0 2-3 3-5 2A21 21 0 0 1 3 8c-1-2 0-5 2-5Z" /></svg><div><h2 className="text-sm font-medium"><CmsText id="app/contact/page:1b1771176dcd4379" fallback="Call the church" /></h2><CmsLink href="tel:+233509081558" className="mt-1 inline-flex min-h-8 items-center text-sm text-[#49345f]/65 hover:underline focus-visible:outline-2"><CmsText id={"app/contact/page:5d994f039420afb2"} fallback={"+233 50 908 1558"} /></CmsLink></div></div>
            <div className="flex gap-3"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-1 size-5 shrink-0 text-[#75538f]/60"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg><div><h2 className="text-sm font-medium"><CmsText id="app/contact/page:7c01795782fe2bc4" fallback="Opening hours" /></h2><p className="mt-2 text-sm text-[#49345f]/65"><CmsText id="app/contact/page:ed1d53de835bf592" fallback="Open daily, 24 hours" /></p></div></div>
          </div>
          <div className="mt-7 flex gap-3 border-t border-[#49345f]/10 pt-6"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-1 size-5 shrink-0 text-[#75538f]/60"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg><div><address className="text-sm not-italic leading-relaxed"><CmsText id="app/contact/page:74479df5201f9d72" fallback="Adjiringanor–East Legon / Madina," /><br /><CmsText id="app/contact/page:dde3e355e75b87d5" fallback="Accra, Ghana" /></address><CmsLink href={directions} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-9 items-center gap-4 text-sm text-[#49345f]/65 underline underline-offset-4 focus-visible:outline-2"><CmsText id="app/contact/page:ae9652aaccaddf0a" fallback="Get directions " /><span aria-hidden="true">&#8599;</span></CmsLink></div></div>
          <div data-reveal-media className="relative mt-8 aspect-[4/3] overflow-hidden rounded-lg bg-stone-100"><Image src="/assets/church-bg-2.jpg" alt="The Martyrs Church gathered in worship" fill sizes="(max-width: 1023px) 90vw, 550px" className="object-cover" /></div>
          <div className="mt-7"><p className="text-sm leading-relaxed text-[#49345f]/65"><CmsText id="app/contact/page:6efa7eff9b8fdc36" fallback="For updates, announcements, and services, " /><CmsLink href="https://www.youtube.com/@ChurchOfTheMartyrs" target="_blank" rel="noopener noreferrer" className="text-[#49345f] underline underline-offset-4"><CmsText id="app/contact/page:e8d499197f1b4b61" fallback="follow the church on YouTube" /></CmsLink>.</p></div>
        </div>
        <div aria-label="Enquiry form"><ContactForm enabled={isContactDeliveryConfigured()} /></div>
      </div>
      <div className="mx-auto mt-16 max-w-[1280px] border-t border-[#49345f]/10 pt-10 sm:mt-20"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><h2 className="text-2xl tracking-tight"><CmsText id="app/contact/page:92d969094f6366f3" fallback="Find your way here." /></h2><p className="text-sm text-[#49345f]/60"><CmsText id="app/contact/page:8b8ada6f8ae374f7" fallback="Need help finding the auditorium? " /><CmsLink href="tel:+233509081558" className="underline underline-offset-4"><CmsText id="app/contact/page:35563c1ffad3e5ce" fallback="Give us a call." /></CmsLink></p></div><div className="overflow-hidden rounded-lg bg-stone-100"><iframe src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`} title="Google map showing The Martyrs Church in Accra" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="h-[340px] w-full border-0 sm:h-[420px]" /></div></div>
    </section>
    <ChurchSiteEnding />
  </main>;
}

export async function generateMetadata() { return getCmsMetadata("contact", fallbackMetadata); }
