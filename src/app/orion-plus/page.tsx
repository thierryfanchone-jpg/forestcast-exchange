import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Crown,
  Check,
  Star,
  Zap,
  Users,
  MessageSquare,
  Award,
  Shield,
  ArrowRight,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ORION PLUS — L'accompagnement d'élite",
  description:
    "ORION PLUS : l'offre premium de coaching, formation et accompagnement personnalisé pour atteindre l'excellence en communication.",
};

const FEATURES = [
  {
    icon: Zap,
    title: "Tous les modules inclus",
    desc: "Accès illimité aux 5 modules ORION ACADEMY + contenus exclusifs réservés aux membres PLUS.",
  },
  {
    icon: MessageSquare,
    title: "Simulations IA illimitées",
    desc: "Entraîne-toi sans limite avec le coach IA sur tous les scénarios disponibles.",
  },
  {
    icon: Users,
    title: "3 séances de coaching individuel",
    desc: "Sessions en visio avec un expert en communication pour un accompagnement sur-mesure.",
  },
  {
    icon: Star,
    title: "Feedback expert personnalisé",
    desc: "Analyse approfondie de tes simulations par un professionnel de la communication.",
  },
  {
    icon: Award,
    title: "Certification Premium ORION PLUS",
    desc: "Un certificat d'excellence reconnu, avec passeport de compétences avancé.",
  },
  {
    icon: Shield,
    title: "Groupe privé mastermind",
    desc: "Rejoins une communauté exclusive d'ambicieux pour échanger, vous challenger et progresser ensemble.",
  },
];

const TESTIMONIALS_PLUS = [
  {
    name: "David Kamara",
    role: "Directeur commercial – Paris",
    content:
      "ORION PLUS m'a donné les outils et la confiance pour prendre la parole devant 300 personnes. Retour sur investissement immédiat.",
    stars: 5,
  },
  {
    name: "Sarah Leconte",
    role: "Fondatrice startup – Lyon",
    content:
      "Les séances de coaching individuel sont ce qui m'a vraiment fait passer un cap. Je recommande à 100% à tous ceux qui veulent aller loin.",
    stars: 5,
  },
  {
    name: "Marc Ouellet",
    role: "Manager senior – Montréal",
    content:
      "En 6 semaines, j'ai transformé ma façon d'animer mes équipes. ORION PLUS, c'est un investissement, pas une dépense.",
    stars: 5,
  },
];

const FAQ_PLUS = [
  {
    q: "Comment se déroulent les séances de coaching ?",
    a: "Les 3 séances individuelles (60 min chacune) se font en visio. Tu choisis les créneaux sur un calendrier partagé après ton inscription.",
  },
  {
    q: "Y a-t-il une garantie satisfaction ?",
    a: "Oui. Si après la première séance de coaching tu n'es pas satisfait, nous te remboursons intégralement — sans question.",
  },
  {
    q: "Pendant combien de temps ai-je accès à ORION PLUS ?",
    a: "L'accès aux modules et au coach IA est à vie. Les 3 séances de coaching doivent être utilisées dans les 6 mois suivant l'achat.",
  },
  {
    q: "ORION PLUS est-il adapté aux débutants ?",
    a: "Oui. Le coaching individuel s'adapte à ton niveau, qu'il soit débutant ou avancé. C'est justement l'avantage de l'accompagnement personnalisé.",
  },
];

export default function OrionPlusPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/8 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold">
              <Crown size={16} />
              Offre Premium — Places limitées
            </div>
            <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              ORION{" "}
              <span className="bg-gradient-to-r from-gold-dark via-gold to-gold-light bg-clip-text text-transparent">
                PLUS
              </span>
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-xl leading-relaxed text-slate-300">
              L&apos;accompagnement d&apos;élite pour ceux qui veulent aller plus loin — plus vite.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-slate-400">
              Formation complète, coach IA illimité, séances individuelles avec un expert et communauté privée.
              Tout ce qu&apos;il faut pour transformer définitivement ta communication.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/inscription"
                className="btn-primary gap-2 px-8 py-4 text-base"
              >
                Rejoindre ORION PLUS — 497€
                <ArrowRight size={18} />
              </Link>
              <Link href="#details" className="btn-outline px-8 py-4 text-base">
                Découvrir l&apos;offre
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Garantie satisfait ou remboursé 14 jours · Paiement sécurisé
            </p>
          </div>
        </section>

        {/* What's included */}
        <section id="details" className="bg-navy-light py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Tout ce qui est inclus
              </h2>
              <p className="text-slate-400">
                Une offre conçue pour les personnes sérieuses dans leur progression.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="card-orion border-gold/10 hover:border-gold/30 transition-colors duration-200"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing card */}
        <section className="py-24">
          <div className="mx-auto max-w-lg px-4 md:px-6">
            <div className="relative rounded-2xl border border-gold/30 bg-navy-light p-8 shadow-gold-glow">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-1.5 text-sm font-bold text-[#0b1120]">
                  <Crown size={14} />
                  ORION PLUS
                </span>
              </div>
              <div className="mb-6 text-center">
                <div className="mb-1 text-5xl font-bold text-white">497€</div>
                <div className="text-slate-400">Paiement unique — accès à vie</div>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  "Tous les modules + contenus exclusifs",
                  "Simulations IA illimitées",
                  "3 séances coaching individuel (visio)",
                  "Feedback personnalisé par expert",
                  "Certification Premium ORION PLUS",
                  "Passeport de compétences avancé",
                  "Groupe privé mastermind",
                  "Accès prioritaire aux nouveautés",
                  "Garantie satisfait ou remboursé 14 jours",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-slate-300">
                    <Check size={16} className="shrink-0 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/inscription"
                className="btn-primary w-full justify-center gap-2 py-4 text-base"
              >
                Rejoindre ORION PLUS
                <ArrowRight size={18} />
              </Link>
              <p className="mt-3 text-center text-xs text-slate-500">
                Paiement sécurisé · Places limitées
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-navy-light py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-3xl font-bold text-white">
                Ils ont rejoint ORION PLUS
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIALS_PLUS.map((t) => (
                <div key={t.name} className="card-orion">
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">
                    &quot;{t.content}&quot;
                  </p>
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <h2 className="mb-10 text-center text-3xl font-bold text-white">
              Questions fréquentes
            </h2>
            <div className="space-y-4">
              {FAQ_PLUS.map(({ q, a }) => (
                <div key={q} className="card-orion">
                  <h3 className="mb-2 font-semibold text-white">{q}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-navy-light py-20">
          <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
            <Crown size={40} className="mx-auto mb-6 text-gold" />
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Prêt à passer au niveau supérieur ?
            </h2>
            <p className="mb-8 text-slate-400">
              Rejoins les membres ORION PLUS et transforme définitivement ta communication.
            </p>
            <Link
              href="/inscription"
              className="btn-primary gap-2 px-10 py-4 text-base"
            >
              Rejoindre ORION PLUS — 497€
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
