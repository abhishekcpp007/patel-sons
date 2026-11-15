import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Building across Lucknow";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Areas we serve", title: "Building across Lucknow", subtitle: "Indira Nagar · Sushant Golf City · Gomti Nagar · Hazratganj · Aliganj · Vrindavan Yojana · Chinhat · Jankipuram · Sultanpur Road", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=70" });
}
