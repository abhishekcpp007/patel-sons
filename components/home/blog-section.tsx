import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";
import { PostCard } from "@/components/blog/post-card";

export function BlogSection() {
  return (
    <section className="bg-sand-100 py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Guides" title="Know before you build or buy" text="Costs, contracts and checklists written by the people who build the homes." />
          <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-semibold text-ink-900">All guides <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>
        </div>
        <Stagger className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((p) => <StaggerItem key={p.slug}><PostCard post={p} /></StaggerItem>)}
        </Stagger>
      </Container>
    </section>
  );
}
