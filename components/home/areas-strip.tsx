import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { areas } from "@/content/areas";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function AreasStrip() {
  return (
    <section className="py-20 lg:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Areas we serve" title="Local builders in every part of Ahmedabad" text="Plot rates, nearby projects and the services people ask for most in each locality." />
          <Link href="/areas" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900">All areas <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </div>
        <Reveal className="mt-10 flex flex-wrap gap-2.5">
          {areas.map((a) => (
            <Link key={a.slug} href={`/areas/${a.slug}`} className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-200 transition hover:bg-ink-900 hover:text-white hover:ring-ink-900">
              <MapPin className="h-3.5 w-3.5 text-brand-500" /> {a.name}
            </Link>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
