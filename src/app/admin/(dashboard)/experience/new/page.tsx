import { ExperienceForm } from "../ExperienceForm";
import { createExperience } from "../actions";

export const metadata = { title: "Admin — New Experience" };

export default async function NewExperiencePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Add experience</h1>
      <ExperienceForm action={createExperience} error={error} />
    </div>
  );
}
