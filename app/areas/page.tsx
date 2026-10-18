import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { areas } from "@/content/areas";
import { services } from "@/content/services";

export const metadata: Metadata = pageMeta({
  title: "Construction Services Across Ahmedabad | Areas We Serve",
  description: "Patel Sons builds row houses, apartments and private homes in Bopal, South Bopal, Shela, Thaltej, Satellite, Gota, Chandkheda, Vastral, Nikol and Sanand. Local rates and projects for each area.",
  path: "/areas",
  keywords: ["construction contractor near me Ahmedabad", "builders in Bopal", "house construction Shela", "contractor Thaltej"],
});

export default function AreasPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }]), { "@context": "https://schema.org", "@type": "ItemList", itemListElement: areas.map((a, i) => ({ "@type": "ListItem", position: i + 1, name: a.name, url: `${SITE_URL}/areas/${a.slug}` })) }]} />
      <PageHero eyebrow="Areas we serve" title="Building across Ahmedabad, one locality at a time" text="Pick your area to see plot rates, our projects nearby, the services most people ask for there, and answers to local questions." image="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2000&q=80" crumbs={[{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }]} />
      <section className="py-20 lg:py-28">
        <Container>
          <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((a) => (
              <StaggerItem key={a.slug}>
                <Link href={`/areas/${a.slug}`} className="group flex h-full flex-col rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 transition hover:-translate-y-0.5 hover:ring-brand-500">
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600"><MapPin className="h-3.5 w-3.5" /> {a.zone}</p>
                  <h2 className="mt-2 text-2xl font-bold text-ink-900">{a.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{a.intro}</p>
                  <p className="mt-4 text-xs text-ink-500">Plot rate: <span className="font-semibold text-ink-900">{a.plotRate}</span></p>
                  <div className="mt-3 flex flex-wrap gap-1.5">{a.popular.map((s) => <span key={s} className="rounded-full bg-ink-50 px-2.5 py-1 text-[11px] font-medium text-ink-600">{services.find((x) => x.slug === s)?.title}</span>)}</div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink-900 group-hover:text-brand-600">Construction in {a.name} <ArrowUpRight className="h-4 w-4" /></span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
      <CTA />
    </>
  );
}
