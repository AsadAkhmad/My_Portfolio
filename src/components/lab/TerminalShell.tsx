"use client";

import { useEffect, useRef, useState } from "react";
import { SqlHighlighter } from "./SqlHighlighter";
import { QueryResultTable } from "./QueryResultTable";
import { HelpPanel } from "./HelpPanel";

type QueryResult =
  | { kind: "rows"; columns: string[]; rows: Record<string, string>[]; rowCount: number; elapsedMs: number }
  | { kind: "help"; text: string }
  | { kind: "error"; message: string };

type HistoryEntry = {
  id: number;
  query: string;
  result: QueryResult | null;
};

const PROMPT = "portfolio=#";
const EXAMPLE_QUERY = "SELECT name, tech FROM projects WHERE featured = TRUE ORDER BY start_date DESC LIMIT 5;";

let idCounter = 0;

export function TerminalShell() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [commandLog, setCommandLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  async function runQuery(query: string) {
    const id = ++idCounter;
    setHistory((h) => [...h, { id, query, result: null }]);
    setCommandLog((log) => [...log, query]);
    setLogIndex(null);

    try {
      const res = await fetch("/api/lab/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const result: QueryResult = await res.json();
      setHistory((h) => h.map((entry) => (entry.id === id ? { ...entry, result } : entry)));
    } catch {
      setHistory((h) =>
        h.map((entry) => (entry.id === id ? { ...entry, result: { kind: "error", message: "Network error — could not reach the query engine." } } : entry))
      );
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    runQuery(trimmed);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandLog.length === 0) return;
      const nextIndex = logIndex === null ? commandLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(nextIndex);
      setInput(commandLog[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const nextIndex = logIndex + 1;
      if (nextIndex >= commandLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(nextIndex);
        setInput(commandLog[nextIndex]);
      }
    }
  }

  return (
    <div
      className="flex h-[70vh] min-h-[480px] flex-col rounded-xl border border-border bg-card/80 shadow-[0_0_60px_rgba(52,211,153,0.06)] backdrop-blur"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">portfolio_data — sql lab</span>
      </div>

      <div ref={scrollRef} className="scrollbar-thin flex-1 space-y-4 overflow-y-auto px-4 py-4 font-mono text-sm">
        <div className="text-muted-foreground">
          <p>Connected to portfolio_data. Read-only, whitelisted queries only.</p>
          <p>
            Type <span className="text-accent">HELP</span> to list tables, or try:
          </p>
          <p className="mt-1 text-accent-secondary">{EXAMPLE_QUERY}</p>
        </div>

        {history.map((entry) => (
          <div key={entry.id}>
            <div className="flex gap-2 text-foreground">
              <span className="select-none text-accent">{PROMPT}</span>
              <span className="break-all">
                <SqlHighlighter query={entry.query} />
              </span>
            </div>
            <div className="mt-2">
              {entry.result === null && <p className="text-muted-foreground">running…</p>}
              {entry.result?.kind === "rows" && (
                <QueryResultTable
                  columns={entry.result.columns}
                  rows={entry.result.rows}
                  rowCount={entry.result.rowCount}
                  elapsedMs={entry.result.elapsedMs}
                />
              )}
              {entry.result?.kind === "help" && <HelpPanel text={entry.result.text} />}
              {entry.result?.kind === "error" && <p className="text-red-400">error: {entry.result.message}</p>}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3 font-mono text-sm">
        <span className="select-none text-accent">{PROMPT}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          placeholder="SELECT name FROM skills;"
          className="flex-1 bg-transparent text-foreground caret-accent outline-none placeholder:text-muted-foreground/50"
          aria-label="SQL query input"
        />
      </form>
    </div>
  );
}
