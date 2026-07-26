import { ProjectForm } from "../ProjectForm";
import { createProject } from "../actions";

export const metadata = { title: "Admin — New Project" };

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Add project</h1>
      <ProjectForm action={createProject} error={error} />
    </div>
  );
}
