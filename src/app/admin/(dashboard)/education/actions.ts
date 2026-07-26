"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { parseLines, readOptionalDate, readOptionalString, readString } from "@/lib/utils";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

function readEducationData(formData: FormData) {
  return {
    institution: readString(formData, "institution"),
    degree: readString(formData, "degree"),
    fieldOfStudy: readString(formData, "fieldOfStudy"),
    location: readOptionalString(formData, "location"),
    startDate: readOptionalDate(formData, "startDate"),
    endDate: readOptionalDate(formData, "endDate"),
    gpa: readOptionalString(formData, "gpa"),
    modules: parseLines(formData.get("modules")),
    coursework: parseLines(formData.get("coursework")),
    achievements: parseLines(formData.get("achievements")),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  };
}

export async function createEducation(formData: FormData) {
  const data = readEducationData(formData);
  if (!data.institution || !data.degree || !data.fieldOfStudy || !data.startDate) {
    redirect("/admin/education/new?error=" + encodeURIComponent("Institution, degree, field of study, and start date are required."));
  }
  await prisma.education.create({ data: { ...data, startDate: data.startDate! } });
  revalidatePublicPages();
  redirect("/admin/education");
}

export async function updateEducation(id: string, formData: FormData) {
  const data = readEducationData(formData);
  if (!data.institution || !data.degree || !data.fieldOfStudy || !data.startDate) {
    redirect(`/admin/education/${id}?error=` + encodeURIComponent("Institution, degree, field of study, and start date are required."));
  }
  await prisma.education.update({ where: { id }, data: { ...data, startDate: data.startDate! } });
  revalidatePublicPages();
  redirect("/admin/education");
}

export async function deleteEducation(formData: FormData) {
  const id = readString(formData, "id");
  if (id) {
    await prisma.education.delete({ where: { id } });
    revalidatePublicPages();
  }
  redirect("/admin/education");
}
