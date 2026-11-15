import 'server-only';
import { cache } from 'react';
import { createClient } from '@sanity/client';
import { emptyCmsSnapshot, safeContentUrl, type CmsSnapshot } from './types';

export const getCmsContent = cache(async (): Promise<CmsSnapshot> => {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const result = emptyCmsSnapshot();
  if (!projectId || !dataset || !/^[a-z0-9]+$/.test(projectId) || !/^[a-z0-9_-]+$/.test(dataset)) return result;
  try {
    // Next owns the cache so a publish webhook does not refill ISR with stale CDN data.
    const client = createClient({ projectId, dataset, apiVersion: '2025-02-19', perspective: 'published', useCdn: false, token: process.env.SANITY_API_READ_TOKEN, timeout: 4000, maxRetries: 0 });
    const documents = await client.fetch<Array<Record<string, unknown>>>(`*[_type in ["pageCopy", "siteMedia", "siteLink", "pageSeo"] || _type match "collection_*"]{_type,entries,key,source,href,alt,title,description,"url":image.asset->url,"items":select(key in ["missionGallery","introFrames"] => items,items[]{...,"image":coalesce(imageAsset.asset->url,image),"src":coalesce(srcAsset.asset->url,src),"pdfUrl":coalesce(pdfAsset.asset->url,pdfUrl)})}`, {}, { next: { revalidate: 300, tags: ['site-content'] } });
    for (const doc of documents) {
      if (doc._type === "pageSeo" && typeof doc.key === "string") result.seo[doc.key] = { title: typeof doc.title === "string" ? doc.title : undefined, description: typeof doc.description === "string" ? doc.description : undefined };
      if (doc._type === 'pageCopy' && Array.isArray(doc.entries)) {
        for (const entry of doc.entries) if (typeof entry?.key === 'string' && typeof entry.text === 'string' && entry.text.trim()) result.copy[entry.key] = entry.text;
      }
      if (doc._type === 'siteMedia' && typeof doc.source === 'string') {
        const url = safeContentUrl(doc.url, '');
        if (url) result.media[doc.source] = { url, alt: typeof doc.alt === 'string' ? doc.alt : undefined };
      }
      if (doc._type === 'siteLink' && typeof doc.source === 'string') {
        const href = safeContentUrl(doc.href, '');
        if (href) result.links[doc.source] = href;
      }
      if (typeof doc._type === 'string' && doc._type.startsWith('collection_') && typeof doc.key === 'string' && Array.isArray(doc.items)) result.collections[doc.key] = doc.items;
    }
    return result;
  } catch {
    console.warn('[Sanity] Published content unavailable; using local content.');
    return result;
  }
});
