import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Branded Open Graph card used by every page's opengraph-image. */
export function ogCard({ eyebrow, title, subtitle, image }: { eyebrow: string; title: string; subtitle?: string; image?: string }) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0b1220", color: "white", fontFamily: "sans-serif", position: "relative" }}>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,18,32,0.95) 0%, rgba(11,18,32,0.75) 60%, rgba(11,18,32,0.4) 100%)", display: "flex" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: "#f26a1b", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "#f26a1b", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18" /><path d="M5 21V9l7-5 7 5v12" /><path d="M9 21v-6h6v6" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 30, fontWeight: 800, display: "flex" }}>Patel <span style={{ color: "#ff8a3d", marginLeft: 8 }}>Sons</span></div>
              <div style={{ fontSize: 13, letterSpacing: 5, color: "#aab5c9" }}>CONSTRUCTION · AHMEDABAD</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
            <div style={{ fontSize: 20, letterSpacing: 4, color: "#ff8a3d", textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ fontSize: title.length > 48 ? 52 : 64, fontWeight: 800, lineHeight: 1.08, display: "flex" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 26, color: "#d6dce7", lineHeight: 1.35, display: "flex" }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex", gap: 36, fontSize: 20, color: "#aab5c9" }}>
            <span>patelsons.in</span><span>+91 98765 43210</span><span>Row houses · Buildings · Private contracts</span>
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
