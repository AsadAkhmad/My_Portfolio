import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { ExperienceForm } from "../ExperienceForm";
import { updateExperience } from "../actions";

export const metadata = { title: "Admin — Edit Experience" };

export default async function EditExperiencePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const experience = await prisma.experience.findUnique({ where: { id } });
  if (!experience) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Edit experience</h1>
      <ExperienceForm action={updateExperience.bind(null, id)} experience={experience} error={error} />
    </div>
  );
}
