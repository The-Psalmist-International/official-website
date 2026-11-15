'use client';

import { useCmsCollection } from '@/components/cms/ContentProvider';
import CmsText from '@/components/cms/CmsText';
import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { missionMetrics as fallbackmissionMetrics, missionMetricsAreExamples } from '@/content/missions';

function ImpactCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const root = useRef<HTMLSpanElement>(null);
  const visible = useInView(root, { once: true, amount: .5 });
  const reduced = useReducedMotion();
  const progress = useMotionValue(0);
  const display = useTransform(progress, latest => `${Math.round(latest).toLocaleString('en-GB')}${suffix}`);

  useEffect(() => {
    if (!visible) return;
    const animation = animate(progress, value, { duration: reduced ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => animation.stop();
  }, [visible, value, progress, reduced]);

  return <span ref={root}><span className="sr-only">{value.toLocaleString('en-GB')}{suffix}</span><motion.span aria-hidden="true">{display}</motion.span></span>;
}

const fallbackPublishing = [{ missionMetricsAreExamples }];

export default function MissionsImpact() {
  const publishing = useCmsCollection("publishingSettings", fallbackPublishing);
  const examples = publishing[0]?.missionMetricsAreExamples ?? missionMetricsAreExamples;
  const missionMetrics = useCmsCollection("missionMetrics", fallbackmissionMetrics);
  const positions = [
    'left-[-8px] top-[12%] sm:-left-5 sm:top-[24%] lg:-left-10',
    'right-[-8px] top-[34%] sm:-right-5 sm:top-[12%] lg:-right-10',
    'left-[-8px] top-[56%] sm:left-[28%] sm:top-[61%] lg:left-[42%]',
    'right-[-8px] top-[78%] sm:left-[7%] sm:right-auto sm:top-[81%]',
  ];
  const accents = ['bg-[#eee5f6] text-[#75538f]', 'bg-[#e0f3ef] text-[#237e6e]', 'bg-[#fff0d4] text-[#b77916]', 'bg-[#e2edfc] text-[#416ca6]'];
  const icons = ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M16 3a4 4 0 0 1 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0', 'm3 10 9-7 9 7 M5 9v12h14V9 M9 21v-8h6v8', 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z', 'M12 7v14 M3 3c4-1 6 0 9 3 3-3 5-4 9-3v15c-4-1-6 0-9 3-3-3-5-4-9-3Z'];

  return <div className="absolute inset-0 z-10">
    {missionMetrics.map((metric, index) => <div key={metric.label} className={`site-card absolute flex w-[min(285px,90%)] items-center gap-3 rounded-lg bg-white px-3 py-3 text-[#24132e] shadow-[0_8px_25px_-8px_rgba(0,0,0,0.25)] sm:w-[300px] sm:px-4 ${positions[index]}`}>
        <span aria-hidden="true" className={`flex size-9 shrink-0 items-center justify-center rounded-full ${accents[index]}`}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={icons[index]} /></svg></span>
        <div className="min-w-0"><p className="text-xs font-medium leading-snug sm:text-sm">{metric.label}</p><p className="mt-0.5 text-[11px] text-[#24132e]/45"><CmsText id="components/MissionsImpact:256c572e98c8adf7" fallback="Missions impact" /></p></div>
        <p className="ml-auto shrink-0 text-sm font-medium tracking-tight tabular-nums">{metric.value === null ? <span aria-label="Total to be confirmed">&mdash;</span> : <ImpactCounter value={metric.value} suffix={metric.suffix} />}</p>
      </div>)}
    {examples && <p className="absolute -bottom-8 right-0 text-xs text-[#75538f]"><CmsText id="components/MissionsImpact:30cdddadbee6d0a8" fallback="Illustrative figures." /></p>}
    {missionMetrics.some(metric => metric.value === null) && <p className="absolute -bottom-8 left-0 text-xs text-[#75538f]"><CmsText id="components/MissionsImpact:7a945f895df5e8de" fallback="Impact figures to be confirmed." /></p>}
  </div>;
}
