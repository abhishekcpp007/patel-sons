import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck, ShoppingCart, ArrowUpRight, Calculator } from "lucide-react";
import { guides, getGuide } from "@/content/material-guides";
import { getCategory, materialsIn } from "@/content/materials";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Faq } from "@/components/ui/faq";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

type Params = { slug: string };
export function generateStaticParams(): Params[] {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return pageMeta({ title: g.title, description: g.summary, path: `/materials/guides/${g.slug}`, type: "article", image: g.cover, keywords: [`${g.material.toLowerCase()} guide`, `how to check ${g.material.toLowerCase()} quality`] });
}

export default async function GuidePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  const cat = getCategory(g.category);
  const products = materialsIn(g.category).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: "Guides", path: "/materials/guides" }, { name: g.material, path: `/materials/guides/${g.slug}` }];
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(g.faqs), articleJsonLd({ title: g.title, description: g.summary, path: `/materials/guides/${g.slug}`, image: g.cover, date: "2026-10-01", keywords: [g.material] })]} />
      <PageHero eyebrow={`${g.material} guide`} title={g.title} text={g.summary} image={g.cover} crumbs={crumbs} />
      <section className="py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <article className="space-y-10 lg:col-span-3">
            {g.sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-2xl font-bold tracking-tight text-ink-900">{s.h}</h2>
                <ul className="mt-4 space-y-2.5">{s.items.map((i) => <li key={i} className="flex gap-2.5 text-base leading-relaxed text-ink-700"><CircleCheck className="mt-1 h-4 w-4 shrink-0 text-brand-500" /> {i}</li>)}</ul>
              </div>
            ))}
            {g.consumption && <aside className="flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-5 text-sm text-brand-900"><Calculator className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" /><div><p className="font-bold">How much do you need?</p><p className="mt-1">{g.consumption}</p></div></aside>}
            <div><h2 className="text-2xl font-bold tracking-tight text-ink-900">Common questions</h2><div className="mt-4"><Faq items={g.faqs} /></div></div>
          </article>
          <aside className="space-y-6 lg:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft"><Image src={g.cover} alt={g.material} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" /></div>
            {cat && (
              <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Buy {cat.name.toLowerCase()}</p>
                <ul className="mt-3 divide-y divide-ink-100">{products.map((m) => <li key={m.id} className="flex items-center justify-between gap-3 py-3 text-sm"><span><span className="font-semibold text-ink-900">{m.name}</span><br /><span className="text-xs text-ink-500">{m.brand}</span></span><span className="shrink-0 font-bold text-ink-900">{formatINR(m.price)}<span className="text-xs font-normal text-ink-500">/{m.unit}</span></span></li>)}</ul>
                <Button href={`/materials/${cat.slug}`} className="mt-4 w-full"><ShoppingCart className="h-4 w-4" /> Order {cat.name.toLowerCase()}</Button>
              </div>
            )}
            <div className="rounded-3xl bg-ink-900 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">More guides</p>
              <ul className="mt-3 divide-y divide-white/10">{guides.filter((x) => x.slug !== g.slug).map((x) => <li key={x.slug}><Link href={`/materials/guides/${x.slug}`} className="group flex items-center justify-between py-2.5 text-sm font-semibold hover:text-brand-400">{x.material} <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" /></Link></li>)}</ul>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
