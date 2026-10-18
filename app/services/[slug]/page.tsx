import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/services";
import { projects } from "@/content/projects";
import { areas } from "@/content/areas";
import { labourPackages, materialPackages } from "@/content/services";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Faq } from "@/components/ui/faq";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { OpenQueryButton } from "@/components/forms/open-query-button";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";
import type { QueryType } from "@/lib/enquiry-schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({ title: s.seoTitle, description: s.seoDescription, path: `/services/${s.slug}`, image: s.image });
}

const queryFor: Record<string, { queryType: QueryType; contractType?: "labour-rate" | "with-material" }> = {
  "row-house-development": { queryType: "buy" },
  "residential-buildings": { queryType: "buy" },
  "labour-rate-contract": { queryType: "build", contractType: "labour-rate" },
  "with-material-contract": { queryType: "build", contractType: "with-material" },
  "real-estate-guidance": { queryType: "guidance" },
  "building-materials": { queryType: "materials" },
};

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();
  const idx = services.findIndex((x) => x.slug === slug);
  const related = projects.filter((p) => (slug === "row-house-development" && p.type === "row-house") || (slug === "residential-buildings" && p.type === "building") || (slug.includes("contract") && p.type === "contract")).slice(0, 2);
  const offers = slug === "labour-rate-contract" ? labourPackages : slug === "with-material-contract" ? materialPackages : undefined;
  const others = services.filter((x) => x.slug !== slug);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(s.faqs), serviceJsonLd({ name: s.title, description: s.seoDescription, path: `/services/${s.slug}`, image: s.image, offers: offers?.map((o) => ({ name: o.name, price: o.rate })) })]} />
      <PageHero eyebrow={`Service 0${idx + 1}`} title={s.title} text={s.short} image={s.image} crumbs={crumbs}>
        <div className="mt-8 flex flex-wrap gap-3">
          <OpenQueryButton preset={queryFor[slug]} size="lg">Get a quote</OpenQueryButton>
          {slug === "building-materials" && <Button href="/materials" variant="white" size="lg">Browse catalogue <ArrowRight className="h-4 w-4" /></Button>}
          {slug.includes("contract") && <Button href="/contracts" variant="white" size="lg">Rates & packages <ArrowRight className="h-4 w-4" /></Button>}
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <article className="space-y-6 lg:col-span-3">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900">{s.title} in Ahmedabad</h2>
            {s.longDescription.map((p) => <p key={p.slice(0, 30)} className="text-base leading-relaxed text-ink-600">{p}</p>)}
            <h3 className="pt-4 text-xl font-bold text-ink-900">What&apos;s included</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {s.included.map((i) => <li key={i} className="flex items-start gap-2 rounded-xl bg-white p-3 text-sm text-ink-700 ring-1 ring-ink-900/5"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {i}</li>)}
            </ul>
            {offers && (
              <>
                <h3 className="pt-4 text-xl font-bold text-ink-900">Rates</h3>
                <div className="overflow-hidden rounded-2xl ring-1 ring-ink-900/5">
                  <table className="w-full text-sm"><tbody className="divide-y divide-ink-100 bg-white">{offers.map((o) => <tr key={o.name}><td className="px-4 py-3 font-semibold text-ink-900">{o.name}</td><td className="px-4 py-3 text-ink-600">{o.summary}</td><td className="px-4 py-3 text-right font-bold text-ink-900">₹{o.rate.toLocaleString("en-IN")}/sq. ft.</td></tr>)}</tbody></table>
                </div>
              </>
            )}
            <h3 className="pt-4 text-xl font-bold text-ink-900">Areas we serve</h3>
            <p className="text-sm text-ink-600">{s.title} across Ahmedabad, including {areas.map((a, i) => <span key={a.slug}><Link href={`/areas/${a.slug}`} className="font-semibold text-brand-600 hover:underline">{a.name}</Link>{i < areas.length - 1 ? ", " : "."}</span>)}</p>
          </article>
          <aside className="space-y-6 lg:col-span-2">
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft"><Image src={s.image} alt={`${s.title} by Patel Sons, Ahmedabad`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" /></Reveal>
            <div className="rounded-3xl bg-ink-900 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Other services</p>
              <ul className="mt-3 divide-y divide-white/10">
                {others.map((o) => <li key={o.slug}><Link href={o.slug === "building-materials" ? "/materials" : `/services/${o.slug}`} className="group flex items-center justify-between py-3 text-sm font-semibold hover:text-brand-400">{o.title} <ArrowUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100" /></Link></li>)}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-sand-100 py-20">
          <Container>
            <SectionHeading eyebrow="Proof" title="Projects from this service" />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">{related.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
          </Container>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2"><SectionHeading eyebrow="FAQ" title={`${s.title}: common questions`} /></div>
          <div className="lg:col-span-3"><Faq items={s.faqs} /></div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
