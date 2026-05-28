import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Épicerie Fine" };

export default function EpiceriePage() {
  return (
    <CategoryPageContent
      category="epicerie"
      products={getProductsByCategory("epicerie")}
    />
  );
}
