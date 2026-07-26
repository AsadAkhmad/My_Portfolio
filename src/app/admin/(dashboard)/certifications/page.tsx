import Link from "next/link";
import { getCertifications } from "@/lib/db/queries";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteCertification } from "./actions";

export const metadata = { title: "Admin — Certifications" };

export default async function AdminCertificationsListPage() {
  const items = await getCertifications();

  return (
    <div>
      <AdminPageHeader title="Certifications & Achievements" newHref="/admin/certifications/new" />
      <div className="space-y-3">
        {items.length === 0 && <p className="text-sm text-muted-foreground">No certifications yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted-foreground">
                {item.issuer} · {item.category}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/certifications/${item.id}`} className="text-sm font-medium text-accent hover:underline">
                Edit
              </Link>
              <DeleteButton action={deleteCertification} id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
