import 'server-only';
import type { Metadata } from 'next';
import { getCmsContent } from './server';
import { siteOrigin } from '@/lib/seo';

export async function getCmsMetadata(page: string, fallback: Metadata): Promise<Metadata> {
  const seo = (await getCmsContent()).seo[page];
  const title = seo?.title?.trim() || fallback.title || 'The Martyrs Church';
  const description = seo?.description?.trim() || fallback.description || 'Kings, Priests, and Prophets';
  const path = page === 'site' ? '/' : `/${page}`;
  const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  return {
    ...fallback, title, description, metadataBase: new URL(siteOrigin()),
    alternates: { canonical: path },
    openGraph: { title: typeof title === 'string' ? title : 'The Martyrs Church', description, url: path, siteName: 'The Martyrs Church', type: 'website', locale: 'en_GH', images: [{ url: '/opengraph-image', width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: typeof title === 'string' ? title : 'The Martyrs Church', description, images: ['/opengraph-image'] },
    robots: preview ? { index: false, follow: false } : { index: true, follow: true },
  };
}
