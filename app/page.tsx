import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { ServicesSection } from "@/components/home/services-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { ProcessSection } from "@/components/home/process-section";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { SocialSection } from "@/components/home/social-section";
import { CTA } from "@/components/home/cta";
import { AreasStrip } from "@/components/home/areas-strip";
import { BlogSection } from "@/components/home/blog-section";
import { MaterialsStrip } from "@/components/home/materials-strip";
import { JsonLd } from "@/components/ui/json-ld";
import { organizationJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { company } from "@/content/company";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Construction Company in Ahmedabad | Row Houses & Contractors",
    description:
      "Patel Sons builds row houses and apartment buildings in Ahmedabad and takes private construction contracts on labour-rate and with-material (turnkey) basis. Fixed per sq. ft. rates, RERA registered, 20+ years.",
    path: "/",
  }),
  title: { absolute: "Patel Sons | Construction Company in Ahmedabad: Row Houses, Buildings & Contracts" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: SITE_URL,
            name: company.name,
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />
      <Hero />
      <Stats />
      <ServicesSection />
      <FeaturedProjects />
      <ProcessSection />
      <WhyUs />
      <MaterialsStrip />
      <Testimonials />
      <AreasStrip />
      <BlogSection />
      <SocialSection />
      <CTA />
    </>
  );
}
