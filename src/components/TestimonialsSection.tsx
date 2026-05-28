"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Marie-Claire D.",
    location: "Paris",
    text: "J'ai découvert Les Ateliers de la Forme lors d'un événement. La qualité est exceptionnelle et on ne ressent absolument pas l'absence de gluten. Un vrai régal !",
    rating: 5,
  },
  {
    name: "Laurent G.",
    location: "Lyon",
    text: "Le gâteau chocolat intense est une pure merveille. Mes enfants intolérants au lactose peuvent enfin manger comme tout le monde. Merci Thierry pour ce travail remarquable.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    location: "Martinique",
    text: "Les saveurs caribéennes sont authentiques et le soin apporté à chaque préparation se ressent. Les biscuits coco vanille sont devenus un incontournable chez moi.",
    rating: 5,
  },
  {
    name: "Jean-Pierre B.",
    location: "Bordeaux",
    text: "Le service traiteur pour notre mariage a été parfait. Menu créole revisité, qualité premium, tous les convives enchantés. Une expérience culinaire mémorable.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-surface-1 px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
            Avis Clients
          </p>
          <h2 className="section-title">Ce qu&apos;ils disent de nous</h2>
          <div className="gold-line mx-auto mt-4 w-24" />
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col border border-cream/5 p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-gold text-gold" />
                ))}
              </div>

              <p className="mb-6 flex-1 text-sm leading-relaxed text-cream/55 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="border-t border-cream/5 pt-4">
                <p className="text-sm font-medium text-cream">{t.name}</p>
                <p className="text-[11px] text-cream/35">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
