import type { Metadata } from "next";
import { Suspense } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { SocialLinks } from "@/components/layout/social-links";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { company } from "@/content/company";
import { WhatsAppIcon } from "@/components/icons/social";

export const metadata: Metadata = pageMeta({
  title: "Contact Patel Sons | Construction Quote in Ahmedabad",
  description: "Call, WhatsApp or send an enquiry to Patel Sons for row houses, apartments, labour-rate or with-material construction contracts in Ahmedabad. Free site visit.",
  path: "/contact",
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&h=630&q=80",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero eyebrow="Contact" title="Let's talk about your home" text="Tell us what you want to build or buy. We'll call back within one working day with next steps." image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" crumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />

      <section className="py-16 lg:py-24">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-3xl bg-ink-900 p-7 text-white">
              <h2 className="text-xl font-bold">Reach us directly</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" /><div><p className="text-ink-300">Phone</p><a href={company.phoneHref} className="font-semibold hover:text-brand-400">{company.phone}</a></div></li>
                <li className="flex gap-3"><WhatsAppIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#25D366]" /><div><p className="text-ink-300">WhatsApp</p><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-brand-400">Chat on WhatsApp</a></div></li>
                <li className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" /><div><p className="text-ink-300">Email</p><a href={`mailto:${company.email}`} className="font-semibold hover:text-brand-400">{company.email}</a></div></li>
                <li className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" /><div><p className="text-ink-300">Office</p><p className="font-semibold">{company.address}</p></div></li>
                <li className="flex gap-3"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" /><div><p className="text-ink-300">Hours</p><p className="font-semibold">{company.hours}</p></div></li>
              </ul>
              <SocialLinks className="mt-7" />
            </div>
            <div className="overflow-hidden rounded-3xl ring-1 ring-ink-900/5">
              <iframe title="Patel Sons office location" src={company.mapEmbed} className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
          <div className="min-w-0 rounded-3xl bg-white p-6 shadow-soft ring-1 ring-ink-900/5 sm:p-8 lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Raise a query</p>
            <h2 className="mt-1 text-2xl font-bold text-ink-900">Tell us what you need</h2>
            <p className="mt-1 text-sm text-ink-500">Pick a query type below. Fields marked optional can be skipped. We never share your details.</p>
            <div className="mt-6">
              <Suspense fallback={<EnquiryForm />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
