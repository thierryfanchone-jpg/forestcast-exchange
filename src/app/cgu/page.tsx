import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "CGU — Conditions Générales d'Utilisation",
  description: "Conditions générales d'utilisation du site ElectroSécurité Inc.",
};

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="mt-4 text-gray-400">
            Conditions d&apos;utilisation du site electrosecuriteinc.fr et de ses services numériques.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 1 — Objet</h2>
            <p className="text-gray-300 leading-relaxed">
              Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour objet de définir les modalités et
              conditions dans lesquelles {siteConfig.name} (SIRET {siteConfig.siret}) met à disposition de ses
              utilisateurs le présent site web et ses services numériques, notamment l&apos;assistant de diagnostic IA.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 2 — Acceptation des CGU</h2>
            <p className="text-gray-300 leading-relaxed">
              L&apos;accès et l&apos;utilisation du site impliquent l&apos;acceptation pleine et entière des présentes CGU.
              {siteConfig.name} se réserve le droit de modifier les CGU à tout moment. Les modifications entrent
              en vigueur dès leur publication sur le site. Il appartient à l&apos;utilisateur de les consulter
              régulièrement.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 3 — Description des services</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Le site propose les services numériques suivants :
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Présentation des prestations d&apos;électricité et de sécurité</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Assistant de diagnostic électrique par IA (aide préliminaire)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Formulaire de réservation et demande de devis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Paiement en ligne sécurisé via Stripe</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 4 — Utilisation de l&apos;assistant IA</h2>
            <div className="rounded-lg border border-red-900/50 bg-red-900/10 p-4 mb-4">
              <p className="text-sm font-bold text-red-400 mb-2">
                ⚠️ Avertissement important
              </p>
              <p className="text-sm text-red-300">
                L&apos;assistant IA de diagnostic électrique fournit une aide préliminaire uniquement.
                Ces informations ne remplacent en aucun cas l&apos;intervention d&apos;un professionnel qualifié sur site.
              </p>
            </div>
            <p className="text-gray-300 leading-relaxed mb-3">
              L&apos;utilisateur s&apos;engage à :
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Ne jamais tenter de manipuler des installations électriques sous tension sur la base des seuls conseils de l&apos;IA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Appeler les services d&apos;urgence en cas de risque immédiat (18, 15, 17)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Consulter un électricien certifié pour tout travail nécessitant une qualification professionnelle</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 5 — Obligations de l&apos;utilisateur</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              L&apos;utilisateur s&apos;engage à utiliser le site de manière conforme à sa destination et à la législation
              en vigueur. Il est notamment interdit de :
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Utiliser le site à des fins frauduleuses ou illégales</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Tenter de compromettre la sécurité ou l&apos;intégrité du site</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Reproduire le contenu du site sans autorisation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span>Fournir de fausses informations dans les formulaires</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 6 — Disponibilité du service</h2>
            <p className="text-gray-300 leading-relaxed">
              {siteConfig.name} s&apos;efforce d&apos;assurer la disponibilité du site 24h/24 et 7j/7, mais ne peut
              garantir une disponibilité continue. Des interruptions peuvent survenir pour maintenance, mises à
              jour ou raisons techniques. {siteConfig.name} ne saurait être tenue responsable des interruptions
              de service.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 7 — Limitation de responsabilité</h2>
            <p className="text-gray-300 leading-relaxed">
              {siteConfig.name} ne saurait être tenue responsable des dommages directs ou indirects résultant
              de l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser le site, des informations fournies par l&apos;assistant IA,
              ou de liens vers des sites tiers. L&apos;utilisateur reconnaît utiliser le site sous sa seule responsabilité.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 8 — Droit applicable</h2>
            <p className="text-gray-300 leading-relaxed">
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou
              leur exécution relève de la compétence des tribunaux français.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">Article 9 — Contact</h2>
            <div className="space-y-2 text-gray-300">
              <p>Pour toute question relative aux présentes CGU :</p>
              <p><span className="text-gray-500">Email :</span> {siteConfig.email}</p>
              <p><span className="text-gray-500">Téléphone :</span> {siteConfig.phoneDisplay}</p>
              <p><span className="text-gray-500">Adresse :</span> {siteConfig.address}</p>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600">
            CGU en vigueur depuis le 1er juin 2025 — {siteConfig.name}
          </p>
        </div>
      </section>
    </div>
  );
}
