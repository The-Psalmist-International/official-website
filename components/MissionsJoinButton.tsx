'use client';

import CmsText from '@/components/cms/CmsText';
import { useRef } from 'react';

export default function MissionsJoinButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <button ref={trigger} type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()} className="site-button mt-10 inline-flex min-h-12 items-center gap-6 bg-[#49345f] px-5 text-sm font-medium text-white transition-colors hover:bg-[#24132e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f]"><CmsText id="components/MissionsJoinButton:5e21cf464514617c" fallback="Join the missions team " /><span aria-hidden="true">&#8594;</span></button>
    <dialog ref={dialog} aria-labelledby="missions-join-title" aria-describedby="missions-join-description" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-7 text-[#24132e] shadow-xl backdrop:bg-[#24132e]/65 sm:p-9">
      <div className="flex items-start justify-between gap-5"><h2 id="missions-join-title" className="max-w-[16ch] text-3xl leading-tight tracking-tight"><CmsText id="components/MissionsJoinButton:24daf99b6fcbea00" fallback="Join the missions team" /></h2><button type="button" autoFocus aria-label="Close joining modal" onClick={() => dialog.current?.close()} className="site-button flex size-11 shrink-0 items-center justify-center bg-[#eee5f6] text-2xl hover:bg-[#dfcbf1] focus-visible:outline-2 focus-visible:outline-offset-2">&#215;</button></div>
      <p id="missions-join-description" className="mt-6 text-base leading-relaxed text-[#49345f]/75"><CmsText id="components/MissionsJoinButton:f383bb81fd7e49f9" fallback="Details on joining the missions team will be available here soon." /></p>
    </dialog>
  </>;
}
