import { Lightbulb } from "lucide-react";
import type { Block } from "@/content/blog";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i} className="pt-4 text-2xl font-bold tracking-tight text-ink-900">{b.text}</h2>;
          case "p":
            return <p key={i} className="text-base leading-relaxed text-ink-700">{b.text}</p>;
          case "ul":
            return <ul key={i} className="list-disc space-y-2 pl-6 text-base leading-relaxed text-ink-700">{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
          case "tip":
            return <aside key={i} className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900"><Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /><p>{b.text}</p></aside>;
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl ring-1 ring-ink-900/5">
                <table className="w-full min-w-[480px] text-sm">
                  <thead><tr className="bg-ink-900 text-left text-white">{b.head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead>
                  <tbody className="divide-y divide-ink-100 bg-white">{b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci} className={ci === 0 ? "px-4 py-3 font-semibold text-ink-900" : "px-4 py-3 text-ink-700"}>{c}</td>)}</tr>)}</tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
