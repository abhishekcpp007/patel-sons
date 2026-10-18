import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { projects, getProject, typeLabel } from "@/content/projects";

export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogCard({ eyebrow: p ? `${typeLabel[p.type]} · ${p.location}, ${p.city}` : "Project", title: p?.name ?? "Patel Sons project", subtitle: p ? `${p.tagline} · ${p.units} · ${p.sizes}` : undefined, image: p?.cover });
}
