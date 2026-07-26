"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout } from "@/app/admin/login/actions";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/certifications", label: "Certifications" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 flex-shrink-0 flex-col border-r border-border bg-card px-4 py-6">
      <p className="mb-6 px-2 text-sm font-semibold">Portfolio Admin</p>
      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block rounded-md px-2.5 py-2 text-sm transition-colors",
                active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link href="/" target="_blank" className="mb-2 px-2 text-xs text-muted-foreground hover:text-foreground">
        View site ↗
      </Link>
      <form action={logout}>
        <button type="submit" className="w-full rounded-md px-2.5 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
          Log out
        </button>
      </form>
    </aside>
  );
}
