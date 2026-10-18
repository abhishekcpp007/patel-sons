import type { Metadata } from "next";
import Image from "next/image";
import { Award, Users, HardHat, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { Stats } from "@/components/home/stats";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { company } from "@/content/company";
import { SocialLinks } from "@/components/layout/social-links";

export const metadata: Metadata = pageMeta({
  title: "About Patel Sons | Builders in Ahmedabad Since 2004",
  description:
    "Patel Sons, founded by Himanshu Verma with co-partner Abhishek: 20+ years building row houses, apartments and private homes in Ahmedabad. In-house engineers, RERA projects, fixed-price contracts.",
  path: "/about",
});

const team = company.founders;

const values = [
  { Icon: ShieldCheck, t: "Honesty first", s: "What we quote is what you pay. No hidden extras, no surprise escalations." },
  { Icon: HardHat, t: "Our own people", s: "Supervisors, engineers and core masons are on our payroll, not sub-contracted." },
  { Icon: Users, t: "Families, not units", s: "We build homes people live in for decades, so we build them like our own." },
  { Icon: Award, t: "Quality you can inspect", s: "12-stage quality checklist, signed off before every payment stage." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About us"
        title="Two generations of building homes families trust"
        text="Started in 2004 with a single row house project. Today Patel Sons delivers gated communities, apartment towers and private homes across Ahmedabad."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
        crumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      />
      <Stats />

      <section className="py-24 lg:py-32">
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="From one site to a city full of homes" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-600">
              <p>Patel Sons began when Himanshu Verma, a site engineer for fifteen years, decided to build the kind of homes he had always wanted to work on: honest structures, finished properly, delivered when promised.</p>
              <p>The first project was eight row houses in Shela. Every one of those families still lives there. That project taught us the rule we still follow: build like the buyer is going to inspect every brick, because they should.</p>
              <p>Today Himanshu Verma and co-partner Abhishek run projects and contracts between them, and the founder still visits every site on Saturdays. We develop our own row house communities and apartment buildings, and we build private homes for clients on their own plots on labour-rate or with-material terms.</p>
            </div>
            <SocialLinks className="mt-8 [&_a]:border-ink-200 [&_a]:bg-ink-900" />
          </div>
          <Reveal className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl"><Image src="https://images.unsplash.com/photo-1590725140246-20acdee442be?auto=format&fit=crop&w=900&q=80" alt="Patel Sons site in progress" fill sizes="25vw" className="object-cover" /></div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl"><Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" alt="Completed row house by Patel Sons" fill sizes="25vw" className="object-cover" /></div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink-950 py-24 text-white lg:py-32">
        <Container>
          <SectionHeading dark align="center" eyebrow="What we stand for" title="The values on every site board" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ Icon, t, s }) => (
              <StaggerItem key={t}>
                <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-7">
                  <Icon className="h-8 w-8 text-brand-400" />
                  <h3 className="mt-5 text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-300">{s}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <SectionHeading align="center" eyebrow="Leadership" title="The partners behind Patel Sons" />
          <Stagger className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
            {team.map((m) => (
              <StaggerItem key={m.name}>
                <div className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink-100">
                    <Image src={m.img} alt={m.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-ink-900">{m.name}</h3>
                  <p className="text-sm font-semibold text-brand-600">{m.role}</p>
                  <p className="mt-2 text-sm text-ink-500">{m.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-10 text-center text-xs text-ink-400">{company.rera}</p>
        </Container>
      </section>

      <CTA title="Want to see a site before you decide?" text="Book a site visit to any ongoing project and meet the engineers who will build your home." />
    </>
  );
}
