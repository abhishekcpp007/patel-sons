import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { pageMeta } from "@/lib/seo";
import { company } from "@/content/company";

export const metadata: Metadata = { ...pageMeta({ title: "Privacy Policy", description: `How ${company.name} collects and uses the information you share with us.`, path: "/privacy" }), robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return (
    <section className="pb-24 pt-32 lg:pt-40">
      <Container className="prose prose-slate max-w-3xl">
        <h1>Privacy Policy</h1>
        <p>Last updated: October 2026</p>
        <p>{company.legalName} (&quot;we&quot;) collects the name, phone number, email and message you submit through enquiry forms on this website, and standard analytics data such as pages visited and device type.</p>
        <h2>How we use it</h2>
        <p>To respond to your enquiry, schedule site visits, send project updates you have asked for, and improve the website. We do not sell your personal information.</p>
        <h2>Sharing</h2>
        <p>Your details may be shared with our sales engineers and, if you request home loan assistance, with partner banks, only with your consent.</p>
        <h2>Your rights</h2>
        <p>Email {company.email} to request a copy of your data or to have it deleted.</p>
      </Container>
    </section>
  );
}
