import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Condiments" };

export default function CondimentsPage() {
  return (
    <CategoryPageContent
      category="condiments"
      products={getProductsByCategory("condiments")}
    />
  );
}
