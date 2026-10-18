import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { pageMeta } from "@/lib/seo";
import { company } from "@/content/company";

export const metadata: Metadata = { ...pageMeta({ title: "Terms & Disclaimer", description: `Terms of use and disclaimer for the ${company.name} website.`, path: "/terms" }), robots: { index: false, follow: true } };

export default function TermsPage() {
  return (
    <section className="pb-24 pt-32 lg:pt-40">
      <Container className="prose prose-slate max-w-3xl">
        <h1>Terms &amp; Disclaimer</h1>
        <p>Last updated: October 2026</p>
        <h2>Information on this website</h2>
        <p>Project details, images, floor plans, amenities, prices and construction rates shown on this website are indicative and for representation only. They do not constitute an offer or a contract. Final specifications and prices are as per the signed agreement.</p>
        <h2>Estimates</h2>
        <p>Cost and EMI calculators provide approximate figures for guidance. Actual costs depend on site conditions, plan, approvals and material selection at the time of agreement.</p>
        <h2>RERA</h2>
        <p>Projects offered for sale are registered under Gujarat RERA. Registration numbers are shown on each project page and are available at the RERA website.</p>
        <h2>Contact</h2>
        <p>Questions about these terms: {company.email}.</p>
      </Container>
    </section>
  );
}
