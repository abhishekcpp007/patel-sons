import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { areas } from "@/content/areas";
import { posts } from "@/content/blog";
import { materialCategories } from "@/content/materials";
import { guides } from "@/content/material-guides";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = "2026-10-11";
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contracts`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/materials`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/areas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/materials/guides`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/support`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    ...guides.map((g) => ({ url: `${SITE_URL}/materials/guides/${g.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.65 })),
    ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    ...areas.map((a) => ({ url: `${SITE_URL}/areas/${a.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...materialCategories.map((c) => ({ url: `${SITE_URL}/materials/${c.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...posts.map((b) => ({ url: `${SITE_URL}/blog/${b.slug}`, lastModified: b.updated ?? b.date, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: p.status === "ongoing" ? "weekly" : "monthly",
    priority: 0.8,
    images: [p.cover],
  }));
  return [...pages, ...projectPages];
}
