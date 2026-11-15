'use client';

import CmsText from '@/components/cms/CmsText';
import { useRef } from 'react';

export default function MissionsSupportButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  return <>
    <button ref={trigger} type="button" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" className="site-button mt-8 inline-flex min-h-12 items-center gap-6 bg-[#dfcbf1] px-5 text-sm font-medium text-[#24132e] transition-colors hover:bg-[#e8d9f4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#75538f]"><CmsText id="components/MissionsSupportButton:d2618c47d8e17759" fallback="Support the missions team " /><span aria-hidden="true">&#8599;</span></button>
    <dialog ref={dialog} aria-labelledby="missions-support-title" aria-describedby="missions-support-description" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-32px)] max-w-lg overflow-y-auto rounded-2xl border-0 bg-white p-7 text-[#24132e] shadow-xl backdrop:bg-[#24132e]/65 sm:p-9">
      <div className="flex items-start justify-between gap-5">
        <h2 id="missions-support-title" className="max-w-[16ch] text-3xl leading-tight tracking-tight"><CmsText id="components/MissionsSupportButton:572b770c532d717a" fallback="Support the missions team" /></h2>
        <button type="button" autoFocus aria-label="Close support modal" onClick={() => dialog.current?.close()} className="site-button flex size-11 shrink-0 items-center justify-center bg-[#eee5f6] text-2xl transition-colors hover:bg-[#dfcbf1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75538f]">&#215;</button>
      </div>
      <p id="missions-support-description" className="mt-6 text-base leading-relaxed text-[#49345f]/75"><CmsText id="components/MissionsSupportButton:f1effce9c3206950" fallback="Details on how to support the missions team will be available here soon." /></p>
    </dialog>
  </>;
}
