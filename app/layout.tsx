import { getCmsMetadata } from '@/lib/cms/metadata';
import type { Metadata } from "next";
import "./globals.css";
import { ContentProvider } from '@/components/cms/ContentProvider';
import { getCmsContent } from '@/lib/cms/server';
import SiteChrome from '@/components/SiteChrome';

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
  return (
    <html lang="en">
      <body className="antialiased">
        <ContentProvider value={await getCmsContent()}>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <SiteChrome />
          <div id="main-content" tabIndex={-1} className="outline-none">{children}</div>
        </ContentProvider>
      </body>
    </html>
  );
}


export async function generateMetadata() { return getCmsMetadata("site", fallbackMetadata); }
