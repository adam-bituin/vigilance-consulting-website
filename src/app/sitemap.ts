import type { MetadataRoute } from "next";
import { site } from "@/content/site";

const paths = ["", "/services", "/training", "/about", "/insights", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const lastModified = new Date();
  return paths.map((path) => {
    const enUrl = `${base}${path}`;
    const arUrl = `${base}/ar${path}`;
    return {
      url: enUrl,
      lastModified,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: { en: enUrl, ar: arUrl } },
    };
  });
}
