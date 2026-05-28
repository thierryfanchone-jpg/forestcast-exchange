import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Traiteur & Événements",
  description:
    "Service traiteur caribéen premium sans gluten et sans lactose. Mariages, cocktails, buffets sur mesure par Les Ateliers de la Forme.",
};

export default function TraiteurPage() {
  const products = getProductsByCategory("traiteur");

  return (
    <>
      <CategoryPageContent category="traiteur" products={products} />
      <ContactSection />
    </>
  );
}
