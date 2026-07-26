// The security boundary for the Data Lab: every table/column a visitor can
// reference must be listed here by name. Anything not present is structurally
// unreachable, regardless of what the visitor types.

export type ColumnType = "string" | "number" | "boolean" | "date" | "string[]";

export type ColumnSpec = {
  /** Real Prisma field this virtual column maps to. */
  field: string;
  type: ColumnType;
  /** Whether this column may appear in a WHERE/ORDER BY clause. */
  filterable: boolean;
};

export type TableSpec = {
  /** Prisma delegate name on the client, e.g. prisma.project. */
  model: "project" | "skill" | "experience" | "education" | "certification";
  columns: Record<string, ColumnSpec>;
  defaultOrder: string;
};

export const TABLES: Record<string, TableSpec> = {
  projects: {
    model: "project",
    defaultOrder: "display_order",
    columns: {
      name: { field: "name", type: "string", filterable: true },
      slug: { field: "slug", type: "string", filterable: true },
      summary: { field: "summary", type: "string", filterable: false },
      tech: { field: "technologies", type: "string[]", filterable: false },
      github: { field: "githubUrl", type: "string", filterable: false },
      demo: { field: "liveUrl", type: "string", filterable: false },
      featured: { field: "featured", type: "boolean", filterable: true },
      status: { field: "status", type: "string", filterable: true },
      start_date: { field: "startDate", type: "date", filterable: true },
      end_date: { field: "endDate", type: "date", filterable: true },
      display_order: { field: "displayOrder", type: "number", filterable: true },
    },
  },
  skills: {
    model: "skill",
    defaultOrder: "display_order",
    columns: {
      name: { field: "name", type: "string", filterable: true },
      category: { field: "category", type: "string", filterable: true },
      proficiency: { field: "proficiency", type: "number", filterable: true },
      display_order: { field: "displayOrder", type: "number", filterable: true },
    },
  },
  experience: {
    model: "experience",
    defaultOrder: "display_order",
    columns: {
      company: { field: "company", type: "string", filterable: true },
      role: { field: "role", type: "string", filterable: true },
      location: { field: "location", type: "string", filterable: true },
      employment_type: { field: "employmentType", type: "string", filterable: true },
      start_date: { field: "startDate", type: "date", filterable: true },
      end_date: { field: "endDate", type: "date", filterable: true },
      technologies: { field: "technologies", type: "string[]", filterable: false },
      display_order: { field: "displayOrder", type: "number", filterable: true },
    },
  },
  education: {
    model: "education",
    defaultOrder: "display_order",
    columns: {
      institution: { field: "institution", type: "string", filterable: true },
      degree: { field: "degree", type: "string", filterable: true },
      field_of_study: { field: "fieldOfStudy", type: "string", filterable: true },
      start_date: { field: "startDate", type: "date", filterable: true },
      end_date: { field: "endDate", type: "date", filterable: true },
      display_order: { field: "displayOrder", type: "number", filterable: true },
    },
  },
  certifications: {
    model: "certification",
    defaultOrder: "display_order",
    columns: {
      title: { field: "title", type: "string", filterable: true },
      issuer: { field: "issuer", type: "string", filterable: true },
      category: { field: "category", type: "string", filterable: true },
      date_earned: { field: "dateEarned", type: "date", filterable: true },
      credential_url: { field: "credentialUrl", type: "string", filterable: false },
      display_order: { field: "displayOrder", type: "number", filterable: true },
    },
  },
};

export const OPERATORS = ["=", "!=", "<", "<=", ">", ">=", "LIKE", "IN"] as const;
export type Operator = (typeof OPERATORS)[number];

export const MAX_LIMIT = 50;
export const DEFAULT_LIMIT = 20;

export function isKnownTable(name: string): name is keyof typeof TABLES {
  return Object.prototype.hasOwnProperty.call(TABLES, name);
}
