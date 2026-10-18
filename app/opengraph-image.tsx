import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Patel Sons — Row House Builders & Construction Contractors in Ahmedabad";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({
    eyebrow: "Since 2004 · Ahmedabad",
    title: "Row houses, towers and the home on your plot.",
    subtitle: "Labour-rate & with-material contracts · Fixed per sq. ft. pricing · RERA registered",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=70",
  });
}
