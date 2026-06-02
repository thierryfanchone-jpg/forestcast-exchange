import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Phone,
  MessageCircle,
  Wrench,
  Lightbulb,
  Car,
  Flame,
  Shield,
  Settings,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Accueil — ElectroSécurité Inc",
  description:
    "Électricité, sécurité incendie et dépannage à distance en Martinique. Diagnostic IA disponible dès 4,90 € TTC.",
};

const services = [
  {
    icon: Zap,
    title: "Installation électrique",
    description:
      "Tableaux électriques, circuits, prises, interrupteurs. Mise aux normes NF C 15-100.",
    href: "/services#installation",
  },
  {
    icon: Wrench,
    title: "Dépannage & diagnostic",
    description:
      "Intervention rapide en cas de panne. Diagnostic à distance par IA ou technicien humain.",
    href: "/depannage-ia",
  },
  {
    icon: Lightbulb,
    title: "Éclairage d'ambiance",
    description:
      "LED, spots encastrés, variateurs, éclairage architectural. Économies d'énergie garanties.",
    href: "/services#eclairage",
  },
  {
    icon: Car,
    title: "Borne de recharge",
    description:
      "Installation de bornes IRVE pour véhicules électriques à domicile et en entreprise.",
    href: "/services#borne",
  },
  {
    icon: Flame,
    title: "Sécurité incendie",
    description:
      "Détecteurs de fumée, alarmes incendie, extinction automatique. Conformité ERP.",
    href: "/services#incendie",
  },
  {
    icon: Shield,
    title: "Sécurité intrusion",
    description:
      "Alarmes anti-intrusion, caméras de surveillance, contrôle d'accès 24h/24.",
    href: "/services#intrusion",
  },
  {
    icon: Settings,
    title: "Maintenance électrique",
    description:
      "Contrats de maintenance préventive et curative pour entreprises et particuliers.",
    href: "/services#maintenance",
  },
  {
    icon: CheckCircle,
    title: "Mise en sécurité",
    description:
      "Diagnostic complet, détection des anomalies et mise en conformité selon les normes.",
    href: "/services#securite",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Emergency Banner */}
      <div className="bg-red-600 px-4 py-2 text-center">
        <p className="text-sm font-semibold text-white">
          <AlertTriangle className="mr-2 inline h-4 w-4" />
          Urgence électrique ?{" "}
          <a
            href={`tel:${siteConfig.phone}`}
            className="underline hover:no-underline"
          >
            Appelez le {siteConfig.phoneDisplay}
          </a>{" "}
          — Disponible 7j/7
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-950 px-4 py-20 sm:py-28 lg:py-36">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#FBBF24 1px, transparent 1px), linear-gradient(90deg, #FBBF24 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5">
              <Zap className="h-4 w-4 text-yellow-400" fill="currentColor" />
              <span className="text-sm font-semibold text-yellow-400">
                Martinique — Interventions rapides
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Électricité, sécurité incendie
              <br />
              <span className="text-yellow-400">et dépannage à distance</span>
              <br />
              en Martinique
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400">
              Un problème électrique ? Obtenez un premier diagnostic à distance,
              puis une intervention rapide si nécessaire. Disponible 7j/7 pour
              les urgences.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/depannage-ia"
                className="flex items-center gap-2 rounded-lg bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
              >
                <Zap className="h-4 w-4" fill="currentColor" />
                Diagnostic IA — 4,90 € TTC
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
              >
                <Phone className="h-4 w-4" />
                Appeler maintenant
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-green-500"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
              <Link
                href="/tarifs"
                className="flex items-center gap-2 rounded-lg border border-yellow-400/40 px-6 py-3 text-sm font-bold text-yellow-400 transition-colors hover:border-yellow-400 hover:bg-yellow-400/10"
              >
                Voir les tarifs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: "4,90 €", label: "Diagnostic IA TTC" },
              { value: "7j/7", label: "Urgences disponibles" },
              { value: "10 ans", label: "D'expérience" },
              { value: "100%", label: "Martinique couverte" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 text-center"
              >
                <p className="text-2xl font-extrabold text-yellow-400">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
              Nos prestations
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Un service complet pour tous vos besoins
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              De l&apos;installation électrique à la sécurité incendie, en
              passant par les bornes de recharge et le dépannage urgent.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group rounded-xl border border-gray-800 bg-gray-900 p-6 transition-all hover:border-yellow-400/40 hover:bg-gray-900/80"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400/10">
                    <Icon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="mb-2 font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {service.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800"
            >
              Voir tous nos services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it works — Diagnostic IA */}
      <section className="border-y border-gray-800 bg-gray-900 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
              Nouveau — Dépannage à distance
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Comment fonctionne le Diagnostic IA ?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5">
            {[
              { step: "1", title: "Décrivez", desc: "Expliquez votre problème en quelques mots" },
              { step: "2", title: "Répondez", desc: "L'IA pose des questions ciblées pour affiner le diagnostic" },
              { step: "3", title: "Envoyez", desc: "Partagez une photo de votre installation si nécessaire" },
              { step: "4", title: "Analyse", desc: "L'IA classe l'urgence et identifie la cause probable" },
              { step: "5", title: "Solution", desc: "Proposition de visio ou d'intervention sur site selon le cas" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-400 text-xl font-extrabold text-yellow-400">
                  {item.step}
                </div>
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/depannage-ia"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              <Zap className="h-4 w-4" fill="currentColor" />
              Commencer un diagnostic — 4,90 € TTC
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-red-900/30 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-400" />
          <h2 className="mb-4 text-2xl font-extrabold text-white sm:text-3xl">
            Urgence électrique ?
          </h2>
          <p className="mb-8 text-gray-300">
            Odeur de brûlé, étincelles, tableau électrique en surchauffe, coupure
            totale ? N&apos;attendez pas — appelez immédiatement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-8 py-4 text-base font-extrabold text-white transition-colors hover:bg-red-500"
            >
              <Phone className="h-5 w-5" />
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-gray-600 bg-gray-800 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-gray-700"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp Urgence
            </a>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                Pourquoi nous choisir
              </p>
              <h2 className="mb-6 text-3xl font-extrabold text-white sm:text-4xl">
                L&apos;expertise électrique martiniquaise depuis plus de 10 ans
              </h2>
              <p className="mb-6 text-gray-400 leading-relaxed">
                ElectroSécurité Inc, fondée par Thierry Fanchone, est votre
                partenaire de confiance pour toutes vos installations et
                dépannages électriques en Martinique. Nous combinons savoir-faire
                artisanal et outils numériques modernes pour vous offrir le
                meilleur service.
              </p>
              <ul className="space-y-3">
                {[
                  "Artisan certifié — qualifications reconnues",
                  "Diagnostic à distance dès 4,90 € TTC",
                  "Intervention rapide partout en Martinique",
                  "Devis gratuit et transparent",
                  "Conformité NF C 15-100 garantie",
                  "Urgences traitées 7j/7",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "Sécurité avant tout",
                  desc: "Chaque intervention respecte les normes en vigueur pour votre sécurité.",
                },
                {
                  icon: Zap,
                  title: "Réactivité",
                  desc: "Diagnostic en ligne immédiat, intervention sur site sous 24-48h.",
                },
                {
                  icon: CheckCircle,
                  title: "Qualité certifiée",
                  desc: "Matériaux professionnels, travail soigné, garantie sur les prestations.",
                },
                {
                  icon: Phone,
                  title: "Disponibilité",
                  desc: "Joignable par téléphone, WhatsApp ou email du lundi au samedi.",
                },
              ].map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="rounded-xl border border-gray-800 bg-gray-900 p-5"
                  >
                    <Icon className="mb-3 h-8 w-8 text-yellow-400" />
                    <h3 className="mb-2 font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-gray-400">{card.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
