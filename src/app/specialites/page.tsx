import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Spécialités Maison" };

export default function SpecialitesPage() {
  return (
    <CategoryPageContent
      category="specialites"
      products={getProductsByCategory("specialites")}
    />
  );
}
