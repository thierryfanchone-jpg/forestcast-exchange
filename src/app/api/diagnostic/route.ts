import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { analyze } from '@/lib/ai/analyzer';

const schema = z.object({
  inputType: z.enum(['photo', 'video', 'audio', 'text']),
  text: z.string().optional(),
  domain: z
    .enum([
      'electricite',
      'securite_incendie',
      'plomberie',
      'climatisation',
      'petits_travaux',
      'peinture',
      'cloisons',
      'montage_mobilier',
      'entretien_logement',
      'diagnostic_general',
    ])
    .optional(),
  fileUrls: z.array(z.string().url()).optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Paramètres invalides', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { inputType, text, domain, fileUrls } = parsed.data;

  if (inputType === 'text' && !text?.trim()) {
    return NextResponse.json({ error: 'Décrivez votre problème' }, { status: 422 });
  }

  if (inputType !== 'text' && (!fileUrls || fileUrls.length === 0) && !text?.trim()) {
    return NextResponse.json({ error: 'Aucun fichier ou description fourni' }, { status: 422 });
  }

  const start = Date.now();

  try {
    const result = await analyze({ inputType, text, domain, fileUrls });
    const processingMs = Date.now() - start;

    return NextResponse.json({ result, processingMs }, { status: 200 });
  } catch (err) {
    console.error('[diagnostic/route]', err);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse. Réessayez dans un instant.' },
      { status: 500 }
    );
  }
}
