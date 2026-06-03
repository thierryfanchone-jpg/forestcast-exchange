import type { DiagnosticResult, InputType, Domain } from '@/types';
import { routeRequest } from './router';
import { analyzeWithOpenAI, transcribeAudio } from './openai';
import { analyzeWithAnthropic } from './anthropic';
import { analyzeWithGemini } from './gemini';
import { getDemoResult } from './demo';

export interface AnalyzeParams {
  inputType: InputType;
  text?: string;
  domain?: Domain;
  fileUrls?: string[];
}

export async function analyze(params: AnalyzeParams): Promise<DiagnosticResult> {
  const { inputType, text, domain, fileUrls = [] } = params;

  // Handle audio: transcribe first, then treat as text analysis
  if (inputType === 'audio' && fileUrls.length > 0) {
    const transcribed = await transcribeAudio(fileUrls[0]);
    return analyze({ inputType: 'text', text: transcribed, domain });
  }

  const route = routeRequest(inputType);

  // Demo mode when no API keys are set
  if (route.model === 'demo') {
    await new Promise((r) => setTimeout(r, 1500));
    const demo = getDemoResult(inputType);
    return demo;
  }

  let partial: Omit<DiagnosticResult, 'aiProvider' | 'aiModel'>;

  const callParams = { inputType, text, domain, fileUrls, model: route.model };

  switch (route.provider) {
    case 'openai':
      partial = await analyzeWithOpenAI(callParams);
      break;
    case 'anthropic':
      partial = await analyzeWithAnthropic(callParams);
      break;
    case 'gemini':
      partial = await analyzeWithGemini(callParams);
      break;
    default:
      partial = getDemoResult(inputType);
  }

  return {
    ...partial,
    aiProvider: route.provider,
    aiModel: route.model,
  };
}
