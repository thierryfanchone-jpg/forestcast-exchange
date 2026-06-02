import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données RGPD d'ElectroSécurité Inc.",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold text-white">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-gray-400">
            Protection de vos données personnelles — conformité RGPD (Règlement Général sur la Protection des Données).
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-8">

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">1. Responsable du traitement</h2>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-500">Responsable :</span> {siteConfig.owner}</p>
              <p><span className="text-gray-500">Société :</span> {siteConfig.name}</p>
              <p><span className="text-gray-500">SIRET :</span> {siteConfig.siret}</p>
              <p><span className="text-gray-500">Adresse :</span> {siteConfig.address}</p>
              <p><span className="text-gray-500">Email DPO :</span> {siteConfig.email}</p>
              <p><span className="text-gray-500">Téléphone :</span> {siteConfig.phoneDisplay}</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">2. Données collectées</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Dans le cadre de l&apos;utilisation de nos services, nous collectons les données personnelles suivantes :
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white mb-2">2.1 Données fournies volontairement</h3>
                <ul className="space-y-1.5 text-gray-300 text-sm">
                  <li>• Nom, prénom</li>
                  <li>• Adresse email</li>
                  <li>• Numéro de téléphone</li>
                  <li>• Adresse postale d&apos;intervention</li>
                  <li>• Description de votre problème électrique</li>
                  <li>• Photos de votre installation (envoyées volontairement)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">2.2 Données de navigation</h3>
                <ul className="space-y-1.5 text-gray-300 text-sm">
                  <li>• Adresse IP</li>
                  <li>• Type de navigateur</li>
                  <li>• Pages consultées et durée de visite</li>
                  <li>• Données de performance du site</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">2.3 Données de paiement</h3>
                <p className="text-gray-300 text-sm">
                  Les données de paiement (numéro de carte bancaire, etc.) sont traitées directement par Stripe
                  et ne sont jamais stockées sur nos serveurs. {siteConfig.name} n&apos;accède qu&apos;à une confirmation
                  de paiement.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">3. Finalités et bases légales</h2>
            <div className="space-y-3">
              {[
                {
                  finalite: "Fourniture des prestations",
                  base: "Exécution du contrat",
                  desc: "Traitement de vos demandes, interventions, devis.",
                },
                {
                  finalite: "Gestion de la relation client",
                  base: "Intérêt légitime",
                  desc: "Suivi des dossiers, communications relatives aux prestations.",
                },
                {
                  finalite: "Paiements en ligne",
                  base: "Exécution du contrat",
                  desc: "Traitement sécurisé des paiements via Stripe.",
                },
                {
                  finalite: "Amélioration du service",
                  base: "Intérêt légitime",
                  desc: "Analyse des usages pour améliorer le site et les services.",
                },
                {
                  finalite: "Obligations légales",
                  base: "Obligation légale",
                  desc: "Conservation des données comptables et fiscales.",
                },
              ].map((item) => (
                <div key={item.finalite} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-white text-sm">{item.finalite}</span>
                    <span className="rounded-full bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">
                      {item.base}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">4. Durée de conservation</h2>
            <div className="space-y-2 text-gray-300">
              <p><span className="text-gray-500">Données clients :</span> 5 ans à compter de la fin de la relation commerciale</p>
              <p><span className="text-gray-500">Données de navigation :</span> 13 mois maximum</p>
              <p><span className="text-gray-500">Données de paiement :</span> Selon politique Stripe (non stockées chez nous)</p>
              <p><span className="text-gray-500">Données comptables :</span> 10 ans (obligation légale)</p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">5. Destinataires des données</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Vos données personnelles peuvent être partagées avec :
            </p>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2 text-sm">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span><strong className="text-white">Stripe</strong> — traitement des paiements en ligne (États-Unis, encadré par les clauses contractuelles types)</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span><strong className="text-white">Hébergeur du site</strong> — infrastructure technique</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <span className="text-yellow-400 mt-0.5">•</span>
                <span><strong className="text-white">Autorités compétentes</strong> — en cas d&apos;obligation légale</span>
              </li>
            </ul>
            <p className="mt-3 text-sm text-gray-400">
              Vos données ne sont jamais vendues à des tiers à des fins commerciales.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">6. Vos droits (RGPD)</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants :
            </p>
            <ul className="space-y-2 text-gray-300">
              {[
                "Droit d'accès à vos données personnelles",
                "Droit de rectification des données inexactes",
                "Droit à l'effacement (« droit à l'oubli »)",
                "Droit à la limitation du traitement",
                "Droit à la portabilité de vos données",
                "Droit d'opposition au traitement",
                "Droit de ne pas faire l'objet d'une décision automatisée",
              ].map((droit) => (
                <li key={droit} className="flex items-start gap-2 text-sm">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>{droit}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
              <p className="text-sm text-gray-300">
                <strong className="text-white">Pour exercer vos droits :</strong> Envoyez votre demande par email à{" "}
                <a href={`mailto:${siteConfig.email}`} className="text-yellow-400 hover:underline">
                  {siteConfig.email}
                </a>{" "}
                avec une copie de votre pièce d&apos;identité. Réponse sous 30 jours.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">7. Cookies</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Notre site utilise des cookies techniques nécessaires au bon fonctionnement du site.
              Des cookies analytiques peuvent également être utilisés pour améliorer l&apos;expérience utilisateur.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Vous pouvez à tout moment désactiver les cookies non essentiels via les paramètres de votre navigateur.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-xl font-extrabold text-yellow-400">8. Réclamation</h2>
            <p className="text-gray-300 leading-relaxed">
              Si vous estimez que le traitement de vos données n&apos;est pas conforme au RGPD, vous avez le droit
              d&apos;introduire une réclamation auprès de la CNIL (Commission Nationale de l&apos;Informatique et des Libertés) :
              cnil.fr — 3 Place de Fontenoy, 75007 Paris.
            </p>
          </div>

          <p className="text-center text-sm text-gray-600">
            Politique de confidentialité en vigueur depuis le 1er juin 2025 — {siteConfig.name}
          </p>
        </div>
      </section>
    </div>
  );
}
