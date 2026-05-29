"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { LOCALES, LOCALE_LABELS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="btn-ghost px-2.5 py-2"
        aria-label="Changer de langue"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden text-sm uppercase sm:inline">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-1 w-40 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-soft">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => {
                setLocale(l);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-slate-50",
                l === locale && "font-semibold text-brand-600"
              )}
            >
              {LOCALE_LABELS[l]}
              {l === locale && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
