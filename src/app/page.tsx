import Link from "next/link";
import { BookOpen, MessageSquare, Award, Star, Check, Zap, Target, Brain } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DEMO_COURSES, PRICING_PLANS, TESTIMONIALS } from "@/lib/demo-data";
import { formatPrice } from "@/lib/utils";
import { FAQSection } from "@/components/home/FAQSection";


const HOW_IT_WORKS = [
  {
    step: "01",
    icon: BookOpen,
    title: "Choisis ton module",
    desc: "Sélectionne le module qui correspond à ton objectif : prise de parole, entretien, pitch ou leadership.",
  },
  {
    step: "02",
    icon: MessageSquare,
    title: "Entraîne-toi avec l'IA",
    desc: "Pratique avec notre coach IA qui t'analyse, te guide et te corrige en temps réel selon ton niveau.",
  },
  {
    step: "03",
    icon: Award,
    title: "Obtiens ta certification",
    desc: "Valide tes compétences, télécharge ton certificat officiel et construis ton passeport professionnel.",
  },
];

const CERT_LEVELS = [
  { name: "Bronze", range: "60 – 74 %", color: "text-amber-600", border: "border-amber-600/30", bg: "bg-amber-600/10", icon: "🥉" },
  { name: "Argent", range: "75 – 89 %", color: "text-slate-400", border: "border-slate-400/30", bg: "bg-slate-400/10", icon: "🥈" },
  { name: "Or", range: "90 – 100 %", color: "text-gold", border: "border-gold/30", bg: "bg-gold/10", icon: "🥇" },
];

