import type { Education } from "@/types/domain";
import { Badge } from "@/components/shared/Badge";
import { formatDateRange } from "@/lib/utils";

export function EducationList({ items }: { items: Education[] }) {
  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold">{item.institution}</h3>
            <span className="text-sm text-muted-foreground">{formatDateRange(item.startDate, item.endDate)}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {item.degree} · {item.fieldOfStudy}
            {item.gpa ? ` · GPA ${item.gpa}` : ""}
          </p>

          {item.modules.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Core modules</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {item.modules.map((m) => (
                  <Badge key={m}>{m}</Badge>
                ))}
              </div>
            </div>
          )}

          {item.coursework.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Relevant coursework</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {item.coursework.map((c) => (
                  <Badge key={c}>{c}</Badge>
                ))}
              </div>
            </div>
          )}

          {item.achievements.length > 0 && (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-foreground/90">
              {item.achievements.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
