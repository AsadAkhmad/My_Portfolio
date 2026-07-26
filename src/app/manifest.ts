import type { MetadataRoute } from "next";
import { getProfile } from "@/lib/db/queries";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const profile = await getProfile();
  const fullName = profile?.fullName ?? "Portfolio";

  return {
    name: `${fullName} — Portfolio`,
    short_name: fullName.split(" ")[0] ?? fullName,
    description: profile?.shortBio ?? "Personal portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#08080d",
    theme_color: "#08080d",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
