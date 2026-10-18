import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Construction services in Ahmedabad";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "What we do", title: "Construction services in Ahmedabad", subtitle: "Row houses · Buildings · Labour-rate & with-material contracts · Guidance · Materials", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=70" });
}
