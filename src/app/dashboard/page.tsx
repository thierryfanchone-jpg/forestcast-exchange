import Link from 'next/link';
import {
  Camera,
  FileText,
  Clock,
  ChevronRight,
  Zap,
  Droplets,
  Flame,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { UrgencyBadge } from '@/components/ui/Badge';
import type { Metadata } from 'next';
import type { UrgencyLevel } from '@/types';

export const metadata: Metadata = {
  title: 'Mon espace',
};

// Mock data — will be replaced with DB queries once auth is wired
const MOCK_DIAGNOSTICS = [
  {
    id: 'diag-1',
    date: '2026-06-01T14:30:00Z',
    inputType: 'photo',
    domain: 'Électricité',
    icon: <Zap className="h-4 w-4 text-yellow-500" />,
    summary: 'Prise murale défectueuse avec traces de brûlure.',
    urgency: 'eleve' as UrgencyLevel,
    hasReport: true,
  },
  {
    id: 'diag-2',
    date: '2026-05-28T09:15:00Z',
    inputType: 'text',
    domain: 'Plomberie',
    icon: <Droplets className="h-4 w-4 text-blue-500" />,
    summary: 'Fuite sous l\'évier de cuisine, joint usé probable.',
    urgency: 'moyen' as UrgencyLevel,
    hasReport: false,
  },
  {
    id: 'diag-3',
    date: '2026-05-20T17:00:00Z',
    inputType: 'photo',
    domain: 'Sécurité incendie',
    icon: <Flame className="h-4 w-4 text-red-500" />,
    summary: 'Détecteur de fumée ne répond plus au test manuel.',
    urgency: 'critique' as UrgencyLevel,
    hasReport: true,
  },
];

const INPUT_LABELS: Record<string, string> = {
  photo: 'Photo',
  text: 'Texte',
  audio: 'Audio',
  video: 'Vidéo',
};

export default function DashboardPage() {
  const diagnosticsLeft = 1;
  const totalDiagnostics = MOCK_DIAGNOSTICS.length;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mon espace</h1>
            <p className="mt-1 text-gray-500">Historique de vos diagnostics et rapports.</p>
          </div>
          <Link href="/diagnostic">
            <Button size="md">
              <Camera className="h-4 w-4" />
              Nouveau diagnostic
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Diagnostics effectués', value: totalDiagnostics, sub: 'au total' },
            { label: 'Diagnostics restants', value: diagnosticsLeft, sub: 'plan Gratuit' },
            { label: 'Rapports générés', value: 2, sub: 'téléchargeables' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
            >
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className="mt-1 text-3xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        {diagnosticsLeft <= 1 && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 px-5 py-4">
            <div>
              <p className="font-semibold text-indigo-900">
                Plus qu&apos;1 diagnostic gratuit
              </p>
              <p className="mt-0.5 text-sm text-indigo-700">
                Passez en Premium pour des diagnostics illimités à 19,90 €/mois.
              </p>
            </div>
            <Link href="/tarifs">
              <Button size="sm">
                Passer Premium
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Diagnostics list */}
        <div>
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Mes diagnostics</h2>

          {MOCK_DIAGNOSTICS.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center">
              <Camera className="mx-auto mb-3 h-10 w-10 text-gray-200" />
              <p className="font-medium text-gray-500">Aucun diagnostic pour l&apos;instant</p>
              <p className="mt-1 text-sm text-gray-400">
                Commencez par analyser une panne.
              </p>
              <Link href="/diagnostic" className="mt-4 inline-block">
                <Button size="sm">Faire mon premier diagnostic</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {MOCK_DIAGNOSTICS.map((d) => (
                <div
                  key={d.id}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                      {d.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 leading-snug">{d.summary}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                        <span>{d.domain}</span>
                        <span>·</span>
                        <span>{INPUT_LABELS[d.inputType]}</span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(d.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <UrgencyBadge level={d.urgency} />
                    {d.hasReport && (
                      <Button variant="outline" size="sm">
                        <FileText className="h-3.5 w-3.5" />
                        Rapport
                      </Button>
                    )}
                    <Button variant="secondary" size="sm">
                      Voir
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
