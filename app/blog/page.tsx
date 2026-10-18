import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { CTA } from "@/components/home/cta";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbJsonLd, pageMeta, SITE_URL } from "@/lib/seo";
import { posts } from "@/content/blog";

export const metadata: Metadata = pageMeta({
  title: "Construction & Home Buying Guides for Ahmedabad",
  description: "Practical guides from Patel Sons: construction cost per sq ft in Ahmedabad, labour vs material contracts, choosing a contractor, RERA checklists and row house vs apartment advice.",
  path: "/blog",
  keywords: ["construction blog Ahmedabad", "home building guide Gujarat", "house construction tips India"],
});

export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]), { "@context": "https://schema.org", "@type": "Blog", name: "Patel Sons Blog", url: `${SITE_URL}/blog`, publisher: { "@id": `${SITE_URL}/#organization` }, blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date })) }]} />
      <PageHero eyebrow="Guides & insights" title="Build smarter. Buy smarter." text="Costs, contracts, checklists and honest advice from twenty years of building homes in Ahmedabad." image={first.cover} crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]} />
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2"><PostCard post={first} large /></div>
            {rest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
