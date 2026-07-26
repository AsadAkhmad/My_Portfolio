import { Download } from "lucide-react";
import type { Profile, SocialLink } from "@/types/domain";
import { Button } from "@/components/shared/Button";
import { SocialLinks } from "@/components/shared/SocialLinks";

export function ContactSection({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
      <h3 className="text-2xl font-bold">Let&apos;s work together</h3>
      <p className="mx-auto mt-2 max-w-md text-muted-foreground">
        Open to Data Science / AI Engineering internships and new-grad roles. Reach out any time.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button href={`mailto:${profile.email}`}>{profile.email}</Button>
        <Button href="/resume.pdf" variant="secondary">
          <Download className="h-4 w-4" />
          Download CV
        </Button>
      </div>
      <SocialLinks links={socialLinks} className="mt-6 justify-center" />
    </div>
  );
}
