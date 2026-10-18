import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { guides } from "@/content/material-guides";

export const metadata: Metadata = pageMeta({ title: "Building Material Usage Guides: Cement, Steel, Bricks, Tiles", description: "How to choose, check and use cement, TMT steel, red and fly-ash bricks, AAC blocks, sand, tiles, plumbing, electrical and paint. Quality tests you can do at delivery, consumption per sq ft.", path: "/materials/guides", keywords: ["how to check cement quality", "TMT steel weight per metre", "fly ash bricks vs red bricks", "AAC block laying"] });

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: "Usage guides", path: "/materials/guides" }]), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, name: g.title, url: `${SITE_URL}/materials/guides/${g.slug}` })) }]} />
      <PageHero eyebrow="Usage guides" title="Know your materials before they reach the site" text="Which grade to buy, how to check quality and quantity at the truck, how to store and use each material, and how much you need per sq. ft." image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80" crumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: "Usage guides", path: "/materials/guides" }]} />
      <section className="py-16 lg:py-24">
        <Container>
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <StaggerItem key={g.slug}>
                <Link href={`/materials/guides/${g.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-900/5 transition hover:-translate-y-0.5">
                  <div className="relative aspect-[16/9]"><Image src={g.cover} alt={g.material} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900"><BookOpen className="h-3 w-3" /> {g.material}</span></div>
                  <div className="flex flex-1 flex-col p-6"><h2 className="text-lg font-bold leading-snug text-ink-900">{g.title}</h2><p className="mt-2 flex-1 text-sm text-ink-500">{g.summary}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">Read guide <ArrowUpRight className="h-4 w-4" /></span></div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
