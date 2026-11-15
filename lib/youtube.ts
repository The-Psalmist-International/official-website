import 'server-only';

export type BroadcastStatus = 'live' | 'upcoming' | 'completed';
export interface ServiceVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  status: BroadcastStatus;
}
export interface ServicePage { videos: ServiceVideo[]; nextPageToken?: string }

interface SearchItem {
  id: { videoId?: string };
  snippet: { title: string; description: string; publishedAt: string; thumbnails?: Record<string, { url: string }> };
}

export async function getServices(status: BroadcastStatus, pageToken = ''): Promise<ServicePage> {
  const key = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID || process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  if (!key || !channelId) throw new Error('YouTube is not configured');
  const params = new URLSearchParams({ part: 'snippet', channelId, eventType: status, type: 'video', order: 'date', maxResults: '50', key });
  if (pageToken) params.set('pageToken', pageToken);
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, { next: { revalidate: status === 'live' ? 120 : 1800 }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error('YouTube request failed');
  const data = await response.json() as { items?: SearchItem[]; nextPageToken?: string; error?: unknown };
  if (data.error || !Array.isArray(data.items)) throw new Error('Invalid YouTube response');
  return {
    videos: data.items.flatMap(item => item.id.videoId ? [{
      id: item.id.videoId, title: item.snippet.title, description: item.snippet.description,
      publishedAt: item.snippet.publishedAt, status,
      thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${item.id.videoId}/hqdefault.jpg`,
    }] : []),
    nextPageToken: data.nextPageToken,
  };
}
