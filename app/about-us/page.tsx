import { getCmsMetadata } from '@/lib/cms/metadata';
import type { Metadata } from "next";
import VisionMissionCards from "@/components/VisionMissionCards";
import JourneyTimeline from "@/components/JourneyTimeline";
import LeadershipSection from "@/components/LeadershipSection";
import AboutHeroSection from "@/components/AboutHeroSection";
import ChurchSiteEnding from "@/components/ChurchSiteEnding";
import HomepageMotion from "@/components/HomepageMotion";
const fallbackMetadata: Metadata = { title: "About Us | The Martyrs Church", description: "Our mandate, vision, and mission at The Martyrs Church." };
export default function Page() {
  return <main><HomepageMotion /><AboutHeroSection />
<VisionMissionCards /><JourneyTimeline /><LeadershipSection /><ChurchSiteEnding />
  </main>;
}

export async function generateMetadata() { return getCmsMetadata("about-us", fallbackMetadata); }
