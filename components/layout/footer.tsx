import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { company, nav } from "@/content/company";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { Logo } from "./logo";
import { Year } from "./year";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div className="grid-pattern absolute inset-0 opacity-60" />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-400">{company.description}</p>
            <p className="mt-4 text-xs text-ink-500">{company.rera}</p>
            <SocialLinks className="mt-6" />
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[...nav.slice(1), { href: "/gallery", label: "Gallery" }, { href: "/blog", label: "Blog & guides" }, { href: "/areas", label: "Areas we serve" }, { href: "/materials/guides", label: "Material usage guides" }, { href: "/track", label: "Track your order" }, { href: "/support", label: "Help & complaints" }, { href: "/signup", label: "Create account" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-colors hover:text-brand-400">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.slug === "building-materials" ? "/materials" : `/services/${s.slug}`} className="group inline-flex items-center gap-1 transition-colors hover:text-brand-400">
                    {s.title}
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{company.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={company.phoneHref} className="hover:text-white">{company.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-400">Construction contractor in</p>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            {areas.map((a, i) => (
              <span key={a.slug}><Link href={`/areas/${a.slug}`} className="hover:text-brand-400">{a.name}</Link>{i < areas.length - 1 ? " · " : ""}</span>
            ))}
          </p>
        </div>
        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© <Year /> {company.legalName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
