import type { Skill } from "@/types/domain";
import { FormField, SelectField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ErrorBanner } from "@/components/admin/AdminPageHeader";

const CATEGORY_OPTIONS = [
  { value: "programming", label: "Programming" },
  { value: "data_science", label: "Data Science" },
  { value: "tools", label: "Tools & Platforms" },
];

export function SkillForm({
  action,
  skill,
  error,
}: {
  action: (formData: FormData) => void;
  skill?: Skill | null;
  error?: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <ErrorBanner message={error} />

      <FormField label="Name" name="name" defaultValue={skill?.name} required />
      <SelectField label="Category" name="category" defaultValue={skill?.category ?? "programming"} options={CATEGORY_OPTIONS} required />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Proficiency (1–5)"
          name="proficiency"
          type="number"
          defaultValue={String(skill?.proficiency ?? 3)}
          hint="Shown as a progress bar."
        />
        <FormField label="Display order" name="displayOrder" type="number" defaultValue={String(skill?.displayOrder ?? 0)} />
      </div>

      <SubmitButton>{skill ? "Save changes" : "Add skill"}</SubmitButton>
    </form>
  );
}
