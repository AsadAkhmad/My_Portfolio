import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/db/queries";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const projects = await getProjects();
  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/lab`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((project) => ({
      url: `${baseUrl}/portfolio/projects/${project.slug}`,
      lastModified: project.endDate ?? project.startDate ?? now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
