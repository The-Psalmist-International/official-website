import CmsText from '@/components/cms/CmsText';
import HomepageMotion from '@/components/HomepageMotion';
import ChurchSiteEnding from '@/components/ChurchSiteEnding';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return <main><HomepageMotion /><section data-nav-theme="light" aria-labelledby="not-found-heading" className="flex min-h-[85svh] flex-col items-center justify-center bg-white px-6 pb-24 pt-48 text-center text-[#24132e]">
    <p aria-hidden="true" className="mb-5 text-[clamp(6rem,16vw,12rem)] leading-none tracking-[-.08em] text-[#dfcbf1]"><CmsText id={"app/not-found:6b3c238ebcf1f3c0"} fallback={"404"} /></p>
    <h1 id="not-found-heading" className="max-w-[20ch] text-balance text-[clamp(2.5rem,5.1vw,5rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="app/not-found:b6662d284a8fdbfb" fallback="This page couldn't be found." /></h1>
    <p className="mt-6 max-w-[440px] text-base leading-relaxed text-[#49345f]/85"><CmsText id="app/not-found:520a3b4640551bd0" fallback="The page may have moved, or the link may be out of date. Let's help you find your way." /></p>
    <div className="mt-8 flex flex-wrap justify-center gap-4"><Button href="/"><CmsText id="app/not-found:76c5505ff2e27ef4" fallback="Back to home" /></Button><Button href="/contact" variant="outline-dark"><CmsText id="app/not-found:47aaf31b83d6bfd7" fallback="Contact us" /></Button></div>
  </section><ChurchSiteEnding /></main>;
}
