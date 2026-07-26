"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { parseLines, readOptionalString, readString } from "@/lib/utils";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

export async function updateProfile(_prevState: unknown, formData: FormData) {
  const fullName = readString(formData, "fullName");
  const headline = readString(formData, "headline");
  const email = readString(formData, "email");

  if (!fullName || !headline || !email) {
    return { error: "Full name, headline, and email are required." };
  }

  const data = {
    fullName,
    headline,
    shortBio: readString(formData, "shortBio"),
    longBio: readString(formData, "longBio"),
    degree: readString(formData, "degree"),
    university: readString(formData, "university"),
    careerGoals: readString(formData, "careerGoals"),
    interests: parseLines(formData.get("interests")),
    avatarUrl: readOptionalString(formData, "avatarUrl"),
    resumeUrl: readOptionalString(formData, "resumeUrl"),
    email,
    location: readOptionalString(formData, "location"),
  };

  const existing = await prisma.profile.findFirst();
  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data });
  } else {
    await prisma.profile.create({ data });
  }

  revalidatePublicPages();
  return { error: "", success: true };
}

export async function upsertSocialLink(formData: FormData) {
  const id = readOptionalString(formData, "id");
  const platform = readString(formData, "platform");
  const label = readString(formData, "label");
  const url = readString(formData, "url");
  const displayOrder = Number(formData.get("displayOrder")) || 0;

  if (!platform || !label || !url) {
    redirect("/admin/profile?error=" + encodeURIComponent("Platform, label, and URL are required for social links."));
  }

  if (id) {
    await prisma.socialLink.update({ where: { id }, data: { platform, label, url, displayOrder } });
  } else {
    await prisma.socialLink.create({ data: { platform, label, url, displayOrder } });
  }

  revalidatePublicPages();
  redirect("/admin/profile");
}

export async function deleteSocialLink(formData: FormData) {
  const id = readString(formData, "id");
  if (id) {
    await prisma.socialLink.delete({ where: { id } });
    revalidatePublicPages();
  }
  redirect("/admin/profile");
}
