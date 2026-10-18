import { CircleCheck } from "lucide-react";
import type { ContractPackage } from "@/content/services";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PackageCards({ packages, unit = "sq. ft.", interest }: { packages: ContractPackage[]; unit?: string; interest: string }) {
  return (
    <div className={cn("grid gap-5", packages.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2")}>
      {packages.map((p) => {
        const hot = Boolean(p.tag);
        return (
          <div key={p.name} className={cn("relative flex flex-col rounded-3xl p-7 ring-1", hot ? "bg-ink-900 text-white ring-ink-900 shadow-soft" : "bg-white text-ink-900 ring-ink-900/5")}>
            {p.tag && <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{p.tag}</span>}
            <h3 className="text-lg font-bold">{p.name}</h3>
            <p className={cn("mt-1 text-sm", hot ? "text-ink-300" : "text-ink-500")}>{p.summary}</p>
            <p className="mt-5 flex items-baseline gap-1">
              <span className="font-display text-4xl font-extrabold">₹{p.rate.toLocaleString("en-IN")}</span>
              <span className={cn("text-sm", hot ? "text-ink-300" : "text-ink-500")}>/ {unit}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm">
              {p.inclusions.map((i) => (
                <li key={i} className="flex gap-2.5">
                  <CircleCheck className={cn("mt-0.5 h-4 w-4 shrink-0", hot ? "text-brand-400" : "text-brand-500")} />
                  <span className={hot ? "text-ink-200" : "text-ink-600"}>{i}</span>
                </li>
              ))}
            </ul>
            <Button href={`/contact?interest=${interest}`} variant={hot ? "primary" : "outline"} className="mt-8 w-full">
              Enquire for {p.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
