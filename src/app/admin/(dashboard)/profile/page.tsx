import { getProfile, getSocialLinks } from "@/lib/db/queries";
import { ProfileForm } from "./ProfileForm";
import { SocialLinksAdmin } from "./SocialLinksAdmin";

export const metadata = { title: "Admin — Profile" };

export default async function AdminProfilePage() {
  const [profile, socialLinks] = await Promise.all([getProfile(), getSocialLinks()]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="mb-1 text-xl font-semibold">Profile</h1>
        <p className="mb-6 text-sm text-muted-foreground">Shown on the landing page and the About section.</p>
        <ProfileForm profile={profile} />
      </div>

      <div>
        <h2 className="mb-1 text-lg font-semibold">Social links</h2>
        <p className="mb-4 text-sm text-muted-foreground">Shown on the landing page and Contact section.</p>
        <SocialLinksAdmin links={socialLinks} />
      </div>
    </div>
  );
}
