"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  AlertTriangle,
  Shield,
  MessageCircle,
  Send,
  CheckCircle,
  Phone,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Step = "idle" | "describing" | "questioning" | "photo" | "result";

const simulatedResponses: Record<string, Message[]> = {
  default: [
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant de diagnostic d'ElectroSécurité Inc. Décrivez votre problème électrique en quelques mots — je vais vous aider à identifier la cause et l'urgence.",
    },
  ],
  disjoncteur: [
    {
      role: "assistant",
      content:
        "Je comprends que votre disjoncteur saute. Pour affiner le diagnostic : est-ce le disjoncteur principal (en haut du tableau) ou un disjoncteur secondaire (pour un circuit particulier) ?",
    },
    {
      role: "assistant",
      content:
        "Merci. Est-ce que le problème survient immédiatement quand vous rallumez, ou après quelques minutes d'utilisation ? Y a-t-il un appareil spécifique branché à ce moment-là ?",
    },
    {
      role: "assistant",
      content:
        "✅ Diagnostic préliminaire : Il s'agit probablement d'une surcharge du circuit ou d'un appareil défectueux. Ce n'est pas une urgence immédiate si l'odeur de brûlé est absente.\n\n🔧 Recommandation : Débranchez les appareils sur ce circuit et rebranchez-les un par un pour identifier le fautif. Si le problème persiste, une intervention sur site est conseillée.\n\n📞 Souhaitez-vous réserver une visio dépannage (49,90 € TTC) ou une intervention sur site ?",
    },
  ],
  panne: [
    {
      role: "assistant",
      content:
        "Une panne totale de courant. Avant tout, vérifiez sur l'application de votre fournisseur (EDF) ou en appelant le 09 72 67 50 96 si une coupure est signalée dans votre secteur.",
    },
    {
      role: "assistant",
      content:
        "Si ce n'est pas une coupure générale : votre disjoncteur principal (le plus gros, en haut du tableau) est-il en position 'Marche' (vers le haut) ou a-t-il basculé ?",
    },
    {
      role: "assistant",
      content:
        "✅ Diagnostic préliminaire : La cause la plus fréquente est un déclenchement du disjoncteur général suite à une surcharge ou un court-circuit.\n\n⚠️ Action immédiate : Coupez tous les appareils, repassez le disjoncteur. Si ça ne tient pas, appelez-nous — c'est potentiellement urgent.\n\n📞 Appelez le {phone} ou démarrez une visio dépannage.",
    },
  ],
};

function getSimulatedResponse(userMessage: string, questionCount: number): string {
  const msg = userMessage.toLowerCase();

  if (questionCount === 0) {
    if (msg.includes("disjoncteur") || msg.includes("disjoncte") || msg.includes("saute")) {
      return simulatedResponses.disjoncteur[0].content;
    }
    if (msg.includes("panne") || msg.includes("courant") || msg.includes("plus d'électricité") || msg.includes("coupure")) {
      return simulatedResponses.panne[0].content;
    }
    if (msg.includes("brûl") || msg.includes("fumée") || msg.includes("incendie") || msg.includes("étincelle")) {
      return "🚨 URGENCE — Odeur de brûlé, fumée ou étincelles détectés.\n\nSortez immédiatement du local et coupez le disjoncteur principal si vous pouvez le faire en sécurité. Appelez les secours (18) si nécessaire.\n\nContactez-nous immédiatement au " + siteConfig.phoneDisplay + " — Ce type de situation requiert une intervention professionnelle d'urgence, ne tentez rien vous-même.";
    }
    return "Je reçois votre problème. Pour mieux vous aider, quelques questions :\n\n1. Le problème est-il sur toute l'habitation ou sur une zone spécifique ?\n2. Y a-t-il une odeur particulière (brûlé, plastique chaud) ?\n3. Avez-vous récemment branché un nouvel appareil ?";
  }

  if (questionCount === 1) {
    if (msg.includes("disjoncteur") || msg.includes("saute")) {
      return simulatedResponses.disjoncteur[1].content;
    }
    if (msg.includes("panne") || msg.includes("tout") || msg.includes("général")) {
      return simulatedResponses.panne[1].content;
    }
    return "Merci pour ces précisions. Est-ce que le problème est permanent ou intermittent ? Avez-vous une photo de votre tableau électrique que vous pourriez partager ?";
  }

  if (questionCount >= 2) {
    return "✅ Analyse complète effectuée.\n\nSur la base de vos réponses, votre problème nécessite probablement une inspection du tableau électrique. Je classe ce cas en priorité MODÉRÉE (pas d'urgence immédiate, mais à traiter dans les 48h).\n\n🔧 Recommandations :\n• Ne surchargez pas le circuit en question\n• Évitez d'utiliser des multiprises\n\n📋 Options disponibles :\n• Visio dépannage avec Thierry : 49,90 € TTC (résolution à distance possible)\n• Intervention sur site : sur devis\n\n📞 Pour réserver, appelez le " + siteConfig.phoneDisplay + " ou utilisez le formulaire de réservation.";
  }

  return "Bien noté. Pouvez-vous me décrire plus précisément ce que vous observez ? Une photo serait très utile pour affiner le diagnostic.";
}

