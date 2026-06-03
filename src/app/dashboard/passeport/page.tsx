import { BadgeCheck, TrendingUp, Lock } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { DEMO_SKILLS, DEMO_BADGES } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Passeport de compétences" };

export default function PasseportPage() {
  const validatedSkills = DEMO_SKILLS.filter((s) => s.is_validated);
  const pendingSkills = DEMO_SKILLS.filter((s) => !s.is_validated);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Passeport de compétences</h1>
        <p className="mt-1 text-slate-400">
          Ton portfolio de compétences validées et en progression.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card-orion text-center">
          <div className="text-3xl font-bold text-gold mb-1">{validatedSkills.length}</div>
          <div className="text-sm text-slate-400">Compétences validées</div>
        </div>
        <div className="card-orion text-center">
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {Math.round(DEMO_SKILLS.reduce((acc, s) => acc + s.score, 0) / DEMO_SKILLS.length)}
          </div>
          <div className="text-sm text-slate-400">Score moyen</div>
        </div>
        <div className="card-orion text-center">
          <div className="text-3xl font-bold text-purple-400 mb-1">{DEMO_BADGES.filter((b) => b.is_earned).length}</div>
          <div className="text-sm text-slate-400">Badges obtenus</div>
        </div>
      </div>

      {/* Validated skills */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <BadgeCheck size={20} className="text-green-400" />
          Compétences validées
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {validatedSkills.map((skill) => (
            <div key={skill.id} className="card-orion border-green-500/10">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{skill.description}</p>
                </div>
                <BadgeCheck size={20} className="shrink-0 text-green-400" />
              </div>
              <Progress value={skill.score} showLabel color="gold" className="mb-2" />
              {skill.validated_at && (
                <div className="text-xs text-slate-500">
                  Validé le {formatDate(skill.validated_at)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* In progress */}
      <div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <TrendingUp size={20} className="text-blue-400" />
          En progression
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {pendingSkills.map((skill) => (
            <div key={skill.id} className="card-orion opacity-70">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white">{skill.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{skill.description}</p>
                </div>
                <Lock size={18} className="shrink-0 text-slate-500" />
              </div>
              <Progress value={skill.score} showLabel color="blue" className="mb-2" />
              <div className="text-xs text-slate-500">Seuil de validation : 75%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges section */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">Badges</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
          {DEMO_BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`card-orion flex flex-col items-center gap-2 text-center py-4 transition-all ${
                badge.is_earned ? "border-gold/20" : "opacity-40"
              }`}
            >
              <div className="text-3xl">{badge.icon}</div>
              <div className="text-xs font-semibold text-white leading-tight">{badge.name}</div>
              <div className="text-xs text-slate-500 leading-tight">{badge.description}</div>
              {badge.earned_at && (
                <div className="text-xs text-gold">{formatDate(badge.earned_at)}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
