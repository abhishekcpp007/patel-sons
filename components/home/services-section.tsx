import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, House, Building, HardHat, Package, Compass, Truck } from "lucide-react";
import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

const icons = { house: House, building: Building, hardhat: HardHat, package: Package, compass: Compass, truck: Truck };

export function ServicesSection() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="What we do" title="Six ways we help you build" text="Own developments you can buy into, two contract models for your plot, expert guidance before you commit, and quality materials at contractor rates." />
          <Link href="/services" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900">
            All services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            const href = s.slug === "building-materials" ? "/materials" : `/services/${s.slug}`;
            return (
              <StaggerItem key={s.slug}>
                <Link href={href} className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink-900 text-white shadow-soft">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={s.image} alt={s.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
                    <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/10 backdrop-blur">
                      <Icon className="h-5 w-5 text-brand-400" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 pt-2">
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-300">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-400">
                      Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
