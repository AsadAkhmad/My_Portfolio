import Link from "next/link";
import { Briefcase, ArrowLeft } from "lucide-react";

export function LabNav() {
  return (
    <header className="relative z-10 border-b border-border">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4 font-mono text-sm">
        <Link href="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          ~/home
        </Link>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Briefcase className="h-3.5 w-3.5" />
          Professional Portfolio
        </Link>
      </nav>
    </header>
  );
}
