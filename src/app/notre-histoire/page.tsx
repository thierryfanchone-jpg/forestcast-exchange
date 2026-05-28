import type { Metadata } from "next";
import { FounderSection } from "@/components/FounderSection";
import { DifferenceSection } from "@/components/DifferenceSection";
import { AnimatedBanner } from "@/components/AnimatedBanner";

export const metadata: Metadata = {
  title: "Notre Histoire",
  description:
    "Découvrez l'histoire de Thierry Fanchone et la naissance des Ateliers de la Forme en 2017. Une cuisine caribéenne premium, saine et gourmande.",
};

export default function NotreHistoirePage() {
  return (
    <div className="pt-24">
      <div className="border-b border-cream/5 px-4 py-16 text-center md:px-8">
        <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
          La Marque
        </p>
        <h1 className="section-title mb-4">Notre Histoire</h1>
        <div className="gold-line mx-auto mb-6 w-24" />
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-cream/55">
          Une prise de conscience, un voyage, une mission. Découvrez comment
          Les Ateliers de la Forme sont nés en 2017.
        </p>
      </div>

      <AnimatedBanner />
      <FounderSection />
      <DifferenceSection />
    </div>
  );
}
