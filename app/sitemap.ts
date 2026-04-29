import { MetadataRoute } from "next";
import { articles } from "@/content/blog";

const BASE = "https://cvpro.lbframe.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const static_: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/agent-ia-emploi`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/succes`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/cgv`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${BASE}/mentions-legales`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: `${BASE}/confidentialite`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
  ];

  const blogArticles: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...static_, ...blogArticles];
}
