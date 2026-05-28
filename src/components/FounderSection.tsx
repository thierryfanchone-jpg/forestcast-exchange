"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PARAGRAPHS = [
  "Je m'appelle Thierry Fanchone. Je suis marié et père de trois enfants.",
  "J'ai créé Les Ateliers de la Forme en 2017, après une prise de conscience personnelle née quelques années plus tôt, lors d'un voyage à Puerto Rico avec mon épouse.",
  "À cette période, mon alimentation était déséquilibrée, trop riche en produits transformés, trop éloignée de ce dont mon corps avait réellement besoin.",
  "Ce voyage a été un déclic. Avec l'expertise de mon épouse dans la remise en forme, nous avons repensé notre façon de manger. Nous avons retiré le gluten et le lait de vache, puis réinventé à la maison les recettes que j'aimais, dans des versions plus saines, plus digestes et toujours gourmandes.",
  "Les résultats ont été rapides. Mon corps répondait mieux. Mon énergie revenait. Et surtout, j'ai compris qu'une cuisine saine pouvait rester généreuse, savoureuse et profondément plaisir.",
  "Petit à petit, j'ai commencé à créer mes propres recettes. Des plats, des biscuits, des gâteaux, des spécialités maison, des préparations inspirées de notre culture caribéenne. Les retours de mon entourage ont confirmé une chose : cette cuisine pouvait toucher bien au-delà de mon histoire personnelle.",
  "C'est ainsi que Les Ateliers de la Forme sont nés.",
  "Notre mission est simple : proposer une cuisine premium, saine et gourmande, sans gluten et sans lactose, qui respecte le corps sans jamais sacrifier le goût.",
];

export function FounderSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-surface-1 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Image side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative h-[480px] overflow-hidden md:h-[580px]">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop"
                alt="Thierry Fanchone — Fondateur des Ateliers de la Forme"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-1/60 to-transparent" />
            </div>

            {/* Year badge */}
            <div className="absolute -bottom-5 -right-5 border border-gold/30 bg-deep p-5">
              <p className="font-serif text-3xl text-gold">2017</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-cream/40">
                Fondation
              </p>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
              Le mot du fondateur
            </p>
            <h2 className="mb-2 section-title">Thierry Fanchone</h2>
            <div className="gold-line mb-8 w-16" />

            <div className="space-y-4">
              {PARAGRAPHS.map((para, i) => (
                <p
                  key={i}
                  className={`text-sm leading-relaxed md:text-base ${
                    i === PARAGRAPHS.length - 1
                      ? "font-medium italic text-gold/90"
                      : "text-cream/65"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
