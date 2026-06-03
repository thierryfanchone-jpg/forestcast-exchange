import OpenAI from 'openai';
import type { DiagnosticResult } from '@/types';
import { buildSystemPrompt, buildUserPrompt } from './prompt';
import type { InputType, Domain } from '@/types';

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export async function analyzeWithOpenAI(params: {
  inputType: InputType;
  text?: string;
  domain?: Domain;
  fileUrls?: string[];
  model?: string;
}): Promise<Omit<DiagnosticResult, 'aiProvider' | 'aiModel'>> {
  const { inputType, text, domain, fileUrls = [], model = 'gpt-4o' } = params;
  const client = getClient();

  const userPrompt = buildUserPrompt({
    inputType,
    text,
    domain,
    fileCount: fileUrls.length,
  });

  type ContentPart =
    | { type: 'text'; text: string }
    | { type: 'image_url'; image_url: { url: string; detail: 'high' } };

  const content: ContentPart[] = [{ type: 'text', text: userPrompt }];

  if (inputType === 'photo' && fileUrls.length > 0) {
    for (const url of fileUrls.slice(0, 4)) {
      content.push({
        type: 'image_url',
        image_url: { url, detail: 'high' },
      });
    }
  }

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.2,
    max_tokens: 2000,
  });

  const raw = response.choices[0]?.message?.content ?? '{}';
  return JSON.parse(raw);
}

export async function transcribeAudio(audioUrl: string): Promise<string> {
  const client = getClient();
  const response = await fetch(audioUrl);
  const blob = await response.blob();
  const file = new File([blob], 'audio.webm', { type: blob.type });

  const transcription = await client.audio.transcriptions.create({
    model: 'whisper-1',
    file,
    language: 'fr',
  });

  return transcription.text;
}
