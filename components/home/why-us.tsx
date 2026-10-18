import Image from "next/image";
import { CircleCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

const points = [
  { t: "In-house engineers & supervisors", s: "No sub-contracting of supervision. Our engineer is on your site every day." },
  { t: "Transparent per sq. ft. pricing", s: "Labour-rate or with-material, the rate is written in the contract and never changes." },
  { t: "Weekly photo progress reports", s: "Every Saturday you get site photos, work done and next week's plan on WhatsApp." },
  { t: "Quality checks at 12 stages", s: "From footing to final paint, each stage is inspected and signed off before moving ahead." },
];

export function WhyUs() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-soft">
            <Image src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80" alt="Site engineer reviewing plans" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-4 hidden max-w-[260px] rounded-3xl bg-brand-500 p-6 text-white shadow-glow sm:block lg:-right-10">
            <p className="font-display text-4xl font-extrabold">20+</p>
            <p className="mt-1 text-sm font-medium text-brand-100">years building homes families trust across Ahmedabad.</p>
          </div>
        </Reveal>
        <div>
          <SectionHeading eyebrow="Why Patel Sons" title="Built on honesty, delivered on time" text="Second-generation builders who still visit every site. Here is what that means for you." />
          <ul className="mt-10 space-y-6">
            {points.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.08} className="flex gap-4">
                <CircleCheck className="mt-1 h-6 w-6 shrink-0 text-brand-500" />
                <div>
                  <h3 className="font-bold text-ink-900">{p.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">{p.s}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Button href="/about" variant="secondary" className="mt-10">
            More about us
          </Button>
        </div>
      </Container>
    </section>
  );
}
