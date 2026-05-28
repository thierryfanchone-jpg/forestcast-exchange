import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Boissons Healthy" };

export default function BoissonsPage() {
  return (
    <CategoryPageContent
      category="boissons"
      products={getProductsByCategory("boissons")}
    />
  );
}
