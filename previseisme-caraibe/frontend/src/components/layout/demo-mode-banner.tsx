"use client";

import { Info } from "lucide-react";
import { isBackendConfigured } from "@/lib/api-client";

export function DemoModeBanner() {
  if (isBackendConfigured) return null;

  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10 px-4 py-2 text-center text-xs text-amber-700 dark:text-amber-400">
      <span className="inline-flex items-center gap-1.5">
        <Info className="h-3.5 w-3.5" />
        Mode démonstration — données réalistes d&apos;exemple. Connectez <code>NEXT_PUBLIC_API_URL</code> au
        backend pour afficher les flux USGS / EMSC / IPGP réels.
      </span>
    </div>
  );
}
