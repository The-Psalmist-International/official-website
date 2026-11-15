'use client';

import { useSiteContent } from './ContentProvider';

export default function CmsText({ id, fallback }: { id: string; fallback: string }) {
  const value = useSiteContent().copy[id] || fallback;
  const prefix = /^\s/.test(fallback) && !/^\s/.test(value) ? ' ' : '';
  const suffix = /\s$/.test(fallback) && !/\s$/.test(value) ? ' ' : '';
  return `${prefix}${value}${suffix}`;
}
