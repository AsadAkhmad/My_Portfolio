import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

export const metadata = { title: "Admin — Overview" };

async function getCounts() {
  const [education, experience, projects, skills, certifications] = await Promise.all([
    prisma.education.count(),
    prisma.experience.count(),
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certification.count(),
  ]);
  return { education, experience, projects, skills, certifications };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts();

  const cards = [
    { href: "/admin/profile", label: "Profile", value: null },
    { href: "/admin/education", label: "Education", value: counts.education },
    { href: "/admin/experience", label: "Experience", value: counts.experience },
    { href: "/admin/projects", label: "Projects", value: counts.projects },
    { href: "/admin/skills", label: "Skills", value: counts.skills },
    { href: "/admin/certifications", label: "Certifications", value: counts.certifications },
  ];

  return (
    <div>
      <h1 className="mb-1 text-xl font-semibold">Overview</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Changes you save here appear on the live site and the SQL Lab immediately.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent"
          >
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-2xl font-semibold">{card.value ?? "Edit"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
