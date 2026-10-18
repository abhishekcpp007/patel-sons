import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Ruler, Building, CircleCheck, Download, ArrowLeft } from "lucide-react";
import { projects, getProject, statusLabel, typeLabel } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { StatusBadge, Pill } from "@/components/ui/badge";
import { Gallery } from "@/components/projects/gallery";
import { EmiCalculator } from "@/components/projects/emi-calculator";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { OpenQueryButton } from "@/components/forms/open-query-button";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { formatCompactINR } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name} — ${typeLabel[p.type]} in ${p.location}, ${p.city}`,
    description: `${p.tagline}. ${p.units}, ${p.sizes}. ${p.priceFrom ? `Starting ${formatCompactINR(p.priceFrom)}. ` : ""}${statusLabel[p.status]} project by Patel Sons${p.rera ? `, RERA ${p.rera}` : ""}.`,
    path: `/projects/${p.slug}`,
    image: p.cover,
  });
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const related = projects.filter((x) => x.slug !== p.slug && x.type === p.type).slice(0, 2);
  const isSale = p.type !== "contract";
  const preset = isSale
    ? { queryType: "buy" as const, interest: p.type === "row-house" ? ("row-house" as const) : ("apartment" as const), project: p.name }
    : { queryType: "build" as const, contractType: "with-material" as const };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }, { name: p.name, path: `/projects/${p.slug}` }]),
          isSale
            ? {
                "@context": "https://schema.org",
                "@type": ["Product", "Residence"],
                name: p.name,
                description: p.description,
                image: p.gallery,
                url: `${SITE_URL}/projects/${p.slug}`,
                brand: { "@id": `${SITE_URL}/#organization` },
                address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: "Gujarat", addressCountry: "IN" },
                ...(p.priceFrom ? { offers: { "@type": "Offer", price: p.priceFrom, priceCurrency: "INR", availability: p.status === "completed" ? "https://schema.org/SoldOut" : "https://schema.org/InStock" } } : {}),
              }
            : {
                "@context": "https://schema.org",
                "@type": "Service",
                name: p.name,
                description: p.description,
                image: p.cover,
                provider: { "@id": `${SITE_URL}/#organization` },
                areaServed: p.city,
              },
        ]}
      />

      <section className="relative isolate overflow-hidden bg-ink-950 pt-28 text-white lg:pt-32">
        <Container>
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-ink-300 hover:text-white"><ArrowLeft className="h-4 w-4" /> All projects</Link>
          <div className="mt-6 flex flex-col gap-6 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={p.status} />
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{typeLabel[p.type]}</span>
              </div>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{p.name}</h1>
              <p className="mt-3 text-lg text-ink-200">{p.tagline}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-300"><MapPin className="h-4 w-4 text-brand-400" /> {p.location}, {p.city}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {isSale ? (
                <OpenQueryButton preset={{ queryType: "site-visit", project: p.name }} icon={false}>
                  <Calendar className="h-4 w-4" /> Book site visit
                </OpenQueryButton>
              ) : (
                <OpenQueryButton preset={preset}>Discuss a similar project</OpenQueryButton>
              )}
              <Button href="#enquire" variant="white"><Download className="h-4 w-4" /> Brochure</Button>
            </div>
          </div>
        </Container>
        <div className="relative aspect-[16/9] w-full lg:aspect-[21/8]">
          <Image src={p.cover} alt={`${p.name} by Patel Sons, ${p.location}`} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
        </div>
      </section>

      <section className="relative z-10 -mt-10">
        <Container>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink-100 shadow-soft ring-1 ring-ink-900/5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Building, l: "Units", v: p.units },
              { Icon: Ruler, l: "Sizes", v: p.sizes },
              { Icon: Calendar, l: "Timeline", v: `${p.startDate} – ${p.completionDate}` },
              { Icon: CircleCheck, l: isSale ? "Price" : "Contract", v: p.priceFrom ? `From ${formatCompactINR(p.priceFrom)}` : p.priceLabel ?? "—" },
            ].map(({ Icon, l, v }) => (
              <div key={l} className="flex items-center gap-4 bg-white p-6">
                <Icon className="h-6 w-6 shrink-0 text-brand-500" />
                <div><p className="text-xs font-semibold uppercase tracking-wider text-ink-500">{l}</p><p className="mt-0.5 font-bold text-ink-900">{v}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-14 lg:col-span-2">
            <Reveal>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">About {p.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-600">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">{p.highlights.map((h) => <Pill key={h}>{h}</Pill>)}</div>
              {p.status !== "upcoming" && (
                <div className="mt-8 rounded-2xl bg-ink-50 p-5 ring-1 ring-ink-900/5">
                  <div className="flex items-center justify-between text-sm"><span className="font-semibold text-ink-900">Construction progress</span><span className="font-bold text-brand-600">{p.progress}%</span></div>
                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink-200"><div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400" style={{ width: `${p.progress}%` }} /></div>
                  <p className="mt-2 text-xs text-ink-500">Updated weekly from site reports</p>
                </div>
              )}
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Gallery</h2>
              <Gallery className="mt-6" items={p.gallery.map((src, i) => ({ src, alt: `${p.name} photo ${i + 1}`, caption: i === 0 ? "Site view" : undefined }))} />
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Amenities</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {p.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3 rounded-xl bg-white p-3.5 text-sm text-ink-700 ring-1 ring-ink-900/5"><CircleCheck className="h-4 w-4 text-brand-500" /> {a}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Specifications</h2>
              <dl className="mt-6 divide-y divide-ink-100 overflow-hidden rounded-2xl bg-white ring-1 ring-ink-900/5">
                {p.specifications.map((s) => (
                  <div key={s.label} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-3"><dt className="text-sm font-semibold text-ink-900">{s.label}</dt><dd className="text-sm text-ink-600 sm:col-span-2">{s.value}</dd></div>
                ))}
              </dl>
            </Reveal>

            <Reveal>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Location</h2>
              <div className="mt-6 overflow-hidden rounded-3xl ring-1 ring-ink-900/5">
                <iframe title={`${p.name} location map`} src={`https://www.google.com/maps?q=${encodeURIComponent(p.mapQuery)}&output=embed`} className="h-80 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div id="enquire" className="scroll-mt-24 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
              <h3 className="text-lg font-bold text-ink-900">{isSale ? "Enquire about this project" : "Build something similar"}</h3>
              <p className="mt-1 text-sm text-ink-500">We reply within one working day.</p>
              <EnquiryForm compact showTabs={false} className="mt-5" preset={preset} />
            </div>
            {p.priceFrom && <EmiCalculator price={p.priceFrom} />}
            {p.rera && <p className="text-center text-xs text-ink-400">RERA Reg. No. {p.rera}</p>}
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-sand-100 py-20">
          <Container>
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Similar projects</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">{related.map((r) => <ProjectCard key={r.slug} project={r} />)}</div>
          </Container>
        </section>
      )}
    </>
  );
}
