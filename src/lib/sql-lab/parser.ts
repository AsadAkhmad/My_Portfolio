import { tokenize, Token, SqlLabSyntaxError } from "./tokenizer";

export type Literal = { type: "string" | "number" | "boolean"; value: string | number | boolean };

export type Condition = {
  column: string;
  operator: "=" | "!=" | "<" | "<=" | ">" | ">=" | "LIKE" | "IN";
  value: Literal | Literal[];
};

export type SelectNode = {
  kind: "select";
  columns: "*" | string[];
  table: string;
  where: Condition[];
  orderBy?: { column: string; direction: "ASC" | "DESC" };
  limit?: number;
};

export type HelpNode = { kind: "help" };

export type QueryNode = SelectNode | HelpNode;

class Parser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private next(): Token {
    return this.tokens[this.pos++];
  }

  private expectKeyword(keyword: string): Token {
    const tok = this.next();
    if (tok.type !== "KEYWORD" || tok.value !== keyword) {
      throw new SqlLabSyntaxError(`Expected "${keyword}" at position ${tok.pos}, got "${tok.value || "end of input"}".`);
    }
    return tok;
  }

  private expectIdent(): string {
    const tok = this.next();
    if (tok.type !== "IDENT") {
      throw new SqlLabSyntaxError(`Expected an identifier at position ${tok.pos}, got "${tok.value || "end of input"}".`);
    }
    return tok.value;
  }

  private isKeyword(value: string): boolean {
    const tok = this.peek();
    return tok.type === "KEYWORD" && tok.value === value;
  }

  parse(): QueryNode {
    if (this.isKeyword("HELP")) {
      this.next();
      if (this.peek().type !== "EOF") {
        throw new SqlLabSyntaxError("HELP takes no arguments.");
      }
      return { kind: "help" };
    }

    this.expectKeyword("SELECT");
    const columns = this.parseColumns();
    this.expectKeyword("FROM");
    const table = this.expectIdent();

    const where: Condition[] = [];
    if (this.isKeyword("WHERE")) {
      this.next();
      where.push(this.parseCondition());
      while (this.isKeyword("AND")) {
        this.next();
        where.push(this.parseCondition());
      }
    }

    let orderBy: SelectNode["orderBy"];
    if (this.isKeyword("ORDER")) {
      this.next();
      this.expectKeyword("BY");
      const column = this.expectIdent();
      let direction: "ASC" | "DESC" = "ASC";
      if (this.isKeyword("ASC") || this.isKeyword("DESC")) {
        direction = this.next().value as "ASC" | "DESC";
      }
      orderBy = { column, direction };
    }

    let limit: number | undefined;
    if (this.isKeyword("LIMIT")) {
      this.next();
      const tok = this.next();
      if (tok.type !== "NUMBER") {
        throw new SqlLabSyntaxError(`Expected a number after LIMIT at position ${tok.pos}.`);
      }
      limit = parseInt(tok.value, 10);
    }

    if (this.peek().type !== "EOF") {
      const tok = this.peek();
      throw new SqlLabSyntaxError(`Unexpected "${tok.value}" at position ${tok.pos}. This query shape isn't supported.`);
    }

    return { kind: "select", columns, table, where, orderBy, limit };
  }

  private parseColumns(): "*" | string[] {
    if (this.peek().type === "STAR") {
      this.next();
      return "*";
    }
    const columns = [this.expectIdent()];
    while (this.peek().type === "COMMA") {
      this.next();
      columns.push(this.expectIdent());
    }
    return columns;
  }

  private parseCondition(): Condition {
    const column = this.expectIdent();
    const opTok = this.next();

    if (opTok.type === "KEYWORD" && opTok.value === "IN") {
      this.expectLParen();
      const values = [this.parseLiteral()];
      while (this.peek().type === "COMMA") {
        this.next();
        values.push(this.parseLiteral());
      }
      this.expectRParen();
      return { column, operator: "IN", value: values };
    }

    if (opTok.type === "KEYWORD" && opTok.value === "LIKE") {
      return { column, operator: "LIKE", value: this.parseLiteral() };
    }

    if (opTok.type === "OPERATOR") {
      const op = opTok.value as Condition["operator"];
      return { column, operator: op, value: this.parseLiteral() };
    }

    throw new SqlLabSyntaxError(`Expected a comparison operator at position ${opTok.pos}, got "${opTok.value}".`);
  }

  private parseLiteral(): Literal {
    const tok = this.next();
    if (tok.type === "STRING") return { type: "string", value: tok.value };
    if (tok.type === "NUMBER") return { type: "number", value: parseFloat(tok.value) };
    if (tok.type === "BOOLEAN") return { type: "boolean", value: tok.value === "TRUE" };
    throw new SqlLabSyntaxError(`Expected a value at position ${tok.pos}, got "${tok.value || "end of input"}".`);
  }

  private expectLParen() {
    const tok = this.next();
    if (tok.type !== "LPAREN") throw new SqlLabSyntaxError(`Expected "(" at position ${tok.pos}.`);
  }
  private expectRParen() {
    const tok = this.next();
    if (tok.type !== "RPAREN") throw new SqlLabSyntaxError(`Expected ")" at position ${tok.pos}.`);
  }
}

export function parse(raw: string): QueryNode {
  const tokens = tokenize(raw);
  return new Parser(tokens).parse();
}

export { SqlLabSyntaxError };
