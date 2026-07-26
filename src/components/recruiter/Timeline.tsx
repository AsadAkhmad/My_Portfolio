import type { Experience } from "@/types/domain";
import { Badge } from "@/components/shared/Badge";
import { formatDateRange } from "@/lib/utils";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <ol className="relative space-y-10 border-l border-border pl-8">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-background" />
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">
              {item.role} <span className="font-normal text-muted-foreground">· {item.company}</span>
            </h3>
            <span className="text-sm text-muted-foreground">{formatDateRange(item.startDate, item.endDate)}</span>
          </div>
          {(item.employmentType || item.location) && (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {[item.employmentType, item.location].filter(Boolean).join(" · ")}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">{item.description}</p>

          {item.responsibilities.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {item.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}

          {item.achievements.length > 0 && (
            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Key achievements</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-foreground/90">
                {item.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          )}

          {item.technologies.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.technologies.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}
