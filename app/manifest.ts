import type { MetadataRoute } from "next";
import { company } from "@/content/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} Construction`,
    short_name: company.name,
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#f26a1b",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
