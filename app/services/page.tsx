import { getCmsMetadata } from '@/lib/cms/metadata';
import type { Metadata } from 'next';
import ServicesLibrary from '@/components/ServicesLibrary';
import ChurchSiteEnding from '@/components/ChurchSiteEnding';
import { getServices } from '@/lib/youtube';

const fallbackMetadata: Metadata = { title: 'Services | The Martyrs Church', description: 'Join live services and revisit broadcasts from Church of The Martyrs.' };

export default async function ServicesPage() {
  const statuses = ['live', 'upcoming', 'completed'] as const;
  const results = await Promise.allSettled(statuses.map(status => getServices(status)));
  const feeds = statuses.map((status, index) => {
    const result = results[index];
    return { status, videos: result.status === 'fulfilled' ? result.value.videos : [], nextPageToken: result.status === 'fulfilled' ? result.value.nextPageToken : undefined, failed: result.status === 'rejected' };
  });
  return <main><ServicesLibrary initialFeeds={feeds} /><ChurchSiteEnding /></main>;
}

export async function generateMetadata() { return getCmsMetadata("services", fallbackMetadata); }
