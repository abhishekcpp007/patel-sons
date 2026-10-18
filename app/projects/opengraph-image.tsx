import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Row houses and apartments across Ahmedabad";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Our projects", title: "Row houses and apartments across Ahmedabad", subtitle: "Ongoing, completed and upcoming RERA-registered projects", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70" });
}
