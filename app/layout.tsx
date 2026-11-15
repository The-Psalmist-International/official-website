import { getCmsMetadata } from '@/lib/cms/metadata';
import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from '@/components/cms/ContentProvider';
import { getCmsContent } from '@/lib/cms/server';
import SiteChrome from '@/components/SiteChrome';
import { preload } from 'react-dom';

export const revalidate = 300;

const fallbackMetadata: Metadata = {
  title: "The Martyrs Church",
  description: "Kings, Priests, and Prophets",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Start the brand font download with the HTML instead of after the CSS is parsed.
  preload('/fonts/SeasonCollectionVF.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });
  return (
    <html lang="en">
      <body className="antialiased">
        <ContentProvider value={await getCmsContent()}>
          {children}
          <SiteChrome />
        </ContentProvider>
      </body>
    </html>
  );
}


export async function generateMetadata() { return getCmsMetadata("site", fallbackMetadata); }
