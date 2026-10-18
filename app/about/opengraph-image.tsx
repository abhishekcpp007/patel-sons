import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Builders in Ahmedabad since 2004";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "About us", title: "Builders in Ahmedabad since 2004", subtitle: "Founded by Himanshu Verma · 480+ homes delivered · In-house engineers", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=70" });
}
