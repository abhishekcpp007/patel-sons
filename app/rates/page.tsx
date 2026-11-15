import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Faq } from "@/components/ui/faq";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { formatINR, formatCompactINR, cn } from "@/lib/utils";
import { RATE_CARD_MONTH, structureRates, sampleHouse, marketRates, rateFaqs } from "@/content/rate-card";

const PERCENT = 100;
const crumbs = [{ name: "Home", path: "/" }, { name: "Rate card", path: "/rates" }];

export const metadata: Metadata = pageMeta({
  title: "House Construction Rate Card in Lucknow | Grey Structure From ₹965/sq ft",
  description:
    "Patel Sons rate card for Lucknow: RCC labour ₹220/sq ft, grey structure with material ₹965/sq ft in M20 concrete, plaster ₹42/sq ft. Includes a full material costing for a 25×75 house.",
  path: "/rates",
});

export default function RatesPage() {
  const partTotals = sampleHouse.parts.map((p) => p.lines.reduce((sum, l) => sum + l.amount, 0));
  const materialTotal = partTotals.reduce((sum, t) => sum + t, 0);
  const allowance = (materialTotal * sampleHouse.allowancePct) / PERCENT;
  const grandTotal = materialTotal + allowance;

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(rateFaqs)]} />
      <PageHero
        eyebrow={`Rate card, ${RATE_CARD_MONTH}`}
        title="Structure rates for Lucknow, written down."
        text="Per sq. ft. rates for the frame of your house, and a full material bill for a real 25' × 75' plan. No hidden lines."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
        crumbs={crumbs}
      />

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="Rates" title="What we charge for the structure" text="All RCC work is in M20 concrete with Fe 550D saria. Rates are for Lucknow and get confirmed after a site visit." />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {structureRates.map((r) => {
              const hot = Boolean(r.tag);
              return (
                <Reveal key={r.name} className={cn("relative flex flex-col rounded-3xl p-7 ring-1", hot ? "bg-ink-900 text-white ring-ink-900 shadow-soft" : "bg-white text-ink-900 ring-ink-900/5")}>
                  {r.tag && <span className="absolute -top-3 left-7 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{r.tag}</span>}
                  <h3 className="text-lg font-bold">{r.name}</h3>
                  <p className={cn("mt-1 text-sm", hot ? "text-ink-300" : "text-ink-500")}>{r.summary}</p>
                  <p className="mt-5 flex items-baseline gap-1">
                    <span className="font-display text-4xl font-extrabold">{formatINR(r.rate)}</span>
                    <span className={cn("text-sm", hot ? "text-ink-300" : "text-ink-500")}>/ {r.unit}</span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                    {r.inclusions.map((i) => (
                      <li key={i} className="flex gap-2.5">
                        <CircleCheck className={cn("mt-0.5 h-4 w-4 shrink-0", hot ? "text-brand-400" : "text-brand-500")} />
                        <span className={hot ? "text-ink-200" : "text-ink-600"}>{i}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="Worked example" title={`Material bill for a ${sampleHouse.plot} house`} text={`Ground floor, ${sampleHouse.builtUp.toLocaleString("en-IN")} sq. ft. built-up, materials only. We measured the plan and priced every bag at Lucknow market rates.`} />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {sampleHouse.parts.map((p, idx) => (
              <Reveal key={p.title} className="flex flex-col rounded-3xl bg-white p-7 shadow-soft ring-1 ring-ink-900/5">
                <h3 className="text-lg font-bold text-ink-900">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-500">{p.covers}</p>
                <ul className="mt-6 flex-1 divide-y divide-ink-100 text-sm">
                  {p.lines.map((l) => (
                    <li key={l.material} className="flex items-baseline justify-between gap-3 py-2.5">
                      <span className="text-ink-600">{l.material}<span className="block text-xs text-ink-400">{l.qty}</span></span>
                      <span className="font-semibold text-ink-900">{formatINR(l.amount)}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-baseline justify-between border-t border-ink-900 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">Part total</span>
                  <span className="font-display text-2xl font-extrabold text-ink-900">{formatCompactINR(partTotals[idx])}</span>
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 flex flex-col gap-4 rounded-3xl bg-ink-900 p-7 text-white sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-300">Total material cost with {sampleHouse.allowancePct}% price allowance</p>
              <p className="mt-1 font-display text-4xl font-extrabold">{formatCompactINR(grandTotal)}</p>
              <p className="mt-1 text-sm text-ink-300">About {formatINR(Math.round(grandTotal / sampleHouse.builtUp))} per sq. ft. Labour, shuttering and digging are extra.</p>
            </div>
            <Button href="/contact?interest=with-material-contract">Get this costing for your plan</Button>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="Market rates" title="The prices behind the numbers" text={`Lucknow dealer rates we used for ${RATE_CARD_MONTH}. Your quote uses the rate on the day you sign.`} />
            <ul className="mt-8 divide-y divide-ink-100 rounded-3xl bg-white px-6 text-sm shadow-soft ring-1 ring-ink-900/5">
              {marketRates.map((m) => (
                <li key={m.item} className="flex justify-between gap-3 py-3.5">
                  <span className="text-ink-600">{m.item}</span>
                  <span className="font-semibold text-ink-900">{m.rate}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="FAQ" title="Questions about the rate card" />
            <div className="mt-8"><Faq items={rateFaqs} /></div>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
