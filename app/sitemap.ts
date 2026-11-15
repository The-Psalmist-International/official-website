import type { MetadataRoute } from 'next';
import { publicRoutes, siteOrigin } from '@/lib/seo';

export const revalidate = 3600;
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map(path => ({ url: `${siteOrigin()}${path === '/' ? '' : path}`, changeFrequency: path === '/services' ? 'daily' : 'weekly', priority: path === '/' ? 1 : .7 }));
}
