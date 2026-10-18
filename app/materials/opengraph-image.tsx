import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Quality materials at contractor rates";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Building materials", title: "Quality materials at contractor rates", subtitle: "Cement · TMT steel · Bricks · Tiles · Sanitaryware · Paints · Delivered to site", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=70" });
}
