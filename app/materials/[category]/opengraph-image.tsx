import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { materialCategories, getCategory } from "@/content/materials";

export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() {
  return materialCategories.map((c) => ({ category: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  return ogCard({ eyebrow: "Building materials · Contractor rates", title: c ? `${c.name} in Ahmedabad` : "Building materials", subtitle: c?.blurb });
}
