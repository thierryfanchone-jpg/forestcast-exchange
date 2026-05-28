import { Hero } from "@/components/Hero";
import { AnimatedBanner } from "@/components/AnimatedBanner";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { GallerySection } from "@/components/GallerySection";
import { SignatureSection } from "@/components/SignatureSection";
import { DifferenceSection } from "@/components/DifferenceSection";
import { FounderSection } from "@/components/FounderSection";
import { TraiteurSection } from "@/components/TraiteurSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <Hero />
      <AnimatedBanner />
      <CategoryGrid />
      <ProductGrid
        products={featured}
        title="Nos produits phares"
        subtitle="Sélection Premium"
      />
      <GallerySection />
      <SignatureSection />
      <DifferenceSection />
      <FounderSection />
      <TraiteurSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
