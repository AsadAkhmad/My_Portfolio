import { TABLES, ColumnSpec, isKnownTable, MAX_LIMIT, DEFAULT_LIMIT } from "./allowlist";
import type { SelectNode, Condition, Literal } from "./parser";

export class SqlLabValidationError extends Error {}

type PrismaWhereClause = Record<string, unknown>;

export type CompiledQuery = {
  model: (typeof TABLES)[keyof typeof TABLES]["model"];
  args: {
    select: Record<string, true>;
    where?: PrismaWhereClause;
    orderBy?: Record<string, "asc" | "desc">;
    take: number;
  };
  /** Ordered (virtualName, realField) pairs for turning Prisma rows back into display rows. */
  displayColumns: { virtual: string; field: string; type: ColumnSpec["type"] }[];
};

function resolveColumn(tableName: string, columnName: string): ColumnSpec {
  const table = TABLES[tableName];
  const col = table.columns[columnName];
  if (!col) {
    throw new SqlLabValidationError(
      `Unknown column "${columnName}" on table "${tableName}". Run HELP to see available columns.`
    );
  }
  return col;
}

function coerceLiteral(literal: Literal, column: ColumnSpec, columnName: string) {
  if (column.type === "date") {
    if (literal.type !== "string") {
      throw new SqlLabValidationError(`Column "${columnName}" expects a date string, e.g. '2025-01-01'.`);
    }
    const date = new Date(literal.value as string);
    if (Number.isNaN(date.getTime())) {
      throw new SqlLabValidationError(`"${literal.value}" is not a valid date for column "${columnName}".`);
    }
    return date;
  }
  if (column.type === "boolean") {
    if (literal.type !== "boolean") {
      throw new SqlLabValidationError(`Column "${columnName}" expects TRUE or FALSE.`);
    }
    return literal.value;
  }
  if (column.type === "number") {
    if (literal.type !== "number") {
      throw new SqlLabValidationError(`Column "${columnName}" expects a number.`);
    }
    return literal.value;
  }
  if (literal.type !== "string") {
    throw new SqlLabValidationError(`Column "${columnName}" expects a string.`);
  }
  return literal.value;
}

function compileCondition(tableName: string, condition: Condition): PrismaWhereClause {
  const column = resolveColumn(tableName, condition.column);
  if (!column.filterable) {
    throw new SqlLabValidationError(`Column "${condition.column}" can't be used in WHERE (it isn't filterable).`);
  }

  if (condition.operator === "IN") {
    const values = (condition.value as Literal[]).map((v) => coerceLiteral(v, column, condition.column));
    return { [column.field]: { in: values } };
  }

  const value = coerceLiteral(condition.value as Literal, column, condition.column);

  switch (condition.operator) {
    case "=":
      return { [column.field]: { equals: value } };
    case "!=":
      return { [column.field]: { not: value } };
    case "<":
      return { [column.field]: { lt: value } };
    case "<=":
      return { [column.field]: { lte: value } };
    case ">":
      return { [column.field]: { gt: value } };
    case ">=":
      return { [column.field]: { gte: value } };
    case "LIKE": {
      // Simplified LIKE: strips SQL '%' wildcards and does a case-insensitive substring match.
      if (column.type !== "string") {
        throw new SqlLabValidationError(`LIKE only works on text columns, not "${condition.column}".`);
      }
      const pattern = String(value).replace(/%/g, "");
      return { [column.field]: { contains: pattern, mode: "insensitive" } };
    }
    default:
      throw new SqlLabValidationError(`Unsupported operator "${condition.operator}".`);
  }
}

export function compile(node: SelectNode): CompiledQuery {
  if (!isKnownTable(node.table)) {
    throw new SqlLabValidationError(`Unknown table "${node.table}". Run HELP to see available tables.`);
  }
  const table = TABLES[node.table];

  const virtualColumnNames = node.columns === "*" ? Object.keys(table.columns) : node.columns;
  const displayColumns = virtualColumnNames.map((name) => {
    const col = resolveColumn(node.table, name);
    return { virtual: name, field: col.field, type: col.type };
  });

  const select: Record<string, true> = {};
  for (const dc of displayColumns) select[dc.field] = true;

  let where: PrismaWhereClause | undefined;
  if (node.where.length > 0) {
    const clauses = node.where.map((c) => compileCondition(node.table, c));
    where = clauses.length === 1 ? clauses[0] : { AND: clauses };
  }

  let orderBy: Record<string, "asc" | "desc"> | undefined;
  if (node.orderBy) {
    const col = resolveColumn(node.table, node.orderBy.column);
    if (!col.filterable) {
      throw new SqlLabValidationError(`Column "${node.orderBy.column}" can't be used in ORDER BY.`);
    }
    orderBy = { [col.field]: node.orderBy.direction.toLowerCase() as "asc" | "desc" };
  }

  const requestedLimit = node.limit ?? DEFAULT_LIMIT;
  const take = Math.max(1, Math.min(requestedLimit, MAX_LIMIT));

  return { model: table.model, args: { select, where, orderBy, take }, displayColumns };
}
