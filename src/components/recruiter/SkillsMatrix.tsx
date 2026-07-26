import type { Skill } from "@/types/domain";

const categoryLabels: Record<string, string> = {
  programming: "Programming",
  data_science: "Data Science",
  tools: "Tools & Platforms",
};

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium">{skill.name}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${(skill.proficiency / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function SkillsMatrix({
  skills,
}: {
  skills: { programming: Skill[]; data_science: Skill[]; tools: Skill[] };
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-3">
      {(Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map((category) => (
        <div key={category} className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-wide text-accent">
            {categoryLabels[category]}
          </h3>
          <div className="space-y-4">
            {skills[category as "programming" | "data_science" | "tools"].map((skill) => (
              <SkillBar key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
