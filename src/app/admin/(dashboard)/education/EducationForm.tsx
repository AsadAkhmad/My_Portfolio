import type { Education } from "@/types/domain";
import { FormField, TextAreaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ErrorBanner } from "@/components/admin/AdminPageHeader";
import { joinLines, toDateInputValue } from "@/lib/utils";

export function EducationForm({
  action,
  education,
  error,
}: {
  action: (formData: FormData) => void;
  education?: Education | null;
  error?: string;
}) {
  return (
    <form action={action} className="space-y-4">
      <ErrorBanner message={error} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Institution" name="institution" defaultValue={education?.institution} required />
        <FormField label="Degree" name="degree" defaultValue={education?.degree} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Field of study" name="fieldOfStudy" defaultValue={education?.fieldOfStudy} required />
        <FormField label="Location" name="location" defaultValue={education?.location ?? ""} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Start date" name="startDate" type="date" defaultValue={toDateInputValue(education?.startDate)} required />
        <FormField label="End date" name="endDate" type="date" defaultValue={toDateInputValue(education?.endDate)} hint="Leave blank if ongoing." />
        <FormField label="GPA" name="gpa" defaultValue={education?.gpa ?? ""} />
      </div>

      <TextAreaField label="Core modules" name="modules" defaultValue={joinLines(education?.modules ?? [])} hint="One per line." rows={3} />
      <TextAreaField label="Relevant coursework" name="coursework" defaultValue={joinLines(education?.coursework ?? [])} hint="One per line." rows={3} />
      <TextAreaField label="Achievements" name="achievements" defaultValue={joinLines(education?.achievements ?? [])} hint="One per line." rows={3} />

      <FormField label="Display order" name="displayOrder" type="number" defaultValue={String(education?.displayOrder ?? 0)} />

      <SubmitButton>{education ? "Save changes" : "Add education"}</SubmitButton>
    </form>
  );
}
