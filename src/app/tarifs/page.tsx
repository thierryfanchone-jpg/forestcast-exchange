import { CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { PRICING_PLANS } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    'Plans IA Artisan — Gratuit, Particulier, Premium et Artisan Pro. Choisissez votre formule.',
};

const FAQ = [
  {
    q: 'Puis-je utiliser IA Artisan sans compte ?',
    a: "Oui. Le premier diagnostic gratuit ne nécessite pas de compte. Pour accéder à l'historique, aux rapports PDF et à la mise en relation artisan, une inscription rapide est nécessaire.",
  },
  {
    q: 'Les diagnostics sont-ils des avis professionnels ?',
    a: "Non. IA Artisan fournit un pré-diagnostic basé sur l'IA — utile pour comprendre le problème, préparer une intervention ou décider si un professionnel est nécessaire. Il ne remplace pas un diagnostiqueur agréé.",
  },
  {
    q: 'Mes photos sont-elles conservées ?',
    a: "Vos fichiers sont analysés puis stockés dans votre espace sécurisé. Vous pouvez les supprimer à tout moment depuis votre tableau de bord.",
  },
  {
    q: 'Comment fonctionne le plan Artisan ?',
    a: "Le plan Artisan donne accès à un tableau de bord dédié pour recevoir les demandes de devis de clients, consulter leurs rapports, envoyer des devis et gérer vos interventions.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Tarifs transparents</h1>
          <p className="mt-3 text-lg text-gray-500">
            Commencez gratuitement. Évoluez selon vos besoins.
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border bg-white p-6 shadow-sm ${
                plan.highlighted
                  ? 'border-indigo-300 ring-2 ring-indigo-200'
                  : 'border-gray-100'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                  Recommandé
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                </div>
                {plan.period && (
                  <p className="mt-0.5 text-xs text-gray-500">{plan.period}</p>
                )}
                <p className="mt-2 text-sm font-medium text-indigo-600">{plan.diagnostics}</p>
              </div>

              <ul className="mb-6 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link href={plan.id === 'free' ? '/diagnostic' : `/checkout/${plan.id}`}>
                <Button
                  variant={plan.highlighted ? 'primary' : 'outline'}
                  size="md"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Comparaison détaillée
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-gray-500">Fonctionnalité</th>
                  {PRICING_PLANS.map((p) => (
                    <th key={p.id} className="px-4 py-4 text-center font-semibold text-gray-900">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { label: 'Analyse photo', values: [true, true, true, true] },
                  { label: 'Analyse texte', values: [true, true, true, true] },
                  { label: 'Analyse audio', values: [false, false, true, false] },
                  { label: 'Rapport PDF', values: [false, true, true, true] },
                  { label: 'Historique', values: [false, true, true, true] },
                  { label: 'Mise en relation artisan', values: [false, true, true, true] },
                  { label: 'Diagnostics illimités', values: [false, false, true, false] },
                  { label: 'Dashboard artisan', values: [false, false, false, true] },
                  { label: 'Réception de demandes', values: [false, false, false, true] },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-gray-700">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-4 py-3 text-center">
                        {v ? (
                          <CheckCircle2 className="mx-auto h-4 w-4 text-green-500" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-gray-200" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Questions fréquentes
          </h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {FAQ.map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-semibold text-gray-900">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
