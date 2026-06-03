'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DiagnosticForm } from '@/components/diagnostic/DiagnosticForm';
import { ResultDisplay } from '@/components/diagnostic/ResultDisplay';
import { AnalyzingState } from '@/components/diagnostic/AnalyzingState';
import type { DiagnosticResult, Domain } from '@/types';
import { Shield } from 'lucide-react';

function DiagnosticPageContent() {
  const params = useSearchParams();
  const initialDomain = params.get('domain') as Domain | null;

  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setResult(null);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Diagnostic IA</h1>
            <p className="mt-2 text-gray-500">
              Envoyez une photo, décrivez votre problème ou enregistrez un message vocal.
              L&apos;IA analyse et vous donne un diagnostic structuré.
            </p>
          </div>

          {/* Security notice */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
            <Shield className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-xs text-amber-800">
              <strong>Pré-diagnostic uniquement.</strong> Ce service ne remplace pas l&apos;avis d&apos;un
              professionnel certifié. En cas de danger immédiat, appelez le 18 (pompiers),
              le 15 (SAMU) ou le 112 (urgences).
            </p>
          </div>

          {/* Content */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            {loading ? (
              <AnalyzingState />
            ) : result ? (
              <ResultDisplay result={result} onReset={handleReset} />
            ) : (
              <DiagnosticForm
                onResult={setResult}
                onLoading={setLoading}
                initialDomain={initialDomain ?? undefined}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiagnosticPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        </div>
      }
    >
      <DiagnosticPageContent />
    </Suspense>
  );
}
