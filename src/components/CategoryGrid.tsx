"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_IMAGES,
  ALL_CATEGORIES,
} from "@/lib/products";

export function CategoryGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
            Notre Catalogue
          </p>
          <h2 className="section-title">Découvrez nos créations</h2>
          <div className="gold-line mx-auto mt-4 w-24" />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
          {ALL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/${cat}`}
                className="group relative block overflow-hidden bg-surface-1"
              >
                <div className="relative h-44 overflow-hidden md:h-52">
                  <Image
                    src={CATEGORY_IMAGES[cat]}
                    alt={CATEGORY_LABELS[cat]}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent" />
                  <div className="absolute inset-0 bg-gold/0 transition-all duration-300 group-hover:bg-gold/8" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-base leading-snug text-cream transition-colors group-hover:text-gold">
                    {CATEGORY_LABELS[cat]}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-cream/40 transition-colors group-hover:text-cream/60">
                    {CATEGORY_DESCRIPTIONS[cat]}
                  </p>
                </div>

                <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border border-gold/0 bg-deep/0 text-gold/0 text-sm transition-all duration-300 group-hover:border-gold/60 group-hover:bg-deep/60 group-hover:text-gold">
                  →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
