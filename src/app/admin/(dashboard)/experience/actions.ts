"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { parseLines, readOptionalDate, readOptionalString, readString } from "@/lib/utils";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

function readExperienceData(formData: FormData) {
  return {
    company: readString(formData, "company"),
    role: readString(formData, "role"),
    location: readOptionalString(formData, "location"),
    employmentType: readOptionalString(formData, "employmentType"),
    startDate: readOptionalDate(formData, "startDate"),
    endDate: readOptionalDate(formData, "endDate"),
    description: readString(formData, "description"),
    responsibilities: parseLines(formData.get("responsibilities")),
    achievements: parseLines(formData.get("achievements")),
    technologies: parseLines(formData.get("technologies")),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  };
}

export async function createExperience(formData: FormData) {
  const data = readExperienceData(formData);
  if (!data.company || !data.role || !data.startDate) {
    redirect("/admin/experience/new?error=" + encodeURIComponent("Company, role, and start date are required."));
  }
  await prisma.experience.create({ data: { ...data, startDate: data.startDate! } });
  revalidatePublicPages();
  redirect("/admin/experience");
}

export async function updateExperience(id: string, formData: FormData) {
  const data = readExperienceData(formData);
  if (!data.company || !data.role || !data.startDate) {
    redirect(`/admin/experience/${id}?error=` + encodeURIComponent("Company, role, and start date are required."));
  }
  await prisma.experience.update({ where: { id }, data: { ...data, startDate: data.startDate! } });
  revalidatePublicPages();
  redirect("/admin/experience");
}

export async function deleteExperience(formData: FormData) {
  const id = readString(formData, "id");
  if (id) {
    await prisma.experience.delete({ where: { id } });
    revalidatePublicPages();
  }
  redirect("/admin/experience");
}
