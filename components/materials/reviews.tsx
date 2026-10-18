"use client";

import { useEffect, useState } from "react";
import { Star, BadgeCheck, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { materialCategories } from "@/content/materials";
import type { Review } from "@/content/reviews";
import { useSession } from "@/components/auth/use-session";
import { cn } from "@/lib/utils";

const field = "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500";

function Stars({ n, size = "h-4 w-4" }: { n: number; size?: string }) {
  return <span className="flex gap-0.5">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className={cn(size, i <= Math.round(n) ? "fill-brand-500 text-brand-500" : "text-ink-200")} />)}</span>;
}

export function ReviewsSection({ category }: { category?: string }) {
  const { user } = useSession();
  const [data, setData] = useState<{ reviews: Review[]; count: number; average: number } | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", rating: 5, product: "", category: category ?? "", text: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const load = () => fetch(`/api/reviews${category ? `?category=${category}` : ""}`, { cache: "no-store" }).then((r) => r.json()).then(setData).catch(() => setData({ reviews: [], count: 0, average: 0 }));
  useEffect(() => {
    const t = setTimeout(() => void load(), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  const [prefilledFor, setPrefilledFor] = useState<string | null>(null);
  if (user && prefilledFor !== user.id) {
    setPrefilledFor(user.id);
    setForm((f) => ({ ...f, name: f.name || user.name, phone: f.phone || user.phone || "" }));
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setError(null);
    const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setError(j?.issues ? Object.values(j.issues).flat().join(" ") : j?.error ?? "Could not submit.");
      return;
    }
    setStatus("done");
    setForm((f) => ({ ...f, text: "", product: "" }));
    void load();
  };

  return (
    <section id="reviews" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-3">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"><span className="h-px w-6 bg-current" /> Customer feedback</p>
          <div className="mt-3 flex flex-wrap items-end gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">What buyers say about our materials</h2>
          </div>
          {data && data.count > 0 && (
            <div className="mt-4 flex items-center gap-3">
              <span className="font-display text-4xl font-extrabold text-ink-900">{data.average.toFixed(1)}</span>
              <div><Stars n={data.average} size="h-5 w-5" /><p className="mt-1 text-xs text-ink-500">Based on {data.count} {data.count === 1 ? "review" : "reviews"}</p></div>
            </div>
          )}
          <ul className="mt-8 space-y-4">
            {data === null && <li className="h-24 animate-pulse rounded-2xl bg-ink-50" />}
            {data?.reviews.length === 0 && <li className="rounded-2xl border border-dashed border-ink-200 p-8 text-center text-sm text-ink-500">No reviews yet for this category. Be the first.</li>}
            {data?.reviews.map((r) => (
              <li key={r.id} className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-xs font-bold text-brand-400">{r.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-bold text-ink-900">{r.name} {r.verified && <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700"><BadgeCheck className="h-3 w-3" /> Verified buyer</span>}</p>
                      <p className="text-xs text-ink-500">{r.product ?? materialCategories.find((c) => c.slug === r.category)?.name ?? "Materials"} · {new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    </div>
                  </div>
                  <Stars n={r.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={submit} className="h-fit rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 lg:col-span-2 lg:sticky lg:top-24" noValidate>
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          <h3 className="text-xl font-bold text-ink-900">Write a review</h3>
          <p className="mt-1 text-sm text-ink-500">Bought from us? Tell others how it went. Honest feedback helps us improve.</p>
          {status === "done" ? (
            <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">Thank you! Your review is live.</p>
          ) : (
            <div className="mt-5 space-y-4">
              <div>
                <span className={label}>Your rating</span>
                <div className="flex gap-1">{[1, 2, 3, 4, 5].map((i) => <button type="button" key={i} aria-label={`${i} star`} onClick={() => setForm({ ...form, rating: i })}><Star className={cn("h-7 w-7 transition", i <= form.rating ? "fill-brand-500 text-brand-500" : "text-ink-200 hover:text-brand-300")} /></button>)}</div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className={label} htmlFor="rv-name">Name</label><input id="rv-name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></div>
                <div><label className={label} htmlFor="rv-phone">Mobile <span className="normal-case tracking-normal text-ink-400">(for verified badge)</span></label><input id="rv-phone" className={field} inputMode="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="98765 43210" /></div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className={label} htmlFor="rv-cat">Category</label><select id="rv-cat" className={field} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option value="">Any</option>{materialCategories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div>
                <div><label className={label} htmlFor="rv-prod">Product <span className="normal-case tracking-normal text-ink-400">(optional)</span></label><input id="rv-prod" className={field} value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} placeholder="e.g. UltraTech OPC 53" /></div>
              </div>
              <div><label className={label} htmlFor="rv-text">Your review</label><textarea id="rv-text" rows={4} className={field} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Quality, quantity, delivery, service…" /></div>
              {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <Button type="submit" className="w-full" disabled={status === "sending"}>{status === "sending" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Post review</Button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
