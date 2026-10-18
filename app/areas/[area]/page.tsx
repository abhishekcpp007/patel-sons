import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, CircleCheck, ArrowUpRight } from "lucide-react";
import { areas, getArea } from "@/content/areas";
import { services, materialPackages, labourPackages } from "@/content/services";
import { projects } from "@/content/projects";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Faq } from "@/components/ui/faq";
import { ProjectCard } from "@/components/projects/project-card";
import { OpenQueryButton } from "@/components/forms/open-query-button";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, serviceJsonLd } from "@/lib/seo";

type Params = { area: string };

export function generateStaticParams(): Params[] {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { area } = await params;
  const a = getArea(area);
  if (!a) return {};
  return pageMeta({
    title: `Construction Contractor in ${a.name}, Ahmedabad | Row Houses & Home Building`,
    description: `${a.intro} Patel Sons builds row houses, apartments and private homes in ${a.name} on labour-rate or with-material contracts from ₹1,750/sq ft. Free site visit.`,
    path: `/areas/${a.slug}`,
    keywords: [`construction contractor ${a.name}`, `builders in ${a.name}`, `house construction ${a.name} Ahmedabad`, `row houses ${a.name}`],
  });
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const { area } = await params;
  const a = getArea(area);
  if (!a) notFound();
  const nearby = projects.filter((p) => a.projectSlugs.includes(p.slug));
  const popular = services.filter((s) => a.popular.includes(s.slug as (typeof a.popular)[number]));
  const otherAreas = areas.filter((x) => x.slug !== a.slug);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Areas", path: "/areas" }, { name: a.name, path: `/areas/${a.slug}` }];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), faqJsonLd(a.faqs), serviceJsonLd({ name: `House construction in ${a.name}`, description: a.why, path: `/areas/${a.slug}`, area: `${a.name}, Ahmedabad`, offers: materialPackages.map((p) => ({ name: `With material — ${p.name}`, price: p.rate })) })]} />
      <PageHero eyebrow={a.zone} title={`Construction contractor in ${a.name}`} text={a.intro} image={nearby[0]?.cover ?? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"} crumbs={crumbs}>
        <div className="mt-8 flex flex-wrap gap-3">
          <OpenQueryButton preset={{ queryType: "build" }} size="lg">Free site visit in {a.name}</OpenQueryButton>
        </div>
      </PageHero>

      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-5">
          <article className="space-y-6 lg:col-span-3">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900">Building homes in {a.name}</h2>
            <p className="text-base leading-relaxed text-ink-600">{a.why}</p>
            <h3 className="pt-2 text-xl font-bold text-ink-900">What it costs in {a.name}</h3>
            <div className="overflow-hidden rounded-2xl ring-1 ring-ink-900/5">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-ink-100 bg-white">
                  <tr><td className="px-4 py-3 font-semibold text-ink-900">Plot rate (indicative)</td><td className="px-4 py-3 text-right text-ink-700">{a.plotRate}</td></tr>
                  {materialPackages.map((p) => <tr key={p.name}><td className="px-4 py-3 font-semibold text-ink-900">With material — {p.name}</td><td className="px-4 py-3 text-right text-ink-700">₹{p.rate.toLocaleString("en-IN")}/sq. ft.</td></tr>)}
                  {labourPackages.map((p) => <tr key={p.name}><td className="px-4 py-3 font-semibold text-ink-900">Labour rate — {p.name}</td><td className="px-4 py-3 text-right text-ink-700">₹{p.rate}/sq. ft.</td></tr>)}
                </tbody>
              </table>
            </div>
            <h3 className="pt-2 text-xl font-bold text-ink-900">Popular services in {a.name}</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {popular.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}`} className="group flex items-start gap-2 rounded-xl bg-white p-3 text-sm ring-1 ring-ink-900/5 hover:ring-brand-500"><CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /><span><span className="font-semibold text-ink-900">{s.title}</span><br /><span className="text-ink-500">{s.short}</span></span></Link></li>)}
            </ul>
            <h3 className="pt-2 text-xl font-bold text-ink-900">Landmarks we build near</h3>
            <div className="flex flex-wrap gap-2">{a.landmarks.map((l) => <span key={l} className="inline-flex items-center gap-1 rounded-full bg-ink-50 px-3 py-1 text-xs font-medium text-ink-600"><MapPin className="h-3 w-3 text-brand-500" /> {l}</span>)}</div>
          </article>
          <aside className="space-y-6 lg:col-span-2">
            <div className="overflow-hidden rounded-3xl ring-1 ring-ink-900/5"><iframe title={`${a.name} map`} src={`https://www.google.com/maps?q=${encodeURIComponent(`${a.name}, Ahmedabad`)}&output=embed`} className="h-64 w-full" loading="lazy" /></div>
            <div className="rounded-3xl bg-ink-900 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Other areas</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4">
                {otherAreas.map((o) => <li key={o.slug}><Link href={`/areas/${o.slug}`} className="group flex items-center justify-between py-2 text-sm font-semibold hover:text-brand-400">{o.name} <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100" /></Link></li>)}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      {nearby.length > 0 && (
        <section className="bg-sand-100 py-20">
          <Container>
            <SectionHeading eyebrow="Nearby" title={`Our projects in ${a.name}`} />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">{nearby.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
          </Container>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2"><SectionHeading eyebrow="FAQ" title={`Building in ${a.name}`} /></div>
          <div className="lg:col-span-3"><Faq items={a.faqs} /></div>
        </Container>
      </section>
      <CTA title={`Have a plot in ${a.name}? Let's build on it.`} />
    </>
  );
}
