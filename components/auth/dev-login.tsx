"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FlaskConical, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { refreshSession } from "./use-session";

/** Shown only when the server reports AUTH_DEV_LOGIN=true. Lets you test the flow without Google credentials. */
export function DevLogin({ next = "/account" }: { next?: string }) {
  const router = useRouter();
  const [name, setName] = useState("Test User");
  const [email, setEmail] = useState("test.user@example.com");
  const [busy, setBusy] = useState(false);
  const field = "w-full rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/auth/dev-login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email }) });
    const json = await res.json().catch(() => ({}));
    await refreshSession();
    setBusy(false);
    if (res.ok) router.push(json.needsPhone ? "/account?step=phone" : next);
  };
  return (
    <form onSubmit={submit} className="space-y-3 rounded-2xl border border-amber-300 bg-amber-50 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800"><FlaskConical className="h-4 w-4" /> Developer test sign-in (Google not configured)</p>
      <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input className={field} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
      <Button type="submit" variant="secondary" className="w-full" disabled={busy}>
        {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null} Sign in as test user
      </Button>
    </form>
  );
}
