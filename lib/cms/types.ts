export interface CmsSnapshot {
  copy: Record<string, string>;
  media: Record<string, { url: string; alt?: string }>;
  links: Record<string, string>;
  collections: Record<string, unknown[]>;
  seo: Record<string, { title?: string; description?: string }>;
}

export function emptyCmsSnapshot(): CmsSnapshot {
  return { copy: {}, media: {}, links: {}, collections: {}, seo: {} };
}

export function safeContentUrl(value: unknown, fallback: string): string {
  if (typeof value !== 'string' || !value.trim()) return fallback;
  const url = value.trim();
  return /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(url) ? url : fallback;
}

export function resolveCollection<T>(published: unknown, fallback: T[]): T[] {
  if (!Array.isArray(published) || published.length === 0 || fallback.length === 0) return fallback;
  const sample = fallback[0];
  if (typeof sample === 'string') {
    const strings = published.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
    return strings.length ? strings as T[] : fallback;
  }
  if (!sample || typeof sample !== 'object') return fallback;
  const result = published.flatMap((item, index) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return [];
    const raw = item as Record<string, unknown>;
    const record = { ...((fallback.find(entry => typeof entry === 'object' && entry && 'id' in entry && entry.id === raw.id) || fallback[index] || sample) as object) } as Record<string, unknown>;
    for (const [key, value] of Object.entries(raw)) {
      if (key.startsWith('_') || value === undefined || value === null || (typeof value === 'string' && !value.trim())) continue;
      if (typeof record[key] === 'number' && (typeof value !== 'number' || !Number.isFinite(value) || value < 0)) continue;
      if (record[key] !== undefined && record[key] !== null && typeof value !== typeof record[key]) continue;
      record[key] = value;
    }
    return [record as T];
  });
  return result.length ? result : fallback;
}
