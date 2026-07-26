import { RecruiterNav } from "@/components/recruiter/RecruiterNav";
import { getProfile } from "@/lib/db/queries";

export default async function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();

  return (
    <div data-theme="recruiter" className="flex min-h-full flex-1 flex-col bg-background text-foreground">
      <RecruiterNav fullName={profile?.fullName ?? "Portfolio"} />
      {children}
    </div>
  );
}
