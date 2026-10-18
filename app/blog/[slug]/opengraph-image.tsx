import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { posts, getPost } from "@/content/blog";

export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPost(slug);
  return ogCard({ eyebrow: p ? `${p.category} · ${p.readMinutes} min read` : "Blog", title: p?.title ?? "Patel Sons blog", subtitle: p?.excerpt, image: p?.cover });
}
