'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  'Réception du fichier…',
  'Détection du domaine métier…',
  'Routage vers le meilleur modèle IA…',
  'Analyse en cours…',
  'Génération de la réponse structurée…',
];

export function AnalyzingState() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length - 1 ? s + 1 : s));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-6 h-16 w-16">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />
        <div className="absolute inset-3 animate-pulse rounded-full bg-indigo-50" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">Analyse en cours</h3>
      <p className="mt-1 text-sm text-indigo-600 transition-all">{STEPS[step]}</p>
      <p className="mt-6 max-w-xs text-xs text-gray-400">
        L&apos;IA analyse votre problème selon les critères métiers et les règles de sécurité.
        Résultat dans quelques secondes.
      </p>
    </div>
  );
}
