import type { AIProvider, InputType } from '@/types';

export interface RouteDecision {
  provider: AIProvider;
  model: string;
  reason: string;
}

// Routing rules:
// - Photo: OpenAI GPT-4o (vision) ou Claude claude-opus-4-8 (vision)
// - Video: Gemini (native video understanding)
// - Audio: OpenAI Whisper + GPT-4o
// - Text complex: Claude (best reasoning)
// - Text simple: OpenAI GPT-4o-mini (cheap & fast)
// - Long context: Gemini (2M tokens)

const OPENAI_AVAILABLE = Boolean(process.env.OPENAI_API_KEY);
const ANTHROPIC_AVAILABLE = Boolean(process.env.ANTHROPIC_API_KEY);
const GEMINI_AVAILABLE = Boolean(process.env.GEMINI_API_KEY);

export function routeRequest(inputType: InputType): RouteDecision {
  switch (inputType) {
    case 'photo':
      if (OPENAI_AVAILABLE) {
        return {
          provider: 'openai',
          model: 'gpt-4o',
          reason: 'GPT-4o vision — analyse photo multimodale',
        };
      }
      if (ANTHROPIC_AVAILABLE) {
        return {
          provider: 'anthropic',
          model: 'claude-opus-4-8',
          reason: 'Claude vision — analyse photo',
        };
      }
      if (GEMINI_AVAILABLE) {
        return {
          provider: 'gemini',
          model: 'gemini-1.5-flash',
          reason: 'Gemini vision — analyse photo',
        };
      }
      break;

    case 'video':
      if (GEMINI_AVAILABLE) {
        return {
          provider: 'gemini',
          model: 'gemini-1.5-pro',
          reason: 'Gemini 1.5 Pro — compréhension vidéo native',
        };
      }
      if (OPENAI_AVAILABLE) {
        return {
          provider: 'openai',
          model: 'gpt-4o',
          reason: 'GPT-4o — analyse frames extraites',
        };
      }
      break;

    case 'audio':
      if (OPENAI_AVAILABLE) {
        return {
          provider: 'openai',
          model: 'whisper-1+gpt-4o',
          reason: 'Whisper transcription + GPT-4o diagnostic',
        };
      }
      if (GEMINI_AVAILABLE) {
        return {
          provider: 'gemini',
          model: 'gemini-1.5-flash',
          reason: 'Gemini audio multimodal',
        };
      }
      break;

    case 'text':
      if (ANTHROPIC_AVAILABLE) {
        return {
          provider: 'anthropic',
          model: 'claude-sonnet-4-6',
          reason: 'Claude Sonnet — meilleur raisonnement technique',
        };
      }
      if (OPENAI_AVAILABLE) {
        return {
          provider: 'openai',
          model: 'gpt-4o-mini',
          reason: 'GPT-4o-mini — rapide et économique',
        };
      }
      if (GEMINI_AVAILABLE) {
        return {
          provider: 'gemini',
          model: 'gemini-1.5-flash',
          reason: 'Gemini Flash — réponse rapide',
        };
      }
      break;
  }

  // Fallback demo mode — returns mock data when no API keys configured
  return {
    provider: 'openai',
    model: 'demo',
    reason: 'Mode démonstration — aucune clé API configurée',
  };
}
