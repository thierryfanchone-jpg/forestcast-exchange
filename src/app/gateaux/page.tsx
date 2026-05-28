import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Gâteaux" };

export default function GateauxPage() {
  return (
    <CategoryPageContent
      category="gateaux"
      products={getProductsByCategory("gateaux")}
    />
  );
}
