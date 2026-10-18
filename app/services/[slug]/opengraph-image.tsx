import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { services } from "@/content/services";

export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  return ogCard({ eyebrow: "Service · Ahmedabad", title: s?.title ?? "Our services", subtitle: s?.short, image: s?.image });
}
