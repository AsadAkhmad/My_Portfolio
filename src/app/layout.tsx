import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import { getProfile } from "@/lib/db/queries";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const fullName = profile?.fullName ?? "Portfolio";
  const title = profile ? `${fullName} — ${profile.headline}` : fullName;
  const description = profile?.shortBio ?? "Personal portfolio.";
  const siteUrl = getSiteUrl();
  const ogImage = `/api/og?${new URLSearchParams({
    title: fullName,
    subtitle: profile?.headline ?? "",
  }).toString()}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    verification: {
      google: "vx2Z0D3kBhSJCIn09nP8ktWlDJ3oAfc4IfauC_6kD2I",
    },
    openGraph: {
      type: "website",
      url: siteUrl,
      siteName: `${fullName} — Portfolio`,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
