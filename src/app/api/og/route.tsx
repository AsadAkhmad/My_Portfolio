import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Portfolio";
  const subtitle = searchParams.get("subtitle") ?? "";
  const eyebrow = searchParams.get("eyebrow") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#08080d",
          backgroundImage: "radial-gradient(circle at 25% 15%, rgba(139,124,246,0.35), transparent 55%)",
          fontFamily: "sans-serif",
        }}
      >
        {eyebrow && (
          <div style={{ display: "flex", fontSize: 28, color: "#8b7cf6", fontWeight: 600, marginBottom: 24 }}>
            {eyebrow}
          </div>
        )}
        <div style={{ display: "flex", fontSize: 72, color: "#f4f4f6", fontWeight: 700, lineHeight: 1.1 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ display: "flex", fontSize: 34, color: "#a1a1ae", marginTop: 28, maxWidth: 900 }}>
            {subtitle}
          </div>
        )}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
