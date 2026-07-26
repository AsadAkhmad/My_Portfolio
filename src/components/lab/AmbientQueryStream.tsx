const SAMPLE_QUERIES = [
  "SELECT name, proficiency FROM skills ORDER BY proficiency DESC;",
  "SELECT company, role FROM experience WHERE end_date IS NULL;",
  "SELECT title FROM certifications WHERE category = 'hackathon';",
  "SELECT name FROM projects WHERE featured = TRUE;",
  "SELECT degree, institution FROM education;",
  "SELECT tech FROM projects WHERE status = 'completed';",
];

export function AmbientQueryStream() {
  const lines = [...SAMPLE_QUERIES, ...SAMPLE_QUERIES];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-[0.14]">
      <div className="animate-[ambient-scroll_60s_linear_infinite] font-mono text-xs leading-8 text-accent-secondary whitespace-nowrap">
        {lines.map((q, i) => (
          <div key={i} className="px-6">
            {q}
          </div>
        ))}
      </div>
    </div>
  );
}
