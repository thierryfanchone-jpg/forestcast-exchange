import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-semibold tracking-tight", className)}>
      <span className="bg-primary text-primary-foreground relative flex size-8 items-center justify-center rounded-lg shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" className="size-4.5" aria-hidden>
          <path
            d="M2 14c1.5 0 1.5-3 3-3s1.5 3 3 3 1.5-5 3-5 1.5 5 3 5 1.5-3 3-3 1.5 3 3 3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 19c8 0 8-1 16-1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold">PréviSéisme</span>
        <span className="text-muted-foreground -mt-0.5 block text-[11px] font-medium">Caraïbe</span>
      </span>
    </span>
  );
}
