"use client";

import { useState, useRef } from "react";
import CategorySelector from "@/components/CategorySelector";
import { Category, CATEGORY_LABELS } from "@/types";
import { Loader2, CheckCircle2, ImagePlus, X } from "lucide-react";

export default function EmergencyForm() {
  const [category, setCategory] = useState<Category>("general");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    description: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/urgence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, category, imageBase64: imagePreview }),
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
        <h3 className="text-xl font-bold text-green-900">Demande envoyée !</h3>
        <p className="max-w-sm text-sm text-green-700">
          Votre demande d&apos;intervention a été enregistrée. Un artisan partenaire{" "}
          <strong>{CATEGORY_LABELS[category]}</strong> dans la région de{" "}
          <strong>{form.city}</strong> sera contacté dès que possible.
        </p>
        <p className="text-xs text-green-600">
          Un e-mail de confirmation a été envoyé à <strong>{form.email}</strong>.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setForm({ name: "", phone: "", email: "", city: "", description: "" });
            setImagePreview(null);
          }}
          className="mt-2 rounded-lg border-2 border-green-600 px-5 py-2 text-sm font-semibold text-green-700 hover:bg-green-100 transition-colors"
        >
          Nouvelle demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CategorySelector value={category} onChange={setCategory} label="Type d'intervention" />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nom complet *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jean Dupont"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Téléphone *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="06 12 34 56 78"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jean@email.fr"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Ville *
          </label>
          <input
            type="text"
            required
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="Lyon"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description rapide *
        </label>
        <textarea
          required
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Décrivez brièvement le problème et son urgence…"
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Photo */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Photo <span className="text-slate-400">(optionnel)</span>
        </label>
        {imagePreview ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Aperçu" className="h-28 w-auto rounded-xl border border-slate-200 object-cover" />
            <button
              type="button"
              onClick={() => { setImagePreview(null); if (fileRef.current) fileRef.current.value = ""; }}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            <ImagePlus className="h-5 w-5" />
            Ajouter une photo
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-700 disabled:opacity-50"
      >
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Envoi en cours…</>
        ) : (
          "Envoyer ma demande d'intervention"
        )}
      </button>

      <p className="text-center text-xs text-slate-400">
        Un artisan partenaire disponible dans votre secteur sera contacté. Délai de rappel indicatif : sous 30 min en journée.
      </p>
    </form>
  );
}
