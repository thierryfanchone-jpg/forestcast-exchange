import { AlertTriangle } from "lucide-react";

/**
 * Message affiché lorsqu'un service n'est pas configuré.
 * Permet à l'application de fonctionner en dev sans toutes les clés.
 */
export function ConfigNotice({ service }: { service: string }) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-xl border border-warn/30 bg-warn-light p-8 text-center">
      <AlertTriangle className="h-8 w-8 text-warn" />
      <h2 className="text-lg font-semibold text-ink">
        {service} n&apos;est pas configuré
      </h2>
      <p className="text-sm text-muted">
        Renseignez les variables d&apos;environnement correspondantes dans
        votre fichier <code className="rounded bg-white px-1">.env.local</code>{" "}
        (voir <code className="rounded bg-white px-1">.env.example</code>).
      </p>
    </div>
  );
}
