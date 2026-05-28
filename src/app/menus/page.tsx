import type { Metadata } from "next";
import { getProductsByCategory } from "@/lib/products";
import { CategoryPageContent } from "@/components/CategoryPageContent";

export const metadata: Metadata = { title: "Menus" };

export default function MenusPage() {
  return (
    <CategoryPageContent
      category="menus"
      products={getProductsByCategory("menus")}
    />
  );
}
