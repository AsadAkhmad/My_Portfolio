import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { ProjectForm } from "../ProjectForm";
import { updateProject } from "../actions";

export const metadata = { title: "Admin — Edit Project" };

export default async function EditProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { displayOrder: "asc" } } },
  });
  if (!project) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Edit project</h1>
      <ProjectForm action={updateProject.bind(null, id, project.slug)} project={project} error={error} />
    </div>
  );
}