const AI_FEATURES = [
  { icon: Zap, text: "Analyse instantanée de ton discours" },
  { icon: Target, text: "Score détaillé sur 7 critères" },
  { icon: MessageSquare, text: "Correction personnalisée et exemples" },
  { icon: Brain, text: "Exercices adaptatifs selon ton niveau" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy-light" />
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-orion-blue/5 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-gold">
              <Zap size={14} />
              Coach IA disponible 24h/24 — 7j/7
            </div>

            <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Développe les compétences{" "}
              <span className="gradient-gold">qui changent une vie.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
              ORION ACADEMY t&apos;aide à parler avec clarté, réussir tes entretiens, convaincre et progresser grâce à des modules courts et un coach IA.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/inscription" className="btn-primary px-8 py-4 text-base">
                Commencer gratuitement
              </Link>
              <Link href="/formations" className="btn-outline px-8 py-4 text-base">
                Voir les formations
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              {[
                { value: "5", label: "modules pratiques" },
                { value: "10 000+", label: "apprenants" },
                { value: "Coach IA", label: "disponible 24/7" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-gold md:text-3xl">{value}</div>
                  <div className="mt-1 text-sm text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-navy-light py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="section-title mb-4">Comment ça marche ?</h2>
              <p className="section-subtitle mx-auto max-w-xl">
                Trois étapes simples pour transformer ta communication.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
                <div key={step} className="relative text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gold/10 text-gold">
                    <Icon size={28} />
                  </div>
                  <div className="mb-2 text-4xl font-bold text-navy-border">{step}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
                  <p className="text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="section-title mb-4">Nos modules de formation</h2>
              <p className="section-subtitle mx-auto max-w-xl">
                Des programmes courts et intensifs pour progresser rapidement.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {DEMO_COURSES.map((course) => (
                <div key={course.id} className="card-orion card-hover group overflow-hidden">
                  <div className={`h-24 rounded-lg bg-gradient-to-br ${course.color} mb-4 flex items-center px-6`}>
                    <div>
                      <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                        {course.category}
                      </div>
                      <div className="text-xl font-bold text-white">{course.title}</div>
                    </div>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{course.subtitle}</h3>
                  <p className="mb-4 text-sm text-slate-400 line-clamp-2">{course.description}</p>
                  <div className="mb-4 flex items-center gap-3 text-xs text-slate-500">
                    <span className="badge-gold">{course.level}</span>
                    <span>{course.duration_hours}h de contenu</span>
                    <span>{course.lesson_count} leçons</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gold">{formatPrice(course.price)}</span>
                    <Link
                      href={`/formations/${course.slug}`}
                      className="btn-secondary py-2 px-4 text-xs"
                    >
                      Voir le module
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link href="/formations" className="btn-outline px-8">
                Voir toutes les formations
              </Link>
            </div>
          </div>
        </section>

        {/* AI Coach */}
        <section className="bg-navy-light py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-1.5 text-sm text-gold">
                  <Brain size={14} />
                  Intelligence Artificielle
                </div>
                <h2 className="section-title mb-6">
                  Ton coach IA personnel,{" "}
                  <span className="gradient-gold">disponible 24/7</span>
                </h2>
                <p className="mb-8 text-slate-400">
                  Le coach IA ORION ACADEMY analyse chaque mot de ton discours, t&apos;identifie tes forces et faiblesses, et te propose des exercices personnalisés pour progresser rapidement.
                </p>
                <ul className="space-y-4">
                  {AI_FEATURES.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                        <Icon size={16} />
                      </div>
                      <span className="text-slate-300">{text}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard/coach" className="btn-primary mt-8 inline-flex">
                  Essayer le coach IA
                </Link>
              </div>

              {/* Mock chat UI */}
              <div className="card-orion p-6">
                <div className="mb-4 flex items-center gap-3 border-b border-navy-border pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold font-bold text-sm">
                    IA
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">Coach ORION</div>
                    <div className="text-xs text-green-400">● En ligne</div>
                  </div>
                  <div className="ml-auto">
                    <span className="badge-gold">Entretien</span>
                  </div>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-end">
                    <div className="max-w-xs rounded-lg rounded-tr-sm bg-orion-blue/20 px-4 py-2.5 text-slate-300">
                      Je suis quelqu&apos;un de motivé et je travaille très dur dans tout ce que j&apos;entreprends...
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold text-xs font-bold">IA</div>
                    <div className="max-w-xs rounded-lg rounded-tl-sm bg-navy-muted px-4 py-2.5 text-slate-300">
                      <div className="mb-2 font-semibold text-gold">Score : 6/10</div>
                      <div className="mb-1 text-green-400 text-xs">✓ Bonne énergie</div>
                      <div className="mb-2 text-red-400 text-xs">✗ Trop de généralités — cite des exemples précis</div>
                      <div className="text-xs text-slate-500">Exercice : Présente-toi avec 2 réalisations chiffrées...</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 border-t border-navy-border pt-4">
                  <input
                    type="text"
                    placeholder="Écris ta réponse..."
                    className="input-orion flex-1 py-2 text-xs"
                    readOnly
                  />
                  <button className="btn-primary py-2 px-3 text-xs">Envoyer</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="section-title mb-4">Certifications reconnues</h2>
              <p className="section-subtitle mx-auto max-w-xl">
                Valide tes compétences et obtiens des certifications vérifiables par QR code.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {CERT_LEVELS.map(({ name, range, color, border, bg, icon }) => (
                <div key={name} className={`card-orion border ${border} text-center`}>
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${bg} text-3xl`}>
                    {icon}
                  </div>
                  <h3 className={`mb-2 text-xl font-bold ${color}`}>Certification {name}</h3>
                  <p className="mb-4 text-sm text-slate-400">Score {range}</p>
                  <div className="space-y-2 text-left text-sm text-slate-400">
                    <div className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Certificat PDF téléchargeable</div>
                    <div className="flex items-center gap-2"><Check size={14} className="text-green-400" /> QR code vérifiable</div>
                    <div className="flex items-center gap-2"><Check size={14} className="text-green-400" /> Badge numérique</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-navy-light py-24" id="tarifs">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="section-title mb-4">Tarifs transparents</h2>
              <p className="section-subtitle mx-auto max-w-xl">
                Choisis la formule qui correspond à tes ambitions.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`card-orion flex flex-col ${plan.is_popular ? "border-gold/40 shadow-gold-sm" : ""}`}
                >
                  {plan.is_popular && (
                    <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold self-start">
                      ⭐ Populaire
                    </div>
                  )}
                  <h3 className="mb-1 text-lg font-bold text-white">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gold">{formatPrice(plan.price)}</span>
                    {plan.period && <span className="text-sm text-slate-400">/{plan.period}</span>}
                  </div>
                  <p className="mb-4 text-xs text-slate-400">{plan.description}</p>
                  <ul className="mb-6 flex-1 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check size={12} className="mt-0.5 shrink-0 text-green-400" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.price === 0 ? "/inscription" : `/tarifs`}
                    className={plan.is_popular ? "btn-primary text-sm" : "btn-outline text-sm"}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="section-title mb-4">Ce que disent nos apprenants</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className="card-orion">
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: t.score }).map((_, i) => (
                      <Star key={i} size={14} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-slate-300">&quot;{t.content}&quot;</p>
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
        <section className="bg-navy-light py-24">
          <div className="mx-auto max-w-4xl px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="section-title mb-4">Questions fréquentes</h2>
            </div>
            <FAQSection />
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
            <h2 className="section-title mb-4">
              Prêt à transformer ta communication ?
            </h2>
            <p className="section-subtitle mb-10">
              Rejoins 10 000+ apprenants qui ont déjà changé leur carrière avec ORION ACADEMY.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/inscription" className="btn-primary px-8 py-4 text-base">
                Commencer gratuitement
              </Link>
              <Link href="/formations" className="btn-outline px-8 py-4 text-base">
                Voir les formations
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
