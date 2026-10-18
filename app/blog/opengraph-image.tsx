import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Build smarter. Buy smarter.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Guides & insights", title: "Build smarter. Buy smarter.", subtitle: "Costs, contracts, checklists and honest advice", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70" });
}
