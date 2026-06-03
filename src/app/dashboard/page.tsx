import Link from "next/link";
import { BookOpen, Award, MessageSquare, Zap } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { DEMO_STATS, DEMO_BADGES, DEMO_COURSES, DEMO_SIMULATION } from "@/lib/demo-data";
import { formatDate, getScoreColor } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tableau de bord" };

const STAT_CARDS = [
  { icon: BookOpen, label: "Formations commencées", value: DEMO_STATS.courses_started, color: "text-blue-400" },
  { icon: Award, label: "Formations terminées", value: DEMO_STATS.courses_completed, color: "text-green-400" },
  { icon: MessageSquare, label: "Simulations IA", value: DEMO_STATS.simulations_done, color: "text-purple-400" },
  { icon: Zap, label: "Badges obtenus", value: DEMO_STATS.badges_earned, color: "text-gold" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">Bonjour, Apprenant 👋</h1>
        <p className="mt-1 text-slate-400">Continue ta progression. Tu es sur la bonne voie !</p>
      </div>

      {/* Score + Stats row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {/* Global score */}
        <div className="card-orion flex items-center gap-6 lg:col-span-2">
          <ScoreRing score={DEMO_STATS.global_score} size={90} label="Score global" />
          <div>
            <div className="text-xs text-slate-500 mb-1">Score global</div>
            <div className={`text-3xl font-bold ${getScoreColor(DEMO_STATS.global_score)}`}>
              {DEMO_STATS.global_score}/100
            </div>
            <Progress value={DEMO_STATS.progress_percent} className="mt-2 w-32" showLabel size="sm" />
          </div>
        </div>

        {/* Stat cards */}
        {STAT_CARDS.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card-orion flex flex-col gap-2">
            <Icon size={20} className={color} />
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-xs text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* In-progress courses */}
        <div className="card-orion lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Mes formations en cours</h2>
            <Link href="/dashboard/formations" className="text-xs text-gold hover:underline">
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {DEMO_COURSES.slice(0, 2).map((course) => (
              <div key={course.id} className="flex items-center gap-4 rounded-lg border border-navy-border bg-navy p-4">
                <div className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${course.color} flex items-center justify-center`}>
                  <BookOpen size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white truncate">{course.title}</div>
                  <div className="text-xs text-slate-500">{course.subtitle}</div>
                  <Progress value={Math.floor(Math.random() * 70) + 10} className="mt-2" size="sm" />
                </div>
                <Link href="/dashboard/formations" className="btn-secondary py-1.5 px-3 text-xs shrink-0">
                  Continuer
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Last simulation */}
        <div className="card-orion">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-white">Dernière simulation</h2>
            <Link href="/dashboard/coach" className="text-xs text-gold hover:underline">
              Nouvelle
            </Link>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <ScoreRing score={DEMO_SIMULATION.score} size={64} />
            <div>
              <div className="text-sm font-medium text-white capitalize">
                {DEMO_SIMULATION.scenario}
              </div>
              <div className="text-xs text-slate-500">{formatDate(DEMO_SIMULATION.created_at)}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-green-400">Points forts :</div>
            {DEMO_SIMULATION.strengths.map((s) => (
              <div key={s} className="text-xs text-slate-400">• {s}</div>
            ))}
            <div className="text-xs font-semibold text-red-400 mt-3">À améliorer :</div>
            {DEMO_SIMULATION.weaknesses.slice(0, 2).map((w) => (
              <div key={w} className="text-xs text-slate-400">• {w}</div>
            ))}
          </div>
          <Link href="/dashboard/simulation" className="btn-secondary mt-4 w-full justify-center text-xs">
            Voir l&apos;analyse complète
          </Link>
        </div>
      </div>

      {/* Badges */}
      <div className="card-orion">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-white">Mes badges</h2>
          <Link href="/dashboard/passeport" className="text-xs text-gold hover:underline">
            Voir le passeport
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {DEMO_BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center gap-2 rounded-lg border p-3 text-center transition-opacity ${
                badge.is_earned
                  ? "border-gold/20 bg-gold/5"
                  : "border-navy-border bg-navy opacity-40"
              }`}
            >
              <div className="text-2xl">{badge.icon}</div>
              <div className="text-xs font-medium text-white leading-tight">{badge.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
