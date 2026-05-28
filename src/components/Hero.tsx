"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1920&q=80&auto=format&fit=crop"
          alt="Cuisine premium Les Ateliers de la Forme"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep/85 via-deep/60 to-deep/95" />
        <div className="absolute inset-0 bg-deep/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          className="mb-5 text-[11px] font-medium uppercase tracking-[0.45em] text-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Fondé en 2017 · Cuisine Caribéenne Premium
        </motion.p>

        <motion.h1
          className="mb-6 font-serif text-4xl font-normal leading-[1.15] text-cream md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Cuisine saine,{" "}
          <span className="text-gradient-gold italic">gourmande</span>
          <br />& premium
        </motion.h1>

        <motion.div
          className="mb-3 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="text-[11px] uppercase tracking-widest text-gold/80">
            Sans gluten · Sans lactose
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
        </motion.div>

        <motion.p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-cream/65 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Des créations maison inspirées des saveurs caribéennes, pensées pour
          le plaisir, le bien-être et l&apos;exigence.
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Link href="/commander" className="btn-gold">
            Commander maintenant
          </Link>
          <Link href="/notre-histoire" className="btn-outline">
            Découvrir notre univers
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} className="text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
