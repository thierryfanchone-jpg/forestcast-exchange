import type { Metadata } from "next";
import DiagnosticForm from "@/components/DiagnosticForm";
import { Zap, Shield, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Diagnostic IA — Analysez votre panne",
  description: "Obtenez un pré-diagnostic IA instantané pour votre panne habitat. Conseils de sécurité, causes probables et recommandations.",
};

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">
            <Zap className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Diagnostic IA</h1>
          <p className="mt-2 text-slate-500">
            Décrivez votre panne et obtenez une analyse instantanée avec des conseils de sécurité.
          </p>
        </div>

        {/* Safety notice */}
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
          <div className="text-sm text-orange-800">
            <strong>Urgence ?</strong> En cas de danger immédiat (odeur de gaz, incendie, inondation), appelez le{" "}
            <strong>15</strong>, <strong>17</strong> ou <strong>18</strong> avant tout.
          </div>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <DiagnosticForm />
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-2 text-xs text-slate-400">
          <Shield className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            DepannIA fournit un pré-diagnostic indicatif uniquement. Il ne remplace pas l&apos;expertise d&apos;un professionnel qualifié. En cas de doute sur un risque pour votre sécurité, faites toujours appel à un professionnel.
          </p>
        </div>
      </div>
    </div>
  );
}
