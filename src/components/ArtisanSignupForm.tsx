"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const TRADES = [
  "Électricien",
  "Plombier",
  "Technicien climatisation",
  "Réparateur électroménager",
  "Serrurier",
  "Chauffagiste",
  "Menuisier",
  "Maçon",
  "Peintre",
  "Autre",
];

export default function ArtisanSignupForm() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    trade: "",
    siret: "",
    phone: "",
    email: "",
    city: "",
    serviceAreas: "",
    availability: "",
    subscriptionType: "mensuel",
  });
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accepted) {
      setError("Vous devez accepter les conditions générales.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/artisans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-10 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-900">Inscription envoyée !</h3>
        <p className="max-w-sm text-sm text-green-700">
          Votre dossier a bien été reçu. Notre équipe vous contactera sous 48h à l&apos;adresse <strong>{form.email}</strong> pour finaliser votre inscription au programme partenaire.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Nom de l&apos;entreprise *</label>
          <input
            type="text" required value={form.companyName}
            onChange={(e) => update("companyName", e.target.value)}
            placeholder="Ex : Électricité Pro Lyon"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Nom du responsable *</label>
          <input
            type="text" required value={form.contactName}
            onChange={(e) => update("contactName", e.target.value)}
            placeholder="Prénom Nom"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Métier *</label>
          <select
            required value={form.trade}
            onChange={(e) => update("trade", e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Choisir un métier</option>
            {TRADES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            SIRET <span className="text-slate-400">(optionnel)</span>
          </label>
          <input
            type="text" value={form.siret}
            onChange={(e) => update("siret", e.target.value)}
            placeholder="14 chiffres"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Téléphone *</label>
          <input
            type="tel" required value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="06 12 34 56 78"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email professionnel *</label>
          <input
            type="email" required value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="contact@votre-entreprise.fr"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Ville principale *</label>
          <input
            type="text" required value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Lyon"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Zones couvertes *</label>
          <input
            type="text" required value={form.serviceAreas}
            onChange={(e) => update("serviceAreas", e.target.value)}
            placeholder="Lyon, Villeurbanne, Bron…"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Disponibilité *</label>
        <input
          type="text" required value={form.availability}
          onChange={(e) => update("availability", e.target.value)}
          placeholder="Ex : Lun-Sam 8h-19h, urgences 24/7"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Type d&apos;abonnement *</label>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { value: "mensuel", label: "Abonnement mensuel", price: "29 €/mois", desc: "Leads illimités" },
            { value: "lead", label: "À la demande", price: "10 €/lead", desc: "Sans engagement" },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition-all ${
                form.subscriptionType === opt.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <input
                type="radio" name="subscription" value={opt.value}
                checked={form.subscriptionType === opt.value}
                onChange={() => update("subscriptionType", opt.value)}
                className="mt-0.5 accent-blue-600"
              />
              <div>
                <div className="font-semibold text-slate-900 text-sm">{opt.label}</div>
                <div className="text-base font-bold text-blue-600">{opt.price}</div>
                <div className="text-xs text-slate-500">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox" checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-blue-600"
        />
        <span className="text-sm text-slate-600">
          J&apos;accepte les{" "}
          <a href="#" className="text-blue-600 underline">conditions générales</a>{" "}
          du programme partenaire DepannIA et autorise le contact pour la mise en relation avec des clients.
        </span>
      </label>

      {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <button
        type="submit" disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours…</>
        ) : (
          "Rejoindre le réseau DepannIA"
        )}
      </button>
    </form>
  );
}
