import { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.seo.siteUrl;

  const staticPages = [
    "",
    "/work",
    "/about",
    "/services",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectPages = projectsData.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages];
}
