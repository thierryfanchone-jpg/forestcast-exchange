"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const SIGNATURES = [
  {
    src: "/images/burger-signature.jpg",
    alt: "Burger Signature — pain maïs, garniture végétale premium",
    label: "Burger Signature",
    description:
      "Pain maïs artisanal, garniture végétale généreuse, sauce secrète maison. Une explosion de saveurs caribéennes.",
    category: "Spécialités maison",
  },
  {
    src: "/images/brownie-signature.jpg",
    alt: "Brownie Signature — chocolat intense, sans gluten",
    label: "Brownie Signature",
    description:
      "Intense, fondant, sans gluten. Notre brownie maison est élaboré avec du cacao pur et des matières premières sélectionnées.",
    category: "Gâteaux & biscuits",
  },
];

export function SignatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="bg-surface-1 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
            Incontournables
          </p>
          <h2 className="section-title">
            Signature{" "}
            <span className="italic text-gold">Les Ateliers de la Forme</span>
          </h2>
          <div className="gold-line mx-auto mt-4 w-24" />
        </motion.div>

        {/* Two tall premium cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {SIGNATURES.map((item, i) => (
            <motion.div
              key={item.label}
              className="group relative overflow-hidden rounded-2xl"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(201,168,76,0.2), 0 8px 48px rgba(0,0,0,0.6)",
              }}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              {/* Gold border glow */}
              <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-all duration-500 group-hover:shadow-[inset_0_0_0_1.5px_rgba(201,168,76,0.5),0_0_48px_rgba(201,168,76,0.15)]" />

              {/* Image */}
              <div className="relative h-80 overflow-hidden md:h-96">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                  priority={i === 0}
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-20 -mt-24 p-6">
                <p className="mb-1.5 text-[10px] uppercase tracking-widest text-gold/70">
                  {item.category}
                </p>
                <h3 className="mb-3 font-serif text-2xl font-normal text-cream">
                  {item.label}
                </h3>
                <div className="gold-line mb-4 w-12" />
                <p className="text-sm leading-relaxed text-cream/55">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
