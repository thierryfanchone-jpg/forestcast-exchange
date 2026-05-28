"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import {
  PRODUCTS,
  CATEGORY_LABELS,
  ALL_CATEGORIES,
  type ProductCategory,
} from "@/lib/products";

type Filter = ProductCategory | "all";

export default function CommanderPage() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === active);

  const filters: Filter[] = ["all", ...ALL_CATEGORIES];

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="border-b border-cream/5 px-4 py-16 text-center md:px-8">
        <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
          Boutique en ligne
        </p>
        <h1 className="section-title mb-4">Commander</h1>
        <div className="gold-line mx-auto mb-6 w-24" />
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-cream/55">
          Choisissez vos produits, ajoutez-les au panier et passez commande
          directement via WhatsApp.
        </p>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 border-b border-cream/5 bg-deep/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 py-3.5 md:px-8">
          <div className="flex gap-2" style={{ minWidth: "max-content" }}>
            {filters.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`whitespace-nowrap px-4 py-2 text-[11px] uppercase tracking-widest transition-all duration-200 ${
                  active === cat
                    ? "bg-gold text-deep"
                    : "border border-cream/10 text-cream/45 hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat === "all" ? "Tous les produits" : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: Math.min(i * 0.06, 0.4),
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
