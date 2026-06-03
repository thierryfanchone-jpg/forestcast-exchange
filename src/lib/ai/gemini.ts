import { GoogleGenerativeAI } from '@google/generative-ai';
import type { DiagnosticResult, InputType, Domain } from '@/types';
import { buildSystemPrompt, buildUserPrompt } from './prompt';

let _client: GoogleGenerativeAI | null = null;

function getClient(): GoogleGenerativeAI {
  if (!_client) {
    _client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
  }
  return _client;
}

export async function analyzeWithGemini(params: {
  inputType: InputType;
  text?: string;
  domain?: Domain;
  fileUrls?: string[];
  model?: string;
}): Promise<Omit<DiagnosticResult, 'aiProvider' | 'aiModel'>> {
  const { inputType, text, domain, fileUrls = [], model = 'gemini-1.5-flash' } = params;
  const client = getClient();

  const genModel = client.getGenerativeModel({
    model,
    systemInstruction: buildSystemPrompt(),
  });

  const userPrompt = buildUserPrompt({
    inputType,
    text,
    domain,
    fileCount: fileUrls.length,
  });

  type Part =
    | { text: string }
    | { inlineData: { mimeType: string; data: string } };

  const parts: Part[] = [{ text: userPrompt }];

  if ((inputType === 'photo' || inputType === 'video') && fileUrls.length > 0) {
    for (const url of fileUrls.slice(0, 4)) {
      const res = await fetch(url);
      const buf = await res.arrayBuffer();
      const mimeType = res.headers.get('content-type') ?? 'image/jpeg';
      const data = Buffer.from(buf).toString('base64');
      parts.push({ inlineData: { mimeType, data } });
    }
  }

  const result = await genModel.generateContent({
    contents: [{ role: 'user', parts }],
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
      maxOutputTokens: 2000,
    },
  });

  const raw = result.response.text();
  return JSON.parse(raw);
}
