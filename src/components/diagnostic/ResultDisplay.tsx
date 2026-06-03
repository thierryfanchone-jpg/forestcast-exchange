'use client';

import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Wrench,
  DollarSign,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { UrgencyBadge, ConfidenceBadge } from '@/components/ui/Badge';
import { DOMAIN_LABELS, DOMAIN_ICONS } from '@/types';
import type { DiagnosticResult } from '@/types';

interface Props {
  result: DiagnosticResult;
  onReset: () => void;
}

export function ResultDisplay({ result, onReset }: Props) {
  return (
    <div className="space-y-4">
      {/* Safety alert (critique urgency) */}
      {result.safetyAlert && (
        <div className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="font-semibold text-red-800">Alerte sécurité</p>
            <p className="mt-0.5 text-sm text-red-700">{result.safetyAlert}</p>
          </div>
        </div>
      )}

      {/* Header card */}
      <Card>
        <CardBody>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs text-gray-500">
                <span>{DOMAIN_ICONS[result.domain]}</span>
                <span>{DOMAIN_LABELS[result.domain]}</span>
                <span>·</span>
                <ConfidenceBadge level={result.confidence} />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 leading-snug">
                {result.summary}
              </h2>
            </div>
            <UrgencyBadge level={result.urgency} />
          </div>
        </CardBody>
      </Card>

      {/* Observations */}
      <Section icon={<CheckCircle2 className="h-4 w-4 text-blue-500" />} title="Ce que je vois ou comprends">
        <ul className="space-y-1.5">
          {result.observations.map((o, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
              {o}
            </li>
          ))}
        </ul>
      </Section>

      {/* Probable causes */}
      <Section icon={<HelpCircle className="h-4 w-4 text-orange-500" />} title="Causes probables">
        <ol className="space-y-2">
          {result.probableCauses.map((c, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-700">
                {i + 1}
              </span>
              {c}
            </li>
          ))}
        </ol>
      </Section>

      {/* Safe checks */}
      <Section
        icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
        title="Ce que vous pouvez vérifier sans danger"
      >
        <ul className="space-y-1.5">
          {result.safeChecks.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-500" />
              {s}
            </li>
          ))}
        </ul>
      </Section>

      {/* Dangerous actions */}
      {result.dangerousActions.length > 0 && (
        <Section
          icon={<XCircle className="h-4 w-4 text-red-500" />}
          title="Ce qu'il ne faut pas faire"
          className="border-red-100 bg-red-50"
          titleClassName="text-red-800"
        >
          <ul className="space-y-1.5">
            {result.dangerousActions.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                {d}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Materials + Cost */}
      <div className="grid gap-4 sm:grid-cols-2">
        {result.possibleMaterials.length > 0 && (
          <Section icon={<Wrench className="h-4 w-4 text-gray-500" />} title="Matériel possible">
            <ul className="space-y-1">
              {result.possibleMaterials.map((m, i) => (
                <li key={i} className="text-sm text-gray-700">
                  · {m}
                </li>
              ))}
            </ul>
          </Section>
        )}

        {result.estimatedCost && (
          <Section icon={<DollarSign className="h-4 w-4 text-gray-500" />} title="Estimation indicative">
            <p className="text-sm font-medium text-gray-800">{result.estimatedCost}</p>
            <p className="mt-1 text-xs text-gray-400">Indicatif · selon région et complexité</p>
          </Section>
        )}
      </div>

      {/* Recommendation */}
      <Section
        icon={<UserCheck className="h-4 w-4 text-indigo-600" />}
        title="Recommandation"
        className="border-indigo-100 bg-indigo-50"
        titleClassName="text-indigo-900"
      >
        <p className="text-sm text-indigo-800">{result.recommendation}</p>
        {result.needsProfessional && (
          <div className="mt-3">
            <Button variant="primary" size="md">
              Demander un devis artisan
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Section>

      {/* Confidence explanation */}
      <Card>
        <CardBody>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Niveau de confiance — <ConfidenceBadge level={result.confidence} />
          </p>
          <p className="text-sm text-gray-600">{result.confidenceExplanation}</p>
        </CardBody>
      </Card>

      {/* Additional questions */}
      {result.additionalQuestions.length > 0 && (
        <Section icon={<HelpCircle className="h-4 w-4 text-gray-400" />} title="Questions pour affiner le diagnostic">
          <ul className="space-y-1.5">
            {result.additionalQuestions.map((q, i) => (
              <li key={i} className="text-sm text-gray-600">
                · {q}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
        <p className="text-xs text-gray-400">
          Analysé par {result.aiModel} ({result.aiProvider}) · Pré-diagnostic non contractuel
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Télécharger le rapport
          </Button>
          <Button variant="secondary" size="sm" onClick={onReset}>
            Nouveau diagnostic
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
  className,
  titleClassName,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={`rounded-xl border border-gray-100 bg-white p-4 ${className ?? ''}`}>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className={`text-sm font-semibold text-gray-800 ${titleClassName ?? ''}`}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
