export type TokenType =
  | "KEYWORD"
  | "IDENT"
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "OPERATOR"
  | "COMMA"
  | "LPAREN"
  | "RPAREN"
  | "STAR"
  | "EOF";

export type Token = { type: TokenType; value: string; pos: number };

export class SqlLabSyntaxError extends Error {}

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
]);

const OPERATOR_CHARS = ["!=", "<=", ">=", "=", "<", ">"];

/** Lexes a raw query string. Comments and statement-chaining are rejected here,
 * before any parsing happens, rather than filtered out after the fact. */
export function tokenize(raw: string): Token[] {
  let input = raw.trim();

  if (input.includes("--") || input.includes("/*")) {
    throw new SqlLabSyntaxError("Comments are not supported.");
  }

  // Allow (and strip) a single trailing semicolon, but reject anything after it.
  const semiIndex = input.indexOf(";");
  if (semiIndex !== -1) {
    if (semiIndex !== input.length - 1) {
      throw new SqlLabSyntaxError("Only a single statement is supported (no chaining with ';').");
    }
    input = input.slice(0, semiIndex);
  }

  const tokens: Token[] = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (/\s/.test(ch)) {
      i++;
      continue;
    }

    if (ch === ",") {
      tokens.push({ type: "COMMA", value: ",", pos: i });
      i++;
      continue;
    }
    if (ch === "(") {
      tokens.push({ type: "LPAREN", value: "(", pos: i });
      i++;
      continue;
    }
    if (ch === ")") {
      tokens.push({ type: "RPAREN", value: ")", pos: i });
      i++;
      continue;
    }
    if (ch === "*") {
      tokens.push({ type: "STAR", value: "*", pos: i });
      i++;
      continue;
    }

    const twoChar = input.slice(i, i + 2);
    if (OPERATOR_CHARS.includes(twoChar)) {
      tokens.push({ type: "OPERATOR", value: twoChar, pos: i });
      i += 2;
      continue;
    }
    if (OPERATOR_CHARS.includes(ch)) {
      tokens.push({ type: "OPERATOR", value: ch, pos: i });
      i++;
      continue;
    }

    if (ch === "'" || ch === '"') {
      const quote = ch;
      let j = i + 1;
      let value = "";
      while (j < input.length && input[j] !== quote) {
        value += input[j];
        j++;
      }
      if (j >= input.length) throw new SqlLabSyntaxError("Unterminated string literal.");
      tokens.push({ type: "STRING", value, pos: i });
      i = j + 1;
      continue;
    }

    if (/[0-9]/.test(ch)) {
      let j = i;
      let value = "";
      while (j < input.length && /[0-9.]/.test(input[j])) {
        value += input[j];
        j++;
      }
      tokens.push({ type: "NUMBER", value, pos: i });
      i = j;
      continue;
    }

    if (/[a-zA-Z_]/.test(ch)) {
      let j = i;
      let value = "";
      while (j < input.length && /[a-zA-Z0-9_]/.test(input[j])) {
        value += input[j];
        j++;
      }
      const upper = value.toUpperCase();
      if (KEYWORDS.has(upper)) {
        tokens.push({ type: "KEYWORD", value: upper, pos: i });
      } else if (upper === "TRUE" || upper === "FALSE") {
        tokens.push({ type: "BOOLEAN", value: upper, pos: i });
      } else {
        tokens.push({ type: "IDENT", value, pos: i });
      }
      i = j;
      continue;
    }

    throw new SqlLabSyntaxError(`Unexpected character '${ch}' at position ${i}.`);
  }

  tokens.push({ type: "EOF", value: "", pos: input.length });
  return tokens;
}
