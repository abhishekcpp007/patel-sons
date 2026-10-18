import { ogCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Let's talk about your home";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogCard({ eyebrow: "Contact", title: "Let's talk about your home", subtitle: "Call, WhatsApp or raise a query · Free site visit", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=70" });
}
