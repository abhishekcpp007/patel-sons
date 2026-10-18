import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { Faq } from "@/components/ui/faq";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { projects } from "@/content/projects";
import { buyerFaqs } from "@/content/faqs";

export const metadata: Metadata = pageMeta({
  title: "Row Houses & Apartments in Ahmedabad | Patel Sons Projects",
  description:
    "Explore Patel Sons projects: Shivalik Greens row houses in South Bopal, Patel Heights apartments in Vastral, and completed communities in Shela and Nikol. RERA registered.",
  path: "/projects",
  image: projects[0].cover,
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]),
          faqJsonLd(buyerFaqs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}/projects/${p.slug}`, name: p.name })),
          },
        ]}
      />
      <PageHero
        eyebrow="Projects"
        title="Row houses and apartments across Ahmedabad"
        text="Ongoing sites with live progress, completed communities you can visit, and private contract homes we are building for clients."
        image={projects[1].cover}
        crumbs={[{ name: "Home", path: "/" }, { name: "Projects", path: "/projects" }]}
      />
      <section className="py-16 lg:py-24">
        <Container><ProjectsGrid /></Container>
      </section>
      <section className="bg-sand-100 py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2"><SectionHeading eyebrow="Buyer FAQ" title="Before you book a home" /></div>
          <div className="lg:col-span-3"><Faq items={buyerFaqs} /></div>
        </Container>
      </section>
      <CTA title="Book a site visit this weekend." text="Walk through the sample house, meet the site engineer and see the construction quality yourself." />
    </>
  );
}
