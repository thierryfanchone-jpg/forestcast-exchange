"use client";

import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";

interface Props {
  mode: "login" | "register";
}

export function AuthCard({ mode }: Props) {
  const { push } = useToast();
  const isLogin = mode === "login";

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <div className="panel p-7">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          {isLogin ? "Sign in" : "Open an account"}
        </h1>
        <p className="mt-1 text-sm text-ink-secondary">
          {isLogin
            ? "Welcome back. Trade probability across three continents."
            : "Forecaxt accounts include 2FA, KYC and non-custodial wallet support."}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            push({
              kind: "success",
              title: isLogin ? "Signed in" : "Verification email sent",
              body: isLogin ? "Welcome back." : "Check your inbox to continue.",
            });
          }}
          className="mt-6 space-y-3"
        >
          {!isLogin ? (
            <Input label="Handle" placeholder="alpha_macro" />
          ) : null}
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Password" type="password" placeholder="••••••••" />
          {!isLogin ? (
            <label className="flex items-start gap-2 text-xs text-ink-secondary">
              <input type="checkbox" className="mt-0.5 accent-accent-green" />
              <span>
                I agree to the <Link href="/legal/terms" className="text-accent-green hover:underline">Terms</Link> and
                <Link href="/legal/risk" className="text-accent-green hover:underline"> Risk Disclosure</Link>.
              </span>
            </label>
          ) : null}
          <Button className="w-full" size="lg">
            {isLogin ? "Sign in" : "Create account"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs text-ink-secondary">
          <span className="h-px flex-1 bg-white/[0.06]" /> or continue with{" "}
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>

        <div className="grid gap-2">
          <Button variant="secondary" className="w-full justify-center">Continue with Google</Button>
          <Button variant="secondary" className="w-full justify-center">Connect wallet (WalletConnect)</Button>
        </div>

        <p className="mt-6 text-center text-xs text-ink-secondary">
          {isLogin ? "New here?" : "Already on Forecaxt?"}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="text-accent-green hover:underline"
          >
            {isLogin ? "Open an account" : "Sign in"}
          </Link>
        </p>
      </div>

      <p className="mt-4 text-center text-[11px] text-ink-tertiary">
        Two-factor authentication is required for all live trading. KYC handled by Sumsub.
      </p>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-ink-secondary">{label}</span>
      <input
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm placeholder:text-ink-secondary focus:border-accent-green/40 focus:outline-none focus:ring-2 focus:ring-accent-green/20"
        {...props}
      />
    </label>
  );
}
