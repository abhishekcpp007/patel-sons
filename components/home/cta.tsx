import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OpenQueryButton } from "@/components/forms/open-query-button";
import { company } from "@/content/company";

export function CTA({ title = "Have a plot? Let's build your home on it.", text = "Get a free site visit and a transparent per sq. ft. estimate for labour-rate or with-material construction." }: { title?: string; text?: string }) {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-500 px-6 py-16 text-white shadow-glow sm:px-12 lg:px-20 lg:py-20">
          <div className="grid-pattern absolute inset-0 opacity-30" />
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
              <p className="mt-4 text-base text-brand-100 sm:text-lg">{text}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <OpenQueryButton preset={{ queryType: "build" }} variant="white" size="lg" icon={false}>
                Request a quote <ArrowRight className="h-4 w-4" />
              </OpenQueryButton>
              <Button href={company.phoneHref} variant="secondary" size="lg">
                <Phone className="h-4 w-4" /> {company.phone}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
