import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Les Ateliers de la Forme pour vos commandes, demandes de devis traiteur ou toute question.",
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <div className="border-b border-cream/5 px-4 py-16 text-center md:px-8">
        <p className="mb-3 text-[11px] uppercase tracking-widest text-gold">
          Contact
        </p>
        <h1 className="section-title mb-4">Nous contacter</h1>
        <div className="gold-line mx-auto mb-6 w-24" />
        <p className="mx-auto max-w-lg text-sm leading-relaxed text-cream/55">
          Pour toute commande, question ou demande de devis traiteur, nous
          sommes disponibles du lundi au samedi, de 8h à 20h.
        </p>
      </div>
      <ContactSection />
    </div>
  );
}
