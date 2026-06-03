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

  // Supabase upload when configured
  if (process.env.SUPABASE_SERVICE_KEY && process.env.SUPABASE_URL) {
    return uploadToSupabase(file);
  }

  // Demo fallback
  return NextResponse.json({
    url: `https://placeholder.ia-artisan.fr/demo/${Date.now()}`,
    mimeType: file.type,
    sizeBytes: file.size,
  });
}

async function uploadToSupabase(file: File): Promise<NextResponse> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require('@supabase/supabase-js') as {
      createClient: (url: string, key: string) => {
        storage: {
          from: (bucket: string) => {
            upload: (path: string, data: ArrayBuffer, opts: { contentType: string }) => Promise<{ error: Error | null }>;
            getPublicUrl: (path: string) => { data: { publicUrl: string } };
          };
        };
      };
    };

    const supabase = createClient(
      process.env.SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_KEY as string
    );

    const ext = file.name.split('.').pop() ?? 'bin';
    const path = `diagnostics/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from('ia-artisan')
      .upload(path, bytes, { contentType: file.type });

    if (error) throw error;

    const { data } = supabase.storage.from('ia-artisan').getPublicUrl(path);

    return NextResponse.json({
      url: data.publicUrl,
      mimeType: file.type,
      sizeBytes: file.size,
    });
  } catch (err) {
    console.error('[upload/supabase]', err);
    return NextResponse.json({ error: 'Erreur de stockage' }, { status: 500 });
  }
}
