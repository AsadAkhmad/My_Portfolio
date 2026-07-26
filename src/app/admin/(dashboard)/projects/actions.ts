"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/db/prisma";
import { parseLines, readOptionalDate, readOptionalString, readString } from "@/lib/utils";

function revalidatePublicPages(slug?: string, previousSlug?: string) {
  revalidatePath("/");
  revalidatePath("/portfolio");
  if (slug) revalidatePath(`/portfolio/projects/${slug}`);
  if (previousSlug && previousSlug !== slug) revalidatePath(`/portfolio/projects/${previousSlug}`);
}

/** Each line: "image url | alt text (optional)" */
function parseImageLines(value: FormDataEntryValue | null) {
  return parseLines(value).map((line, i) => {
    const [url, altText] = line.split("|").map((s) => s.trim());
    return { url, altText: altText || null, displayOrder: i };
  });
}

function readProjectData(formData: FormData) {
  return {
    slug: readString(formData, "slug"),
    name: readString(formData, "name"),
    summary: readString(formData, "summary"),
    problemStatement: readString(formData, "problemStatement"),
    description: readString(formData, "description"),
    technologies: parseLines(formData.get("technologies")),
    githubUrl: readOptionalString(formData, "githubUrl"),
    liveUrl: readOptionalString(formData, "liveUrl"),
    keyAchievements: parseLines(formData.get("keyAchievements")),
    lessonsLearned: parseLines(formData.get("lessonsLearned")),
    featured: formData.get("featured") === "on",
    status: readString(formData, "status") || "completed",
    startDate: readOptionalDate(formData, "startDate"),
    endDate: readOptionalDate(formData, "endDate"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  };
}

export async function createProject(formData: FormData) {
  const data = readProjectData(formData);
  const images = parseImageLines(formData.get("images"));

  if (!data.slug || !data.name || !data.summary) {
    redirect("/admin/projects/new?error=" + encodeURIComponent("Slug, name, and summary are required."));
  }

  try {
    await prisma.project.create({ data: { ...data, images: { create: images } } });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      redirect("/admin/projects/new?error=" + encodeURIComponent(`Slug "${data.slug}" is already in use.`));
    }
    throw err;
  }

  revalidatePublicPages(data.slug);
  redirect("/admin/projects");
}

export async function updateProject(id: string, previousSlug: string, formData: FormData) {
  const data = readProjectData(formData);
  const images = parseImageLines(formData.get("images"));

  if (!data.slug || !data.name || !data.summary) {
    redirect(`/admin/projects/${id}?error=` + encodeURIComponent("Slug, name, and summary are required."));
  }

  try {
    await prisma.$transaction([
      prisma.projectImage.deleteMany({ where: { projectId: id } }),
      prisma.project.update({
        where: { id },
        data: { ...data, images: { create: images } },
      }),
    ]);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      redirect(`/admin/projects/${id}?error=` + encodeURIComponent(`Slug "${data.slug}" is already in use.`));
    }
    throw err;
  }

  revalidatePublicPages(data.slug, previousSlug);
  redirect("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = readString(formData, "id");
  if (id) {
    const project = await prisma.project.delete({ where: { id } });
    revalidatePublicPages(project.slug);
  }
  redirect("/admin/projects");
}
