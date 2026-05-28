"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "info" | "warn" | "error";
interface ToastItem {
  id: string;
  kind: ToastKind;
  title: string;
  body?: string;
}

interface Ctx {
  push: (t: Omit<ToastItem, "id">) => void;
}

const ToastCtx = createContext<Ctx | null>(null);

export function useToast(): Ctx {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider />");
  return ctx;
}

const ICONS: Record<ToastKind, React.ElementType> = {
  success: CheckCircle2,
  info: Info,
  warn: AlertTriangle,
  error: XCircle,
};

const COLORS: Record<ToastKind, string> = {
  success: "text-accent-green",
  info: "text-accent-blue",
  warn: "text-warn",
  error: "text-danger",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((t: Omit<ToastItem, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setItems((prev) => [...prev, { id, ...t }]);
    setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== id)), 4200);
  }, []);

  const ctx = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={ctx}>
      {children}
      <div className="pointer-events-none fixed right-4 top-20 z-[200] flex w-[360px] max-w-[92vw] flex-col gap-2">
        <AnimatePresence>
          {items.map((t) => {
            const Icon = ICONS[t.kind];
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className="pointer-events-auto flex gap-3 rounded-xl border border-white/[0.08] bg-surface-2/95 px-4 py-3 shadow-panel backdrop-blur-xl"
              >
                <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", COLORS[t.kind])} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-ink-primary">{t.title}</div>
                  {t.body ? <div className="text-xs text-ink-secondary">{t.body}</div> : null}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
