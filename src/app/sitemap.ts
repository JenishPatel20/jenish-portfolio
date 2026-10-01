import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const baseUrl = "https://jenishpatel.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.8 : 0.65,
  }));

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/projects`, changeFrequency: "monthly", priority: 0.85 },
    ...projectRoutes,
  ];
}
