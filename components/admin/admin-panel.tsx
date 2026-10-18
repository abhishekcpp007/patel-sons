"use client";

import { useEffect, useState } from "react";
import { LoaderCircle, LogOut, RefreshCw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderStatuses, orderStatusLabel, ticketStatuses, ticketStatusLabel, issueTypes, type OrderStatus, type TicketStatus } from "@/lib/store-public";
import { cn } from "@/lib/utils";

type Order = { id: string; orderNo: string; receivedAt: string; name: string; phone: string; items?: string; deliveryLocation?: string; preferredDate?: string; status: OrderStatus; vehicle?: string; driverPhone?: string; eta?: string };
type Ticket = { id: string; ticketNo: string; createdAt: string; name: string; phone: string; orderNo?: string; issueType: string; description: string; status: TicketStatus };
type Lead = { id: string; receivedAt: string; queryType: string; name: string; phone: string; project?: string; message?: string; contractType?: string; preferredDate?: string };

const field = "rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none";
const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function AdminPanel() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [token, setToken] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [data, setData] = useState<{ orders: Order[]; tickets: Ticket[]; leads: Lead[] } | null>(null);
  const [tab, setTab] = useState<"orders" | "tickets" | "leads">("orders");

  const load = async () => {
    const r = await fetch("/api/admin/orders", { cache: "no-store" });
    if (r.status === 401) { setAuthed(false); return; }
    setData(await r.json());
    setAuthed(true);
  };
  useEffect(() => {
    const t = setTimeout(() => void load(), 0);
    return () => clearTimeout(t);
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { setErr(j?.error ?? "Login failed"); return; }
    await load();
  };
  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); setAuthed(false); setData(null); };

  if (authed === null) return <div className="h-40 animate-pulse rounded-3xl bg-white/60" />;
  if (!authed)
    return (
      <form onSubmit={login} className="mx-auto max-w-sm space-y-4 rounded-3xl bg-white p-8 shadow-soft ring-1 ring-ink-900/5">
        <h2 className="text-xl font-bold text-ink-900">Staff sign-in</h2>
        <p className="text-sm text-ink-500">Enter the staff token (ADMIN_TOKEN) to manage orders and complaints.</p>
        <input type="password" className={cn(field, "w-full py-3")} value={token} onChange={(e) => setToken(e.target.value)} placeholder="Staff token" />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-white p-1 ring-1 ring-ink-200">
          {(["orders", "tickets", "leads"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} className={cn("rounded-full px-4 py-2 text-sm font-semibold capitalize", tab === t ? "bg-ink-900 text-white" : "text-ink-600")}>{t} <span className="ml-1 text-xs opacity-70">{data?.[t].length ?? 0}</span></button>
          ))}
        </div>
        <div className="flex gap-2"><Button size="sm" variant="outline" onClick={load}><RefreshCw className="h-4 w-4" /> Refresh</Button><Button size="sm" variant="ghost" onClick={logout}><LogOut className="h-4 w-4" /> Sign out</Button></div>
      </div>

      {tab === "orders" && (
        <div className="space-y-4">
          {data?.orders.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink-500">No material orders yet.</p>}
          {data?.orders.map((o) => <OrderRow key={o.id} o={o} onSaved={load} />)}
        </div>
      )}
      {tab === "tickets" && (
        <div className="space-y-4">
          {data?.tickets.length === 0 && <p className="rounded-2xl bg-white p-8 text-center text-sm text-ink-500">No complaints. Good.</p>}
          {data?.tickets.map((t) => <TicketRow key={t.id} t={t} onSaved={load} />)}
        </div>
      )}
      {tab === "leads" && (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-soft ring-1 ring-ink-900/5">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="bg-ink-900 text-left text-white"><th className="px-4 py-3">When</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Name</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Details</th></tr></thead>
            <tbody className="divide-y divide-ink-100">{data?.leads.map((l) => <tr key={l.id}><td className="px-4 py-3 text-ink-500">{fmt(l.receivedAt)}</td><td className="px-4 py-3 font-semibold">{l.queryType}</td><td className="px-4 py-3">{l.name}</td><td className="px-4 py-3"><a href={`tel:${l.phone}`} className="text-brand-700">{l.phone}</a></td><td className="px-4 py-3 text-ink-600">{[l.project, l.contractType, l.preferredDate, l.message].filter(Boolean).join(" · ")}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function OrderRow({ o, onSaved }: { o: Order; onSaved: () => void }) {
  const [f, setF] = useState({ status: o.status, note: "", vehicle: o.vehicle ?? "", driverPhone: o.driverPhone ?? "", eta: o.eta ?? "" });
  const [busy, setBusy] = useState(false);
  const save = async () => { setBusy(true); await fetch(`/api/admin/orders/${o.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); setBusy(false); setF((x) => ({ ...x, note: "" })); onSaved(); };
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><p className="font-display text-lg font-extrabold tracking-wider text-ink-900">{o.orderNo} <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{orderStatusLabel[o.status]}</span></p><p className="text-sm text-ink-600">{o.name} · <a href={`tel:${o.phone}`} className="text-brand-700">{o.phone}</a> · {fmt(o.receivedAt)}</p>{o.deliveryLocation && <p className="text-xs text-ink-500">Deliver to: {o.deliveryLocation}{o.preferredDate ? ` · by ${o.preferredDate}` : ""}</p>}</div>
      </div>
      <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-ink-50 p-3 font-sans text-xs text-ink-700">{o.items || "—"}</pre>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-5">
        <select className={field} value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as OrderStatus })}>{orderStatuses.map((s) => <option key={s} value={s}>{orderStatusLabel[s]}</option>)}</select>
        <input className={field} placeholder="Vehicle no." value={f.vehicle} onChange={(e) => setF({ ...f, vehicle: e.target.value })} />
        <input className={field} placeholder="Driver phone" value={f.driverPhone} onChange={(e) => setF({ ...f, driverPhone: e.target.value })} />
        <input className={field} placeholder="ETA e.g. Today 4–6 PM" value={f.eta} onChange={(e) => setF({ ...f, eta: e.target.value })} />
        <input className={field} placeholder="Note to customer" value={f.note} onChange={(e) => setF({ ...f, note: e.target.value })} />
      </div>
      <Button size="sm" className="mt-3" onClick={save} disabled={busy}>{busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Update order</Button>
    </div>
  );
}

function TicketRow({ t, onSaved }: { t: Ticket; onSaved: () => void }) {
  const [f, setF] = useState({ status: t.status, text: "" });
  const [busy, setBusy] = useState(false);
  const save = async () => { if (!f.text) return; setBusy(true); await fetch(`/api/admin/tickets/${t.id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); setBusy(false); setF((x) => ({ ...x, text: "" })); onSaved(); };
  return (
    <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5">
      <p className="font-display text-lg font-extrabold tracking-wider text-ink-900">{t.ticketNo} <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">{ticketStatusLabel[t.status]}</span></p>
      <p className="text-sm text-ink-600">{t.name} · <a href={`tel:${t.phone}`} className="text-brand-700">{t.phone}</a> · {fmt(t.createdAt)}{t.orderNo ? ` · Order ${t.orderNo}` : ""} · <span className="font-semibold">{issueTypes.find((i) => i.value === t.issueType)?.label}</span></p>
      <p className="mt-2 rounded-xl bg-ink-50 p-3 text-sm text-ink-700">{t.description}</p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[auto_1fr_auto]">
        <select className={field} value={f.status} onChange={(e) => setF({ ...f, status: e.target.value as TicketStatus })}>{ticketStatuses.map((s) => <option key={s} value={s}>{ticketStatusLabel[s]}</option>)}</select>
        <input className={field} placeholder="Reply to customer (required)" value={f.text} onChange={(e) => setF({ ...f, text: e.target.value })} />
        <Button size="sm" onClick={save} disabled={busy || !f.text}>{busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Update</Button>
      </div>
    </div>
  );
}
