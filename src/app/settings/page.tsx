"use client";

import { useState } from "react";
import { Bell, Shield, Wallet, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

type Tab = "Profile" | "Security" | "Wallet" | "Notifications";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("Profile");
  const { push } = useToast();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-[200px_1fr]">
        <nav className="space-y-1">
          {([
            ["Profile", User],
            ["Security", Shield],
            ["Wallet", Wallet],
            ["Notifications", Bell],
          ] as [Tab, React.ElementType][]).map(([key, Icon]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                tab === key
                  ? "bg-white/[0.06] text-ink-primary"
                  : "text-ink-secondary hover:bg-white/[0.03]",
              )}
            >
              <Icon className="h-4 w-4" /> {key}
            </button>
          ))}
        </nav>

        <div className="panel p-6">
          {tab === "Profile" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                push({ kind: "success", title: "Profile saved" });
              }}
              className="space-y-4"
            >
              <Input label="Handle" defaultValue="alpha_macro" />
              <Input label="Display name" defaultValue="A. Macro" />
              <Input label="Email" type="email" defaultValue="alpha@forecaxt.com" />
              <div className="flex justify-end">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          )}

          {tab === "Security" && (
            <div className="space-y-5">
              <Row title="Two-factor authentication" body="Active · TOTP via authenticator app">
                <Button variant="secondary" size="sm">Manage</Button>
              </Row>
              <Row title="Passkeys" body="No passkeys registered">
                <Button size="sm">Add passkey</Button>
              </Row>
              <Row title="Trusted devices" body="2 devices · last seen Paris, FR">
                <Button variant="secondary" size="sm">Review</Button>
              </Row>
              <Row title="Login alerts" body="Email me on every new sign-in">
                <Toggle defaultOn />
              </Row>
            </div>
          )}

          {tab === "Wallet" && (
            <div className="space-y-5">
              <Row title="Connected wallet" body="0xC3...8b21 · Polygon · WalletConnect">
                <Button variant="secondary" size="sm">Disconnect</Button>
              </Row>
              <Row title="Auto-withdrawal" body="Send realised P&L to wallet on settlement">
                <Toggle />
              </Row>
              <Row title="USDC balance" body="$4,210.00 available">
                <Button size="sm">Withdraw</Button>
              </Row>
            </div>
          )}

          {tab === "Notifications" && (
            <div className="space-y-5">
              <Row title="Order filled" body="Toast & email"><Toggle defaultOn /></Row>
              <Row title="Position resolved" body="Toast & email"><Toggle defaultOn /></Row>
              <Row title="Price alerts" body="Toast only"><Toggle /></Row>
              <Row title="Closing soon" body="Toast only"><Toggle defaultOn /></Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-5 last:border-0 last:pb-0">
      <div>
        <div className="text-sm font-semibold text-ink-primary">{title}</div>
        <div className="text-xs text-ink-secondary">{body}</div>
      </div>
      {children}
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs text-ink-secondary">{label}</span>
      <input
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-sm focus:border-accent-green/40 focus:outline-none focus:ring-2 focus:ring-accent-green/20"
        {...props}
      />
    </label>
  );
}

function Toggle({ defaultOn }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(Boolean(defaultOn));
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        on ? "bg-accent-green" : "bg-white/[0.08]",
      )}
      aria-pressed={on}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
          on ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
}
