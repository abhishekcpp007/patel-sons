"use client";

import { useMemo, useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import { labourPackages, materialPackages } from "@/content/services";
import { formatINR, formatCompactINR, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Mode = "labour" | "material";

export function CostEstimator() {
  const [mode, setMode] = useState<Mode>("material");
  const [area, setArea] = useState(2000);
  const [floors, setFloors] = useState(2);
  const [pkgIdx, setPkgIdx] = useState(1);

  const packages = mode === "labour" ? labourPackages : materialPackages;
  const pkg = packages[Math.min(pkgIdx, packages.length - 1)];
  const builtUp = area * floors;
  const total = builtUp * pkg.rate;

  const schedule = useMemo(
    () => [
      { stage: "Agreement signing", pct: 10 },
      { stage: "Foundation complete", pct: 15 },
      { stage: "Each slab (shared)", pct: 30 },
      { stage: "Masonry & plaster", pct: 20 },
      { stage: "Flooring & finishing", pct: 20 },
      { stage: "Handover", pct: 5 },
    ],
    [],
  );

  return (
    <div className="grid grid-cols-1 gap-6 rounded-[2rem] bg-ink-900 p-6 text-white shadow-soft lg:grid-cols-5 lg:p-10">
      <div className="lg:col-span-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500"><Calculator className="h-5 w-5" /></span>
          <div>
            <h3 className="text-xl font-bold">Construction cost estimator</h3>
            <p className="text-sm text-ink-300">Indicative estimate. Final quote after site visit and plan.</p>
          </div>
        </div>

        <div className="mt-8 inline-flex rounded-full bg-white/10 p-1">
          {(["labour", "material"] as Mode[]).map((m) => (
            <button key={m} onClick={() => { setMode(m); setPkgIdx(m === "labour" ? 1 : 1); }} className={cn("rounded-full px-5 py-2 text-sm font-semibold transition", mode === m ? "bg-white text-ink-900" : "text-ink-300 hover:text-white")}>
              {m === "labour" ? "Labour rate" : "With material"}
            </button>
          ))}
        </div>

        <div className="mt-8 space-y-6">
          <label className="block">
            <span className="flex justify-between text-sm"><span className="text-ink-300">Plot built-up area per floor</span><span className="font-bold">{area.toLocaleString("en-IN")} sq. ft.</span></span>
            <input type="range" min={600} max={6000} step={50} value={area} onChange={(e) => setArea(Number(e.target.value))} className="mt-2 w-full accent-brand-500" />
          </label>
          <div>
            <span className="text-sm text-ink-300">Number of floors</span>
            <div className="mt-2 flex gap-2">
              {[1, 2, 3, 4].map((f) => (
                <button key={f} onClick={() => setFloors(f)} className={cn("h-11 w-14 rounded-xl text-sm font-bold transition", floors === f ? "bg-brand-500 text-white" : "bg-white/10 text-ink-200 hover:bg-white/20")}>
                  G{f > 1 ? `+${f - 1}` : ""}
                </button>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-ink-300">Package</span>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {packages.map((p, i) => (
                <button key={p.name} onClick={() => setPkgIdx(i)} className={cn("rounded-2xl p-4 text-left transition ring-1", pkgIdx === i ? "bg-white text-ink-900 ring-white" : "bg-white/5 text-ink-200 ring-white/10 hover:bg-white/10")}>
                  <p className="text-sm font-bold">{p.name}</p>
                  <p className={cn("mt-1 text-xs", pkgIdx === i ? "text-ink-500" : "text-ink-400")}>₹{p.rate}/sq. ft.</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col rounded-3xl bg-white p-6 text-ink-900 lg:col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Estimated {mode === "labour" ? "labour" : "total"} cost</p>
        <p className="mt-2 font-display text-4xl font-extrabold tracking-tight text-ink-900">{formatCompactINR(total)}</p>
        <p className="mt-1 text-sm text-ink-500">{builtUp.toLocaleString("en-IN")} sq. ft. × {formatINR(pkg.rate)}/sq. ft. · {pkg.name}</p>

        <div className="mt-6 border-t border-ink-100 pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Stage-wise payment</p>
          <ul className="mt-3 space-y-2 text-sm">
            {schedule.map((s) => (
              <li key={s.stage} className="flex items-center justify-between gap-3">
                <span className="text-ink-600">{s.stage}</span>
                <span className="font-semibold">{s.pct}% · {formatCompactINR((total * s.pct) / 100)}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button href={`/contact?interest=${mode === "labour" ? "labour-rate-contract" : "with-material-contract"}`} className="mt-6">
          Get exact quote <ArrowRight className="h-4 w-4" />
        </Button>
        {mode === "labour" && <p className="mt-3 text-xs text-ink-400">Excludes material cost, which you purchase directly.</p>}
      </div>
    </div>
  );
}
