import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runQuery } from "@/lib/sql-lab/engine";

const bodySchema = z.object({
  query: z.string().min(1).max(500),
});

export async function POST(request: NextRequest) {
  const json = await request.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ kind: "error", message: "Send a non-empty query string (max 500 chars)." }, { status: 400 });
  }

  const result = await runQuery(parsed.data.query);
  return NextResponse.json(result);
}
