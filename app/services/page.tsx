import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheck, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Construction Services in Ahmedabad | Patel Sons",
  description:
    "Row house development, apartment buildings, labour-rate and with-material contracts, real estate guidance and building materials supply in Ahmedabad by Patel Sons.",
  path: "/services",
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&h=630&q=80",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "Service", name: s.title, description: s.short, url: `${SITE_URL}/services/${s.slug}`, provider: { "@id": `${SITE_URL}/#organization` }, areaServed: "Ahmedabad" },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Everything from gated communities to the house on your plot, and the materials to build it"
        text="Two ways to own a Patel Sons home: buy into one of our developments, or have us build on your land."
        image="https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]}
      />

      <section className="py-24 lg:py-32">
        <Container className="space-y-24">
          {services.map((s, i) => {
            const isContract = s.slug.includes("contract");
            return (
              <Reveal key={s.slug} className={cn("grid items-center gap-10 scroll-mt-28 lg:grid-cols-2 lg:gap-16", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
                <div id={s.slug} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft">
                  <Image src={s.image} alt={`${s.title} by Patel Sons in Ahmedabad`} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-bold text-ink-900">0{i + 1}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">{isContract ? "Private contract" : s.slug === "real-estate-guidance" ? "Advisory" : s.slug === "building-materials" ? "Supply" : "Own development"}</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-600">{s.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-ink-700">
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button href={s.slug === "building-materials" ? "/materials" : `/services/${s.slug}`} variant="secondary">
                      {s.slug === "building-materials" ? "Browse catalogue" : `About ${s.title.split(" ")[0].toLowerCase()} service`} <ArrowRight className="h-4 w-4" />
                    </Button>
                    {isContract && <Button href="/contracts" variant="outline">Rates & packages</Button>}
                    {!isContract && s.slug.includes("row") && <Button href="/projects" variant="outline">View projects</Button>}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </Container>
      </section>
      <CTA />
    </>
  );
}
