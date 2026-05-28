import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Biscuits" };

export default function BiscuitsPage() {
  return (
    <CategoryPageContent
      category="biscuits"
      products={getProductsByCategory("biscuits")}
    />
  );
}
