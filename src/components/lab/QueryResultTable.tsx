function cellClassName(value: string) {
  if (value === "null" || value === "—") return "text-muted-foreground/70";
  if (value === "true" || value === "false") return "text-amber-300";
  if (/^-?\d+(\.\d+)?$/.test(value)) return "text-accent-secondary";
  return "text-foreground";
}

export function QueryResultTable({
  columns,
  rows,
  rowCount,
  elapsedMs,
}: {
  columns: string[];
  rows: Record<string, string>[];
  rowCount: number;
  elapsedMs: number;
}) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">(0 rows)</p>;
  }

  return (
    <div>
      <div className="scrollbar-thin overflow-x-auto rounded-md border border-border">
        <table className="w-full min-w-max border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/60 text-left uppercase tracking-wide text-muted-foreground">
              {columns.map((col) => (
                <th key={col} className="px-3 py-2 font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="animate-rain-fade border-b border-border/60 last:border-0"
                style={{ animationDelay: `${Math.min(i, 20) * 35}ms` }}
              >
                {columns.map((col) => (
                  <td key={col} className={`max-w-xs truncate px-3 py-1.5 ${cellClassName(row[col])}`} title={row[col]}>
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        ({rowCount} row{rowCount === 1 ? "" : "s"} · {elapsedMs}ms)
      </p>
    </div>
  );
}
