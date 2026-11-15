'use client';

import { usePathname } from 'next/navigation';
import FloatingNavbar from '@/components/FloatingNavbar';
import CookieBanner from '@/components/CookieBanner';
import SiteAnalytics from '@/components/SiteAnalytics';
import UpcomingService from '@/components/UpcomingService';

export default function SiteChrome() {
  const path = usePathname();
  if (path.startsWith('/studio')) return null;
  return <><FloatingNavbar /><aside aria-label="Upcoming service" className="mobile-service-banner absolute inset-x-0 top-0 z-20 lg:hidden"><UpcomingService banner onLight /></aside><CookieBanner /><SiteAnalytics /></>;
}
