import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://cvpro.lbframe.com", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://cvpro.lbframe.com/succes", lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: "https://cvpro.lbframe.com/cgv", lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
    { url: "https://cvpro.lbframe.com/mentions-legales", lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
  ];
}
