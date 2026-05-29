"use client";

import { clampScore } from "@/lib/utils";

/** Jauge circulaire SVG affichant le score de confiance sur 100. */
export function ScoreGauge({ score, label }: { score: number; label?: string }) {
  const value = clampScore(score);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const color =
    value >= 70 ? "#16a34a" : value >= 40 ? "#ea580c" : "#dc2626";

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-32 w-32">
        <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="10"
          />
          <circle
            cx="64"
            cy="64"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color }}>
            {value}
          </span>
          <span className="text-xs text-muted">/ 100</span>
        </div>
      </div>
      {label && <p className="mt-2 text-sm font-medium text-muted">{label}</p>}
    </div>
  );
}
