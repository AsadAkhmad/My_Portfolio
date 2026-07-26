import { LabNav } from "@/components/lab/LabNav";
import { CodeRainBackground } from "@/components/lab/CodeRainBackground";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="lab" className="relative flex min-h-full flex-1 flex-col bg-background font-terminal text-foreground">
      <CodeRainBackground />
      <LabNav />
      {children}
    </div>
  );
}
