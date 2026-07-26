import Link from "next/link";
import { Terminal } from "lucide-react";

const sections = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function RecruiterNav({ fullName }: { fullName: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {fullName}
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {sections.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="transition-colors hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <Link
          href="/lab"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Terminal className="h-3.5 w-3.5" />
          Data Science Lab
        </Link>
      </nav>
    </header>
  );
}
