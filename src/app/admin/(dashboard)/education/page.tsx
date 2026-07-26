import Link from "next/link";
import { getEducation } from "@/lib/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { formatDateRange } from "@/lib/utils";
import { deleteEducation } from "./actions";

export const metadata = { title: "Admin — Education" };

export default async function AdminEducationListPage() {
  const items = await getEducation();

  return (
    <div>
      <AdminPageHeader title="Education" newHref="/admin/education/new" />
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No education entries yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <p className="font-medium">{item.institution}</p>
              <p className="text-sm text-muted-foreground">
                {item.degree} · {formatDateRange(item.startDate, item.endDate)}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/education/${item.id}`} className="text-sm font-medium text-accent hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteEducation} id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
