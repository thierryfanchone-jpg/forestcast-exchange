import { setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/home/hero";
import { LiveFeed } from "@/components/home/live-feed";
import { Features } from "@/components/home/features";
import { Modes } from "@/components/home/modes";
import { MapTeaser } from "@/components/home/map-teaser";
import { TestimonialAndCta } from "@/components/home/testimonial-cta";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <LiveFeed />
      <Features />
      <Modes />
      <MapTeaser />
      <TestimonialAndCta />
    </>
  );
}
