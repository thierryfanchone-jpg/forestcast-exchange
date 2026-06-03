'use client';

import { useState, useRef, useCallback } from 'react';
import { Camera, Mic, FileText, Upload, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { InputType, Domain } from '@/types';
import { DOMAIN_LABELS, DOMAIN_ICONS } from '@/types';
import type { DiagnosticResult } from '@/types';

interface Props {
  onResult: (result: DiagnosticResult) => void;
  onLoading: (loading: boolean) => void;
  initialDomain?: Domain;
}

const INPUT_TABS: { id: InputType; label: string; icon: React.ReactNode }[] = [
  { id: 'photo', label: 'Photo', icon: <Camera className="h-4 w-4" /> },
  { id: 'text', label: 'Texte', icon: <FileText className="h-4 w-4" /> },
  { id: 'audio', label: 'Audio', icon: <Mic className="h-4 w-4" /> },
];

const DOMAINS = Object.entries(DOMAIN_LABELS) as [Domain, string][];

export function DiagnosticForm({ onResult, onLoading, initialDomain }: Props) {
  const [inputType, setInputType] = useState<InputType>('photo');
  const [domain, setDomain] = useState<Domain | undefined>(initialDomain);
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming).slice(0, 4);
    setFiles(arr);
    const urls = arr.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (i: number) => {
    setFiles((f) => f.filter((_, idx) => idx !== i));
    setPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (inputType === 'text' && !text.trim()) {
      setError('Décrivez votre problème pour lancer le diagnostic.');
      return;
    }
    if ((inputType === 'photo' || inputType === 'audio') && files.length === 0 && !text.trim()) {
      setError('Ajoutez au moins un fichier ou une description.');
      return;
    }

    onLoading(true);

    try {
      // Upload files if any
      const fileUrls: string[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error ?? 'Erreur d\'upload');
        }
        const data = await res.json();
        fileUrls.push(data.url);
      }

      // Call diagnostic API
      const res = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputType, text: text || undefined, domain, fileUrls }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Erreur d\'analyse');
      }

      const data = await res.json();
      onResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inattendue');
    } finally {
      onLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Domain selector */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Domaine (optionnel)
        </label>
        <div className="relative">
          <select
            value={domain ?? ''}
            onChange={(e) => setDomain((e.target.value as Domain) || undefined)}
            className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-900 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Détection automatique par l&apos;IA</option>
            {DOMAINS.map(([id, label]) => (
              <option key={id} value={id}>
                {DOMAIN_ICONS[id]} {label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Input type tabs */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Type d&apos;analyse</label>
        <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
          {INPUT_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setInputType(tab.id);
                setFiles([]);
                setPreviews([]);
              }}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all',
                inputType === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Photo upload zone */}
      {inputType === 'photo' && (
        <div className="space-y-3">
          <div
            className={cn(
              'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-colors',
              isDragging
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <Upload className="mb-2 h-8 w-8 text-gray-300" />
            <p className="text-sm font-medium text-gray-600">
              Glissez vos photos ici, ou cliquez pour choisir
            </p>
            <p className="mt-1 text-xs text-gray-400">
              JPG, PNG, WebP — max 10 Mo — jusqu&apos;à 4 photos
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {previews.length > 0 && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {previews.map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Audio upload */}
      {inputType === 'audio' && (
        <div
          className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 hover:border-gray-300 hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Mic className="mb-2 h-8 w-8 text-gray-300" />
          <p className="text-sm font-medium text-gray-600">
            {files.length > 0 ? files[0].name : 'Envoyer un message vocal'}
          </p>
          <p className="mt-1 text-xs text-gray-400">MP3, M4A, WebM, WAV — max 25 Mo</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* Text description */}
      {(inputType === 'text' || inputType === 'photo' || inputType === 'audio') && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {inputType === 'text'
              ? 'Décrivez votre problème'
              : 'Description complémentaire (optionnel)'}
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={inputType === 'text' ? 5 : 3}
            placeholder={
              inputType === 'text'
                ? "Ex: Mon disjoncteur saute régulièrement dans la cuisine quand j'utilise le four et le micro-ondes en même temps..."
                : 'Ajoutez des précisions sur le problème...'
            }
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
          />
          <p className="mt-1 text-right text-xs text-gray-400">{text.length} caractères</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full">
        Lancer le diagnostic IA
      </Button>

      <p className="text-center text-xs text-gray-400">
        Résultat en 10 à 30 secondes · Pré-analyse — pas un diagnostic définitif
      </p>
    </form>
  );
}
