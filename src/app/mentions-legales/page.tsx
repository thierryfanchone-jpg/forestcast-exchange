import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales d'ElectroSécurité Inc — SIRET 80045926500040, Le Gros-Morne, Martinique.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white">Mentions légales</h1>
          <p className="mt-4 text-gray-400">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">1. Éditeur du site</h2>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-500">Raison sociale :</span> {siteConfig.name}</p>
              <p><span className="text-gray-500">Gérant :</span> {siteConfig.owner}</p>
              <p><span className="text-gray-500">SIRET :</span> {siteConfig.siret}</p>
              <p><span className="text-gray-500">Siège social :</span> {siteConfig.address}</p>
              <p><span className="text-gray-500">Téléphone :</span> {siteConfig.phoneDisplay}</p>
              <p><span className="text-gray-500">Email :</span> {siteConfig.email}</p>
              <p><span className="text-gray-500">Activité :</span> Travaux d&apos;installation électrique</p>
              <p><span className="text-gray-500">Zone d&apos;intervention :</span> {siteConfig.serviceArea}</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">2. Hébergement</h2>
            <div className="space-y-2 text-gray-300">
              <p>Le site est hébergé par :</p>
              <p><span className="text-gray-500">Hébergeur :</span> {siteConfig.host}</p>
              <p className="text-sm text-gray-500">
                Les coordonnées complètes de l&apos;hébergeur sont disponibles sur demande.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">3. Propriété intellectuelle</h2>
            <p className="text-gray-300 leading-relaxed">
              L&apos;ensemble du contenu de ce site (textes, images, logos, icônes, structures) est la propriété exclusive
              d&apos;{siteConfig.name}, sauf mention contraire. Toute reproduction, distribution, modification ou utilisation
              sans autorisation préalable et écrite est strictement interdite et susceptible de constituer une contrefaçon.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">4. Limitation de responsabilité</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              {siteConfig.name} s&apos;efforce de fournir des informations aussi précises que possible. Toutefois,
              les informations présentes sur ce site, notamment concernant les diagnostics électriques, sont données
              à titre indicatif et ne sauraient engager la responsabilité de l&apos;entreprise.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Les diagnostics fournis par l&apos;assistant IA constituent une aide préliminaire et ne remplacent
              en aucun cas l&apos;intervention d&apos;un professionnel qualifié sur site. En cas de doute ou de
              situation dangereuse, contactez immédiatement un professionnel ou les services d&apos;urgence.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">5. Données personnelles</h2>
            <p className="text-gray-300 leading-relaxed">
              Les données personnelles collectées via ce site sont traitées conformément à la réglementation
              RGPD. Pour toute question relative à vos données personnelles, consultez notre{" "}
              <a href="/politique-confidentialite" className="text-yellow-400 hover:underline">
                Politique de confidentialité
              </a>.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">6. Droit applicable</h2>
            <p className="text-gray-300 leading-relaxed">
              Les présentes mentions légales sont soumises au droit français. En cas de litige,
              les tribunaux français seront compétents. Pour tout différend relatif à une prestation,
              vous pouvez contacter notre service client avant toute démarche judiciaire.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">7. Médiation</h2>
            <p className="text-gray-300 leading-relaxed">
              Conformément aux articles L.611-1 et suivants du Code de la consommation, en cas de litige
              non résolu amiablement, vous pouvez faire appel à un médiateur de la consommation. Les
              coordonnées du médiateur compétent vous seront communiquées sur simple demande.
            </p>
          </div>

          <p className="text-center text-sm text-gray-600">
            Dernière mise à jour : juin 2025
          </p>
        </div>
      </section>
    </div>
  );
}
