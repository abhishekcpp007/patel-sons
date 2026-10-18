import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ArrowUpRight, ChevronRight } from "lucide-react";
import { posts, getPost } from "@/content/blog";
import { company } from "@/content/company";
import { Container } from "@/components/ui/container";
import { Blocks } from "@/components/blog/blocks";
import { PostCard } from "@/components/blog/post-card";
import { OpenQueryButton } from "@/components/forms/open-query-button";
import { JsonLd } from "@/components/ui/json-ld";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return pageMeta({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, type: "article", keywords: p.keywords });
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: p.title, path: `/blog/${p.slug}` }];
  const author = company.founders[0];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), articleJsonLd({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}`, image: p.cover, date: p.date, updated: p.updated, keywords: p.keywords })]} />
      <article>
        <header className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-36 text-white lg:pt-44">
          <Image src={p.cover} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/50 to-ink-950" />
          <Container className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-ink-300">
              <Link href="/" className="hover:text-white">Home</Link><ChevronRight className="h-3 w-3" /><Link href="/blog" className="hover:text-white">Blog</Link><ChevronRight className="h-3 w-3" /><span className="text-white">{p.category}</span>
            </nav>
            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">{p.title}</h1>
            <p className="mt-5 text-lg text-ink-200">{p.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-300">
              <span>By <span className="font-semibold text-white">{author.name}</span>, {author.role}</span>
              <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time>
              {p.updated && <span>Updated {new Date(p.updated).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>}
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.readMinutes} min read</span>
            </p>
          </Container>
        </header>
        <Container className="max-w-4xl py-16 lg:py-20">
          <Blocks blocks={p.blocks} />
          <div className="mt-12 rounded-3xl bg-ink-900 p-8 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-400">Need help with this?</p>
            <h2 className="mt-2 text-2xl font-bold">Talk to a Patel Sons engineer, free.</h2>
            <p className="mt-2 text-sm text-ink-300">A 45-minute consultation on your plot, plan or contractor quote. No obligation.</p>
            <OpenQueryButton preset={{ queryType: "guidance" }} className="mt-5">Book free consultation</OpenQueryButton>
          </div>
          {p.related.length > 0 && (
            <div className="mt-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-500">Related pages</p>
              <ul className="mt-3 flex flex-wrap gap-2">{p.related.map((r) => <li key={r}><Link href={r} className="inline-flex items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 ring-1 ring-ink-200 hover:ring-brand-500">{r.replace(/^\//, "").replace(/-/g, " ").replace(/\//g, " › ")} <ArrowUpRight className="h-3.5 w-3.5" /></Link></li>)}</ul>
            </div>
          )}
        </Container>
      </article>
      <section className="bg-sand-100 py-20">
        <Container>
          <h2 className="text-2xl font-bold text-ink-900">More guides</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">{more.map((m) => <PostCard key={m.slug} post={m} />)}</div>
        </Container>
      </section>
    </>
  );
}
