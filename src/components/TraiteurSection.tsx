"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";

const FEATURES = [
  "Menus entièrement personnalisés",
  "Sans gluten & sans lactose garantis",
  "Cuisine caribéenne premium",
  "De 10 à 500 personnes",
];

export function TraiteurSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-28">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80&auto=format&fit=crop"
          alt="Service traiteur Les Ateliers de la Forme"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-deep/60 via-transparent to-deep/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="mb-4 text-[11px] uppercase tracking-widest text-gold">
            Service Traiteur
          </p>
          <h2 className="mb-6 section-title">
            Votre événement mérite l&apos;exception
          </h2>
          <div className="gold-line mx-auto mb-8 w-24" />
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-cream/70">
            Mariages, anniversaires, cocktails d&apos;entreprise, événements
            privés... Nous créons pour vous des moments culinaires caribéens
            inoubliables, entièrement sans gluten et sans lactose.
          </p>

          <ul className="mx-auto mb-10 flex max-w-lg flex-col gap-2 text-left sm:grid sm:grid-cols-2">
            {FEATURES.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2.5 text-sm text-cream/70"
              >
                <span className="flex-shrink-0 text-gold">◆</span>
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/traiteur"
            className="btn-gold inline-flex items-center gap-2"
          >
            Découvrir l&apos;offre traiteur
            <ChevronRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
