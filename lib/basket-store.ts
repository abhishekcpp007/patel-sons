"use client";

import { useSyncExternalStore } from "react";
import { materials, type Material } from "@/content/materials";

export interface BasketLine {
  id: string;
  qty: number;
}

const KEY = "ps_basket";
let lines: BasketLine[] = [];
let loaded = false;
const listeners = new Set<() => void>();
const serverLines: BasketLine[] = [];

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) lines = (JSON.parse(raw) as BasketLine[]).filter((l) => materials.some((m) => m.id === l.id));
  } catch {
    lines = [];
  }
}
function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(lines));
  } catch {
    /* ignore */
  }
}
function emit() {
  listeners.forEach((l) => l());
}

export function basketAdd(m: Material, qty = m.minQty) {
  load();
  const existing = lines.find((l) => l.id === m.id);
  lines = existing ? lines.map((l) => (l.id === m.id ? { ...l, qty: l.qty + qty } : l)) : [...lines, { id: m.id, qty }];
  persist();
  emit();
}
export function basketSet(id: string, qty: number) {
  load();
  const m = materials.find((x) => x.id === id);
  if (!m) return;
  lines = qty <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty: Math.max(m.minQty, qty) } : l));
  persist();
  emit();
}
export function basketClear() {
  lines = [];
  persist();
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  load();
  queueMicrotask(emit);
  return () => listeners.delete(l);
};

export function useBasket() {
  const ls = useSyncExternalStore(subscribe, () => lines, () => serverLines);
  const detailed = ls
    .map((l) => ({ ...l, material: materials.find((m) => m.id === l.id)! }))
    .filter((l) => l.material);
  const total = detailed.reduce((s, l) => s + l.qty * l.material.price, 0);
  const count = detailed.length;
  return { lines: detailed, total, count };
}

export function basketAsText(ls: ReturnType<typeof useBasket>["lines"]) {
  return ls.map((l) => `${l.qty} ${l.material.unit} × ${l.material.name} (${l.material.brand}) @ ₹${l.material.price.toLocaleString("en-IN")}/${l.material.unit}`).join("\n");
}
