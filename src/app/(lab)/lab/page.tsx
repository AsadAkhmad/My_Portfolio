import { AmbientQueryStream } from "@/components/lab/AmbientQueryStream";
import { TerminalShell } from "@/components/lab/TerminalShell";
import { getProfile } from "@/lib/db/queries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const fullName = profile?.fullName ?? "Portfolio";
  const title = `Data Science Lab — ${fullName}`;
  const description = "Query my real portfolio data through a constrained SQL-subset terminal.";
  const ogImage = `/api/og?${new URLSearchParams({
    eyebrow: "Data Science Lab",
    title: fullName,
    subtitle: description,
  }).toString()}`;

  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
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
