import { ShieldCheck, ShieldAlert, ShieldQuestion, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ConfidenceLabel } from "@/types/seismic";

const CONFIG: Record<ConfidenceLabel, { text: string; variant: "success" | "warning" | "muted"; Icon: typeof Shield }> = {
  confirme_multi_source: { text: "Confirmé multi-source", variant: "success", Icon: ShieldCheck },
  eleve: { text: "Confiance élevée", variant: "success", Icon: ShieldCheck },
  moyen: { text: "Confiance moyenne", variant: "warning", Icon: ShieldAlert },
  faible: { text: "Confiance faible", variant: "muted", Icon: ShieldQuestion },
};

export function ConfidenceBadge({ label }: { label: ConfidenceLabel }) {
  const config = CONFIG[label];
  return (
    <Badge variant={config.variant} className="gap-1">
      <config.Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  );
}
