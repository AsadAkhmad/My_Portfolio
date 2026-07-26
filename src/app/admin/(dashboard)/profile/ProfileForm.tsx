"use client";

import { useActionState } from "react";
import { updateProfile } from "./actions";
import { FormField, TextAreaField } from "@/components/admin/FormField";
import { SubmitButton } from "@/components/admin/SubmitButton";
import type { Profile } from "@/types/domain";
import { joinLines } from "@/lib/utils";

const initialState = { error: "", success: false };

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [state, formAction] = useActionState(updateProfile, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" name="fullName" defaultValue={profile?.fullName} required />
        <FormField label="Email" name="email" type="email" defaultValue={profile?.email} required />
      </div>

      <FormField label="Headline" name="headline" defaultValue={profile?.headline} required />
      <TextAreaField label="Short bio (landing page)" name="shortBio" defaultValue={profile?.shortBio} rows={2} />
      <TextAreaField label="Long bio (About Me section)" name="longBio" defaultValue={profile?.longBio} rows={5} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Degree" name="degree" defaultValue={profile?.degree} />
        <FormField label="University" name="university" defaultValue={profile?.university} />
      </div>

      <TextAreaField label="Career goals" name="careerGoals" defaultValue={profile?.careerGoals} rows={2} />
      <TextAreaField
        label="Interests"
        name="interests"
        defaultValue={joinLines(profile?.interests ?? [])}
        hint="One interest per line."
        rows={4}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Avatar URL" name="avatarUrl" defaultValue={profile?.avatarUrl ?? ""} hint="e.g. /placeholders/avatar.svg" />
        <FormField label="Resume URL" name="resumeUrl" defaultValue={profile?.resumeUrl ?? ""} hint="e.g. /resume.pdf" />
      </div>

      <FormField label="Location" name="location" defaultValue={profile?.location ?? ""} />

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}
      {state?.success && <p className="text-sm text-emerald-500">Saved. The live site is updated.</p>}

      <SubmitButton>Save profile</SubmitButton>
    </form>
  );
}
