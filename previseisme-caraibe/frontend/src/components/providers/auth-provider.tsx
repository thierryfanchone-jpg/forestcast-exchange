"use client";

import * as React from "react";
import { demoAccounts, type DemoAccount } from "@/lib/demo-data/users";
import type { UserProfile } from "@/lib/types/user";

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (input: {
    fullName: string;
    email: string;
    password: string;
    organization?: string;
  }) => Promise<{ error?: string }>;
  logout: () => void;
  updateProfile: (patch: Partial<UserProfile>) => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "previseisme-caraibe:session";
const ACCOUNTS_KEY = "previseisme-caraibe:accounts";

function stripPassword(account: DemoAccount): UserProfile {
  const { password: _password, ...profile } = account;
  void _password;
  return profile;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getAccounts = React.useCallback((): DemoAccount[] => {
    try {
      const raw = window.localStorage.getItem(ACCOUNTS_KEY);
      return raw ? (JSON.parse(raw) as DemoAccount[]) : demoAccounts;
    } catch {
      return demoAccounts;
    }
  }, []);

  const login = React.useCallback(
    async (email: string, password: string) => {
      const accounts = getAccounts();
      const account = accounts.find(
        (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
      );
      if (!account) return { error: "Identifiants invalides." };
      const profile = stripPassword(account);
      setUser(profile);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return {};
    },
    [getAccounts],
  );

  const signup = React.useCallback(
    async (input: { fullName: string; email: string; password: string; organization?: string }) => {
      const accounts = getAccounts();
      if (accounts.some((a) => a.email.toLowerCase() === input.email.toLowerCase())) {
        return { error: "Un compte existe déjà avec cette adresse e-mail." };
      }
      const newAccount: DemoAccount = {
        id: `usr-${Date.now()}`,
        fullName: input.fullName,
        email: input.email,
        password: input.password,
        organization: input.organization,
        organizationType: input.organization ? "business" : "family",
        homeLocation: "Non renseigné",
        alertThreshold: 4.0,
        locale: "fr",
        channels: { email: true, sms: false, push: true },
      };
      const updated = [...accounts, newAccount];
      window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updated));
      const profile = stripPassword(newAccount);
      setUser(profile);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      return {};
    },
    [getAccounts],
  );

  const logout = React.useCallback(() => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = React.useCallback((patch: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
