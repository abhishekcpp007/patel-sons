"use client";

import { useMemo, useState } from "react";
import { formatINR, formatCompactINR } from "@/lib/utils";

function Slider({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; fmt: (v: number) => string }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink-600">{label}</span>
        <span className="font-bold text-ink-900">{fmt(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-brand-500" />
    </label>
  );
}

export function EmiCalculator({ price }: { price: number }) {
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, loan, total } = useMemo(() => {
    const loan = price * (1 - downPct / 100);
    const r = rate / 12 / 100;
    const n = years * 12;
    const emi = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi, loan, total: emi * n };
  }, [price, downPct, rate, years]);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
      <h3 className="text-lg font-bold text-ink-900">EMI calculator</h3>
      <p className="mt-1 text-sm text-ink-500">Indicative only. Based on starting price {formatCompactINR(price)}.</p>
      <div className="mt-6 space-y-5">
        <Slider label="Down payment" value={downPct} min={10} max={60} step={5} onChange={setDownPct} fmt={(v) => `${v}%`} />
        <Slider label="Interest rate" value={rate} min={6} max={12} step={0.1} onChange={setRate} fmt={(v) => `${v.toFixed(1)}% p.a.`} />
        <Slider label="Tenure" value={years} min={5} max={30} step={1} onChange={setYears} fmt={(v) => `${v} yrs`} />
      </div>
      <div className="mt-6 rounded-2xl bg-ink-900 p-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-300">Monthly EMI</p>
        <p className="mt-1 font-display text-3xl font-extrabold text-brand-400">{formatINR(emi)}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-ink-300">
          <div><p>Loan amount</p><p className="mt-0.5 font-semibold text-white">{formatCompactINR(loan)}</p></div>
          <div><p>Total payable</p><p className="mt-0.5 font-semibold text-white">{formatCompactINR(total)}</p></div>
        </div>
      </div>
    </div>
  );
}
