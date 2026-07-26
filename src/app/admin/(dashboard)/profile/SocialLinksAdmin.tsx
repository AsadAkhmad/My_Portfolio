import type { SocialLink } from "@/types/domain";
import { upsertSocialLink, deleteSocialLink } from "./actions";
import { DeleteButton } from "@/components/admin/DeleteButton";

function LinkRow({ link }: { link: SocialLink }) {
  return (
    <div className="grid grid-cols-12 items-center gap-2 rounded-lg border border-border p-3">
      <form action={upsertSocialLink} className="col-span-11 grid grid-cols-11 items-center gap-2">
        <input type="hidden" name="id" value={link.id} />
        <input
          name="platform"
          defaultValue={link.platform}
          placeholder="platform"
          className="col-span-2 rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        />
        <input
          name="label"
          defaultValue={link.label}
          placeholder="label"
          className="col-span-2 rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        />
        <input
          name="url"
          defaultValue={link.url}
          placeholder="url"
          className="col-span-5 rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        />
        <input
          name="displayOrder"
          type="number"
          defaultValue={link.displayOrder}
          className="col-span-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm"
        />
        <button type="submit" className="col-span-1 text-sm font-medium text-accent hover:underline">
          Save
        </button>
      </form>
      <div className="col-span-1">
        <DeleteButton action={deleteSocialLink} id={link.id} />
      </div>
    </div>
  );
}

export function SocialLinksAdmin({ links }: { links: SocialLink[] }) {
  return (
    <div className="space-y-3">
      {links.map((link) => (
        <LinkRow key={link.id} link={link} />
      ))}

      <form action={upsertSocialLink} className="grid grid-cols-12 items-center gap-2 rounded-lg border border-dashed border-border p-3">
        <input name="platform" placeholder="platform (e.g. github)" className="col-span-2 rounded-md border border-border bg-background px-2 py-1.5 text-sm" />
        <input name="label" placeholder="label" className="col-span-2 rounded-md border border-border bg-background px-2 py-1.5 text-sm" />
        <input name="url" placeholder="https://…" className="col-span-5 rounded-md border border-border bg-background px-2 py-1.5 text-sm" />
        <input name="displayOrder" type="number" defaultValue={links.length + 1} className="col-span-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm" />
        <button type="submit" className="col-span-2 text-sm font-medium text-accent hover:underline">
          + Add link
        </button>
      </form>
    </div>
  );
}
