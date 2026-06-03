"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Zap, RefreshCw } from "lucide-react";
import { cn, getScenarioLabel } from "@/lib/utils";
import type { ChatMessage, SimulationScenario } from "@/types";

const SCENARIOS: { id: SimulationScenario; label: string; emoji: string }[] = [
  { id: "entretien", label: "Entretien d'embauche", emoji: "💼" },
  { id: "presentation", label: "Présentation de soi", emoji: "🙋" },
  { id: "pitch", label: "Pitch commercial", emoji: "🚀" },
  { id: "reunion", label: "Réunion professionnelle", emoji: "📊" },
  { id: "trac", label: "Gestion du trac", emoji: "🎯" },
  { id: "prise_de_parole", label: "Prise de parole publique", emoji: "🎤" },
];

const INITIAL_MESSAGES: Record<SimulationScenario, string> = {
  entretien: "Bonjour ! Je vais simuler un recruteur. Commençons : **Présentez-vous en 2 minutes.**",
  presentation: "Bonjour ! Exerce-toi à te présenter. **Commence quand tu veux. Dis-moi qui tu es et ce que tu fais.**",
  pitch: "Bonjour ! Je suis un investisseur potentiel. Tu as **3 minutes pour me convaincre d'investir dans ton projet.** C'est parti !",
  reunion: "Tu prends la parole en réunion. **Présente ton projet ou résume l'avancement de ta tâche.**",
  trac: "Tu ressens du stress avant de parler. **Décris-moi ce que tu ressens et comment tu vas gérer ça.**",
  prise_de_parole: "Tu dois parler devant 50 personnes dans 10 minutes. **Commence ton discours comme si tu y étais.**",
};

function TypingDots() {
  return (
    <div className="flex gap-1 px-4 py-2.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 rounded-full bg-slate-400 animate-pulse"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}

export default function CoachPage() {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function startScenario(scenario: SimulationScenario) {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: "init",
        role: "assistant",
        content: INITIAL_MESSAGES[scenario],
        timestamp: new Date(),
      },
    ]);
    setLastScore(null);
  }

  async function sendMessage() {
    if (!input.trim() || loading || !selectedScenario) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenario: selectedScenario,
          message: input,
          history: messages,
        }),
      });

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      if (data.score) setLastScore(data.score);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Réessaie.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!selectedScenario) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Coach IA</h1>
          <p className="mt-1 text-slate-400">Choisis un scénario pour commencer ton entraînement.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => startScenario(s.id)}
              className="card-orion card-hover flex items-center gap-4 text-left"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-2xl">
                {s.emoji}
              </div>
              <div>
                <div className="font-semibold text-white">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">Simulation IA interactive</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">
            {SCENARIOS.find((s) => s.id === selectedScenario)?.emoji}{" "}
            {getScenarioLabel(selectedScenario)}
          </h1>
          <p className="text-sm text-slate-400">Coach IA — réponds naturellement</p>
        </div>
        <div className="flex items-center gap-3">
          {lastScore !== null && (
            <div className="flex items-center gap-2 rounded-lg border border-gold/20 bg-gold/5 px-3 py-1.5">
              <Zap size={14} className="text-gold" />
              <span className="text-sm font-bold text-gold">{lastScore}/10</span>
            </div>
          )}
          <button
            onClick={() => setSelectedScenario(null)}
            className="btn-outline py-2 px-3 text-xs flex items-center gap-2"
          >
            <RefreshCw size={14} />
            Changer
          </button>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto rounded-xl border border-navy-border bg-navy-light p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}
            >
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                  IA
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-orion-blue/20 text-slate-200"
                    : "bg-navy-muted text-slate-300"
                )}
                dangerouslySetInnerHTML={{
                  __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>'),
                }}
              />
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold">
                IA
              </div>
              <div className="rounded-xl bg-navy-muted">
                <TypingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Écris ta réponse... (Entrée pour envoyer)"
          rows={2}
          className="input-orion flex-1 resize-none"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="btn-primary px-4 self-end"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
