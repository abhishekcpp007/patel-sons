import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Catalogue } from "@/components/materials/catalogue";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { materialCategories, getCategory, materialsIn } from "@/content/materials";
import { guides } from "@/content/material-guides";
import { ReviewsSection } from "@/components/materials/reviews";
import { MaterialPromise } from "@/components/materials/promise";
import Link from "next/link";
import { BookOpen, ArrowUpRight } from "lucide-react";

type Params = { category: string };

export function generateStaticParams(): Params[] {
  return materialCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMeta({ title: `Buy ${c.name} in Ahmedabad at Contractor Rates`, description: c.seoDescription, path: `/materials/${c.slug}`, keywords: [`${c.name.toLowerCase()} price Ahmedabad`, `buy ${c.name.toLowerCase()} Ahmedabad`] });
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const items = materialsIn(c.slug);
  const related = guides.filter((g) => g.category === c.slug);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: c.name, path: `/materials/${c.slug}` }]),
          { "@context": "https://schema.org", "@type": "ItemList", name: c.name, itemListElement: items.map((m, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "Product", name: m.name, brand: { "@type": "Brand", name: m.brand }, description: m.spec, offers: { "@type": "Offer", price: m.price, priceCurrency: "INR", availability: "https://schema.org/InStock", seller: { "@id": `${SITE_URL}/#organization` } } } })) },
        ]}
      />
      <PageHero eyebrow="Building materials" title={`${c.name} in Ahmedabad at contractor rates`} text={c.blurb} image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80" crumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: c.name, path: `/materials/${c.slug}` }]} />
      <section className="py-14 lg:py-20">
        <Container>
          {related.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-3">
              {related.map((g) => <Link key={g.slug} href={`/materials/guides/${g.slug}`} className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-100"><BookOpen className="h-4 w-4" /> Guide: {g.title.split(":")[0]} <ArrowUpRight className="h-3.5 w-3.5" /></Link>)}
            </div>
          )}
          <Catalogue category={c.slug} />
        </Container>
      </section>
      <MaterialPromise compact />
      <div className="bg-ink-50"><ReviewsSection category={c.slug} /></div>
    </>
  );
}
