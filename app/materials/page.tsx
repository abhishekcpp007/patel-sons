import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Catalogue } from "@/components/materials/catalogue";
import { Faq } from "@/components/ui/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { materialCategories, materials } from "@/content/materials";
import { services } from "@/content/services";
import { MaterialPromise } from "@/components/materials/promise";
import { ReviewsSection } from "@/components/materials/reviews";
import { guides } from "@/content/material-guides";
import Link from "next/link";
import { BookOpen, Headset, PackageSearch, ArrowUpRight } from "lucide-react";

const svc = services.find((s) => s.slug === "building-materials")!;

export const metadata: Metadata = pageMeta({
  title: "Buy Building Materials in Ahmedabad | Cement, TMT Steel, Bricks, Tiles",
  description: svc.seoDescription,
  path: "/materials",
  keywords: ["buy cement online Ahmedabad", "TMT steel price Ahmedabad", "building material supplier Ahmedabad", "construction material shop near me"],
});

export default function MaterialsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }]),
          faqJsonLd(svc.faqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Building materials",
            itemListElement: materialCategories.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${SITE_URL}/materials/${c.slug}` })),
          },
          {
            "@context": "https://schema.org",
            "@type": "OfferCatalog",
            name: "Patel Sons building materials",
            itemListElement: materials.slice(0, 20).map((m) => ({ "@type": "Offer", name: m.name, price: m.price, priceCurrency: "INR", availability: "https://schema.org/InStock", seller: { "@id": `${SITE_URL}/#organization` }, itemOffered: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: m.brand }, description: m.spec } })),
          },
        ]}
      />
      <PageHero
        eyebrow="Building materials"
        title="100% genuine materials, guaranteed quantity, contractor rates"
        text="Any quantity, from 20 bags to 20 tonnes. The same brands we use on our own sites, weighed and counted in front of you, delivered to your plot, backed by a written guarantee."
        image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#promise" className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold hover:bg-brand-600">Our quality & quantity guarantee</a>
          <Link href="/track" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/20"><PackageSearch className="h-4 w-4" /> Track an order</Link>
          <Link href="/support" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold backdrop-blur hover:bg-white/20"><Headset className="h-4 w-4" /> Help & complaints</Link>
        </div>
      </PageHero>
      <section className="py-14 lg:py-20">
        <Container><Catalogue /></Container>
      </section>
      <MaterialPromise />
      <section className="py-20 lg:py-24">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Usage guides" title="How to choose, check and use each material" text="Quality tests you can do at the truck, storage rules, consumption per sq. ft. and the mistakes that cause cracks and leaks." />
            <Link href="/materials/guides" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900">All guides <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {guides.map((g) => (
              <li key={g.slug}><Link href={`/materials/guides/${g.slug}`} className="group flex h-full flex-col rounded-2xl bg-white p-4 shadow-soft ring-1 ring-ink-900/5 transition hover:ring-brand-500"><BookOpen className="h-5 w-5 text-brand-500" /><span className="mt-3 text-sm font-bold text-ink-900">{g.material}</span><span className="mt-1 line-clamp-2 text-xs text-ink-500">{g.summary}</span></Link></li>
            ))}
          </ul>
        </Container>
      </section>
      <div className="bg-ink-50"><ReviewsSection /></div>
      <section className="bg-sand-100 py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2"><SectionHeading eyebrow="FAQ" title="Ordering materials" /></div>
          <div className="lg:col-span-3"><Faq items={svc.faqs} /></div>
        </Container>
      </section>
    </>
  );
}
