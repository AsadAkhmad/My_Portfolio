import { CertificationForm } from "../CertificationForm";
import { createCertification } from "../actions";

export const metadata = { title: "Admin — New Certification" };

export default async function NewCertificationPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold">Add certification</h1>
      <CertificationForm action={createCertification} error={error} />
    </div>
  );
}
