import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Shield,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowRight,
  Award,
  Users,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire d'ElectroSécurité Inc, fondée par Thierry Fanchone à Le Gros-Morne en Martinique. Expert électricien certifié.",
};

const values = [
  {
    icon: Shield,
    title: "Sécurité avant tout",
    description:
      "Chaque intervention est réalisée dans le strict respect des normes en vigueur (NF C 15-100). La sécurité de nos clients n'est jamais négociée.",
  },
  {
    icon: CheckCircle,
    title: "Qualité & transparence",
    description:
      "Devis détaillé avant chaque intervention, matériaux professionnels certifiés, rapport d'intervention systématique. Aucune mauvaise surprise.",
  },
  {
    icon: Zap,
    title: "Innovation & modernité",
    description:
      "Premiers en Martinique à proposer un diagnostic électrique à distance par IA. Nous combinons savoir-faire traditionnel et outils numériques.",
  },
  {
    icon: Users,
    title: "Proximité & disponibilité",
    description:
      "Ancrés en Martinique depuis plus de 10 ans, nous connaissons les spécificités du terrain local. Joignables 7j/7 pour les urgences.",
  },
];

const certifications = [
  "Qualifications électricien QUALIFELEC",
  "Habilitation électrique H1B1",
  "IRVE — Infrastructure de Recharge Véhicules Électriques",
  "Sécurité incendie — Équipements de Protection Incendie",
  "NF C 15-100 — Installations basse tension",
];

export default function AProposPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                Notre histoire
              </p>
              <h1 className="mb-6 text-4xl font-extrabold text-white sm:text-5xl">
                ElectroSécurité Inc
                <br />
                <span className="text-yellow-400">Martinique</span>
              </h1>
              <p className="mb-5 text-lg leading-relaxed text-gray-300">
                Fondée par Thierry Fanchone à Le Gros-Morne, ElectroSécurité
                Inc est née d&apos;une conviction simple : chaque martiniquais
                mérite un accès rapide, transparent et abordable à l&apos;expertise
                électrique professionnelle.
              </p>
              <p className="mb-5 leading-relaxed text-gray-400">
                Pendant plus de 10 ans, Thierry a travaillé sur tous types
                d&apos;installations en Martinique — maisons individuelles,
                appartements, locaux commerciaux, ERP — accumulant une
                expérience précieuse des spécificités du terrain local : climat
                tropical, installations anciennes, contraintes insulaires.
              </p>
              <p className="leading-relaxed text-gray-400">
                En 2024, il crée ElectroSécurité Inc avec une ambition : rendre
                le diagnostic électrique accessible à tous grâce au numérique,
                tout en conservant l&apos;excellence artisanale qui fait la
                réputation du métier.
              </p>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400/10 border-2 border-yellow-400/30">
                    <Zap className="h-8 w-8 text-yellow-400" fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white">
                      Thierry Fanchone
                    </h2>
                    <p className="text-yellow-400 font-semibold">
                      Fondateur & Gérant
                    </p>
                  </div>
                </div>
                <p className="mb-4 leading-relaxed text-gray-400">
                  Électricien certifié avec plus de 10 ans d&apos;expérience en
                  Martinique. Thierry est intervenu sur toutes sortes
                  d&apos;installations : du simple remplacement de prise à la
                  conception complète de tableaux électriques pour des
                  établissements professionnels.
                </p>
                <p className="leading-relaxed text-gray-400">
                  Sa double compétence électricité / sécurité (incendie et
                  intrusion) lui permet de proposer une offre complète et
                  cohérente, souvent rare chez un artisan indépendant.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <MapPin className="h-4 w-4 text-yellow-400" />
                    Le Gros-Morne
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Award className="h-4 w-4 text-yellow-400" />
                    +10 ans d&apos;exp.
                  </div>
                </div>
              </div>

              {/* SIRET info */}
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-5">
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Informations légales
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300">
                    <span className="text-gray-500">SIRET : </span>
                    {siteConfig.siret}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Siège : </span>
                    {siteConfig.address}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Zone d&apos;intervention : </span>
                    {siteConfig.serviceArea}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
              Nos engagements
            </p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ce qui nous distingue
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="rounded-xl border border-gray-800 bg-gray-900 p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10">
                    <Icon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <h3 className="mb-3 font-bold text-white">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="border-b border-gray-800 bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                Qualifications
              </p>
              <h2 className="mb-6 text-3xl font-extrabold text-white">
                Certifications & habilitations
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                Nos qualifications garantissent que chaque intervention est
                réalisée par un professionnel reconnu, formé aux dernières
                normes et réglementations en vigueur.
              </p>
              <ul className="space-y-3">
                {certifications.map((cert) => (
                  <li key={cert} className="flex items-center gap-3 text-gray-300">
                    <Award className="h-5 w-5 flex-shrink-0 text-yellow-400" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
                Zone d&apos;intervention
              </p>
              <h2 className="mb-6 text-3xl font-extrabold text-white">
                Toute la Martinique
              </h2>
              <p className="mb-6 leading-relaxed text-gray-400">
                Basés à Le Gros-Morne (centre de l&apos;île), nous intervenons
                dans toute la Martinique — du nord de la presqu&apos;île de la
                Caravelle au sud de Sainte-Anne, en passant par Fort-de-France,
                Le Marin, Saint-Pierre et la Trinité.
              </p>
              <div className="rounded-xl border border-gray-800 bg-gray-950 p-6">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Fort-de-France",
                    "Le Lamentin",
                    "Le François",
                    "La Trinité",
                    "Saint-Pierre",
                    "Le Marin",
                    "Sainte-Marie",
                    "Le Robert",
                    "Rivière-Pilote",
                    "Sainte-Anne",
                    "La Rivière-Saléée",
                    "Le Vauclin",
                  ].map((city) => (
                    <div key={city} className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="h-3 w-3 text-yellow-400" />
                      {city}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Et toutes les communes de Martinique
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-extrabold text-white">
            Travaillons ensemble
          </h2>
          <p className="mb-8 text-gray-400">
            Que vous ayez besoin d&apos;un diagnostic rapide ou d&apos;une
            installation complète, nous sommes là pour vous aider.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/reservation"
              className="flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              Prendre rendez-vous
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700"
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
