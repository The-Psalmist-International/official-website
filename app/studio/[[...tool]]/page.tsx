import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';
import Button from '@/components/ui/Button';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Content Studio | The Martyrs Church', robots: { index: false, follow: false } };

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) return <main data-nav-theme="light" className="min-h-screen bg-white px-6 pb-20 pt-48 text-[#24132e]"><div className="mx-auto max-w-2xl"><h1 className="text-4xl tracking-tight">Content Studio</h1><p className="mt-6 leading-relaxed">Sanity is ready to connect. Add the project ID and dataset to enable the editor. The public website continues to use its existing content.</p><Button href="/" className="mt-8">Back to the website</Button></div></main>;
  return <div className="studio-surface"><NextStudio config={config} /></div>;
}
