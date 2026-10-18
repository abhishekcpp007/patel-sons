import { Star, Quote } from "lucide-react";
import { testimonials } from "@/content/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export function Testimonials() {
  return (
    <section className="bg-ink-50 py-24 lg:py-32">
      <Container>
        <SectionHeading align="center" eyebrow="Client stories" title="What homeowners say about us" />
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="relative h-full rounded-3xl bg-white p-8 shadow-soft ring-1 ring-ink-900/5">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-brand-100" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-500 text-brand-500" />
                  ))}
                </div>
                <blockquote className="mt-4 text-base leading-relaxed text-ink-700">“{t.text}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink-900 font-display text-sm font-bold text-brand-400">
                    {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
