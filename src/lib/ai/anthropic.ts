import Anthropic from '@anthropic-ai/sdk';
import type { DiagnosticResult, InputType, Domain } from '@/types';
import { buildSystemPrompt, buildUserPrompt } from './prompt';

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    _client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return _client;
}

async function urlToBase64(url: string): Promise<{ data: string; mediaType: string }> {
  const res = await fetch(url);
  const buf = await res.arrayBuffer();
  const mediaType = res.headers.get('content-type') ?? 'image/jpeg';
  const data = Buffer.from(buf).toString('base64');
  return { data, mediaType };
}

export async function analyzeWithAnthropic(params: {
  inputType: InputType;
  text?: string;
  domain?: Domain;
  fileUrls?: string[];
  model?: string;
}): Promise<Omit<DiagnosticResult, 'aiProvider' | 'aiModel'>> {
  const { inputType, text, domain, fileUrls = [], model = 'claude-sonnet-4-6' } = params;
  const client = getClient();

  const userPrompt = buildUserPrompt({
    inputType,
    text,
    domain,
    fileCount: fileUrls.length,
  });

  type ContentBlock =
    | Anthropic.TextBlockParam
    | Anthropic.ImageBlockParam;

  const content: ContentBlock[] = [];

  if (inputType === 'photo' && fileUrls.length > 0) {
    for (const url of fileUrls.slice(0, 4)) {
      const { data, mediaType } = await urlToBase64(url);
      content.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
          data,
        },
      });
    }
  }

  content.push({ type: 'text', text: userPrompt });

  const response = await client.messages.create({
    model,
    system: buildSystemPrompt(),
    messages: [{ role: 'user', content }],
    temperature: 0.2,
    max_tokens: 2000,
  });

  const raw =
    response.content.find((b) => b.type === 'text')?.text ?? '{}';

  return JSON.parse(raw);
}
