import Link from "next/link";
import { getSkillsByCategory } from "@/lib/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkill } from "./actions";

export const metadata = { title: "Admin — Skills" };

const categoryLabels: Record<string, string> = {
  programming: "Programming",
  data_science: "Data Science",
  tools: "Tools & Platforms",
};

export default async function AdminSkillsListPage() {
  const grouped = await getSkillsByCategory();

  return (
    <div>
      <AdminPageHeader title="Skills" newHref="/admin/skills/new" />
      <div className="space-y-8">
        {(Object.keys(categoryLabels) as (keyof typeof categoryLabels)[]).map((category) => (
          <div key={category}>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {categoryLabels[category]}
            </h2>
            <div className="space-y-2">
              {grouped[category as "programming" | "data_science" | "tools"].map((skill) => (
                <div key={skill.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-medium">
                    {skill.name} <span className="font-normal text-muted-foreground">· {skill.proficiency}/5</span>
                  </p>
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/skills/${skill.id}`} className="text-sm font-medium text-accent hover:underline">
                      Edit
                    </Link>
                    <DeleteButton action={deleteSkill} id={skill.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
