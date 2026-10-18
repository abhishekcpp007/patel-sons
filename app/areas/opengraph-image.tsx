import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Building across Ahmedabad";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Areas we serve", title: "Building across Ahmedabad", subtitle: "Bopal · Shela · Thaltej · Satellite · Gota · Chandkheda · Vastral · Nikol · Sanand", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70" });
}
