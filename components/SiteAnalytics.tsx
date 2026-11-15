'use client';

import { Analytics } from '@vercel/analytics/next';
import { usePathname } from 'next/navigation';

export default function SiteAnalytics() {
  const pathname = usePathname();
  if (pathname.startsWith('/studio')) return null;
  return <Analytics beforeSend={event => { const url = new URL(event.url); url.search = ''; url.hash = ''; return { ...event, url: url.toString() }; }} />;
}
