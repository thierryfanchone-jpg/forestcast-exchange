import { Star, MapPin, Shield, ChevronRight, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artisans partenaires',
  description: 'Trouvez un artisan qualifié pour votre intervention. Mise en relation via IA Artisan.',
};

const MOCK_ARTISANS = [
  {
    id: '1',
    name: 'Jean-Michel Rivière',
    company: 'JMR Électricité',
    domains: ['Électricité', 'Sécurité incendie'],
    city: 'Lyon',
    postalCode: '69003',
    rating: 4.9,
    reviewCount: 87,
    verified: true,
    bio: 'Électricien certifié avec 15 ans d\'expérience. Interventions résidentielles et commerciales.',
  },
  {
    id: '2',
    name: 'Sophie Lecomte',
    company: 'Plomberie Lecomte',
    domains: ['Plomberie', 'Climatisation'],
    city: 'Paris',
    postalCode: '75011',
    rating: 4.8,
    reviewCount: 124,
    verified: true,
    bio: 'Plombière et installateur CVC. Urgences disponible 7j/7.',
  },
  {
    id: '3',
    name: 'Marc Dupuis',
    company: 'Dupuis Rénovation',
    domains: ['Peinture', 'Cloisons', 'Petits travaux'],
    city: 'Bordeaux',
    postalCode: '33000',
    rating: 4.7,
    reviewCount: 56,
    verified: true,
    bio: 'Spécialiste rénovation intérieure. Devis gratuit sous 48h.',
  },
  {
    id: '4',
    name: 'Ahmed Benali',
    company: 'Benali Multiservices',
    domains: ['Entretien logement', 'Montage mobilier', 'Petits travaux'],
    city: 'Marseille',
    postalCode: '13001',
    rating: 4.6,
    reviewCount: 203,
    verified: true,
    bio: 'Home service complet. Plus de 200 avis clients. Réactivité garantie.',
  },
];

export default function ArtisansPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Artisans partenaires</h1>
          <p className="mt-2 text-gray-500">
            Des professionnels vérifiés qui reçoivent vos rapports et vous contactent rapidement.
          </p>
        </div>

        {/* CTA — become artisan */}
        <div className="mb-8 flex items-center justify-between rounded-2xl border border-indigo-100 bg-indigo-50 px-6 py-5">
          <div>
            <h2 className="font-semibold text-indigo-900">Vous êtes artisan ?</h2>
            <p className="mt-0.5 text-sm text-indigo-700">
              Rejoignez le réseau IA Artisan et recevez des demandes de clients qualifiées.
            </p>
          </div>
          <Link href="/tarifs">
            <Button variant="primary" size="md">
              Devenir partenaire
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Search / filters placeholder */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Ville, code postal…"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none"
          />
          <select className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 focus:border-indigo-400 focus:outline-none">
            <option value="">Tous les domaines</option>
            <option value="electricite">Électricité</option>
            <option value="plomberie">Plomberie</option>
            <option value="climatisation">Climatisation</option>
            <option value="peinture">Peinture</option>
            <option value="cloisons">Cloisons</option>
          </select>
          <Button variant="primary" size="md">
            Rechercher
          </Button>
        </div>

        {/* Artisan cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {MOCK_ARTISANS.map((a) => (
            <div
              key={a.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100">
                  <Wrench className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{a.name}</h3>
                    {a.verified && (
                      <span title="Profil vérifié">
                        <Shield className="h-4 w-4 text-blue-500" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{a.company}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {a.city} ({a.postalCode})
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {a.rating} ({a.reviewCount} avis)
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600">{a.bio}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {a.domains.map((d) => (
                  <span
                    key={d}
                    className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                  >
                    {d}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button variant="primary" size="sm">
                  Demander un devis
                </Button>
                <Button variant="outline" size="sm">
                  Envoyer un rapport
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-400">
          {MOCK_ARTISANS.length} artisans affichés · Réseau en cours de déploiement
        </p>
      </div>
    </div>
  );
}
