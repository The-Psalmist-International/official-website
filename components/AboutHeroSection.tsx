"use client";

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import Image from '@/components/cms/CmsImage';
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const fallbackphotos = [
  { src: "IMG_7289.JPG", alt: "Our church gathered in worship" },
  { src: "IMG_7172.JPG", alt: "Discipleship in our community" },
  { src: "IMG_6744.JPG", alt: "Prayer at The Martyrs Church" },
  { src: "IMG_7234.JPG", alt: "Our church family gathered together" },
];
export default function AboutHeroSection() {
  const photos = useCmsCollection("aboutPhotos", fallbackphotos);
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  return <section ref={root} id="mandate" data-nav-theme="light" aria-labelledby="mandate-heading" className="mandate-hero relative isolate overflow-hidden bg-white px-6 text-[#24132e] sm:px-12">
    <div className="relative mx-auto flex min-h-svh max-w-[1440px] items-center justify-center pb-16 pt-48 lg:pb-28 lg:pt-44">
      <div className="mandate-photos">{photos.map((photo, index) => <motion.div style={reduced ? undefined : { y: photoY }} key={photo.src} className={`mandate-photo mandate-photo-${index}`}><Image src={photo.src.startsWith("http") ? photo.src : `/assets/${photo.src}`} alt={photo.alt} fill sizes="(max-width: 767px) 22vw, (max-width: 1023px) 140px, 220px" priority={index < 2} className="object-cover" /></motion.div>)}</div>
      <div className="mandate-copy relative z-10 mx-auto max-w-[720px] text-center">

        <h1 id="mandate-heading" className="text-balance text-[clamp(2.5rem,5.1vw,5rem)] font-normal leading-[1.02] tracking-[-.045em]"><CmsText id="components/AboutHeroSection:54809a0bce3825b3" fallback="We exist to bring the complete witness of God to the nations." /></h1>
        <p className="mx-auto mt-7 max-w-[470px] text-base leading-relaxed text-[#24132e]/65 sm:text-lg"><CmsText id="components/AboutHeroSection:573c063bdfd56c82" fallback="Training men and women into experiential knowledge of God. Discipling believers into a full understanding of their divine purpose." /></p>
        <CmsLink href="#vision-mission" className="site-button mt-8 inline-flex min-h-12 items-center bg-[#49345f] px-6 text-sm font-medium text-white transition-colors hover:bg-[#75538f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f]"><CmsText id="components/AboutHeroSection:1445799c033a2d17" fallback="Learn more" /></CmsLink>
      </div>
    </div>
  </section>;
}
