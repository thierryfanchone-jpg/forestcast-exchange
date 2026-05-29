"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const SALADES = [
  {
    src: "/images/salades/salade-1.jpg",
    alt: "Salade fraîcheur — fleur comestible, cranberries, pousses",
    label: "Salade Fraîcheur",
    span: "hero",
  },
  {
    src: "/images/salades/salade-2.jpg",
    alt: "Salade bowl — mangue, betterave, pousses, graines de lin",
    label: "Bowl Tropical",
    span: "tile",
  },
  {
    src: "/images/salades/salade-3.jpg",
    alt: "Salade bowl — melon, concombre, cranberries, vinaigrette",
    label: "Bowl Signature",
    span: "tile",
  },
];

type GalleryItem = (typeof SALADES)[number];

function GalleryCard({
  item,
  index,
  isInView,
}: {
  item: GalleryItem;
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl"
      style={{
        boxShadow:
          "0 0 0 1px rgba(201,168,76,0.15), 0 4px 32px rgba(0,0,0,0.5)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
    >
      {/* Gold border glow on hover */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-all duration-500 group-hover:shadow-[inset_0_0_0_1px_rgba(201,168,76,0.45),0_0_32px_rgba(201,168,76,0.12)]" />

      {/* Image with slow zoom */}
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
          priority={index === 0}
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-gold/80">
          Nos créations
        </p>
        <p className="font-serif text-lg font-normal text-cream">
          {item.label}
        </p>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
            Galerie
          </p>
          <h2 className="section-title">Nos créations</h2>
          <div className="gold-line mx-auto mt-4 w-24" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/45">
            Chaque assiette est pensée pour éveiller les sens — des ingrédients
            frais, des couleurs généreuses, une harmonie de saveurs caribéennes.
          </p>
        </motion.div>

        {/* Magazine mosaic: large hero left + 2 stacked tiles right */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
          {/* Hero — spans 2 rows */}
          <div className="md:row-span-2 md:h-[560px]">
            <GalleryCard item={SALADES[0]} index={0} isInView={isInView} />
          </div>

          {/* Tile 1 */}
          <div className="h-[260px]">
            <GalleryCard item={SALADES[1]} index={1} isInView={isInView} />
          </div>

          {/* Tile 2 */}
          <div className="h-[260px]">
            <GalleryCard item={SALADES[2]} index={2} isInView={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}
