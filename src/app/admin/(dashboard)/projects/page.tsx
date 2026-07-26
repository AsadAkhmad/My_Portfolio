import Link from "next/link";
import { getProjects } from "@/lib/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Badge } from "@/components/shared/Badge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteProject } from "./actions";

export const metadata = { title: "Admin — Projects" };

export default async function AdminProjectsListPage() {
  const items = await getProjects();

  return (
    <div>
      <AdminPageHeader title="Projects" newHref="/admin/projects/new" />
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No projects yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <p className="font-medium">
                {item.name} {item.featured && <Badge className="ml-2">Featured</Badge>}
              </p>
              <p className="text-sm text-muted-foreground">/{item.slug}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/projects/${item.id}`} className="text-sm font-medium text-accent hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteProject} id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
