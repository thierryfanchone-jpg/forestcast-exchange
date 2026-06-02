import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "CGV — Conditions Générales de Vente",
  description: "Conditions générales de vente d'ElectroSécurité Inc.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white">
            Conditions Générales de Vente
          </h1>
          <p className="mt-4 text-gray-400">
            Applicables à toutes les prestations d&apos;ElectroSécurité Inc à compter du 1er juin 2025.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 1 — Objet et champ d&apos;application</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à toutes les prestations
              proposées par {siteConfig.name} (SIRET {siteConfig.siret}), dont le siège social est situé
              au {siteConfig.address}.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Toute commande de prestation implique l&apos;acceptation sans réserve des présentes CGV par le client.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 2 — Prestations proposées</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              {siteConfig.name} propose les prestations suivantes :
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Diagnostic électrique par IA à distance (4,90 € TTC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Diagnostic humain à distance par technicien qualifié (19,90 € TTC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Visio dépannage avec l&apos;artisan (49,90 € TTC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Interventions sur site, installations électriques, sécurité incendie et intrusion (sur devis)</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 3 — Prix et paiement</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Les prix sont exprimés en euros TTC. Les prestations à tarif fixe (diagnostic IA, diagnostic humain,
              visio dépannage) sont payables en ligne avant la réalisation de la prestation, via Stripe (carte bancaire)
              ou par lien de paiement envoyé par email ou WhatsApp.
            </p>
            <p className="text-gray-300 leading-relaxed mb-3">
              Les prestations sur devis font l&apos;objet d&apos;un devis écrit préalable. Le devis doit être accepté par
              le client avant le début des travaux. Le paiement s&apos;effectue selon les modalités précisées dans le devis.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Tout retard de paiement entraîne l&apos;application de pénalités de retard au taux légal en vigueur, ainsi
              qu&apos;une indemnité forfaitaire pour frais de recouvrement de 40 €.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 4 — Droit de rétractation</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de rétractation ne peut être
              exercé pour les prestations pleinement exécutées avant la fin du délai de rétractation et dont l&apos;exécution
              a commencé après accord préalable exprès du consommateur.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Pour les prestations non encore commencées, le client dispose d&apos;un délai de 14 jours pour exercer
              son droit de rétractation, en contactant {siteConfig.name} par email à {siteConfig.email}.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 5 — Responsabilité</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              {siteConfig.name} s&apos;engage à réaliser les prestations conformément aux règles de l&apos;art et aux normes
              en vigueur. La responsabilité de {siteConfig.name} ne saurait être engagée pour les dommages résultant
              d&apos;une utilisation incorrecte des conseils ou diagnostics fournis.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Les diagnostics à distance (IA ou humain) sont des aides préliminaires. Ils ne remplacent pas une
              inspection physique par un professionnel qualifié. {siteConfig.name} décline toute responsabilité en cas
              de dommages survenus suite à la non-application des recommandations de sécurité.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 6 — Garantie</h2>
            <p className="text-gray-300 leading-relaxed">
              Les travaux d&apos;installation réalisés par {siteConfig.name} bénéficient des garanties légales prévues
              par le droit français, notamment la garantie de parfait achèvement (1 an) et la garantie décennale
              pour les travaux entrant dans son champ d&apos;application. Une attestation d&apos;assurance est disponible
              sur demande.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 7 — Litiges</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              En cas de litige, le client est invité à contacter {siteConfig.name} en premier lieu pour une
              résolution amiable. À défaut d&apos;accord, le client peut recourir à un médiateur de la consommation.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout litige sera
              soumis aux tribunaux compétents du ressort de Martinique.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 8 — Données personnelles</h2>
            <p className="text-gray-300 leading-relaxed">
              Les données personnelles collectées dans le cadre des prestations sont traitées conformément
              au RGPD. Consultez notre{" "}
              <a href="/politique-confidentialite" className="text-yellow-400 hover:underline">
                Politique de confidentialité
              </a>{" "}
              pour plus d&apos;informations.
            </p>
          </div>

          <p className="text-center text-sm text-gray-600">
            CGV applicables à compter du 1er juin 2025 — {siteConfig.name}
          </p>
        </div>
      </section>
    </div>
  );
}
