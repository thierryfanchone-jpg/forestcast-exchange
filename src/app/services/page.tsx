import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  Wrench,
  Lightbulb,
  Car,
  Flame,
  Shield,
  Settings,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Nos Services",
  description:
    "Découvrez tous les services d'ElectroSécurité Inc : installation électrique, dépannage, sécurité incendie, bornes de recharge et plus en Martinique.",
};

const services = [
  {
    id: "installation",
    icon: Zap,
    title: "Installation électrique",
    badge: "Résidentiel & Professionnel",
    description:
      "Que vous construisiez une maison neuve ou rénoviez votre installation existante, nous réalisons tous vos travaux d'électricité dans les règles de l'art. Conformité NF C 15-100 garantie.",
    prestations: [
      "Pose de tableau électrique (TGBT)",
      "Câblage et circuits électriques",
      "Installation de prises et interrupteurs",
      "Mise aux normes de l'installation",
      "Vérification CONSUEL",
      "Électricité pour locaux professionnels",
    ],
    color: "yellow",
  },
  {
    id: "depannage",
    icon: Wrench,
    title: "Dépannage & diagnostic",
    badge: "Disponible 7j/7",
    description:
      "Panne de courant, disjoncteur qui saute, prise défectueuse ? Nous intervenons rapidement. Le diagnostic à distance par IA permet souvent de résoudre le problème sans déplacement.",
    prestations: [
      "Diagnostic IA à distance (4,90 € TTC)",
      "Diagnostic humain à distance (19,90 € TTC)",
      "Visio dépannage avec technicien (49,90 € TTC)",
      "Intervention sur site (sur devis)",
      "Recherche de panne complexe",
      "Dépannage tableau électrique",
    ],
    color: "red",
  },
  {
    id: "eclairage",
    icon: Lightbulb,
    title: "Éclairage d'ambiance",
    badge: "Économies d'énergie",
    description:
      "Transformez l'ambiance de vos espaces avec des solutions d'éclairage LED modernes et économiques. Intérieur, extérieur, architectural — nous concevons votre projet lumière sur mesure.",
    prestations: [
      "Spots LED encastrés",
      "Éclairage extérieur",
      "Variateurs et domotique",
      "Éclairage architectural",
      "Remplacement par LED économique",
      "Éclairage commercial et industriel",
    ],
    color: "yellow",
  },
  {
    id: "borne",
    icon: Car,
    title: "Borne de recharge IRVE",
    badge: "Véhicules électriques",
    description:
      "L'avenir est électrique. Nous installons vos bornes de recharge pour véhicules électriques (IRVE) à domicile et en entreprise, avec les qualifications requises.",
    prestations: [
      "Installation borne IRVE mono et triphasé",
      "Borne résidentielle 7 kW",
      "Station entreprise multi-points",
      "Mise en conformité électrique",
      "Conseil choix de la borne",
      "Maintenance et SAV",
    ],
    color: "yellow",
  },
  {
    id: "incendie",
    icon: Flame,
    title: "Sécurité incendie",
    badge: "Conformité ERP & Habitation",
    description:
      "La sécurité incendie est une obligation légale. Nous installons et maintenons tous les équipements de protection contre l'incendie pour les particuliers et les établissements recevant du public.",
    prestations: [
      "Détecteurs de fumée (DAAF)",
      "Système Sécurité Incendie (SSI)",
      "Alarmes incendie Type 4",
      "Extinction automatique",
      "Éclairage de sécurité (BAES)",
      "Audit et mise en conformité ERP",
    ],
    color: "red",
  },
  {
    id: "intrusion",
    icon: Shield,
    title: "Sécurité intrusion",
    badge: "Protection 24h/24",
    description:
      "Protégez votre maison et votre entreprise contre les intrusions. Nous installons des systèmes d'alarme performants, des caméras et des contrôles d'accès adaptés à vos besoins.",
    prestations: [
      "Alarme anti-intrusion filaire et sans fil",
      "Caméras de surveillance IP",
      "Contrôle d'accès et visiophone",
      "Télésurveillance 24h/24",
      "Détecteurs de mouvement",
      "Centrale d'alarme connectée",
    ],
    color: "yellow",
  },
  {
    id: "maintenance",
    icon: Settings,
    title: "Maintenance électrique",
    badge: "Contrats disponibles",
    description:
      "Évitez les pannes imprévues grâce à nos contrats de maintenance préventive. Nous vérifions régulièrement vos installations pour garantir sécurité et continuité de service.",
    prestations: [
      "Contrat de maintenance annuel",
      "Vérification périodique des tableaux",
      "Thermographie infrarouge",
      "Rapport d'inspection détaillé",
      "Remplacement préventif des composants",
      "Assistance téléphonique prioritaire",
    ],
    color: "yellow",
  },
  {
    id: "securite",
    icon: CheckCircle,
    title: "Mise en sécurité",
    badge: "Mise aux normes",
    description:
      "Une installation vieillissante peut présenter des risques graves. Notre diagnostic complet identifie toutes les anomalies et nous procédons à la mise en conformité complète.",
    prestations: [
      "Diagnostic complet de l'installation",
      "Rapport d'anomalies détaillé",
      "Mise en conformité NF C 15-100",
      "Remplacement des câbles défectueux",
      "Mise à la terre et différentiel",
      "Attestation de conformité",
    ],
    color: "red",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="border-b border-gray-800 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-yellow-400">
            Nos prestations
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl">
            Services électriques & sécurité
          </h1>
          <p className="text-lg text-gray-400">
            De l&apos;installation à la maintenance, en passant par le dépannage
            et la sécurité — une offre complète pour particuliers et
            professionnels en Martinique.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.id}
                id={service.id}
                className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden"
              >
                <div
                  className={`grid gap-0 lg:grid-cols-2 ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  <div className="p-8 lg:p-10">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400/10">
                        <Icon className="h-6 w-6 text-yellow-400" />
                      </div>
                      <span className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-400">
                        {service.badge}
                      </span>
                    </div>
                    <h2 className="mb-4 text-2xl font-extrabold text-white">
                      {service.title}
                    </h2>
                    <p className="mb-6 leading-relaxed text-gray-400">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="/reservation"
                        className="flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
                      >
                        Demander un devis
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={`tel:${siteConfig.phone}`}
                        className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-700"
                      >
                        <Phone className="h-4 w-4" />
                        Appeler
                      </a>
                    </div>
                  </div>
                  <div
                    className={`border-t border-gray-800 p-8 lg:border-l lg:border-t-0 lg:p-10 ${isEven ? "" : "lg:order-first"}`}
                  >
                    <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-gray-400">
                      Ce que nous faisons
                    </h3>
                    <ul className="space-y-3">
                      {service.prestations.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-800 bg-gray-900 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-2xl font-extrabold text-white">
            Vous avez un projet ?
          </h2>
          <p className="mb-8 text-gray-400">
            Contactez-nous pour obtenir un devis gratuit et personnalisé.
            Intervention dans toute la Martinique.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/reservation"
              className="flex items-center gap-2 rounded-lg bg-yellow-400 px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
            >
              Demander un devis gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/depannage-ia"
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700"
            >
              <Zap className="h-4 w-4" />
              Diagnostic IA
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
