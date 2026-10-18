"use client";

import { useState } from "react";
import { LoaderCircle, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/social";
import { refreshSession } from "./use-session";
import { cn } from "@/lib/utils";

export function PhoneForm({ initialPhone, initialWhatsapp = true, onSaved, className }: { initialPhone?: string | null; initialWhatsapp?: boolean; onSaved?: () => void; className?: string }) {
  const [phone, setPhone] = useState(initialPhone ?? "");
  const [whatsappOk, setWhatsappOk] = useState(initialWhatsapp);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    setError(null);
    const res = await fetch("/api/account/phone", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone, whatsappOk }) });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setError(json?.issues?.phone?.[0] ?? json?.error ?? "Could not save. Please try again.");
      return;
    }
    await refreshSession();
    setStatus("saved");
    onSaved?.();
  };

  return (
    <form onSubmit={submit} className={cn("space-y-4", className)} noValidate>
      <div>
        <label htmlFor="acct-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500">Mobile number</label>
        <div className="flex items-center rounded-xl border border-ink-200 bg-white focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/15">
          <span className="flex items-center gap-1.5 border-r border-ink-200 px-3 text-sm font-semibold text-ink-600"><Phone className="h-4 w-4 text-brand-500" /> +91</span>
          <input id="acct-phone" inputMode="tel" autoComplete="tel-national" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" className="w-full rounded-r-xl px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none" />
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
      <label className="flex cursor-pointer items-start gap-3 rounded-xl bg-ink-50 p-3 text-sm text-ink-700">
        <input type="checkbox" checked={whatsappOk} onChange={(e) => setWhatsappOk(e.target.checked)} className="mt-0.5 h-4 w-4 accent-brand-500" />
        <span className="flex items-center gap-2"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> You may contact me on WhatsApp about my queries and site visits.</span>
      </label>
      <Button type="submit" size="lg" className="w-full" disabled={status === "saving" || phone.trim().length < 10}>
        {status === "saving" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
        {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓ Update number" : "Save mobile number"}
      </Button>
      <p className="text-center text-xs text-ink-400">Used only by the Patel Sons team to contact you. Never shared or sold.</p>
    </form>
  );
}
