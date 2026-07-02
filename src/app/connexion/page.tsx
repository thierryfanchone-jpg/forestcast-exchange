import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { LogIn } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Connexion" };

export default function ConnexionPage() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center pt-16 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <LogIn size={24} />
            </div>
            <h1 className="text-2xl font-bold text-white">Connexion</h1>
            <p className="mt-2 text-sm text-slate-400">
              Pas encore de compte ?{" "}
              <Link href="/inscription" className="text-gold hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="card-orion">
            <form className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Adresse email
                </label>
                <input
                  type="email"
                  placeholder="ton@email.com"
                  className="input-orion"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-300">
                  Mot de passe
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input-orion"
                  autoComplete="current-password"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input type="checkbox" className="rounded border-navy-border" />
                  Se souvenir de moi
                </label>
                <Link href="/mot-de-passe-oublie" className="text-gold hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-3">
                Se connecter
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-navy-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-navy-light px-4 text-xs text-slate-500">ou continuer avec</span>
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-navy-border bg-navy py-3 text-sm text-white transition-colors hover:border-white/30">
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Connexion avec Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
