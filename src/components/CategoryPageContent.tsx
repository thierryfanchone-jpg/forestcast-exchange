"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductCard } from "./ProductCard";
import {
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  type ProductCategory,
  type Product,
} from "@/lib/products";

type Props = {
  category: ProductCategory;
  products: Product[];
};

export function CategoryPageContent({ category, products }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen pt-24">
      {/* Page header */}
      <div className="border-b border-cream/5 px-4 py-16 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
            {CATEGORY_LABELS[category]}
          </p>
          <h1 className="section-title mb-4">{CATEGORY_LABELS[category]}</h1>
          <div className="gold-line mx-auto mb-6 w-24" />
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-cream/55">
            {CATEGORY_DESCRIPTIONS[category]}
          </p>
        </motion.div>
      </div>

      {/* Products */}
      <div ref={ref} className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        {products.length === 0 ? (
          <p className="text-center text-cream/40">
            Aucun produit disponible pour le moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: Math.min(i * 0.08, 0.4),
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
