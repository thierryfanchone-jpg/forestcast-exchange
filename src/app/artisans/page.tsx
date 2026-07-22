import type { Metadata } from "next";
import ArtisanSignupForm from "@/components/ArtisanSignupForm";
import { CheckCircle, TrendingUp, Users, Star, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Programme Artisans Partenaires — Rejoindre le réseau DepannIA",
  description: "Rejoignez le réseau d'artisans partenaires DepannIA et recevez des leads qualifiés dans votre secteur.",
};

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Leads qualifiés",
    desc: "Recevez des demandes d'intervention déjà pré-diagnostiquées avec description complète du problème.",
  },
  {
    icon: Users,
    title: "Clients locaux",
    desc: "Leads ciblés dans vos zones d'intervention pour optimiser votre temps de déplacement.",
  },
  {
    icon: Star,
    title: "Visibilité renforcée",
    desc: "Votre profil apparaît dans les recommandations DepannIA et les résultats de recherche.",
  },
  {
    icon: CheckCircle,
    title: "Sans engagement long",
    desc: "Choisissez entre abonnement mensuel ou paiement à la demande. Résiliez à tout moment.",
  },
];

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
            <Wrench className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            Programme Artisans Partenaires
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-xl mx-auto">
            Rejoignez le réseau DepannIA et recevez des leads qualifiés d&apos;particuliers cherchant un artisan de confiance.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Pourquoi rejoindre DepannIA ?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900 sm:text-3xl">Tarifs transparents</h2>
          <p className="mb-8 text-slate-500">Choisissez la formule qui correspond à votre activité.</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border-2 border-blue-600 bg-white p-8 shadow-sm">
              <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-600">Le plus populaire</div>
              <div className="mb-2 text-2xl font-bold text-slate-900">Abonnement mensuel</div>
              <div className="mb-6 text-4xl font-bold text-blue-600">29 €<span className="text-base font-normal text-slate-400">/mois</span></div>
              <ul className="mb-6 space-y-2.5 text-sm text-slate-600 text-left">
                {["Leads illimités dans vos zones", "Accès prioritaire aux nouveaux leads", "Profil artisan optimisé", "Support dédié", "Sans engagement annuel"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-400">Flexibilité maximale</div>
              <div className="mb-2 text-2xl font-bold text-slate-900">À la demande</div>
              <div className="mb-6 text-4xl font-bold text-slate-900">10 €<span className="text-base font-normal text-slate-400">/lead</span></div>
              <ul className="mb-6 space-y-2.5 text-sm text-slate-600 text-left">
                {["Payez uniquement les leads reçus", "Leads qualifiés et vérifiés", "Zéro abonnement mensuel", "Idéal pour tester le service", "Arrêtez quand vous voulez"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8" id="inscription">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Rejoindre le réseau</h2>
            <p className="mt-2 text-slate-500">Remplissez ce formulaire et nous vous contacterons sous 48h.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <ArtisanSignupForm />
          </div>
        </div>
      </section>
    </div>
  );
}
