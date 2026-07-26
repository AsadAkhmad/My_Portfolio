"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { readOptionalDate, readOptionalString, readString } from "@/lib/utils";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/portfolio");
}

function readCertificationData(formData: FormData) {
  return {
    title: readString(formData, "title"),
    issuer: readString(formData, "issuer"),
    category: readString(formData, "category"),
    dateEarned: readOptionalDate(formData, "dateEarned"),
    credentialUrl: readOptionalString(formData, "credentialUrl"),
    description: readOptionalString(formData, "description"),
    displayOrder: Number(formData.get("displayOrder")) || 0,
  };
}

export async function createCertification(formData: FormData) {
  const data = readCertificationData(formData);
  if (!data.title || !data.issuer || !data.category) {
    redirect("/admin/certifications/new?error=" + encodeURIComponent("Title, issuer, and category are required."));
  }
  await prisma.certification.create({ data });
  revalidatePublicPages();
  redirect("/admin/certifications");
}

export async function updateCertification(id: string, formData: FormData) {
  const data = readCertificationData(formData);
  if (!data.title || !data.issuer || !data.category) {
    redirect(`/admin/certifications/${id}?error=` + encodeURIComponent("Title, issuer, and category are required."));
  }
  await prisma.certification.update({ where: { id }, data });
  revalidatePublicPages();
  redirect("/admin/certifications");
}

export async function deleteCertification(formData: FormData) {
  const id = readString(formData, "id");
  if (id) {
    await prisma.certification.delete({ where: { id } });
    revalidatePublicPages();
  }
  redirect("/admin/certifications");
}
