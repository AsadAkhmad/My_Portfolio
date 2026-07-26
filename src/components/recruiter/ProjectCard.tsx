import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { ProjectWithImages } from "@/types/domain";
import { Badge } from "@/components/shared/Badge";
import { GithubIcon } from "@/components/shared/BrandIcons";

export function ProjectCard({ project }: { project: ProjectWithImages }) {
  const cover = project.images[0];
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent">
      {cover && (
        <div className="relative h-44 w-full border-b border-border">
          <Image src={cover.url} alt={cover.altText ?? project.name} fill className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-semibold">{project.name}</h3>
        <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{project.summary}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <Link href={`/portfolio/projects/${project.slug}`} className="text-sm font-medium text-accent hover:underline">
            View details
          </Link>
          <div className="flex items-center gap-3 text-muted-foreground">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub repository" className="hover:text-accent">
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label="Live demo" className="hover:text-accent">
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
