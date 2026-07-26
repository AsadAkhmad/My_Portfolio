import { prisma } from "./prisma";

export function getProfile() {
  return prisma.profile.findFirst();
}

export function getSocialLinks() {
  return prisma.socialLink.findMany({ orderBy: { displayOrder: "asc" } });
}

export function getExperience() {
  return prisma.experience.findMany({ orderBy: { displayOrder: "asc" } });
}

export function getEducation() {
  return prisma.education.findMany({ orderBy: { displayOrder: "asc" } });
}

export function getProjects(options?: { featured?: boolean }) {
  return prisma.project.findMany({
    where: options?.featured ? { featured: true } : undefined,
    orderBy: { displayOrder: "asc" },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });
}

export async function getSkillsByCategory() {
  const skills = await prisma.skill.findMany({ orderBy: { displayOrder: "asc" } });
  return {
    programming: skills.filter((s) => s.category === "programming"),
    data_science: skills.filter((s) => s.category === "data_science"),
    tools: skills.filter((s) => s.category === "tools"),
  };
}

export function getCertifications() {
  return prisma.certification.findMany({ orderBy: { displayOrder: "asc" } });
}
