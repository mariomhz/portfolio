import { projects } from "./data/projects";

const SITE_URL = "https://mariohdez.vercel.app";

export default function sitemap() {
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects
      .filter((project) => project.caseStudy)
      .map((project) => ({
        url: `${SITE_URL}/work/${project.slug}`,
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.8,
      })),
  ];
}
