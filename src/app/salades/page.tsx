import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Salades" };

export default function SaladesPage() {
  return (
    <CategoryPageContent
      category="salades"
      products={getProductsByCategory("salades")}
    />
  );
}
