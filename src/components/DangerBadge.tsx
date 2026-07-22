import { DangerLevel } from "@/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

interface DangerBadgeProps {
  level: DangerLevel;
  size?: "sm" | "md" | "lg";
}

const CONFIG = {
  low: {
    label: "Risque faible",
    icon: CheckCircle,
    className: "bg-green-100 text-green-700 border-green-200",
    iconClass: "text-green-600",
  },
  medium: {
    label: "Risque modéré",
    icon: AlertTriangle,
    className: "bg-orange-100 text-orange-700 border-orange-200",
    iconClass: "text-orange-500",
  },
  high: {
    label: "URGENCE — Danger élevé",
    icon: ShieldAlert,
    className: "bg-red-100 text-red-700 border-red-200 animate-pulse",
    iconClass: "text-red-600",
  },
};

export default function DangerBadge({ level, size = "md" }: DangerBadgeProps) {
  const { label, icon: Icon, className, iconClass } = CONFIG[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        className,
        size === "sm" && "px-2.5 py-1 text-xs",
        size === "md" && "px-3 py-1.5 text-sm",
        size === "lg" && "px-4 py-2 text-base"
      )}
    >
      <Icon className={cn("shrink-0", iconClass, size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4")} />
      {label}
    </span>
  );
}
