import Link from "next/link";
import { Zap, ChevronRight, Phone, Shield, Clock, Star, CheckCircle } from "lucide-react";

const PANNE_EXAMPLES = [
  "Mon disjoncteur saute quand il pleut",
  "Mon chauffe-eau ne chauffe plus",
  "J'ai une fuite sous l'évier",
  "Ma climatisation affiche un code erreur",
  "Ma machine à laver n'essore plus",
];

const STEPS = [
  {
    step: "1",
    title: "Décrivez votre panne",
    desc: "Saisissez votre problème en texte libre ou envoyez une photo. Notre IA comprend le langage naturel.",
    icon: "💬",
  },
  {
    step: "2",
    title: "Obtenez un pré-diagnostic",
    desc: "En quelques secondes, DepannIA analyse la situation, identifie les risques et vous guide pas à pas.",
    icon: "🔍",
  },
  {
    step: "3",
    title: "Trouvez un artisan",
    desc: "Si une intervention est nécessaire, nous vous mettons en relation avec un artisan qualifié dans votre secteur.",
    icon: "🤝",
  },
];

const METIERS = [
  { icon: "⚡", label: "Électricité", desc: "Disjoncteur, prises, tableau, câblage" },
  { icon: "🔧", label: "Plomberie", desc: "Fuites, canalisations, chauffe-eau" },
  { icon: "❄️", label: "Climatisation", desc: "Clim, pompe à chaleur, ventilation" },
  { icon: "🏠", label: "Électroménager", desc: "Lave-linge, four, frigo, lave-vaisselle" },
  { icon: "🔑", label: "Serrurerie", desc: "Serrures, portes, blindage, ouverture" },
  { icon: "🔨", label: "Général habitat", desc: "Volets, portes, menuiserie, maçonnerie" },
];

