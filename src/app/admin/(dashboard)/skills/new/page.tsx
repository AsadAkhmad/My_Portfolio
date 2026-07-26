import { SkillForm } from "../SkillForm";
import { createSkill } from "../actions";

export const metadata = { title: "Admin — New Skill" };

export default async function NewSkillPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Add skill</h1>
      <SkillForm action={createSkill} error={error} />
    </div>
  );
}
