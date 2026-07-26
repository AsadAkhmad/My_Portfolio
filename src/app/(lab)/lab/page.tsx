import { AmbientQueryStream } from "@/components/lab/AmbientQueryStream";
import { TerminalShell } from "@/components/lab/TerminalShell";
import { getProfile } from "@/lib/db/queries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  return { title: `Data Science Lab — ${profile?.fullName ?? "Portfolio"}` };
}

export default function LabPage() {
  return (
    <main className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col px-6 py-10">
      <AmbientQueryStream />
      <div className="mb-6">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">Data Science Lab</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Query my real portfolio data
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This terminal runs a hand-built SQL-subset interpreter against my actual projects, skills, and
          experience data — not a script. Only a whitelisted grammar and set of tables are reachable, so
          feel free to try to break it.
        </p>
      </div>
      <TerminalShell />
    </main>
  );
}
