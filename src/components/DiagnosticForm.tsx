"use client";

import { useState, useRef } from "react";
import { DiagnosticResult, Category } from "@/types";
import CategorySelector from "@/components/CategorySelector";
import DiagnosticResultComponent from "@/components/DiagnosticResult";
import { Loader2, ImagePlus, X, Zap } from "lucide-react";

export default function DiagnosticForm() {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("general");
  const [city, setCity] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const body: Record<string, string> = {
        description: description.trim(),
        category,
      };
      if (city.trim()) body.city = city.trim();
      if (imagePreview) body.imageBase64 = imagePreview;

      const res = await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erreur serveur");
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div>
        <button
          onClick={() => setResult(null)}
          className="mb-6 inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          ← Nouveau diagnostic
        </button>
        <DiagnosticResultComponent result={result} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Décrivez votre panne *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex : Mon disjoncteur saute dès que je branche la machine à laver. L'odeur de brûlé est légère..."
          rows={4}
          required
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-none"
        />
        <p className="mt-1 text-xs text-slate-400">
          Plus votre description est précise, plus le diagnostic sera pertinent.
        </p>
      </div>

      {/* Category */}
      <CategorySelector value={category} onChange={setCategory} />

      {/* City */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Votre ville <span className="text-slate-400">(optionnel)</span>
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ex : Lyon, Paris, Marseille…"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Photo de la panne <span className="text-slate-400">(optionnel)</span>
        </label>
        {imagePreview ? (
          <div className="relative inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Aperçu"
              className="h-32 w-auto rounded-xl border border-slate-200 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-sm"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500 transition-colors hover:border-blue-300 hover:text-blue-600"
          >
            <ImagePlus className="h-5 w-5" />
            Ajouter une photo
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !description.trim()}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyse en cours…
          </>
        ) : (
          <>
            <Zap className="h-4 w-4" />
            Lancer le diagnostic IA
          </>
        )}
      </button>
    </form>
  );
}
