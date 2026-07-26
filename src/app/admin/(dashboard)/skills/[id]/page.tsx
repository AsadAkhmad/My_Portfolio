import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { SkillForm } from "../SkillForm";
import { updateSkill } from "../actions";

export const metadata = { title: "Admin — Edit Skill" };

export default async function EditSkillPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const skill = await prisma.skill.findUnique({ where: { id } });
  if (!skill) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Edit skill</h1>
      <SkillForm action={updateSkill.bind(null, id)} skill={skill} error={error} />
    </div>
  );
}
