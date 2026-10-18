import type { Metadata } from "next";
import { HardHat, Package, CircleCheck, X } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Faq } from "@/components/ui/faq";
import { CostEstimator } from "@/components/contract/cost-estimator";
import { PackageCards } from "@/components/contract/package-cards";
import { ProcessSection } from "@/components/home/process-section";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { labourPackages, materialPackages } from "@/content/services";
import { contractFaqs } from "@/content/faqs";

export const metadata: Metadata = pageMeta({
  title: "Construction Contract Rates in Ahmedabad | Labour & With Material",
  description:
    "Build your home on your plot with Patel Sons. Labour-rate contracts from ₹260/sq ft, with-material turnkey contracts from ₹1,750/sq ft. Fixed price, stage-wise payment, weekly reports.",
  path: "/contracts",
});

const compare = [
  { f: "Who buys materials", l: "You", m: "Patel Sons" },
  { f: "Pricing", l: "Per sq. ft. labour rate", m: "Fixed all-inclusive per sq. ft." },
  { f: "Material brand control", l: "Full control", m: "As per chosen package" },
  { f: "Your time involvement", l: "High (purchasing, delivery)", m: "Low (weekly reports only)" },
  { f: "Site supervisor", l: true, m: true },
  { f: "Weekly photo reports", l: true, m: true },
  { f: "Material wastage risk", l: "On you", m: "On us" },
  { f: "Single point of contact", l: false, m: true },
  { f: "Best for", l: "Owners who want to source themselves", m: "Owners who want a turnkey home" },
];

export default function ContractsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contracts", path: "/contracts" }]),
          faqJsonLd(contractFaqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Private Construction Contract",
            serviceType: ["Labour Rate Contract", "With Material Contract"],
            provider: { "@id": `${SITE_URL}/#organization` },
            areaServed: "Ahmedabad",
            offers: [...labourPackages.map((p) => ({ "@type": "Offer", name: `Labour rate — ${p.name}`, price: p.rate, priceCurrency: "INR", unitText: "per sq ft" })), ...materialPackages.map((p) => ({ "@type": "Offer", name: `With material — ${p.name}`, price: p.rate, priceCurrency: "INR", unitText: "per sq ft" }))],
          },
        ]}
      />
      <PageHero
        eyebrow="Private contracts"
        title="Build on your plot. Labour-rate or with-material."
        text="Two transparent contract models, fixed per sq. ft. rates, and the same Patel Sons engineers on your site every day."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ name: "Home", path: "/" }, { name: "Contracts", path: "/contracts" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#labour" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/20">Labour rate from ₹260/sq. ft.</a>
          <a href="#material" className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold hover:bg-brand-600">With material from ₹1,750/sq. ft.</a>
        </div>
      </PageHero>

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading align="center" eyebrow="Compare" title="Which contract is right for you?" />
          <p className="mt-10 text-center text-xs font-medium text-ink-400 md:hidden">Swipe sideways to compare →</p>
          <Reveal className="mt-3 overflow-x-auto rounded-3xl bg-white shadow-soft ring-1 ring-ink-900/5 md:mt-12">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="bg-ink-900 text-left text-white">
                  <th className="px-5 py-4 font-semibold">Feature</th>
                  <th className="px-5 py-4 font-semibold"><span className="inline-flex items-center gap-2"><HardHat className="h-4 w-4 text-brand-400" /> Labour rate</span></th>
                  <th className="px-5 py-4 font-semibold"><span className="inline-flex items-center gap-2"><Package className="h-4 w-4 text-brand-400" /> With material</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {compare.map((r) => (
                  <tr key={r.f} className="odd:bg-ink-50/60">
                    <td className="px-5 py-4 font-medium text-ink-900">{r.f}</td>
                    {[r.l, r.m].map((v, i) => (
                      <td key={i} className="px-5 py-4 text-ink-600">
                        {v === true ? <CircleCheck className="h-5 w-5 text-emerald-500" /> : v === false ? <X className="h-5 w-5 text-ink-300" /> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </Container>
      </section>

      <section id="labour" className="scroll-mt-24 bg-sand-100 py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="Labour rate contract" title="You buy the materials. We build." text="Skilled masons, carpenters, bar-benders, plumbers and electricians under a full-time Patel Sons supervisor. Billed per sq. ft. of built-up area." />
          <div className="mt-12"><PackageCards packages={labourPackages} interest="labour-rate-contract" /></div>
        </Container>
      </section>

      <section id="material" className="scroll-mt-24 py-24 lg:py-32">
        <Container>
          <SectionHeading eyebrow="With material contract" title="One contract. One price. One phone number." text="Turnkey construction where we procure every bag of cement and every tile. The per sq. ft. rate is locked at signing." />
          <div className="mt-12"><PackageCards packages={materialPackages} interest="with-material-contract" /></div>
        </Container>
      </section>

      <section className="bg-ink-50 py-24 lg:py-32">
        <Container>
          <SectionHeading align="center" eyebrow="Estimate" title="How much will your home cost?" />
          <Reveal className="mt-12"><CostEstimator /></Reveal>
        </Container>
      </section>

      <ProcessSection />

      <section className="py-24 lg:py-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading eyebrow="FAQ" title="Questions people ask before signing" text="If yours isn't here, call us. We'd rather answer now than after the contract." />
          </div>
          <div className="lg:col-span-3"><Faq items={contractFaqs} /></div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
