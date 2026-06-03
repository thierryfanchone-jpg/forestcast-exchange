import {
  Inbox,
  FileText,
  Clock,
  CheckCircle2,
  ChevronRight,
  Star,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { UrgencyBadge } from '@/components/ui/Badge';
import type { Metadata } from 'next';
import type { UrgencyLevel } from '@/types';

export const metadata: Metadata = {
  title: 'Dashboard Artisan',
};

const MOCK_REQUESTS = [
  {
    id: 'req-1',
    clientName: 'Sophie M.',
    city: 'Lyon 3e',
    domain: 'Électricité',
    summary: 'Prise murale avec traces de brûlure, probable court-circuit.',
    urgency: 'eleve' as UrgencyLevel,
    receivedAt: '2026-06-03T09:15:00Z',
    status: 'pending',
    hasReport: true,
  },
  {
    id: 'req-2',
    clientName: 'Jean-Pierre K.',
    city: 'Lyon 6e',
    domain: 'Électricité',
    summary: 'Disjoncteur qui saute régulièrement sur le circuit cuisine.',
    urgency: 'moyen' as UrgencyLevel,
    receivedAt: '2026-06-02T16:40:00Z',
    status: 'quoted',
    hasReport: true,
  },
  {
    id: 'req-3',
    clientName: 'Marie T.',
    city: 'Villeurbanne',
    domain: 'Sécurité incendie',
    summary: 'Détecteur de fumée défaillant dans une maison de 120m².',
    urgency: 'critique' as UrgencyLevel,
    receivedAt: '2026-06-01T08:00:00Z',
    status: 'accepted',
    hasReport: false,
  },
];

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: 'En attente', color: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  quoted: { label: 'Devis envoyé', color: 'text-blue-700 bg-blue-50 border-blue-200' },
  accepted: { label: 'Accepté', color: 'text-green-700 bg-green-50 border-green-200' },
  completed: { label: 'Terminé', color: 'text-gray-700 bg-gray-50 border-gray-200' },
};

export default function ArtisanDashboardPage() {
  const stats = {
    requestsThisMonth: 12,
    quotesAccepted: 8,
    revenue: '4 200 €',
    rating: 4.9,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Artisan</h1>
            <p className="mt-1 text-gray-500">Gérez vos demandes, devis et interventions.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Profil actif
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-4">
          {[
            { label: 'Demandes ce mois', value: stats.requestsThisMonth, icon: <Inbox className="h-5 w-5 text-indigo-500" /> },
            { label: 'Devis acceptés', value: stats.quotesAccepted, icon: <CheckCircle2 className="h-5 w-5 text-green-500" /> },
            { label: 'Chiffre du mois', value: stats.revenue, icon: <TrendingUp className="h-5 w-5 text-blue-500" /> },
            { label: 'Note moyenne', value: `${stats.rating} ★`, icon: <Star className="h-5 w-5 text-yellow-500" /> },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                {s.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{s.label}</p>
                <p className="text-xl font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Requests */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Demandes reçues</h2>
            <div className="flex gap-2">
              {['Toutes', 'En attente', 'En cours'].map((tab) => (
                <button
                  key={tab}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_REQUESTS.map((req) => {
              const statusCfg = STATUS_CONFIG[req.status];
              return (
                <div
                  key={req.id}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-gray-900">{req.clientName}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-sm text-gray-500">{req.city}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-sm text-indigo-600 font-medium">{req.domain}</span>
                      </div>
                      <p className="text-sm text-gray-700">{req.summary}</p>
                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        Reçu le {new Date(req.receivedAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>

                    <div className="flex flex-wrap shrink-0 items-center gap-2">
                      <UrgencyBadge level={req.urgency} />
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusCfg.color}`}
                      >
                        {statusCfg.label}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-50 pt-4">
                    {req.hasReport && (
                      <Button variant="outline" size="sm">
                        <FileText className="h-3.5 w-3.5" />
                        Voir le rapport client
                      </Button>
                    )}
                    {req.status === 'pending' && (
                      <Button variant="primary" size="sm">
                        Envoyer un devis
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {req.status === 'quoted' && (
                      <Button variant="secondary" size="sm">
                        Relancer le client
                      </Button>
                    )}
                    {req.status === 'accepted' && (
                      <Button variant="secondary" size="sm">
                        Planifier l&apos;intervention
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upgrade hint */}
        <div className="mt-8 rounded-xl border border-gray-100 bg-white p-5">
          <p className="text-sm text-gray-500">
            Plan <strong>Artisan Pro</strong> actif ·{' '}
            <Link href="/tarifs" className="text-indigo-600 hover:underline">
              Gérer mon abonnement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
