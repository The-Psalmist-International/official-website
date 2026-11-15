import { getCmsMetadata } from '@/lib/cms/metadata';
import { getCmsContent } from '@/lib/cms/server';
import { resolveCollection } from '@/lib/cms/types';
import CmsText from '@/components/cms/CmsText';
import type { Metadata } from "next";
import ResourceShelfHero from "@/components/ResourceShelfHero";
import ResourceBooks from "@/components/ResourceBooks";
import ChurchSiteEnding from "@/components/ChurchSiteEnding";
import HomepageMotion from "@/components/HomepageMotion";

const fallbackMetadata: Metadata = {
  title: "Resources | The Martyrs Church",
  description: "Discipleship manuals and devotionals to support your walk with God.",
};

const fallbackresources = [
  { id: "2025-devotional", title: "2025 Devotional", edition: "2025", type: "Devotional", color: "#dfdcd2" },
  { id: "discipleship-manual-1", title: "Discipleship Manual", edition: "Volume 1", type: "Discipleship", color: "#e6daee" },
  { id: "discipleship-manual-2", title: "Discipleship Manual", edition: "Volume 2", type: "Discipleship", color: "#d8c3e5" },
  { id: "prophetic-breed-1", title: "Prophetic Breed", edition: "Volume 1", type: "Prophetic Breed", color: "#d5ddd5" },
];

export default async function ResourcesPage() {
  const resources = resolveCollection((await getCmsContent()).collections["resources"], fallbackresources);
  return <main>
    <HomepageMotion />
    <ResourceShelfHero resources={resources} />
    <section id="library" data-nav-theme="light" aria-labelledby="library-title" className="scroll-mt-36 bg-white px-6 py-20 text-[#24132e] sm:px-12 sm:py-28 lg:px-20">
      <div className="mx-auto max-w-[1376px]">
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 id="library-title" className="text-[clamp(2.5rem,4.5vw,4.75rem)] leading-[1.04] tracking-[-.045em]"><CmsText id="app/resources/page:2988927b36704f59" fallback="Resources for your walk." /></h2>
          <p className="max-w-[420px] text-base leading-relaxed text-[#24132e]/65 md:justify-self-end"><CmsText id="app/resources/page:1fa538f35e5abd4e" fallback="Explore our devotionals and manuals. PDF downloads will be available here as resources are added." /></p>
        </div>
        <ResourceBooks resources={resources} />
      </div>
    </section>
    <ChurchSiteEnding />
  </main>;
}

export async function generateMetadata() { return getCmsMetadata("resources", fallbackMetadata); }
