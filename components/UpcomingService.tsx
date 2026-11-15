"use client";

import CmsText from '@/components/cms/CmsText';
import CmsLink from '@/components/cms/CmsLink';
import { useCmsCollection } from "@/components/cms/ContentProvider";
import { useEffect, useState } from "react";

const fallbackServices = [
  { name: "Midweek Service", day: 3, minute: 19 * 60 + 30, time: "7:30pm", dayName: "Wednesday" },
  { name: "Shabbat Service", day: 6, minute: 14 * 60, time: "2pm", dayName: "Saturday" },
];

export function nextService(now: Date, services = fallbackServices) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Accra", weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const part = (type: string) => parts.find(p => p.type === type)?.value ?? "0";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(part("weekday"));
  const current = day * 86400 + Number(part("hour")) * 3600 + Number(part("minute")) * 60 + Number(part("second"));
  return services.map(service => ({ ...service, wait: (service.day * 86400 + service.minute * 60 - current + 604800) % 604800 || 604800 })).sort((a, b) => a.wait - b.wait)[0];
}

export default function UpcomingService({ onLight = false, banner = false }: { onLight?: boolean; banner?: boolean }) {
  const services = useCmsCollection("serviceSchedule", fallbackServices);
  const [service, setService] = useState<ReturnType<typeof nextService> | null>(null);
  useEffect(() => {
    const update = () => setService(nextService(new Date(), services));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [services]);

  if (banner) return <CmsLink href="https://share.google/ONIqoMH5HO69gJyGj" target="_blank" rel="noopener noreferrer" aria-label={`Upcoming: ${service ? `${service.name}, ${service.dayName} at ${service.time}. ` : ''}Get directions to Mountain of Light Auditorium`} style={{ borderRadius: 0 }} className="flex h-16 w-full items-center justify-between gap-3 border-b border-[#49345f]/15 bg-[#eee5f6] px-5 text-[#49345f] focus-visible:outline-2 focus-visible:outline-offset-[-4px]">
    <span className="min-w-0"><span className="block text-[10px] font-medium uppercase tracking-[.12em] opacity-85"><CmsText id="components/UpcomingService:5f1a2542e4e4ca5e" fallback="Upcoming" /></span><span className="mt-1 block text-xs font-medium leading-snug">{service ? service.name : 'Weekly service'}</span></span>
    <span className="ml-auto shrink-0 text-right text-xs">{service ? <>{service.dayName}<br /><span className="font-medium">{service.time}</span></> : 'View directions'}</span>
    <span aria-hidden="true" className="ml-1 flex size-8 shrink-0 items-center justify-center"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m9 5 7 7-7 7" /></svg></span>
  </CmsLink>;

  return (
    <CmsLink href="https://share.google/ONIqoMH5HO69gJyGj" target="_blank" rel="noopener noreferrer" aria-label={`Upcoming: ${service ? `${service.name} with Sir Elorm, ${service.dayName} at ${service.time}. ` : ""}Get directions to Mountain of Light Auditorium`} style={{ borderRadius: 0 }} className={`group relative flex min-h-16 w-full items-center overflow-hidden px-5 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#49345f] ${banner ? "border-b border-[#49345f]/15 bg-[#eee5f6] text-[#49345f]" : `border-l ${onLight ? "border-black/15 text-black" : "border-white/15 text-white"} bg-transparent lg:w-[440px] lg:shrink-0`}`}>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[#b897da] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[#c9abe6] transition-transform delay-75 duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[#dfcbf1] transition-transform delay-150 duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-0 group-focus-visible:translate-x-0 motion-reduce:transition-none" />
      <span className="relative z-10 flex w-full items-center justify-between gap-4 transition-[transform,opacity] duration-300 ease-out group-hover:-translate-y-16 group-hover:opacity-0 group-focus-visible:-translate-y-16 group-focus-visible:opacity-0 motion-reduce:transition-none">
        <span className="min-w-0">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-[.12em] opacity-85"><CmsText id="components/UpcomingService:5f1a2542e4e4ca5e" fallback="Upcoming" /></span>
          <span className="block text-sm font-medium">{service ? `${service.name} with Sir Elorm` : "Weekly service"}</span>
        </span>
        <span className="shrink-0 text-right text-xs font-semibold tabular-nums" aria-label={service ? `${service.wait} seconds until the service` : "Loading countdown"}>
          {service ? `${Math.floor(service.wait / 86400)}d ${String(Math.floor(service.wait / 3600) % 24).padStart(2, "0")}:${String(Math.floor(service.wait / 60) % 60).padStart(2, "0")}:${String(service.wait % 60).padStart(2, "0")}` : "--:--:--"}
        </span>
      </span>
      <span aria-hidden="true" className="absolute inset-0 z-10 flex translate-y-full items-center justify-between gap-3 px-5 text-sm font-medium text-[#49345f] opacity-0 transition-[transform,opacity] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"><CmsText id="components/UpcomingService:ff611baeaed77265" fallback="Mountain of Light Auditorium " /><span>&#8594;</span></span>
    </CmsLink>
  );
}
