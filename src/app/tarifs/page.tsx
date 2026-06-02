import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Phone,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Découvrez les tarifs d'ElectroSécurité Inc : diagnostic IA dès 4,90 € TTC, visio dépannage à 49,90 €, interventions sur site sur devis.",
};

const pricingCards = [
  {
    id: "diagnostic-ia",
    title: "Diagnostic IA",
    subtitle: "Premier niveau",
    price: "4,90 €",
    period: "TTC par session",
    description:
      "Décrivez votre problème à notre assistant IA. Il analyse la situation, classe l'urgence et vous propose la suite adaptée.",
    features: [
      "Analyse immédiate 24h/24",
      "Classification de l'urgence",
      "Conseils de sécurité immédiats",
      "Recommandation de la prochaine étape",
      "Envoi de photo possible",
    ],
    cta: "Lancer le diagnostic",
    ctaHref: "/depannage-ia",
    highlighted: false,
    badge: null,
  },
  {
    id: "diagnostic-humain",
    title: "Diagnostic humain",
    subtitle: "Expertise à distance",
    price: "19,90 €",
    period: "TTC par session",
    description:
      "Thierry Fanchone analyse votre situation par échange écrit ou vocal. Diagnostic professionnel sans déplacement.",
    features: [
      "Analyse par un électricien certifié",
      "Échange détaillé par écrit",
      "Rapport de diagnostic",
      "Conseils techniques précis",
      "Recommandation d'intervention",
    ],
    cta: "Réserver",
    ctaHref: "/reservation",
    highlighted: false,
    badge: null,
  },
  {
    id: "visio",
    title: "Visio dépannage",
    subtitle: "Le plus populaire",
    price: "49,90 €",
    period: "TTC par session",
    description:
      "Séance vidéo avec Thierry Fanchone. Il vous guide en temps réel pour résoudre votre problème ou prépare l'intervention sur site.",
    features: [
      "Appel vidéo avec l'artisan",
      "Guidage pas à pas en temps réel",
      "Diagnostic visuel complet",
      "Rapport post-session",
      "Déduction sur intervention si nécessaire",
    ],
    cta: "Réserver une visio",
    ctaHref: "/reservation",
    highlighted: true,
    badge: "Populaire",
  },
  {
    id: "deplacement",
    title: "Déplacement sur site",
    subtitle: "Intervention physique",
    price: "Sur devis",
    period: "",
    description:
      "Notre technicien se déplace chez vous pour résoudre les problèmes qui nécessitent une présence physique.",
    features: [
      "Intervention partout en Martinique",
      "Diagnostic complet sur place",
      "Devis avant travaux",
      "Matériel professionnel",
      "Garantie sur la prestation",
    ],
    cta: "Demander un devis",
    ctaHref: "/reservation",
    highlighted: false,
    badge: null,
  },
];

const additionalServices = [
  {
    title: "Installation électrique complète",
    price: "Sur devis",
    desc: "Tableau, circuits, prises, conformité NF C 15-100",
  },
  {
    title: "Borne de recharge IRVE",
    price: "Sur devis",
    desc: "Installation IRVE mono ou triphasé, résidentiel et professionnel",
  },
  {
    title: "Sécurité incendie",
    price: "Sur devis",
    desc: "DAAF, SSI, BAES, conformité ERP",
  },
  {
    title: "Sécurité intrusion",
    price: "Sur devis",
    desc: "Alarme, caméras, contrôle d'accès",
  },
  {
    title: "Maintenance électrique",
    price: "Sur devis",
    desc: "Contrats annuels, vérifications périodiques",
  },
  {
    title: "Mise en sécurité / mise aux normes",
    price: "Sur devis",
    desc: "Diagnostic complet et mise en conformité",
  },
];

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Tarification transparente
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Nos tarifs
          </h1>
          <p className="text-lg text-gray-400">
            Des prix clairs et sans surprise. Le diagnostic à distance vous
            permet souvent d&apos;éviter un déplacement coûteux.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pricingCards.map((card) => (
              <div
                key={card.id}
                className={`relative flex flex-col rounded-2xl border p-6 ${
                  card.highlighted
                    ? "border-yellow-400 bg-gray-900 shadow-[0_0_40px_-10px_rgba(251,191,36,0.3)]"
                    : "border-gray-800 bg-gray-900"
                }`}
              >
                {card.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
                      <Star className="h-3 w-3" fill="currentColor" />
                      {card.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
                    {card.subtitle}
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold text-white">
                    {card.title}
                  </h2>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-white">
                    {card.price}
                  </span>
                  {card.period && (
                    <span className="ml-1 text-sm text-gray-400">
                      {card.period}
                    </span>
                  )}
                </div>

                <p className="mb-6 text-sm leading-relaxed text-gray-400">
                  {card.description}
                </p>

                <ul className="mb-8 flex-1 space-y-2">
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={card.ctaHref}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold transition-colors ${
                    card.highlighted
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  {card.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment info */}
      <section className="border-y border-gray-800 bg-gray-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-xl font-extrabold text-white">
            Moyens de paiement
          </h2>
          <p className="mb-6 text-gray-400">
            Les prestations à tarif fixe peuvent être réglées en ligne (carte
            bancaire via Stripe) ou par lien de paiement. Pour les prestations
            sur devis, le règlement s&apos;effectue après validation du devis.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/paiement"
              className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              <Zap className="h-4 w-4" />
              Payer en ligne
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour, je souhaite régler ma prestation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700"
            >
              <MessageCircle className="h-4 w-4" />
              Demander un lien WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Additional services */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-white">
              Travaux et installations — Sur devis
            </h2>
            <p className="mt-3 text-gray-400">
              Pour tous les travaux d&apos;installation, le devis est gratuit et
              sans engagement.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {additionalServices.map((service) => (
              <div
                key={service.title}
                className="rounded-xl border border-gray-800 bg-gray-900 p-5"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">
                    {service.title}
                  </h3>
                  <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 text-xs font-semibold text-yellow-400">
                    {service.price}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/reservation"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ quick */}
      <section className="border-t border-gray-800 bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-extrabold text-white">
            Questions fréquentes sur les tarifs
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Le diagnostic IA est-il remboursé si je dois quand même appeler ?",
                a: "Le coût du diagnostic IA (4,90 €) est déduit de toute prestation ultérieure réservée dans les 30 jours.",
              },
              {
                q: "Comment puis-je payer en ligne ?",
                a: "Via notre page de paiement sécurisée (Stripe). Vous pouvez aussi demander un lien de paiement par WhatsApp ou email.",
              },
              {
                q: "Le devis sur site est-il gratuit ?",
                a: "Oui, l'établissement du devis pour les travaux est toujours gratuit et sans engagement.",
              },
              {
                q: "Acceptez-vous les chèques CESU ?",
                a: "Contactez-nous pour discuter des modalités de paiement adaptées à votre situation.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-gray-800 bg-gray-950 p-5"
              >
                <h3 className="mb-2 font-bold text-white">{faq.q}</h3>
                <p className="text-sm text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-extrabold text-white">
            Une question sur nos tarifs ?
          </h2>
          <p className="mb-8 text-gray-400">
            Appelez-nous ou envoyez un message WhatsApp — nous répondons
            rapidement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-green-500"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
