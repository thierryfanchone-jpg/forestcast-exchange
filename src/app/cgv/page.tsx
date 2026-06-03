import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Conditions Générales de Vente" };

export default function CGVPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <div className="mx-auto max-w-3xl px-4 py-16 md:px-6">
          <h1 className="mb-8 text-3xl font-bold text-white">Conditions Générales de Vente</h1>
          <div className="space-y-8 text-slate-300">
            {[
              { title: "Article 1 – Objet", content: "Les présentes CGV régissent les ventes de formations numériques proposées par ORION ACADEMY sur la plateforme orion-academy.fr." },
              { title: "Article 2 – Prix", content: "Les prix sont indiqués en euros TTC. ORION ACADEMY se réserve le droit de modifier ses tarifs à tout moment. Les formations commandées sont facturées au prix en vigueur au moment de la commande." },
              { title: "Article 3 – Paiement", content: "Le paiement s'effectue en ligne via Stripe (carte bancaire). La transaction est sécurisée par protocole SSL. ORION ACADEMY ne stocke aucune donnée bancaire." },
              { title: "Article 4 – Accès aux formations", content: "L'accès aux formations est activé immédiatement après confirmation du paiement. Pour les achats à la carte, l'accès est illimité dans le temps." },
              { title: "Article 5 – Droit de rétractation", content: "Conformément à l'article L.221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques dès lors que leur exécution a commencé. Nous proposons toutefois un remboursement sous 14 jours si aucune leçon n'a été démarrée." },
              { title: "Article 6 – Propriété intellectuelle", content: "Tous les contenus (vidéos, textes, exercices) sont la propriété exclusive d'ORION ACADEMY. Toute reproduction ou redistribution est strictement interdite." },
              { title: "Article 7 – Litiges", content: "En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. La juridiction compétente est celle du ressort du siège social d'ORION ACADEMY." },
            ].map(({ title, content }) => (
              <section key={title}>
                <h2 className="mb-3 text-xl font-semibold text-white">{title}</h2>
                <p>{content}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
