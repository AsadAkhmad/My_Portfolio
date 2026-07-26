import Image from "next/image";
import Link from "next/link";
import { Download, Mail } from "lucide-react";
import { getProfile, getSocialLinks, getProjects } from "@/lib/db/queries";
import { Button } from "@/components/shared/Button";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { ThemeSwitchCTA } from "@/components/shared/ThemeSwitchCTA";

export default async function LandingPage() {
  const [profile, socialLinks, featuredProjects] = await Promise.all([
    getProfile(),
    getSocialLinks(),
    getProjects({ featured: true }),
  ]);

  if (!profile) return null;

  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,124,246,0.16),transparent)]"
      />

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center sm:pt-32">
        <div className="relative mb-8 h-32 w-32 overflow-hidden rounded-full border border-border sm:h-40 sm:w-40">
          <Image
            src={profile.avatarUrl ?? "/placeholders/avatar.svg"}
            alt={profile.fullName}
            fill
            className="object-cover"
            priority
          />
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{profile.fullName}</h1>
        <p className="mt-3 max-w-xl text-lg font-medium text-accent">{profile.headline}</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">{profile.shortBio}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/resume.pdf" size="lg">
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
          <Button href="/portfolio#contact" variant="secondary" size="lg">
            <Mail className="h-4 w-4" />
            Contact Me
          </Button>
        </div>

        <SocialLinks links={socialLinks} className="mt-7" />
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <ThemeSwitchCTA />
      </section>

      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <h2 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Featured Projects
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/projects/${project.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
              >
                <h3 className="mb-1.5 font-semibold group-hover:text-accent">{project.name}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{project.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
