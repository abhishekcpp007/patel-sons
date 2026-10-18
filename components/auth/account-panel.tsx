"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { CircleCheck, CircleAlert, LogOut, MessageSquarePlus, Phone, Mail, CalendarDays } from "lucide-react";
import { useSession, signOut } from "./use-session";
import { PhoneForm } from "./phone-form";
import { GoogleButton } from "./google-button";
import { Button } from "@/components/ui/button";
import { queryTabs } from "@/lib/enquiry-schema";
import { openQuery } from "@/lib/query-store";
import { PackageSearch, Headset } from "lucide-react";

interface Q { id: string; receivedAt: string; queryType: string; project?: string; contractType?: string; message?: string; preferredDate?: string; preferredTime?: string }

export function AccountPanel() {
  const { status, user } = useSession();
  const params = useSearchParams();
  const step = params.get("step");
  const [queries, setQueries] = useState<Q[] | null>(null);
  const [orders, setOrders] = useState<{ orderNo: string; placedAt: string; statusLabel: string }[]>([]);
  const [tickets, setTickets] = useState<{ ticketNo: string; createdAt: string; status: string }[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/account/queries", { cache: "no-store" }).then((r) => r.json()).then((j) => setQueries(j.queries ?? [])).catch(() => setQueries([]));
    fetch("/api/track", { cache: "no-store" }).then((r) => r.json()).then((j) => setOrders(j.orders ?? [])).catch(() => {});
    fetch("/api/support", { cache: "no-store" }).then((r) => r.json()).then((j) => setTickets(j.tickets ?? [])).catch(() => {});
  }, [user]);

  if (status === "loading") return <div className="h-64 animate-pulse rounded-3xl bg-white/50" />;

  if (!user) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-ink-900/5">
        <h2 className="text-xl font-bold text-ink-900">You&apos;re not signed in</h2>
        <p className="mt-2 text-sm text-ink-500">Sign up with Google to track your queries and site visits.</p>
        <GoogleButton className="mt-6" />
        <Link href="/signup" className="mt-3 inline-block text-sm font-semibold text-brand-600">More sign-up options</Link>
      </div>
    );
  }

  const needsPhone = !user.phone;
  const initials = user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  const typeLabel = (v: string) => queryTabs.find((t) => t.value === v)?.label ?? v;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
          <div className="flex items-center gap-4">
            {user.picture ? (
              <Image src={user.picture} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" unoptimized />
            ) : (
              <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-lg font-bold text-white">{initials}</span>
            )}
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-ink-900">{user.name}</p>
              <p className="flex items-center gap-1 truncate text-sm text-ink-500"><Mail className="h-3.5 w-3.5" /> {user.email}</p>
            </div>
          </div>
          <div className={`mt-5 flex items-center gap-2 rounded-xl p-3 text-sm ${user.phone ? "bg-emerald-50 text-emerald-800" : "bg-brand-50 text-brand-700"}`}>
            {user.phone ? <CircleCheck className="h-4 w-4" /> : <CircleAlert className="h-4 w-4" />}
            {user.phone ? <span><Phone className="mr-1 inline h-3.5 w-3.5" />+91 {user.phone}{user.whatsappOk ? " · WhatsApp OK" : ""}</span> : "Add your mobile number to complete sign-up"}
          </div>
          <button onClick={() => void signOut()} className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink-500 hover:text-ink-900"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>

        <div id="phone" className="scroll-mt-28 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{needsPhone ? "Step 2 of 2" : "Contact number"}</p>
          <h2 className="mt-1 text-xl font-bold text-ink-900">{needsPhone ? "Your mobile number" : "Update mobile number"}</h2>
          <p className="mt-1 text-sm text-ink-500">Our team uses this to call or WhatsApp you about queries and site visits.</p>
          <PhoneForm className="mt-5" initialPhone={user.phone} initialWhatsapp={user.whatsappOk} />
        </div>
      </div>

      <div className="lg:col-span-2">
        {needsPhone && step === "phone" && (
          <div className="mb-6 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800">
            <strong>Almost done.</strong> Google sign-in worked. Add your mobile number on the left so we can reach you.
          </div>
        )}
        {(orders.length > 0 || tickets.length > 0) && (
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900"><PackageSearch className="h-5 w-5 text-brand-500" /> Material orders</h2>
              <ul className="mt-3 divide-y divide-ink-100">{orders.map((o) => <li key={o.orderNo}><Link href={`/track?order=${o.orderNo}&phone=${encodeURIComponent(user.phone ?? "")}`} className="flex items-center justify-between py-3 text-sm hover:text-brand-600"><span className="font-semibold">{o.orderNo}</span><span className="text-xs text-ink-500">{o.statusLabel}</span></Link></li>)}{orders.length === 0 && <li className="py-3 text-sm text-ink-500">No orders yet.</li>}</ul>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900"><Headset className="h-5 w-5 text-brand-500" /> Complaints</h2>
              <ul className="mt-3 divide-y divide-ink-100">{tickets.map((t) => <li key={t.ticketNo}><Link href={`/track?ticket=${t.ticketNo}&phone=${encodeURIComponent(user.phone ?? "")}`} className="flex items-center justify-between py-3 text-sm hover:text-brand-600"><span className="font-semibold">{t.ticketNo}</span><span className="text-xs capitalize text-ink-500">{t.status.replace("-", " ")}</span></Link></li>)}{tickets.length === 0 && <li className="py-3 text-sm text-ink-500">No complaints. Great.</li>}</ul>
            </div>
          </div>
        )}
        <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-ink-900">My queries</h2>
            <Button size="sm" onClick={() => openQuery()}><MessageSquarePlus className="h-4 w-4" /> Raise a query</Button>
          </div>
          {queries === null ? (
            <div className="mt-6 h-24 animate-pulse rounded-2xl bg-ink-50" />
          ) : queries.length === 0 ? (
            <p className="mt-6 rounded-2xl border border-dashed border-ink-200 p-8 text-center text-sm text-ink-500">No queries yet. Raise one and it will appear here.</p>
          ) : (
            <ul className="mt-6 divide-y divide-ink-100">
              {queries.map((q) => (
                <li key={q.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="font-semibold text-ink-900">{typeLabel(q.queryType)}{q.project ? ` · ${q.project}` : ""}{q.contractType ? ` · ${q.contractType.replace("-", " ")}` : ""}</p>
                    {q.message && <p className="mt-0.5 line-clamp-2 text-sm text-ink-500">{q.message}</p>}
                    {q.preferredDate && <p className="mt-0.5 flex items-center gap-1 text-xs text-ink-500"><CalendarDays className="h-3.5 w-3.5" /> {q.preferredDate}{q.preferredTime ? ` · ${q.preferredTime}` : ""}</p>}
                  </div>
                  <span className="shrink-0 text-xs text-ink-400">{new Date(q.receivedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
