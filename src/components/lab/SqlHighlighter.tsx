const KEYWORDS = new Set([
  "SELECT",
  "FROM",
  "WHERE",
  "AND",
  "ORDER",
  "BY",
  "ASC",
  "DESC",
  "LIMIT",
  "IN",
  "LIKE",
  "HELP",
  "TRUE",
  "FALSE",
]);

const TOKEN_RE = /('[^']*'|"[^"]*"|\d+(?:\.\d+)?|[A-Za-z_][A-Za-z0-9_]*|[^\sA-Za-z0-9_'"]+|\s+)/g;

export function SqlHighlighter({ query }: { query: string }) {
  const tokens = query.match(TOKEN_RE) ?? [];
  return (
    <>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok)) return <span key={i}>{tok}</span>;
        if (tok.startsWith("'") || tok.startsWith('"')) {
          return (
            <span key={i} className="text-accent-secondary">
              {tok}
            </span>
          );
        }
        if (/^\d+(\.\d+)?$/.test(tok)) {
          return (
            <span key={i} className="text-amber-300">
              {tok}
            </span>
          );
        }
        if (KEYWORDS.has(tok.toUpperCase())) {
          return (
            <span key={i} className="font-semibold text-accent">
              {tok}
            </span>
          );
        }
        return <span key={i}>{tok}</span>;
      })}
    </>
  );
}
