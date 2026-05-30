import type { Metadata } from "next";
import EmergencyForm from "@/components/EmergencyForm";
import { Phone, Clock, Shield, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Urgence artisan — Intervention rapide 24h/24",
  description: "Demandez une intervention urgente d'un artisan qualifié. Électricien, plombier, serrurier disponibles 24h/24.",
};

export default function UrgencePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-600">
            <Phone className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Demande d&apos;intervention urgente</h1>
          <p className="mt-2 text-slate-500">
            Remplissez ce formulaire pour être mis en relation avec un artisan partenaire dans votre secteur.
          </p>
        </div>

        {/* Emergency alert */}
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            <div className="text-sm text-red-800">
              <strong>En cas de danger immédiat :</strong> Odeur de gaz → appelez le <strong>0800 47 33 33</strong>. Incendie → <strong>18</strong>. Urgence médicale → <strong>15</strong>.
            </div>
          </div>
        </div>

        {/* Promises */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          {[
            { icon: Clock, label: "Rappel sous 30 min", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Shield, label: "Artisans vérifiés", color: "text-green-600", bg: "bg-green-50" },
            { icon: Phone, label: "Disponible 24h/24", color: "text-orange-600", bg: "bg-orange-50" },
          ].map(({ icon: Icon, label, color, bg }) => (
            <div key={label} className={`flex flex-col items-center gap-1.5 rounded-xl ${bg} p-3 text-center`}>
              <Icon className={`h-5 w-5 ${color}`} />
              <span className="text-xs font-medium text-slate-700 leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <EmergencyForm />
        </div>
      </div>
    </div>
  );
}
