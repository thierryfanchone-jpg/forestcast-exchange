import type { Metadata } from "next";
import Link from "next/link";
import { Zap, MessageCircle, Mail, Lock, ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Paiement en ligne",
  description:
    "Réglez en ligne vos prestations ElectroSécurité Inc : diagnostic IA, diagnostic humain, visio dépannage.",
};

const stripeEnabled = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const products = [
  {
    id: "diagnostic-ia",
    title: "Diagnostic IA",
    description:
      "Analyse de votre problème électrique par notre assistant IA. Résultat immédiat avec classification d'urgence.",
    price: siteConfig.tarifs.diagnosticIA.priceDisplay,
    included: [
      "Analyse IA complète",
      "Classification de l'urgence",
      "Conseils de sécurité",
      "Recommandation de suite",
    ],
  },
  {
    id: "diagnostic-humain",
    title: "Diagnostic humain à distance",
    description:
      "Analyse de votre situation par Thierry Fanchone, électricien certifié, par échange écrit ou vocal.",
    price: siteConfig.tarifs.diagnosticHumain.priceDisplay,
    included: [
      "Échange avec l'artisan certifié",
      "Rapport de diagnostic",
      "Conseils techniques précis",
      "Plan d'action recommandé",
    ],
  },
  {
    id: "visio-depannage",
    title: "Visio dépannage",
    description:
      "Séance vidéo avec Thierry Fanchone pour résoudre votre problème en temps réel ou préparer l'intervention.",
    price: siteConfig.tarifs.visio.priceDisplay,
    included: [
      "Appel vidéo avec l'artisan",
      "Guidage pas à pas",
      "Diagnostic visuel complet",
      "Déduction sur intervention si besoin",
    ],
  },
];

export default function PaiementPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Règlement sécurisé
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Paiement en ligne
          </h1>
          <p className="text-lg text-gray-400">
            Réglez vos prestations en toute sécurité. Paiement par carte
            bancaire via Stripe — transactions chiffrées et sécurisées.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900 p-6"
              >
                <div className="mb-4">
                  <h2 className="mb-2 text-lg font-extrabold text-white">
                    {product.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-yellow-400">
                    {product.price}
                  </span>
                </div>

                <ul className="mb-6 flex-1 space-y-2">
                  {product.included.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                      <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-400" />
                      {item}
                    </li>
                  ))}
                </ul>

                {stripeEnabled ? (
                  <form action="/api/stripe/checkout" method="POST">
                    <input type="hidden" name="productId" value={product.id} />
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
                    >
                      <Lock className="h-4 w-4" />
                      Payer en ligne
                    </button>
                  </form>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-yellow-400/20 bg-yellow-400/5 p-3 text-center">
                      <p className="text-xs font-semibold text-yellow-400">
                        Paiement en ligne bientôt disponible
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Demandez un lien de paiement par WhatsApp ou email
                      </p>
                    </div>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}?text=Bonjour, je souhaite payer la prestation "${product.title}" (${product.price}). Pouvez-vous m'envoyer un lien de paiement ?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Lien WhatsApp
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}?subject=Demande de lien de paiement — ${product.title}&body=Bonjour, je souhaite régler la prestation "${product.title}" (${product.price}). Pouvez-vous m'envoyer un lien de paiement ? Merci.`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700"
                    >
                      <Mail className="h-4 w-4" />
                      Demander par email
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security notice */}
      <section className="border-y border-gray-800 bg-gray-900 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Lock className="h-8 w-8 text-yellow-400" />
              <p className="text-sm font-semibold text-white">
                Paiement sécurisé
              </p>
              <p className="text-xs text-gray-400">
                Chiffrement SSL 256-bit
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-8 w-8 text-yellow-400" />
              <p className="text-sm font-semibold text-white">
                Via Stripe
              </p>
              <p className="text-xs text-gray-400">
                Standard PCI DSS certifié
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MessageCircle className="h-8 w-8 text-yellow-400" />
              <p className="text-sm font-semibold text-white">
                Confirmation immédiate
              </p>
              <p className="text-xs text-gray-400">
                Par email et WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Other payment / contact */}
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-extrabold text-white">
            Autres moyens de paiement
          </h2>
          <p className="mb-8 text-gray-400">
            Pour les prestations sur devis, le règlement s&apos;effectue après
            validation du devis. Nous acceptons les virements bancaires. Pour
            toute question sur le paiement, contactez-nous directement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              <Phone className="h-4 w-4" />
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/tarifs"
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700"
            >
              Voir les tarifs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
