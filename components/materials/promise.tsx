import { ShieldCheck, Scale, BadgeIndianRupee, PackageCheck, Clock, Headset, Quote } from "lucide-react";
import { company } from "@/content/company";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export const promises = [
  { Icon: ShieldCheck, t: "100% genuine, branded products", s: "Every bag, bar, box and bucket comes from the authorised dealer with a GST invoice in your name. No re-rolled steel, no re-bagged cement, ever." },
  { Icon: Scale, t: "Quantity guarantee", s: "Steel is weighed on a calibrated scale, bricks and tiles are counted, sand is measured by trolley volume, all in front of you. Any shortfall is made good within 24 hours, free." },
  { Icon: BadgeIndianRupee, t: "Market-standard rates", s: "Our rates track the Ahmedabad dealer market weekly. Found the same brand and grade cheaper from an authorised dealer? Show us the quote and we match it." },
  { Icon: PackageCheck, t: "Grade checked by an engineer", s: "A Patel Sons engineer confirms the grade and specification matches your stage of construction before dispatch, and inspects at delivery." },
  { Icon: Clock, t: "On-time delivery or delivery is free", s: "You get a delivery slot when we confirm the order. If we miss it without calling ahead, the delivery charge is waived." },
  { Icon: Headset, t: "Help desk with a ticket number", s: "Damaged, short, wrong or late? Raise a complaint online, get a ticket number, a call within 2 working hours and resolution within 24 hours." },
];

export function MaterialPromise({ compact = false }: { compact?: boolean }) {
  return (
    <section id="promise" className="scroll-mt-24 bg-ink-950 py-20 text-white lg:py-28">
      <Container>
        <SectionHeading dark align="center" eyebrow="The Patel Sons material promise" title="100% genuine product. Excellent quality. Any quantity." text="Whether you need 20 bags or 20 tonnes, you get the same brands, the same checks and the same guarantee we give our own sites." />
        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promises.slice(0, compact ? 3 : 6).map(({ Icon, t, s }) => (
            <StaggerItem key={t}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-500/15"><Icon className="h-5 w-5 text-brand-400" /></span>
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{s}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        {!compact && (
          <figure className="mx-auto mt-12 max-w-3xl rounded-3xl bg-brand-500 p-8 text-white shadow-glow">
            <Quote className="h-8 w-8 text-brand-200" />
            <blockquote className="mt-3 text-lg font-semibold leading-relaxed">
              &ldquo;I have refused deliveries on my own sites for a bag of cement that was two months old. The materials we sell you pass the same test. If anything we deliver is not exactly what you ordered, in grade or in quantity, we replace it. That is my personal guarantee.&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm font-semibold text-brand-100">{company.founders[0].name}, {company.founders[0].role}</figcaption>
          </figure>
        )}
      </Container>
    </section>
  );
}
