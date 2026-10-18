"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus, ShoppingCart, X, Trash, CircleCheck, Search, PackageCheck, Truck } from "lucide-react";
import { materialCategories, materials, type Material } from "@/content/materials";
import { useBasket, basketAdd, basketSet, basketClear, basketAsText } from "@/lib/basket-store";
import { openQuery } from "@/lib/query-store";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "./category-icon";
import { cn, formatINR } from "@/lib/utils";

const tagStyle: Record<NonNullable<Material["tag"]>, string> = {
  "Best seller": "bg-brand-500 text-white",
  Recommended: "bg-emerald-500 text-white",
  Premium: "bg-ink-900 text-white",
  Budget: "bg-sky-500 text-white",
};

export function Catalogue({ category }: { category?: string }) {
  const [q, setQ] = useState("");
  const list = useMemo(
    () => materials.filter((m) => (!category || m.category === category) && (!q || `${m.name} ${m.brand} ${m.spec}`.toLowerCase().includes(q.toLowerCase()))),
    [category, q],
  );
  const groups = materialCategories.filter((c) => list.some((m) => m.category === c.slug));

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search cement, steel, tiles…" className="w-full rounded-full border border-ink-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15" />
          </label>
          <nav aria-label="Material categories" className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            <Link href="/materials" className={cn("flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition lg:rounded-xl", !category ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-900")}>
              All materials
            </Link>
            {materialCategories.map((c) => (
              <Link key={c.slug} href={`/materials/${c.slug}`} className={cn("flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition lg:rounded-xl", category === c.slug ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-200 hover:ring-ink-900")}>
                <CategoryIcon icon={c.icon} className="h-4 w-4 shrink-0 text-brand-500" /> {c.name}
              </Link>
            ))}
          </nav>
          <div className="hidden rounded-2xl bg-ink-900 p-4 text-xs text-ink-300 lg:block">
            <p className="flex items-center gap-2 font-semibold text-white"><Truck className="h-4 w-4 text-brand-400" /> How ordering works</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4">
              <li>Add items and quantities to your basket.</li>
              <li>Request order with your site address.</li>
              <li>We confirm price, stock and delivery slot the same day.</li>
              <li>Pay by bank transfer or UPI on confirmation.</li>
            </ol>
          </div>
        </div>
      </aside>

      <div className="space-y-12 lg:col-span-3">
        {groups.length === 0 && <p className="rounded-3xl border border-dashed border-ink-200 p-12 text-center text-ink-500">Nothing matches &ldquo;{q}&rdquo;. Try another word or call us.</p>}
        {groups.map((c) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-28">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold text-ink-900"><CategoryIcon icon={c.icon} className="h-6 w-6 text-brand-500" /> {c.name}</h2>
                <p className="mt-1 text-sm text-ink-500">{c.blurb}</p>
              </div>
              {!category && <Link href={`/materials/${c.slug}`} className="shrink-0 text-sm font-semibold text-brand-600 hover:underline">View all</Link>}
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {list.filter((m) => m.category === c.slug).map((m) => <MaterialCard key={m.id} m={m} />)}
            </div>
          </section>
        ))}
      </div>
      <BasketBar />
    </div>
  );
}

function MaterialCard({ m }: { m: Material }) {
  const { lines } = useBasket();
  const line = lines.find((l) => l.id === m.id);
  const [qty, setQty] = useState(m.minQty);
  return (
    <article className="flex min-w-0 flex-col rounded-3xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5">
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-ink-600">{m.brand}</span>
        {m.tag && <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-bold", tagStyle[m.tag])}>{m.tag}</span>}
      </div>
      <h3 className="mt-3 text-base font-bold leading-snug text-ink-900">{m.name}</h3>
      <p className="mt-1 text-xs text-ink-500">{m.spec}</p>
      {m.note && <p className="mt-1 text-xs text-ink-400">{m.note}</p>}
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-2xl font-extrabold text-ink-900">{formatINR(m.price)}</span>
        <span className="text-xs text-ink-500">/ {m.unit}</span>
        {m.mrp && <span className="text-xs text-ink-400 line-through">{formatINR(m.mrp)}</span>}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center rounded-full border border-ink-200">
          <button aria-label="Decrease" onClick={() => setQty((v) => Math.max(m.minQty, +(v - m.step).toFixed(1)))} className="grid h-9 w-9 place-items-center text-ink-600 hover:text-ink-900"><Minus className="h-4 w-4" /></button>
          <span className="min-w-[3.5rem] text-center text-sm font-semibold">{qty} <span className="text-xs font-normal text-ink-500">{m.unit}</span></span>
          <button aria-label="Increase" onClick={() => setQty((v) => +(v + m.step).toFixed(1))} className="grid h-9 w-9 place-items-center text-ink-600 hover:text-ink-900"><Plus className="h-4 w-4" /></button>
        </div>
        <Button size="sm" className="flex-1" onClick={() => basketAdd(m, qty)}>
          {line ? <CircleCheck className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />} {line ? "Added" : "Add"}
        </Button>
      </div>
      <p className="mt-2 text-[11px] text-ink-400">Min. order {m.minQty} {m.unit}. Indicative price, confirmed on order.</p>
    </article>
  );
}

function BasketBar() {
  const { lines, total, count } = useBasket();
  const [open, setOpen] = useState(false);
  if (count === 0) return null;

  const request = () => {
    openQuery({ queryType: "materials", items: basketAsText(lines) });
    setOpen(false);
  };

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-100 bg-white/95 px-4 py-3 shadow-[0_-10px_40px_-12px_rgb(11_18_32_/_0.25)] backdrop-blur sm:inset-x-auto sm:bottom-5 sm:left-5 sm:rounded-full sm:border sm:px-5">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-ink-900">
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-white"><ShoppingCart className="h-5 w-5" /><span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-500 px-1 text-[11px] font-bold">{count}</span></span>
            <span className="hidden sm:inline">{count} {count === 1 ? "item" : "items"}</span>
          </button>
          <span className="font-display text-lg font-extrabold text-ink-900">{formatINR(total)}</span>
          <Button size="sm" className="ml-auto" onClick={request}><PackageCheck className="h-4 w-4" /> Request order</Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 300, damping: 32 }} className="fixed inset-y-0 right-0 z-[85] flex w-full max-w-md flex-col bg-white shadow-2xl" role="dialog" aria-label="Your basket">
              <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
                <h2 className="text-xl font-bold text-ink-900">Your basket</h2>
                <button onClick={() => setOpen(false)} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-ink-50 hover:bg-ink-100"><X className="h-5 w-5" /></button>
              </div>
              <ul className="flex-1 divide-y divide-ink-100 overflow-y-auto px-6">
                {lines.map((l) => (
                  <li key={l.id} className="flex items-center gap-3 py-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink-900">{l.material.name}</p>
                      <p className="text-xs text-ink-500">{formatINR(l.material.price)} / {l.material.unit}</p>
                    </div>
                    <div className="flex items-center rounded-full border border-ink-200">
                      <button aria-label="Decrease" onClick={() => basketSet(l.id, +(l.qty - l.material.step).toFixed(1))} className="grid h-8 w-8 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="min-w-[2.5rem] text-center text-sm font-semibold">{l.qty}</span>
                      <button aria-label="Increase" onClick={() => basketSet(l.id, +(l.qty + l.material.step).toFixed(1))} className="grid h-8 w-8 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <span className="w-20 text-right text-sm font-bold">{formatINR(l.qty * l.material.price)}</span>
                    <button aria-label="Remove" onClick={() => basketSet(l.id, 0)} className="text-ink-400 hover:text-red-600"><Trash className="h-4 w-4" /></button>
                  </li>
                ))}
              </ul>
              <div className="border-t border-ink-100 p-6">
                <div className="flex items-center justify-between"><span className="text-sm text-ink-500">Indicative total</span><span className="font-display text-2xl font-extrabold text-ink-900">{formatINR(total)}</span></div>
                <p className="mt-1 text-xs text-ink-400">Excludes delivery. Final price confirmed by our engineer before you pay.</p>
                <Button size="lg" className="mt-4 w-full" onClick={request}><PackageCheck className="h-4 w-4" /> Request order & price</Button>
                <button onClick={basketClear} className="mt-3 w-full text-center text-xs font-semibold text-ink-400 hover:text-red-600">Clear basket</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
