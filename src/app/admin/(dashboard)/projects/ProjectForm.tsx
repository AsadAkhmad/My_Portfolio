import type { ProjectWithImages } from "@/types/domain";
import { FormField, TextAreaField, SelectField, CheckboxField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { ErrorBanner } from "@/components/admin/AdminPageHeader";
import { joinLines, toDateInputValue } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "in_progress", label: "In progress" },
  { value: "archived", label: "Archived" },
];

export function ProjectForm({
  action,
  project,
  error,
}: {
  action: (formData: FormData) => void;
  project?: ProjectWithImages | null;
  error?: string;
}) {
  const imagesText = joinLines((project?.images ?? []).map((img) => [img.url, img.altText].filter(Boolean).join(" | ")));

  return (
    <form action={action} className="space-y-4">
      <ErrorBanner message={error} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" name="name" defaultValue={project?.name} required />
        <FormField label="Slug" name="slug" defaultValue={project?.slug} required hint="Used in the URL, e.g. my-project" />
      </div>

      <TextAreaField label="Summary" name="summary" defaultValue={project?.summary} rows={2} required />
      <TextAreaField label="Problem statement" name="problemStatement" defaultValue={project?.problemStatement} rows={2} />
      <TextAreaField label="Description / approach" name="description" defaultValue={project?.description} rows={4} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="GitHub URL" name="githubUrl" defaultValue={project?.githubUrl ?? ""} />
        <FormField label="Live demo URL" name="liveUrl" defaultValue={project?.liveUrl ?? ""} />
      </div>

      <TextAreaField
        label="Technologies"
        name="technologies"
        defaultValue={joinLines(project?.technologies ?? [])}
        hint="One per line."
        rows={3}
      />
      <TextAreaField
        label="Key achievements"
        name="keyAchievements"
        defaultValue={joinLines(project?.keyAchievements ?? [])}
        hint="One per line."
        rows={3}
      />
      <TextAreaField
        label="Lessons learned"
        name="lessonsLearned"
        defaultValue={joinLines(project?.lessonsLearned ?? [])}
        hint="One per line."
        rows={3}
      />
      <TextAreaField
        label="Images"
        name="images"
        defaultValue={imagesText}
        hint="One per line: image URL, optionally followed by | alt text"
        rows={3}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField label="Start date" name="startDate" type="date" defaultValue={toDateInputValue(project?.startDate)} />
        <FormField label="End date" name="endDate" type="date" defaultValue={toDateInputValue(project?.endDate)} hint="Leave blank if ongoing." />
        <FormField label="Display order" name="displayOrder" type="number" defaultValue={String(project?.displayOrder ?? 0)} />
      </div>

      <div className="flex items-center gap-6">
        <SelectField label="Status" name="status" defaultValue={project?.status ?? "completed"} options={STATUS_OPTIONS} />
        <div className="pt-6">
          <CheckboxField label="Featured on landing page" name="featured" defaultChecked={project?.featured} />
        </div>
      </div>

      <SubmitButton>{project ? "Save changes" : "Add project"}</SubmitButton>
    </form>
  );
}
