export function HelpPanel({ text }: { text: string }) {
  return (
    <pre className="whitespace-pre-wrap rounded-md border border-border bg-muted/40 p-4 font-mono text-xs leading-relaxed text-foreground/90">
      {text}
    </pre>
  );
}
