import { ogCard, ogSize, ogContentType } from "@/lib/og";
import { areas, getArea } from "@/content/areas";

export const size = ogSize;
export const contentType = ogContentType;
export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ area: string }> }) {
  const { area } = await params;
  const a = getArea(area);
  return ogCard({ eyebrow: a ? `${a.zone} · Areas we serve` : "Areas we serve", title: a ? `Construction contractor in ${a.name}` : "Areas we serve", subtitle: a ? `Row houses · Private contracts from ₹1,750/sq ft · Plot rate ${a.plotRate}` : undefined });
}
