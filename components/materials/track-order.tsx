"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search, LoaderCircle, Truck, Phone, MapPin, CircleCheck, Circle, RefreshCw, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orderStatuses, orderStatusLabel, ticketStatusLabel, type OrderStatus, type TicketStatus } from "@/lib/store-public";
import { useSession } from "@/components/auth/use-session";
import { cn } from "@/lib/utils";

interface Order { orderNo: string; placedAt: string; status: OrderStatus; statusLabel: string; timeline: { status: OrderStatus; at: string; note?: string }[]; items?: string; deliveryLocation?: string; preferredDate?: string; vehicle?: string; driverPhone?: string; eta?: string }
interface Ticket { ticketNo: string; createdAt: string; status: TicketStatus; issueType: string; description: string; orderNo?: string; updates: { at: string; by: string; text: string; status?: TicketStatus }[] }

const field = "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";
const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function TrackOrder() {
  const params = useSearchParams();
  const { user } = useSession();
  const [ref, setRef] = useState(params.get("order") ?? params.get("ticket") ?? "");
  const [phone, setPhone] = useState(params.get("phone") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [mine, setMine] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const lookup = useCallback(async (r: string, p: string) => {
    const code = r.trim().toUpperCase();
    if (!code) return;
    setBusy(true);
    setError(null);
    const isTicket = code.startsWith("HELP");
    const url = isTicket ? `/api/support?ticket=${code}&phone=${encodeURIComponent(p)}` : `/api/track?order=${code}&phone=${encodeURIComponent(p)}`;
    const res = await fetch(url, { cache: "no-store" });
    const j = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setOrder(null);
      setTicket(null);
      setError(j?.error ?? "Not found");
      return;
    }
    if (isTicket) {
      setTicket(j.ticket);
      setOrder(null);
    } else {
      setOrder(j.order);
      setTicket(null);
    }
    setLastRefresh(new Date());
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { if (ref) void lookup(ref, phone); }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!user) return;
    fetch("/api/track", { cache: "no-store" }).then((r) => r.json()).then((j) => setMine(j.orders ?? [])).catch(() => setMine([]));
  }, [user]);
  const [phoneFilledFor, setPhoneFilledFor] = useState<string | null>(null);
  if (user && phoneFilledFor !== user.id) {
    setPhoneFilledFor(user.id);
    if (!phone && user.phone) setPhone(user.phone);
  }

  // live refresh every 30 s while an active order is shown
  useEffect(() => {
    if (!order || order.status === "delivered" || order.status === "cancelled") return;
    const t = setInterval(() => void lookup(order.orderNo, phone), 30000);
    return () => clearInterval(t);
  }, [order, phone, lookup]);

  const steps = orderStatuses.filter((s) => s !== "cancelled");

  return (
    <div className="space-y-8">
      <form onSubmit={(e) => { e.preventDefault(); void lookup(ref, phone); }} className="grid grid-cols-1 gap-3 rounded-3xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5 sm:grid-cols-[1fr_1fr_auto]">
        <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500" htmlFor="tr-ref">Order or ticket number</label><input id="tr-ref" className={cn(field, "uppercase")} value={ref} onChange={(e) => setRef(e.target.value)} placeholder="PS-XXXXXXX or HELP-XXXXXXX" /></div>
        <div><label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500" htmlFor="tr-phone">Mobile number used</label><input id="tr-phone" className={field} inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="98765 43210" /></div>
        <Button type="submit" className="self-end" disabled={busy}>{busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />} Track</Button>
      </form>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {order && (
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Order</p>
              <p className="font-display text-2xl font-extrabold tracking-wider text-ink-900">{order.orderNo}</p>
              <p className="mt-1 text-xs text-ink-500">Placed {fmt(order.placedAt)}</p>
            </div>
            <div className="text-right">
              <span className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold", order.status === "delivered" ? "bg-emerald-50 text-emerald-700" : order.status === "cancelled" ? "bg-red-50 text-red-700" : "bg-brand-50 text-brand-700")}>
                {order.status !== "delivered" && order.status !== "cancelled" && <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />}{order.statusLabel}
              </span>
              {lastRefresh && <p className="mt-2 flex items-center justify-end gap-1 text-[11px] text-ink-400"><RefreshCw className="h-3 w-3" /> Live · updated {lastRefresh.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>}
            </div>
          </div>

          {order.status !== "cancelled" && (
            <ol className="mt-8 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {steps.map((s, i) => {
                const idx = steps.indexOf(order.status as (typeof steps)[number]);
                const done = i <= idx;
                return (
                  <li key={s} className="flex flex-col items-center text-center">
                    <span className={cn("grid h-8 w-8 place-items-center rounded-full", done ? "bg-brand-500 text-white" : "bg-ink-100 text-ink-400")}>{done ? <CircleCheck className="h-4 w-4" /> : <Circle className="h-3 w-3" />}</span>
                    <span className={cn("mt-2 text-[11px] font-semibold leading-tight", done ? "text-ink-900" : "text-ink-400")}>{orderStatusLabel[s]}</span>
                  </li>
                );
              })}
            </ol>
          )}

          {(order.vehicle || order.eta || order.driverPhone) && (
            <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl bg-ink-900 p-4 text-white sm:grid-cols-3">
              <p className="flex items-center gap-2 text-sm"><Truck className="h-4 w-4 text-brand-400" /> {order.vehicle ?? "Vehicle to be assigned"}</p>
              <p className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-brand-400" /> {order.driverPhone ? <a href={`tel:${order.driverPhone}`} className="hover:text-brand-400">Driver {order.driverPhone}</a> : "Driver number on dispatch"}</p>
              <p className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-brand-400" /> ETA {order.eta ?? "to be confirmed"}</p>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Items</p>
              <pre className="mt-2 whitespace-pre-wrap rounded-xl bg-ink-50 p-3 font-sans text-sm text-ink-700">{order.items || "—"}</pre>
              {order.deliveryLocation && <p className="mt-2 flex items-start gap-1 text-sm text-ink-600"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {order.deliveryLocation}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Timeline</p>
              <ul className="mt-2 space-y-3">
                {[...order.timeline].reverse().map((t, i) => (
                  <li key={i} className="flex gap-3 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" /><div><p className="font-semibold text-ink-900">{orderStatusLabel[t.status]}</p>{t.note && <p className="text-ink-600">{t.note}</p>}<p className="text-xs text-ink-400">{fmt(t.at)}</p></div></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-ink-100 pt-5">
            <Button href={`/support?order=${order.orderNo}`} variant="outline" size="sm"><Headset className="h-4 w-4" /> Problem with this order?</Button>
          </div>
        </div>
      )}

      {ticket && (
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Complaint</p><p className="font-display text-2xl font-extrabold tracking-wider text-ink-900">{ticket.ticketNo}</p><p className="mt-1 text-xs text-ink-500">Raised {fmt(ticket.createdAt)}{ticket.orderNo ? ` · Order ${ticket.orderNo}` : ""}</p></div>
            <span className={cn("rounded-full px-4 py-1.5 text-sm font-bold", ticket.status === "resolved" || ticket.status === "closed" ? "bg-emerald-50 text-emerald-700" : "bg-brand-50 text-brand-700")}>{ticketStatusLabel[ticket.status]}</span>
          </div>
          <p className="mt-4 rounded-xl bg-ink-50 p-3 text-sm text-ink-700">{ticket.description}</p>
          <ul className="mt-5 space-y-3">
            {[...ticket.updates].reverse().map((u, i) => (
              <li key={i} className="flex gap-3 text-sm"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" /><div><p className="font-semibold text-ink-900">{u.by === "patel-sons" ? "Patel Sons support" : "You"}{u.status ? ` · ${ticketStatusLabel[u.status]}` : ""}</p><p className="text-ink-600">{u.text}</p><p className="text-xs text-ink-400">{fmt(u.at)}</p></div></li>
            ))}
          </ul>
        </div>
      )}

      {user && mine && mine.length > 0 && !order && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Your recent orders</p>
          <ul className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mine.map((o) => (
              <li key={o.orderNo}><button onClick={() => { setRef(o.orderNo); void lookup(o.orderNo, phone); }} className="flex w-full items-center justify-between rounded-2xl bg-white p-4 text-left shadow-soft ring-1 ring-ink-900/5 hover:ring-brand-500"><span><span className="font-bold text-ink-900">{o.orderNo}</span><br /><span className="text-xs text-ink-500">{fmt(o.placedAt)}</span></span><span className="text-xs font-semibold text-brand-700">{o.statusLabel}</span></button></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
