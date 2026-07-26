import { Trophy, Award, Medal, Users, GraduationCap } from "lucide-react";
import type { Certification } from "@/types/domain";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  hackathon: Trophy,
  certification: Award,
  competition: Medal,
  leadership: Users,
  course: GraduationCap,
};

export function CertificationList({ items }: { items: Certification[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => {
        const Icon = categoryIcons[item.category] ?? Award;
        const content = (
          <div className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.issuer}
                {item.dateEarned ? ` · ${item.dateEarned.toLocaleDateString("en-US", { month: "short", year: "numeric" })}` : ""}
              </p>
              {item.description && <p className="mt-1.5 text-sm text-foreground/90">{item.description}</p>}
            </div>
          </div>
        );
        return item.credentialUrl ? (
          <a key={item.id} href={item.credentialUrl} target="_blank" rel="noreferrer">
            {content}
          </a>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}
    </div>
  );
}
