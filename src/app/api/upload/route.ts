import { NextRequest, NextResponse } from 'next/server';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_AUDIO_SIZE = 25 * 1024 * 1024; // 25 MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'audio/mpeg',
  'audio/mp4',
  'audio/webm',
  'audio/wav',
  'audio/ogg',
  'video/mp4',
  'video/webm',
  'video/quicktime',
]);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'Aucun fichier reçu' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Type de fichier non supporté : ${file.type}` },
      { status: 415 }
    );
  }

  const maxSize = file.type.startsWith('video/')
    ? MAX_VIDEO_SIZE
    : file.type.startsWith('audio/')
      ? MAX_AUDIO_SIZE
      : MAX_IMAGE_SIZE;

  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `Fichier trop volumineux (max ${maxSize / 1024 / 1024} Mo)` },
      { status: 413 }
    );
  }

  // Phase 1 — MVP: return a signed demo URL.
  // Phase 2: add @supabase/supabase-js to dependencies and implement real upload.
  // See docs/storage.md for the Supabase integration guide.
  return NextResponse.json({
    url: `https://placeholder.ia-artisan.fr/demo/${Date.now()}`,
    mimeType: file.type,
    sizeBytes: file.size,
    demo: true,
  });
}
