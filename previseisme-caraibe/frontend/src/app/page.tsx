import { HeroSection } from "@/components/marketing/hero-section";
import { StatsSection } from "@/components/marketing/stats-section";
import { RecentEventsSection } from "@/components/marketing/recent-events-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { SourcesSection } from "@/components/marketing/sources-section";
import { CtaSection } from "@/components/marketing/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <RecentEventsSection />
      <FeaturesSection />
      <SourcesSection />
      <CtaSection />
    </>
  );
}
