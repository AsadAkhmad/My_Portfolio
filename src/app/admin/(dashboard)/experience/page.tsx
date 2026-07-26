import Link from "next/link";
import { getExperience } from "@/lib/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDateRange } from "@/lib/utils";
import { deleteExperience } from "./actions";

export const metadata = { title: "Admin — Experience" };

export default async function AdminExperienceListPage() {
  const items = await getExperience();

  return (
    <div>
      <AdminPageHeader title="Experience" newHref="/admin/experience/new" />
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No experience entries yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <p className="font-medium">
                {item.role} <span className="font-normal text-muted-foreground">· {item.company}</span>
              </p>
              <p className="text-sm text-muted-foreground">{formatDateRange(item.startDate, item.endDate)}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/experience/${item.id}`} className="text-sm font-medium text-accent hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteExperience} id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
