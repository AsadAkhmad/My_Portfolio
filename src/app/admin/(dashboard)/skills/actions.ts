"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { readOptionalString, readString } from "@/lib/utils";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

function readSkillData(formData: FormData) {
  return {
    name: readString(formData, "name"),
    category: readString(formData, "category"),
    proficiency: Math.min(5, Math.max(1, Number(formData.get("proficiency")) || 3)),
    iconSlug: readOptionalString(formData, "iconSlug"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  };
}

export async function createSkill(formData: FormData) {
  const data = readSkillData(formData);
  if (!data.name || !data.category) {
    redirect("/admin/skills/new?error=" + encodeURIComponent("Name and category are required."));
  }
  await prisma.skill.create({ data });
  revalidatePublicPages();
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  const data = readSkillData(formData);
  if (!data.name || !data.category) {
    redirect(`/admin/skills/${id}?error=` + encodeURIComponent("Name and category are required."));
  }
  await prisma.skill.update({ where: { id }, data });
  revalidatePublicPages();
  redirect("/admin/skills");
}

export async function deleteSkill(formData: FormData) {
  const id = readString(formData, "id");
  if (id) {
    await prisma.skill.delete({ where: { id } });
    revalidatePublicPages();
  }
  redirect("/admin/skills");
}
