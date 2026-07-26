import type { Certification } from "@/types/domain";
import { FormField, TextAreaField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ErrorBanner } from "@/components/admin/AdminPageHeader";
import { toDateInputValue } from "@/lib/utils";

const CATEGORY_OPTIONS = [
  { value: "certification", label: "Certification" },
  { value: "hackathon", label: "Hackathon" },
  { value: "competition", label: "Competition" },
  { value: "leadership", label: "Leadership" },
  { value: "course", label: "Course" },
];

export function CertificationForm({
  action,
  certification,
  error,
}: {
  action: (formData: FormData) => void;
  certification?: Certification | null;
  error?: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <ErrorBanner message={error} />

      <FormField label="Title" name="title" defaultValue={certification?.title} required />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Issuer" name="issuer" defaultValue={certification?.issuer} required />
        <SelectField label="Category" name="category" defaultValue={certification?.category ?? "certification"} options={CATEGORY_OPTIONS} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Date earned" name="dateEarned" type="date" defaultValue={toDateInputValue(certification?.dateEarned)} />
        <FormField label="Credential URL" name="credentialUrl" defaultValue={certification?.credentialUrl ?? ""} />
      </div>

      <TextAreaField label="Description" name="description" defaultValue={certification?.description ?? ""} rows={2} />

      <FormField label="Display order" name="displayOrder" type="number" defaultValue={String(certification?.displayOrder ?? 0)} />

      <SubmitButton>{certification ? "Save changes" : "Add certification"}</SubmitButton>
    </form>
  );
}
