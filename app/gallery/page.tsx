import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Gallery } from "@/components/projects/gallery";
import { SocialSection } from "@/components/home/social-section";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { projects } from "@/content/projects";

export const metadata: Metadata = pageMeta({
  title: "Construction Site Gallery | Patel Sons Ahmedabad",
  description: "Photos from Patel Sons construction sites: ongoing row house communities, apartment towers and private contract homes across Ahmedabad.",
  path: "/gallery",
  image: projects[2].cover,
});

export default function GalleryPage() {
  const items = projects.flatMap((p) => p.gallery.map((src, i) => ({ src, alt: `${p.name}, ${p.location} — photo ${i + 1}`, caption: p.name })));
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])} />
      <PageHero eyebrow="Gallery" title="Our sites, as they really look" text="Unfiltered photos from every Patel Sons site. Click any image to view it full screen." image={projects[2].gallery[1]} crumbs={[{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }]} />
      <section className="py-16 lg:py-24">
        <Container><Gallery items={items} columns={4} /></Container>
      </section>
      <SocialSection />
    </>
  );
}
