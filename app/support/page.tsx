import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Phone, Clock, Headset, PackageSearch, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Faq } from "@/components/ui/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { ComplaintForm } from "@/components/materials/complaint-form";
import { SupportOrderPrefill } from "@/components/materials/support-prefill";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { company } from "@/content/company";
import { WhatsAppIcon } from "@/components/icons/social";

const faqs = [
  { q: "What happens after I register a complaint?", a: "You get a ticket number instantly. A support engineer calls you within 2 working hours, visits the site if needed, and we commit to a written resolution within 24 hours: replacement, top-up, refund or credit." },
  { q: "The delivered quantity is less than the invoice. What do I do?", a: "Note the shortfall on the delivery challan before signing, raise a complaint with 'Quantity short', and we top up the difference within 24 hours at no cost. This is covered by our quantity guarantee." },
  { q: "Tiles or sanitaryware arrived broken.", a: "Keep the damaged pieces and boxes, raise a complaint with photos on WhatsApp quoting your ticket number, and we replace them from the same batch within 48 hours." },
  { q: "Can I return unused materials?", a: "Unopened cement within 15 days of delivery, uncut tiles in sealed boxes within 30 days and unused sanitaryware in original packing within 30 days can be returned for credit. Steel, sand and bricks cannot be returned once delivered." },
  { q: "How do I escalate?", a: "If you are not satisfied with the resolution, reply on the ticket or WhatsApp 'ESCALATE' with the ticket number. It goes directly to Abhishek, Co-Partner, who responds personally within one working day." },
];

export const metadata: Metadata = pageMeta({ title: "Help & Complaints for Material Orders", description: "Problem with a Patel Sons material delivery? Register a complaint, get a ticket number, a call within 2 hours and resolution within 24 hours. Quantity and quality guaranteed.", path: "/support", keywords: ["building material complaint", "Patel Sons support"] });

export default function SupportPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: "Help & complaints", path: "/support" }]), faqJsonLd(faqs)]} />
      <PageHero eyebrow="Help desk" title="Something wrong with your order? We fix it, fast." text="Register the issue, get a ticket number, and a support engineer calls within 2 working hours. Written resolution within 24 hours." image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" crumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: "Help & complaints", path: "/support" }]} />
      <section className="py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="space-y-5 lg:col-span-2">
            <div className="rounded-3xl bg-ink-900 p-6 text-white">
              <h2 className="text-lg font-bold">Talk to a person now</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 text-brand-400" /><div><p className="text-ink-300">Support line</p><a href={company.phoneHref} className="font-semibold hover:text-brand-400">{company.phone}</a></div></li>
                <li className="flex gap-3"><WhatsAppIcon className="mt-0.5 h-4 w-4 text-[#25D366]" /><div><p className="text-ink-300">WhatsApp (send photos here)</p><a href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent("Hi, I have an issue with my material order. Ticket/Order no: ")}`} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-brand-400">Chat with support</a></div></li>
                <li className="flex gap-3"><Clock className="mt-0.5 h-4 w-4 text-brand-400" /><div><p className="text-ink-300">Hours</p><p className="font-semibold">{company.hours}</p></div></li>
              </ul>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900"><ShieldCheck className="h-5 w-5 text-brand-500" /> Our commitments</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li>Call back within <strong>2 working hours</strong></li>
                <li>Written resolution within <strong>24 hours</strong></li>
                <li>Quantity shortfalls topped up <strong>free, within 24 hours</strong></li>
                <li>Damaged goods replaced <strong>within 48 hours</strong></li>
                <li>Escalation to a partner within <strong>1 working day</strong></li>
              </ul>
            </div>
            <Link href="/track" className="flex items-center gap-3 rounded-3xl bg-brand-50 p-5 text-sm font-semibold text-brand-800 ring-1 ring-brand-200 hover:bg-brand-100"><PackageSearch className="h-5 w-5" /> Track an order or complaint status</Link>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-8 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Register a complaint</p>
            <h2 className="mt-1 flex items-center gap-2 text-2xl font-bold text-ink-900"><Headset className="h-6 w-6 text-brand-500" /> Tell us what went wrong</h2>
            <div className="mt-6"><Suspense fallback={<ComplaintForm />}><SupportOrderPrefill /></Suspense></div>
          </div>
        </Container>
      </section>
      <section className="bg-sand-100 py-20">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2"><SectionHeading eyebrow="FAQ" title="Returns, replacements and escalation" /></div>
          <div className="lg:col-span-3"><Faq items={faqs} /></div>
        </Container>
      </section>
    </>
  );
}
