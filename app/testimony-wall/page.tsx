import { getCmsMetadata } from '@/lib/cms/metadata';
import type { Metadata } from "next";
import TestimonyWall from "@/components/TestimonyWall";

const fallbackMetadata: Metadata = {
  title: "The Testimony Wall | The Martyrs Church",
  description: "Testaments of God's goodness and mercy at The Martyrs Church.",
};

export default function Page() { return <TestimonyWall />; }

export async function generateMetadata() { return getCmsMetadata("testimony-wall", fallbackMetadata); }
