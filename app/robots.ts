import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const preview = process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production';
  return { rules: preview ? [{ userAgent: '*', disallow: '/' }] : [{ userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] }], sitemap: `${siteOrigin()}/sitemap.xml` };
}
