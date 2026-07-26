import type { Experience } from "@/types/domain";
import { FormField, TextAreaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ErrorBanner } from "@/components/admin/AdminPageHeader";
import { joinLines, toDateInputValue } from "@/lib/utils";

export function ExperienceForm({
  action,
  experience,
  error,
}: {
  action: (formData: FormData) => void;
  experience?: Experience | null;
  error?: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <ErrorBanner message={error} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Company" name="company" defaultValue={experience?.company} required />
        <FormField label="Role" name="role" defaultValue={experience?.role} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Location" name="location" defaultValue={experience?.location ?? ""} />
        <FormField
          label="Employment type"
          name="employmentType"
          defaultValue={experience?.employmentType ?? ""}
          hint="e.g. Internship, Full-time, Research"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Start date" name="startDate" type="date" defaultValue={toDateInputValue(experience?.startDate)} required />
        <FormField label="End date" name="endDate" type="date" defaultValue={toDateInputValue(experience?.endDate)} hint="Leave blank if current." />
      </div>

      <TextAreaField label="Description" name="description" defaultValue={experience?.description} rows={3} />
      <TextAreaField
        label="Responsibilities"
        name="responsibilities"
        defaultValue={joinLines(experience?.responsibilities ?? [])}
        hint="One per line."
        rows={4}
      />
      <TextAreaField
        label="Achievements"
        name="achievements"
        defaultValue={joinLines(experience?.achievements ?? [])}
        hint="One per line."
        rows={3}
      />
      <TextAreaField
        label="Technologies"
        name="technologies"
        defaultValue={joinLines(experience?.technologies ?? [])}
        hint="One per line."
        rows={3}
      />

      <FormField label="Display order" name="displayOrder" type="number" defaultValue={String(experience?.displayOrder ?? 0)} />

      <SubmitButton>{experience ? "Save changes" : "Add experience"}</SubmitButton>
    </form>
  );
}
