import Link from 'next/link';
import {
  Camera,
  Zap,
  Droplets,
  Flame,
  Wind,
  Shield,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DOMAIN_LABELS } from '@/types';
import type { Domain } from '@/types';

const DOMAINS: { id: Domain; icon: React.ReactNode }[] = [
  { id: 'electricite', icon: <Zap className="h-5 w-5" /> },
  { id: 'plomberie', icon: <Droplets className="h-5 w-5" /> },
  { id: 'securite_incendie', icon: <Flame className="h-5 w-5" /> },
  { id: 'climatisation', icon: <Wind className="h-5 w-5" /> },
  { id: 'petits_travaux', icon: <Shield className="h-5 w-5" /> },
  { id: 'peinture', icon: <span className="text-lg">🎨</span> },
  { id: 'cloisons', icon: <span className="text-lg">🧱</span> },
  { id: 'montage_mobilier', icon: <span className="text-lg">🪑</span> },
  { id: 'entretien_logement', icon: <span className="text-lg">🏠</span> },
  { id: 'diagnostic_general', icon: <span className="text-lg">🔍</span> },
];

const HOW_IT_WORKS = [
  {
    step: '1',
    title: 'Envoyez une photo ou décrivez',
    desc: 'Photo, description texte ou message vocal de votre panne ou travaux.',
    icon: <Camera className="h-6 w-6 text-indigo-600" />,
  },
  {
    step: '2',
    title: "L'IA analyse et classe",
    desc: "Le système détecte le domaine, route vers le meilleur modèle et analyse en profondeur.",
    icon: <Zap className="h-6 w-6 text-indigo-600" />,
  },
  {
    step: '3',
    title: 'Diagnostic structuré',
    desc: 'Causes probables, niveau de danger, vérifications simples, matériel, estimation de prix.',
    icon: <CheckCircle2 className="h-6 w-6 text-indigo-600" />,
  },
  {
    step: '4',
    title: 'Mise en relation artisan',
    desc: "Si une intervention est nécessaire, demandez un devis directement depuis le rapport.",
    icon: <Star className="h-6 w-6 text-indigo-600" />,
  },
];

const TESTIMONIALS = [
  {
    name: 'Sophie M.',
    role: 'Propriétaire',
    text: "J'ai envoyé une photo de ma prise qui chauffe. En 20 secondes j'avais un diagnostic clair, les vérifications à faire et une alerte sur le danger potentiel. Bluffant.",
    rating: 5,
  },
  {
    name: 'Jean-Pierre K.',
    role: 'Locataire',
    text: "Mon disjoncteur sautait sans raison. L'IA a identifié une probable surcharge sur le circuit cuisine et m'a expliqué exactement quoi faire. J'ai évité une intervention inutile.",
    rating: 5,
  },
  {
    name: 'Marie-Claire T.',
    role: 'Gestionnaire immobilier',
    text: "On l'utilise pour faire un pré-diagnostic avant d'envoyer un artisan. Ça réduit les déplacements inutiles de 40%. Le rapport PDF est très professionnel.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
        <div className="container relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <Clock className="h-3.5 w-3.5" />
              Résultat en moins de 30 secondes
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Prenez une photo de votre panne.
              <span className="mt-2 block text-indigo-600">
                Diagnostic clair en quelques minutes.
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              L&apos;IA analyse vos photos, vos descriptions et vos messages vocaux pour vous donner
              un pré-diagnostic précis, prudent et actionnable — sur 10 domaines du bâtiment.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/diagnostic">
                <Button size="xl">
                  <Camera className="h-5 w-5" />
                  Analyser ma panne gratuitement
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/tarifs">
                <Button variant="outline" size="xl">
                  Voir les tarifs
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">
              1 diagnostic gratuit · Sans inscription · Résultat structuré
            </p>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900">10 domaines couverts</h2>
            <p className="mt-2 text-gray-500">
              Électricité, plomberie, sécurité incendie et bien plus
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {DOMAINS.map(({ id, icon }) => (
              <Link
                key={id}
                href={`/diagnostic?domain=${id}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 transition-colors group-hover:bg-indigo-100">
                  {icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{DOMAIN_LABELS[id]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Comment ça marche</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">
                    {step.icon}
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-indigo-600 py-20">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-10 text-center text-3xl font-bold text-white">
              Ce que l&apos;IA vous donne
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: '🔍',
                  title: 'Observations détaillées',
                  desc: "Ce que l'IA voit ou comprend dans votre description ou photo",
                },
                {
                  icon: '⚠️',
                  title: 'Niveau de danger',
                  desc: 'Faible, moyen, élevé ou critique — avec alerte si urgence',
                },
                {
                  icon: '🧠',
                  title: 'Causes probables',
                  desc: '3 causes classées par probabilité avec explication claire',
                },
                {
                  icon: '✅',
                  title: 'Vérifications sûres',
                  desc: "Ce que vous pouvez faire sans risque avant l'artisan",
                },
                {
                  icon: '🚫',
                  title: 'Actions à éviter',
                  desc: "Ce qu'il ne faut absolument pas faire — avec pourquoi",
                },
                {
                  icon: '💰',
                  title: 'Estimation de prix',
                  desc: 'Fourchette indicative pour anticiper le budget',
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl bg-white/10 p-5 text-white backdrop-blur-sm">
                  <div className="mb-2 text-2xl">{f.icon}</div>
                  <h3 className="mb-1 font-semibold">{f.title}</h3>
                  <p className="text-sm text-indigo-100">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Ils ont utilisé IA Artisan
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-gray-700">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900">Prêt à analyser votre problème ?</h2>
          <p className="mt-3 text-gray-500">1 diagnostic gratuit offert. Aucune inscription requise.</p>
          <div className="mt-8">
            <Link href="/diagnostic">
              <Button size="xl">
                <Camera className="h-5 w-5" />
                Commencer maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
