import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { EducationForm } from "../EducationForm";
import { updateEducation } from "../actions";

export const metadata = { title: "Admin — Edit Education" };

export default async function EditEducationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const education = await prisma.education.findUnique({ where: { id } });
  if (!education) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Edit education</h1>
      <EducationForm action={updateEducation.bind(null, id)} education={education} error={error} />
    </div>
  );
}
