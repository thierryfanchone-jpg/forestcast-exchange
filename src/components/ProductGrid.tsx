"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/products";

type Props = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

export function ProductGrid({ products, title, subtitle }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        {title && (
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {subtitle && (
              <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
                {subtitle}
              </p>
            )}
            <h2 className="section-title">{title}</h2>
            <div className="gold-line mx-auto mt-4 w-24" />
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.5) }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
