'use client';

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import Image from '@/components/cms/CmsImage';
import { useRef, useState } from 'react';

// Existing church photographs preview the gallery until mission images are supplied.
const fallbackimages = ['/assets/church-bg-1.jpg', '/assets/church-bg-2.jpg', '/assets/church-bg-3.jpg', '/assets/church-bg-4.jpg'];

export default function MissionsGallery() {
  const images = useCmsCollection("missionGallery", fallbackimages);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [photo, setPhoto] = useState<{ src: string; title: string } | null>(null);

  function open(src: string, title: string) {
    trigger.current = document.activeElement as HTMLElement;
    setPhoto({ src, title });
    dialog.current?.showModal();
  }

  return <section data-nav-theme="light" aria-labelledby="past-missions-heading" className="bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
    <div className="mx-auto max-w-[1160px]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><h2 id="past-missions-heading" className="text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="components/MissionsGallery:972fd5d8ac5e7ec2" fallback="Gallery." /></h2><p className="text-sm text-[#49345f]/60"><CmsText id="components/MissionsGallery:0c1e4ce8b05f196e" fallback="Church photo previews. Mission photographs coming soon." /></p></div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {images.map((src, index) => <button key={src} type="button" aria-label={`Open gallery photo ${index + 1}`} aria-haspopup="dialog" onClick={() => open(src, `Gallery / Photo ${index + 1}`)} className={`site-card group relative overflow-hidden rounded-2xl bg-[#eee5f6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f] ${index === 0 || index === 3 ? 'col-span-2 aspect-[16/9]' : 'aspect-[4/5] lg:aspect-auto'}`}>
          <Image src={src} alt="Church photograph used as a gallery preview" fill sizes="(max-width: 1023px) 90vw, 760px" className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none" /><span aria-hidden="true" className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-lg bg-white/90 text-[#49345f]">&#8599;</span>
        </button>)}
      </div>
    </div>
    <dialog ref={dialog} aria-labelledby="mission-photo-title" onClose={() => { setPhoto(null); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="fixed inset-0 m-auto max-h-[92svh] w-[calc(100%-24px)] max-w-5xl overflow-y-auto rounded-2xl border-0 bg-white p-4 text-[#24132e] shadow-xl backdrop:bg-[#24132e]/80 sm:p-6">
      {photo && <><div className="mb-4 flex items-center justify-between gap-4"><h2 id="mission-photo-title" className="text-base font-medium">{photo.title}</h2><button type="button" autoFocus aria-label="Close photograph" onClick={() => dialog.current?.close()} className="site-button flex size-11 shrink-0 items-center justify-center bg-[#eee5f6] text-2xl hover:bg-[#dfcbf1] focus-visible:outline-2">&#215;</button></div><div className="relative h-[65svh]"><Image src={photo.src} alt="Church photograph used as a gallery preview" fill sizes="90vw" className="object-contain" /></div></>}
    </dialog>
  </section>;
}
