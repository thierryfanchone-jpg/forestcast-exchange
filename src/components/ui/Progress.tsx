import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  color?: "gold" | "blue" | "green";
  size?: "sm" | "md";
}

const colorClasses = {
  gold: "bg-gold",
  blue: "bg-blue-500",
  green: "bg-green-500",
};

export function Progress({
  value,
  max = 100,
  className,
  showLabel,
  color = "gold",
  size = "md",
}: ProgressProps) {
  const percent = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-xs text-slate-400">
          <span>Progression</span>
          <span className="font-semibold text-white">{Math.round(percent)}%</span>
        </div>
      )}
      <div
        className={cn(
          "overflow-hidden rounded-full bg-navy-border",
          size === "sm" ? "h-1.5" : "h-2.5"
        )}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorClasses[color])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
