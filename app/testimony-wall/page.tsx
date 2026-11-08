import type { Metadata } from "next";
import TestimonyWall from "@/components/TestimonyWall";

export const metadata: Metadata = {
  title: "The Testimony Wall | The Martyrs Church",
  description: "Testaments of God's goodness and mercy at The Martyrs Church.",
};

export default function Page() { return <TestimonyWall />; }
