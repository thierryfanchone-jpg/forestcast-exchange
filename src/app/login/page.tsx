"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { createClient } from "@/lib/supabase/client";
import { env } from "@/lib/env";
import { ConfigNotice } from "@/components/ConfigNotice";

function LoginInner() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const supabase = createClient();
  const redirectTo = `${env.appUrl}/auth/callback?next=${encodeURIComponent(next)}`;

  if (!supabase) {
    return <ConfigNotice service="Supabase" />;
  }

  async function oauth(provider: "google" | "apple") {
    setError(null);
    setLoading(provider);
    const { error } = await supabase!.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    });
    if (error) {
      setError(error.message);
      setLoading(null);
    }
  }

  async function magicLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading("email");
    const { error } = await supabase!.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(null);
  }

  return (
    <div className="card w-full max-w-md p-8">
      <h1 className="text-center text-xl font-bold text-ink">
        {t("auth.loginTitle")}
      </h1>
      <p className="mt-1 text-center text-sm text-muted">
        {t("auth.loginSubtitle")}
      </p>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={() => oauth("google")}
          disabled={loading !== null}
          className="btn-secondary w-full"
        >
          {/* logo Google */}
          <svg className="h-4 w-4" viewBox="0 0 48 48" aria-hidden>
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.4 30.1 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.8 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 3-2.2 5.5-4.7 7.2l7.3 5.7c4.3-3.9 6.8-9.7 6.8-17.4z" />
            <path fill="#FBBC05" d="M10.3 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.8-6.1C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.8l7.8-6.1z" />
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.6 2.3-6.4 0-11.8-3.8-13.7-9.3l-7.8 6.1C6.4 42.6 14.6 48 24 48z" />
          </svg>
          {t("auth.google")}
        </button>

        {/* Apple OAuth : prêt à activer une fois le compte développeur Apple
            configuré dans Supabase (provider "apple"). */}
        <button
          type="button"
          onClick={() => oauth("apple")}
          disabled={loading !== null}
          className="btn-secondary w-full"
        >
          <svg className="h-4 w-4" viewBox="0 0 384 512" fill="currentColor" aria-hidden>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C73.3 141.2 25 184.8 25 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.5 78.6c27-32.1 24.5-61.3 23.7-71.6-23.8 1.4-51.3 16.2-67 34.4-17.3 19.6-27.5 43.8-25.3 71.1 25.7 2 49.1-11.2 68.6-33.9z" />
          </svg>
          {t("auth.apple")}
        </button>
      </div>

      <div className="my-5 flex items-center gap-3 text-xs uppercase text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        {t("auth.or")}
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      {sent ? (
        <p className="rounded-lg bg-trust-light p-3 text-center text-sm text-trust">
          {t("auth.magicLinkSent")}
        </p>
      ) : (
        <form onSubmit={magicLink} className="space-y-3">
          <div>
            <label className="label" htmlFor="email">
              {t("auth.emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className="input"
            />
          </div>
          <button
            type="submit"
            disabled={loading !== null}
            className="btn-primary w-full"
          >
            <Mail className="h-4 w-4" />
            {t("auth.magicLink")}
          </button>
        </form>
      )}

      {error && <p className="mt-3 text-center text-sm text-danger">{error}</p>}
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container-app flex justify-center py-16">
      <Suspense fallback={null}>
        <LoginInner />
      </Suspense>
    </div>
  );
}
