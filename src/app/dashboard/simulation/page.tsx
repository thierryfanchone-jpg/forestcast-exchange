"use client";
import { useState } from "react";
import { Mic, Send, BarChart2, CheckCircle, XCircle } from "lucide-react";
import { ScoreRing } from "@/components/ui/ScoreRing";
import { Progress } from "@/components/ui/Progress";
import { DEMO_SIMULATION } from "@/lib/demo-data";
import type { SimulationAnalysis } from "@/types";

const ANALYSIS_LABELS: { key: keyof SimulationAnalysis; label: string }[] = [
  { key: "clarte", label: "Clarté" },
  { key: "structure", label: "Structure" },
  { key: "conviction", label: "Conviction" },
  { key: "gestion_temps", label: "Gestion du temps" },
  { key: "mots_parasites", label: "Mots parasites" },
  { key: "impact", label: "Impact" },
  { key: "confiance", label: "Confiance perçue" },
];

export default function SimulationPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof DEMO_SIMULATION | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  async function analyzeText() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario: "prise_de_parole", message: text, mode: "analyze" }),
      });
      const data = await response.json();
      setResult(data.simulation ?? DEMO_SIMULATION);
    } catch {
      setResult(DEMO_SIMULATION);
    } finally {
      setLoading(false);
    }
  }

  const displayResult = result ?? (showDemo ? DEMO_SIMULATION : null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Simulation orale</h1>
        <p className="mt-1 text-slate-400">
          Colle ou écris ton discours. L&apos;IA analysera ta communication sur 7 critères.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="card-orion">
          <div className="mb-4 flex items-center gap-2">
            <Mic size={18} className="text-gold" />
            <h2 className="font-semibold text-white">Ton texte ou discours</h2>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Colle ici ton discours, ta présentation, ta réponse à une question d'entretien...

Exemple : 'Bonjour, je m'appelle Jean et je candidate pour ce poste car...' "
            rows={12}
            className="input-orion mb-4 w-full resize-none"
          />
          <div className="flex gap-3">
            <button
              onClick={analyzeText}
              disabled={!text.trim() || loading}
              className="btn-primary flex-1 justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Send size={16} />
              )}
              {loading ? "Analyse en cours..." : "Analyser avec l'IA"}
            </button>
            <button
              onClick={() => setShowDemo(true)}
              className="btn-outline px-4 text-xs"
            >
              Demo
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="card-orion">
          {displayResult ? (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <ScoreRing score={displayResult.score} size={72} />
                <div>
                  <div className="text-2xl font-bold text-white">{displayResult.score}/100</div>
                  <div className="text-sm text-slate-400">Score global</div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-semibold text-white flex items-center gap-2">
                  <BarChart2 size={16} className="text-gold" /> Analyse détaillée
                </h3>
                <div className="space-y-3">
                  {ANALYSIS_LABELS.map(({ key, label }) => (
                    <div key={key}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="text-slate-400">{label}</span>
                        <span className="font-medium text-white">{displayResult.analysis[key]}%</span>
                      </div>
                      <Progress value={displayResult.analysis[key]} size="sm" color={displayResult.analysis[key] >= 75 ? "gold" : displayResult.analysis[key] >= 60 ? "blue" : "green"} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-green-400 flex items-center gap-1">
                    <CheckCircle size={12} /> Points forts
                  </h4>
                  {displayResult.strengths.map((s) => (
                    <div key={s} className="text-xs text-slate-400 mb-1">• {s}</div>
                  ))}
                </div>
                <div>
                  <h4 className="mb-2 text-xs font-semibold text-red-400 flex items-center gap-1">
                    <XCircle size={12} /> À améliorer
                  </h4>
                  {displayResult.weaknesses.map((w) => (
                    <div key={w} className="text-xs text-slate-400 mb-1">• {w}</div>
                  ))}
                </div>
              </div>

              {displayResult.next_exercise && (
                <div className="rounded-lg border border-gold/20 bg-gold/5 p-3">
                  <div className="text-xs font-semibold text-gold mb-1">📝 Prochain exercice</div>
                  <div className="text-xs text-slate-300">{displayResult.next_exercise}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <BarChart2 size={40} className="mb-4 text-slate-600" />
              <div className="text-slate-500 text-sm">
                Écris ton discours et clique sur &quot;Analyser&quot; pour obtenir ton rapport.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
