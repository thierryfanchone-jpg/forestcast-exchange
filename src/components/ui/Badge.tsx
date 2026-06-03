import { cn } from '@/lib/utils';
import type { UrgencyLevel, ConfidenceLevel } from '@/types';
import { URGENCY_CONFIG, CONFIDENCE_CONFIG } from '@/types';

export function UrgencyBadge({ level }: { level: UrgencyLevel }) {
  const cfg = URGENCY_CONFIG[level];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold',
        cfg.bg,
        cfg.border,
        cfg.color
      )}
    >
      {level === 'critique' && '🚨 '}
      {level === 'eleve' && '⚠️ '}
      {level === 'moyen' && '⚡ '}
      {level === 'faible' && '✅ '}
      {cfg.label}
    </span>
  );
}

export function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  const cfg = CONFIDENCE_CONFIG[level];
  return (
    <span className={cn('text-sm font-medium', cfg.color)}>
      {cfg.label}
    </span>
  );
}

export function DomainBadge({ domain }: { domain: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
      {domain}
    </span>
  );
}
