import { EducationForm } from "../EducationForm";
import { createEducation } from "../actions";

export const metadata = { title: "Admin — New Education" };

export default async function NewEducationPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Add education</h1>
      <EducationForm action={createEducation} error={error} />
    </div>
  );
}