const FAQ = [
  {
    q: "DepannIA remplace-t-il un professionnel ?",
    a: "Non. DepannIA est un assistant de pré-diagnostic. Il vous aide à comprendre la situation, évaluer l'urgence et vous guide vers les bonnes actions. Pour toute intervention technique, un professionnel qualifié reste indispensable.",
  },
  {
    q: "Le diagnostic est-il gratuit ?",
    a: "Oui, le diagnostic IA est entièrement gratuit. La mise en relation avec un artisan partenaire l'est aussi pour les particuliers.",
  },
  {
    q: "Combien de temps pour obtenir un artisan ?",
    a: "En journée, notre réseau vise un rappel sous 30 minutes. Pour les urgences, nous mobilisons des artisans disponibles 24h/24.",
  },
  {
    q: "Puis-je envoyer une photo de ma panne ?",
    a: "Oui ! Vous pouvez joindre une photo lors du diagnostic IA ou lors de votre demande d'intervention. Cela permet une analyse plus précise.",
  },
  {
    q: "Comment devenir artisan partenaire ?",
    a: "Rendez-vous sur la page Artisans et remplissez le formulaire d'inscription. Nous vous contacterons sous 48h pour finaliser votre inscription.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-4 py-16 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-800/50 px-4 py-2 text-sm text-blue-100 backdrop-blur-sm">
            <Zap className="h-4 w-4 text-yellow-300" />
            Assistant IA disponible 24h/24 — 7j/7
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Votre assistant dépannage{" "}
            <span className="text-yellow-300">habitat 24h/24</span>
          </h1>
          <p className="mb-10 text-lg text-blue-100 sm:text-xl max-w-2xl mx-auto">
            Décrivez votre panne, obtenez un diagnostic IA instantané avec conseils de sécurité, puis trouvez un artisan qualifié si nécessaire.
          </p>

          <div className="mx-auto max-w-xl rounded-2xl bg-white/10 p-4 backdrop-blur-sm sm:p-6">
            <Link href="/diagnostic">
              <div className="mb-3 w-full cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-4 text-left text-blue-200 hover:bg-white/20 transition-colors text-sm sm:text-base">
                Décris ta panne : mon disjoncteur saute…
              </div>
            </Link>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/diagnostic"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white shadow transition-all hover:bg-blue-400"
              >
                <Zap className="h-4 w-4" />
                Diagnostiquer
              </Link>
              <Link
                href="/diagnostic"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                📸 Envoyer une photo
              </Link>
              <Link
                href="/urgence"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow transition-all hover:bg-orange-500"
              >
                <Phone className="h-4 w-4" />
                Urgence artisan
              </Link>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-400" /> Diagnostic gratuit</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-green-400" /> Conseils de sécurité</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-yellow-300" /> Artisans vérifiés</span>
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-green-400" /> Rappel sous 30 min</span>
          </div>
        </div>
      </section>

      {/* Panne examples */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">
            Exemples de pannes diagnostiquées
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {PANNE_EXAMPLES.map((panne) => (
              <Link
                key={panne}
                href={`/diagnostic?q=${encodeURIComponent(panne)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                {panne}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="section-title">Comment ça marche ?</h2>
            <p className="section-subtitle">En 3 étapes simples, obtenez un diagnostic et trouvez de l&apos;aide.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                  {s.icon}
                </div>
                <div className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600">Étape {s.step}</div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/diagnostic" className="btn-primary">
              Faire un diagnostic gratuit
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Métiers */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="section-title">Métiers couverts</h2>
            <p className="section-subtitle">DepannIA couvre les principales pannes habitat du quotidien.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METIERS.map((m) => (
              <div
                key={m.label}
                className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:shadow-sm"
              >
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{m.label}</h3>
                  <p className="mt-0.5 text-sm text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-blue-900 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Vous êtes artisan ?</h2>
            <p className="mt-3 text-lg text-blue-200">Rejoignez notre réseau et recevez des leads qualifiés.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-blue-700 bg-blue-800 p-8">
              <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">Abonnement mensuel</div>
              <div className="mb-4 text-4xl font-bold">29 €<span className="text-lg font-normal text-blue-300">/mois</span></div>
              <ul className="mb-6 space-y-2 text-sm text-blue-100">
                {["Leads illimités dans votre zone", "Profil visible sur DepannIA", "Support prioritaire", "Sans engagement annuel"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/artisans" className="block w-full rounded-xl bg-blue-500 py-3 text-center text-sm font-semibold text-white hover:bg-blue-400 transition-colors">
                S&apos;inscrire maintenant
              </Link>
            </div>
            <div className="rounded-2xl border border-blue-600 bg-blue-700 p-8">
              <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-300">À la demande</div>
              <div className="mb-4 text-4xl font-bold">10 €<span className="text-lg font-normal text-blue-300">/lead</span></div>
              <ul className="mb-6 space-y-2 text-sm text-blue-100">
                {["Payez uniquement les leads reçus", "Leads qualifiés et vérifiés", "Aucun abonnement", "Arrêtez quand vous voulez"].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href="/artisans" className="block w-full rounded-xl border border-blue-400 py-3 text-center text-sm font-semibold text-white hover:bg-blue-600 transition-colors">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="section-title">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer items-center justify-between px-6 py-4 font-medium text-slate-900 marker:content-none hover:bg-slate-50">
                  {item.q}
                  <ChevronRight className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-90" />
                </summary>
                <div className="border-t border-slate-100 px-6 py-4 text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Besoin d&apos;aide maintenant ?</h2>
          <p className="mb-8 text-lg text-orange-100">Notre assistant IA est disponible 24h/24 pour vous guider.</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/diagnostic" className="w-full rounded-xl bg-white px-8 py-3.5 text-center text-sm font-semibold text-orange-600 shadow-sm hover:bg-orange-50 transition-colors sm:w-auto">
              Diagnostic gratuit
            </Link>
            <Link href="/urgence" className="w-full rounded-xl border-2 border-white px-8 py-3.5 text-center text-sm font-semibold text-white hover:bg-white/10 transition-colors sm:w-auto">
              <Phone className="inline mr-2 h-4 w-4" />
              Appeler un artisan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
