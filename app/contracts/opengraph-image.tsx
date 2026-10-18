import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Labour-rate from ₹260 · With-material from ₹1,750 per sq ft";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Private contracts", title: "Labour-rate from ₹260 · With-material from ₹1,750 per sq ft", subtitle: "Fixed price locked at signing · Stage-wise payments · Weekly reports", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=70" });
}
