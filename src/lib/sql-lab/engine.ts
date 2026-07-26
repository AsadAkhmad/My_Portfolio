import { prisma } from "@/lib/db/prisma";
import { parse, SqlLabSyntaxError } from "./parser";
import { compile, SqlLabValidationError } from "./compiler";
import { TABLES, MAX_LIMIT } from "./allowlist";

export type QueryResult =
  | { kind: "rows"; columns: string[]; rows: Record<string, string>[]; rowCount: number; elapsedMs: number }
  | { kind: "help"; text: string }
  | { kind: "error"; message: string };

const QUERY_TIMEOUT_MS = 5000;

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—";
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

function helpText(): string {
  const lines = ["Available virtual tables (real portfolio data, read-only, capped at " + MAX_LIMIT + " rows):", ""];
  for (const [tableName, spec] of Object.entries(TABLES)) {
    const cols = Object.entries(spec.columns)
      .map(([name, col]) => `${name}${col.filterable ? "" : " (display-only)"}`)
      .join(", ");
    lines.push(`  ${tableName}(${cols})`);
  }
  lines.push("");
  lines.push("Try: SELECT name, tech FROM projects WHERE featured = TRUE ORDER BY start_date DESC LIMIT 5");
  return lines.join("\n");
}

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Query timed out.")), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer!);
  }
}

export async function runQuery(raw: string): Promise<QueryResult> {
  const start = Date.now();

  let node;
  try {
    node = parse(raw);
  } catch (err) {
    if (err instanceof SqlLabSyntaxError) return { kind: "error", message: err.message };
    return { kind: "error", message: "Could not parse that query." };
  }

  if (node.kind === "help") {
    return { kind: "help", text: helpText() };
  }

  let compiled;
  try {
    compiled = compile(node);
  } catch (err) {
    if (err instanceof SqlLabValidationError) return { kind: "error", message: err.message };
    return { kind: "error", message: "Could not validate that query." };
  }

  try {
    // Every field name below comes from the static allowlist resolved in compile(),
    // never from an unchecked user string — this is what makes it injection-safe.
    const rows = await withTimeout(
      (() => {
        switch (compiled.model) {
          case "project":
            return prisma.project.findMany(compiled.args);
          case "skill":
            return prisma.skill.findMany(compiled.args);
          case "experience":
            return prisma.experience.findMany(compiled.args);
          case "education":
            return prisma.education.findMany(compiled.args);
          case "certification":
            return prisma.certification.findMany(compiled.args);
        }
      })(),
      QUERY_TIMEOUT_MS
    );

    const displayRows = (rows as Record<string, unknown>[]).map((row) => {
      const out: Record<string, string> = {};
      for (const dc of compiled.displayColumns) {
        out[dc.virtual] = formatValue(row[dc.field]);
      }
      return out;
    });

    return {
      kind: "rows",
      columns: compiled.displayColumns.map((c) => c.virtual),
      rows: displayRows,
      rowCount: displayRows.length,
      elapsedMs: Date.now() - start,
    };
  } catch (err) {
    return { kind: "error", message: err instanceof Error && err.message === "Query timed out." ? err.message : "Query failed to execute." };
  }
}
