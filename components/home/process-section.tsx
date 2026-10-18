import { process } from "@/content/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export function ProcessSection() {
  return (
    <section className="bg-sand-100 py-24 lg:py-32">
      <Container>
        <SectionHeading align="center" eyebrow="How it works" title="From first site visit to handing over the keys" text="A simple, transparent process that keeps you informed at every stage." />
        <Stagger className="relative mt-16 grid gap-6 md:grid-cols-5">
          <div className="absolute left-0 right-0 top-9 hidden h-px bg-ink-200 md:block" />
          {process.map((p) => (
            <StaggerItem key={p.step} className="relative">
              <div className="relative mx-auto grid h-18 w-18 place-items-center rounded-full border-4 border-sand-100 bg-ink-900 font-display text-lg font-extrabold text-brand-400 md:mx-0">
                {p.step}
              </div>
              <h3 className="mt-5 text-center text-lg font-bold text-ink-900 md:text-left">{p.title}</h3>
              <p className="mt-2 text-center text-sm leading-relaxed text-ink-500 md:text-left">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
