import { Mail, Link2 } from "lucide-react";
import type { SocialLink } from "@/types/domain";
import { cn } from "@/lib/utils";
import { GithubIcon, LinkedinIcon, KaggleIcon } from "@/components/shared/BrandIcons";

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
  kaggle: KaggleIcon,
};

export function SocialLinks({ links, className }: { links: SocialLink[]; className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {links.map((link) => {
        const Icon = icons[link.platform] ?? Link2;
        return (
          <a
            key={link.id}
            href={link.url}
            target={link.platform === "email" ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}
