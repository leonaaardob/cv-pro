import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/succes" },
    sitemap: "https://cvpro.lbframe.com/sitemap.xml",
  };
}
