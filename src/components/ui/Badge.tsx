import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "blue" | "green" | "purple" | "red" | "default";
  className?: string;
}

const variants = {
  gold: "bg-gold/15 text-gold border border-gold/20",
  blue: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  green: "bg-green-500/15 text-green-400 border border-green-500/20",
  purple: "bg-purple-500/15 text-purple-400 border border-purple-500/20",
  red: "bg-red-500/15 text-red-400 border border-red-500/20",
  default: "bg-navy-muted text-slate-400 border border-navy-border",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