export default function DepannageIAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis l'assistant de diagnostic d'ElectroSécurité Inc. Décrivez votre problème électrique en quelques mots — je vais vous aider à identifier la cause et l'urgence.",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [questionCount, setQuestionCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStep("describing");
    setIsTyping(true);

    const response = getSimulatedResponse(input.trim(), questionCount);
    setQuestionCount((c) => c + 1);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
      if (questionCount >= 2) {
        setStep("result");
      } else {
        setStep("questioning");
      }
    }, 1500);
  };

  const resetChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Bonjour ! Je suis l'assistant de diagnostic d'ElectroSécurité Inc. Décrivez votre problème électrique en quelques mots — je vais vous aider à identifier la cause et l'urgence.",
      },
    ]);
    setInput("");
    setStep("idle");
    setQuestionCount(0);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <section className="border-b border-gray-800 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5">
            <Zap className="h-4 w-4 text-yellow-400" fill="currentColor" />
            <span className="text-sm font-semibold text-yellow-400">
              Dépannage IA — 4,90 € TTC
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            Diagnostic électrique à distance par IA
          </h1>
          <p className="text-gray-400">
            Décrivez votre problème, répondez à quelques questions et obtenez
            une analyse préliminaire immédiate.
          </p>
        </div>
      </section>

      {/* Safety Warning — VERY PROMINENT */}
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border-2 border-red-500 bg-red-900/20 p-6">
          <div className="flex gap-4">
            <AlertTriangle className="h-8 w-8 flex-shrink-0 text-red-400" />
            <div>
              <h2 className="mb-2 text-lg font-extrabold text-red-400">
                Avertissement de sécurité — À lire avant de commencer
              </h2>
              <p className="mb-4 font-semibold text-red-300">
                Les informations fournies par l&apos;assistant IA constituent
                une aide au diagnostic. Elles ne remplacent pas l&apos;intervention
                d&apos;un professionnel qualifié sur site.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Ne jamais ouvrir un tableau électrique sous tension",
                  "Ne jamais toucher des fils dénudés ou des bornes",
                  "Toujours couper le courant avant toute manipulation",
                  "En cas de fumée ou d'odeur de brûlé : évacuez et appelez",
                  "En cas d'étincelles visibles : ne touchez à rien",
                  "En cas d'humidité sur l'installation : n'approchez pas",
                ].map((rule) => (
                  <div key={rule} className="flex items-start gap-2 text-sm text-red-200">
                    <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm font-bold text-red-300">
                🚨 Si vous percevez de la fumée, une odeur de brûlé, des
                étincelles ou de l&apos;humidité sur votre installation :{" "}
                <strong>n&apos;utilisez pas cet outil — appelez immédiatement le{" "}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="underline hover:no-underline"
                >
                  {siteConfig.phoneDisplay}
                </a>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-gray-400">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {[
              { step: "1", label: "Décrivez le problème" },
              { step: "2", label: "Répondez aux questions" },
              { step: "3", label: "Partagez une photo" },
              { step: "4", label: "L'IA analyse l'urgence" },
              { step: "5", label: "Visio ou intervention" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-yellow-400 text-sm font-extrabold text-yellow-400">
                  {item.step}
                </div>
                <p className="text-xs text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Interface */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden">
            {/* Chat header */}
            <div className="border-b border-gray-800 bg-gray-900 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10">
                  <Zap className="h-5 w-5 text-yellow-400" fill="currentColor" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Assistant Diagnostic IA</p>
                  <p className="text-xs text-green-400">● En ligne</p>
                </div>
              </div>
              {step !== "idle" && (
                <button
                  onClick={resetChat}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Recommencer
                </button>
              )}
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line lg:max-w-sm ${
                      msg.role === "user"
                        ? "bg-yellow-400 text-black font-medium rounded-br-none"
                        : "bg-gray-800 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-none bg-gray-800 px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            {step !== "result" ? (
              <div className="border-t border-gray-800 p-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Décrivez votre problème électrique..."
                    className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:block">Envoyer</span>
                  </button>
                </div>
                <p className="mt-2 text-center text-xs text-gray-600">
                  Simulation de démonstration — Service payant disponible à{" "}
                  <Link href="/tarifs" className="text-yellow-400 hover:underline">
                    4,90 € TTC
                  </Link>
                </p>
              </div>
            ) : (
              <div className="border-t border-gray-800 p-4 space-y-3">
                <p className="text-center text-sm font-semibold text-yellow-400">
                  <CheckCircle className="mr-2 inline h-4 w-4" />
                  Diagnostic terminé — Que souhaitez-vous faire ?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/reservation"
                    className="flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Réserver
                  </Link>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-gray-700"
                  >
                    <Phone className="h-4 w-4" />
                    Appeler
                  </a>
                </div>
                <button
                  onClick={resetChat}
                  className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors py-1"
                >
                  Recommencer un diagnostic
                </button>
              </div>
            )}
          </div>

          {/* Emergency bypass */}
          <div className="mt-6 rounded-xl border border-red-900/50 bg-red-900/10 p-4 text-center">
            <p className="mb-3 text-sm text-gray-400">
              Situation d&apos;urgence ? Ne perdez pas de temps avec le chat.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-500"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-green-500"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
