"use client";

import { useState } from "react";
import Link from "next/link";
import { LoaderCircle, Send, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/auth/use-session";
import { issueTypes } from "@/lib/store-public";

const field = "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500";

export function ComplaintForm({ orderNo }: { orderNo?: string }) {
  const { user } = useSession();
  const [form, setForm] = useState({ name: "", phone: "", email: "", orderNo: orderNo ?? "", issueType: "quantity-short", description: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [ticketNo, setTicketNo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Prefill once per signed-in user (state adjusted during render, per React guidance).
  const [prefilledFor, setPrefilledFor] = useState<string | null>(null);
  if (user && prefilledFor !== user.id) {
    setPrefilledFor(user.id);
    setForm((f) => ({ ...f, name: f.name || user.name, phone: f.phone || user.phone || "", email: f.email || user.email }));
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const res = await fetch("/api/support", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setError(j?.issues ? Object.values(j.issues).flat().join(" ") : j?.error ?? "Could not submit.");
      return;
    }
    setTicketNo(j.ticketNo);
    setStatus("done");
  };

  if (status === "done" && ticketNo) {
    return (
      <div className="rounded-3xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
        <CircleCheck className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-ink-900">Complaint registered</h3>
        <p className="mt-2 text-sm text-ink-600">Your ticket number is</p>
        <p className="mt-1 font-display text-3xl font-extrabold tracking-wider text-ink-900">{ticketNo}</p>
        <p className="mt-3 text-sm text-ink-600">A support engineer will call you within 2 working hours. Track progress any time with your ticket number and mobile.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={`/track?ticket=${ticketNo}&phone=${encodeURIComponent(form.phone)}`}>Track this complaint</Button>
          <Button variant="outline" onClick={() => { setStatus("idle"); setTicketNo(null); setForm((f) => ({ ...f, description: "" })); }}>Raise another</Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className={label} htmlFor="cp-name">Full name</label><input id="cp-name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
        <div><label className={label} htmlFor="cp-phone">Mobile number</label><input id="cp-phone" className={field} inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98765 43210" /></div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className={label} htmlFor="cp-order">Order number <span className="normal-case tracking-normal text-ink-400">(if any)</span></label><input id="cp-order" className={field} value={form.orderNo} onChange={(e) => setForm({ ...form, orderNo: e.target.value.toUpperCase() })} placeholder="PS-XXXXXXX" /></div>
        <div><label className={label} htmlFor="cp-type">Issue type</label><select id="cp-type" className={field} value={form.issueType} onChange={(e) => setForm({ ...form, issueType: e.target.value })}>{issueTypes.map((i) => <option key={i.value} value={i.value}>{i.label}</option>)}</select></div>
      </div>
      <div><label className={label} htmlFor="cp-email">Email <span className="normal-case tracking-normal text-ink-400">(optional)</span></label><input id="cp-email" type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></div>
      <div><label className={label} htmlFor="cp-desc">What happened?</label><textarea id="cp-desc" rows={5} className={field} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the issue: what was ordered, what was delivered, quantities, dates. You can WhatsApp photos to us after you get the ticket number." /></div>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>{status === "sending" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Register complaint</Button>
      <p className="text-center text-xs text-ink-400">Every complaint gets a ticket number, a call within 2 working hours and a written resolution. Escalations go to <Link href="/about" className="underline">Abhishek, Co-Partner</Link>.</p>
    </form>
  );
}
