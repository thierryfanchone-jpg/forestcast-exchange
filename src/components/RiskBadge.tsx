"use client";

import { cn } from "@/lib/utils";

/**
 * Badge de niveau de risque ou de statut.
 * Les valeurs sont celles renvoyées par le modèle (en français), on
 * détecte aussi les équivalents anglais/espagnols par robustesse.
 */
export function RiskBadge({ value }: { value: string | null | undefined }) {
  const v = (value ?? "").toLowerCase();

  const danger = ["élevé", "high", "alto", "à ne pas utiliser", "do not use", "no usar"];
  const warn = ["moyen", "medium", "medio", "à vérifier", "needs review", "a verificar"];

  const tone = danger.some((d) => v.includes(d))
    ? "danger"
    : warn.some((w) => v.includes(w))
      ? "warn"
      : "trust";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize",
        tone === "trust" && "bg-trust-light text-trust",
        tone === "warn" && "bg-warn-light text-warn",
        tone === "danger" && "bg-danger-light text-danger"
      )}
    >
      {value ?? "—"}
    </span>
  );
}
