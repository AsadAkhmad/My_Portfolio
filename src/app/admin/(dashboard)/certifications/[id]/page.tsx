import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { CertificationForm } from "../CertificationForm";
import { updateCertification } from "../actions";

export const metadata = { title: "Admin — Edit Certification" };

export default async function EditCertificationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const certification = await prisma.certification.findUnique({ where: { id } });
  if (!certification) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Edit certification</h1>
      <CertificationForm action={updateCertification.bind(null, id)} certification={certification} error={error} />
    </div>
  );
}
