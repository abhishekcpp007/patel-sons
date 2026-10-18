import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.status !== "upcoming").slice(0, 4);
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
      <div className="grid-pattern absolute inset-0 opacity-50" />
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <Container className="relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading dark eyebrow="Our projects" title="Sites we are building right now" text="Live progress from our ongoing developments and recently completed communities." />
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm font-semibold text-white">
            All projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
        <Stagger className="mt-14 grid gap-6 md:grid-cols-2">
          {featured.map((p, i) => (
            <StaggerItem key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <ProjectCard project={p} large={i === 0} dark />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
