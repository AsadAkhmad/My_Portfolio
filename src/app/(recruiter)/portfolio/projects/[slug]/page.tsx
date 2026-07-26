import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug } from "@/lib/db/queries";
import { Badge } from "@/components/shared/Badge";
import { GithubIcon } from "@/components/shared/BrandIcons";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/portfolio#projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">{project.name}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:border-accent"
          >
            <GithubIcon className="h-4 w-4" /> Source code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm hover:border-accent"
          >
            <ExternalLink className="h-4 w-4" /> Live demo
          </a>
        )}
      </div>

      {project.images[0] && (
        <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl border border-border sm:h-96">
          <Image src={project.images[0].url} alt={project.images[0].altText ?? project.name} fill className="object-cover" />
        </div>
      )}

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">Problem</h2>
          <p className="mt-2 leading-relaxed text-foreground/90">{project.problemStatement}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">Approach</h2>
          <p className="mt-2 leading-relaxed text-foreground/90">{project.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">Technologies</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>

        {project.keyAchievements.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">Key achievements</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/90">
              {project.keyAchievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}

        {project.lessonsLearned.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">Lessons learned</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground/90">
              {project.lessonsLearned.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
