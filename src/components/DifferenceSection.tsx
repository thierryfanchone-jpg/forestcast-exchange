"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Leaf, Star, Heart, Shield } from "lucide-react";

const PILLARS = [
  {
    Icon: Leaf,
    title: "100% Sans gluten & Sans lactose",
    text: "Toutes nos préparations sont élaborées sans gluten ni lait de vache, pour une alimentation respectueuse de votre corps et de votre bien-être.",
  },
  {
    Icon: Star,
    title: "Gastronomie Caribéenne Moderne",
    text: "Inspirés des saveurs des Antilles, nos plats marient la richesse de la tradition créole avec l'exigence de la gastronomie contemporaine.",
  },
  {
    Icon: Heart,
    title: "Fait Maison avec Amour",
    text: "Chaque recette est créée et préparée artisanalement, avec des ingrédients soigneusement sélectionnés pour leur qualité et leur origine.",
  },
  {
    Icon: Shield,
    title: "Goût sans Compromis",
    text: "Nous prouvons chaque jour qu'une cuisine saine peut rester généreuse, savoureuse et profondément gourmande.",
  },
];

export function DifferenceSection() {
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
            Notre Différence
          </p>
          <h2 className="section-title">Ce qui nous distingue</h2>
          <div className="gold-line mx-auto mt-4 w-24" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              className="group border border-cream/5 p-6 transition-all duration-300 hover:border-gold/25 hover:bg-surface-1"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center border border-gold/20 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10">
                <Icon size={20} />
              </div>
              <h3 className="mb-3 font-serif text-base leading-snug text-cream transition-colors group-hover:text-gold">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-cream/45">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
