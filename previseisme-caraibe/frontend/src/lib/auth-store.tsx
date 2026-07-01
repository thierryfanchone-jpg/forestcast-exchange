"use client";

import * as React from "react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase-client";

export interface DemoUser {
  id: string;
  email: string;
  displayName: string;
  locale: "fr" | "en" | "es";
  organizationMode: "famille" | "entreprise" | "collectivite";
}

interface AuthContextValue {
  user: DemoUser | null;
  isDemoAuth: boolean;
  isLoading: boolean;
  signIn: (email: string, mode: DemoUser["organizationMode"]) => Promise<void>;
  signOut: () => Promise<void>;
}

const STORAGE_KEY = "previsisme-caraibe.demo-session";

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<DemoUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data }) => {
        const session = data.session;
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email ?? "",
            displayName: session.user.email?.split("@")[0] ?? "Utilisateur",
            locale: "fr",
            organizationMode: "famille",
          });
        }
        setIsLoading(false);
      });
      return;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as DemoUser);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = React.useCallback(
    async (email: string, mode: DemoUser["organizationMode"]) => {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signInWithOtp({ email });
        return;
      }
      const demoUser: DemoUser = {
        id: crypto.randomUUID(),
        email,
        displayName: email.split("@")[0] || "Utilisateur",
        locale: "fr",
        organizationMode: mode,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
      setUser(demoUser);
    },
    [],
  );

  const signOut = React.useCallback(async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isDemoAuth: !isSupabaseConfigured, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un AuthProvider");
  return ctx;
}
