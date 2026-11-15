'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from '@/components/cms/CmsLink';
import CmsText from '@/components/cms/CmsText';

interface Props {
  open: boolean;
  onClose: () => void;
  pathname: string;
  links: { label: string; href: string }[];
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export default function MobileNavigation({ open, onClose, pathname, links, triggerRef }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    if (!element) return;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 1024px)');
    const closeOnDesktop = () => { if (desktop.matches) onClose(); };
    desktop.addEventListener('change', closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open, onClose]);

  return <dialog ref={dialog} id="floating-navigation" aria-label="Navigation menu" onCancel={event => { event.preventDefault(); onClose(); }} onClose={() => { if (open) onClose(); }} style={{ borderRadius: 0 }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-white p-0 text-[#24132e] backdrop:bg-transparent">
    <motion.div initial={false} animate={{ opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : .25 }} onAnimationComplete={() => { if (!open && dialog.current?.open) { dialog.current.close(); triggerRef.current?.focus(); } }} className="flex h-full min-h-0 flex-col bg-white">
      <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-[#49345f]/10 px-6 sm:px-10">
        <Link href="/" onClick={onClose} className="text-sm font-medium tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"><CmsText id="components/FloatingNavbar:0e603afb4d23eed1" fallback="The Martyrs Church" /></Link>
        <button type="button" autoFocus onClick={onClose} aria-label="Close navigation" className="flex size-11 items-center justify-center text-[#49345f] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="m6 6 12 12M6 18 18 6" /></svg></button>
      </div>
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-8 py-10 sm:px-10" style={{ paddingBottom: 'max(40px, env(safe-area-inset-bottom))' }}>
        <nav aria-label="Mobile navigation" className="my-auto flex flex-col items-start gap-5 sm:gap-7">
          {links.map((link, index) => <motion.div key={link.href} initial={false} animate={{ opacity: open ? 1 : 0, x: reduced ? 0 : open ? 0 : -40, filter: reduced || open ? 'blur(0px)' : 'blur(4px)' }} transition={{ duration: reduced ? 0 : open ? .45 : .15, delay: reduced || !open ? 0 : index * .07, ease: [.25, 1, .5, 1] }}>
            <Link href={link.href} onClick={onClose} aria-current={pathname === link.href ? 'page' : undefined} className={`inline-flex min-h-11 items-center text-[clamp(2rem,7vw,3rem)] font-medium leading-tight tracking-[-.035em] transition-opacity hover:opacity-55 active:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-4 ${pathname === link.href ? 'text-[#75538f]' : 'text-[#24132e]'}`}>{link.label}</Link>
          </motion.div>)}
        </nav>
      </div>
    </motion.div>
  </dialog>;
}
