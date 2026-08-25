import AboutHeroSection from '@/components/AboutHeroSection';
import PastorLetterSection from '@/components/PastorLetterSection';
import VisionSection from '@/components/VisionSection';
import LeadershipSection from '@/components/LeadershipSection';

export const metadata = {
  title: 'About Us | The Martyrs Church',
  description: 'Learn more about our vision, mission, and the history of The Martyrs Church.',
};

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-white font-['Stack_Sans_Headline',sans-serif]">
      {/* Hero Section */}
      <AboutHeroSection />

      {/* Pastoral Letter Section (Tilted Parchment Paper Card) */}
      <PastorLetterSection />

      {/* Vision Section */}
      <VisionSection />

      {/* Leadership Section */}
      <LeadershipSection />
    </main>
  );
}
