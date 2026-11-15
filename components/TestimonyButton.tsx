"use client";
import CmsText from '@/components/cms/CmsText';
import { useRef } from "react";
import * as Select from "@radix-ui/react-select";

export default function TestimonyButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const field = "mt-2 w-full border border-black/20 bg-white p-3 text-base outline-offset-4 focus:outline-[#75538f]";
  return <>
    <button type="button" onClick={() => dialog.current?.showModal()} className="site-button mt-9 inline-flex min-h-12 items-center gap-6 border border-white/50 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"><CmsText id="components/TestimonyButton:f5a2d0a9ce41c3da" fallback="Share a testimony " /><span aria-hidden="true">&#8599;</span></button>
    <dialog ref={dialog} aria-labelledby="testimony-title" className="fixed inset-0 m-auto max-h-[90svh] w-[calc(100%-32px)] max-w-xl overflow-y-auto bg-white p-6 text-black backdrop:bg-black/65 sm:p-9" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="flex items-start justify-between gap-4"><h2 id="testimony-title" className="text-3xl tracking-tight"><CmsText id="components/TestimonyButton:6682c61f0b71f4b5" fallback="Share a testimony" /></h2><button type="button" aria-label="Close testimony form" onClick={() => dialog.current?.close()} className="site-button size-11 text-2xl">×</button></div>
      <p className="mt-3 text-sm text-black/60"><CmsText id="components/TestimonyButton:571d2dab15a1dc2e" fallback="Tell us what God has done in your life." /></p>
      <form className="mt-6 space-y-5" onSubmit={event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const blob = new Blob([`Full name: ${data.get("name")}\nContact: ${data.get("contact")}\nEvent: ${data.get("event") === "none" ? "Not associated with an event" : data.get("event")}\n\n${data.get("testimony")}`], { type: "text/plain" });
        const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "my-testimony.txt"; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
      }}>
        <label className="block text-sm font-medium"><CmsText id="components/TestimonyButton:f13a64ba2fea87ef" fallback="Full name" /><input autoComplete="name" name="name" required maxLength={150} className={field} /></label>
        <label className="block text-sm font-medium"><CmsText id="components/TestimonyButton:deab68a05f90d172" fallback="Email or phone number" /><input autoComplete="email" name="contact" required maxLength={150} className={field} placeholder="Your email address or phone number" onChange={event => event.target.setCustomValidity( /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value) || /^\+?[\d\s().-]{7,}$/.test(event.target.value) ? "" : "Enter an email address or phone number.")} /></label>
        <div className="text-sm font-medium">
          <label htmlFor="testimony-event"><CmsText id="components/TestimonyButton:306ab3df954774da" fallback="Associated event " /><span className="font-normal text-black/50"><CmsText id="components/TestimonyButton:0059798b7f7023e4" fallback="(optional)" /></span></label>
          <Select.Root name="event" defaultValue="none">
            <Select.Trigger id="testimony-event" className="mt-2 flex min-h-12 w-full items-center justify-between gap-4 border border-[#75538f]/25 bg-white px-4 py-3 text-left text-base font-normal text-[#49345f] shadow-sm transition-[border-color,background-color] hover:border-[#75538f]/60 hover:bg-[#f7f2fb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#75538f] data-[state=open]:border-[#75538f]">
              <Select.Value /><Select.Icon><svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-5 text-[#75538f]"><path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></Select.Icon>
            </Select.Trigger>
            {/* Keep the menu inside the native dialog's top layer. */}
            <Select.Content position="popper" sideOffset={6} collisionPadding={16} className="z-10 max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)] overflow-hidden border border-[#75538f]/20 bg-white p-1.5 text-[#49345f] shadow-[0_8px_28px_rgba(36,19,46,0.16)]">
              <Select.Viewport>
                {[{ value: "none", label: "No associated event" }, { value: "Nouthesia S10 Day 2", label: "Nouthesia S10 Day 2" }, { value: "Adullam", label: "Adullam" }].map(option => <Select.Item key={option.value} value={option.value} className="relative flex min-h-11 cursor-pointer select-none items-center py-2 pr-10 pl-3 text-sm font-normal outline-none data-[highlighted]:bg-[#ede3fa] data-[state=checked]:font-medium">
                  <Select.ItemText>{option.label}</Select.ItemText><Select.ItemIndicator className="absolute right-3" aria-hidden="true">&#10003;</Select.ItemIndicator>
                </Select.Item>)}
              </Select.Viewport>
            </Select.Content>
          </Select.Root>
        </div>
        <label className="block text-sm font-medium"><CmsText id="components/TestimonyButton:72377a194b26c381" fallback="Your testimony" /><textarea name="testimony" required rows={5} maxLength={10000} className={field} /></label>
        <p className="text-sm text-black/60"><CmsText id="components/TestimonyButton:4a42c5be6e4053d7" fallback="Online submission is not available yet. You can download your testimony to keep a copy." /></p>
        <button type="submit" className="site-button min-h-12 bg-[#49345f] px-6 text-sm font-semibold text-white hover:bg-[#75538f]"><CmsText id="components/TestimonyButton:ee7567736933d61d" fallback="Download testimony" /></button>
      </form>
    </dialog>
  </>;
}
