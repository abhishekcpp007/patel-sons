import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Our sites, as they really look";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Gallery", title: "Our sites, as they really look", subtitle: "Unfiltered photos from every Patel Sons site", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=70" });
}
