'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { emptyCmsSnapshot, resolveCollection, type CmsSnapshot } from '@/lib/cms/types';

const Context = createContext<CmsSnapshot>(emptyCmsSnapshot());
export function ContentProvider({ value, children }: { value: CmsSnapshot; children: ReactNode }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useSiteContent() { return useContext(Context); }
export function useCmsCollection<T>(key: string, fallback: T[]): T[] {
  const published = useSiteContent().collections[key];
  return useMemo(() => resolveCollection(published, fallback), [published, fallback]);
}
