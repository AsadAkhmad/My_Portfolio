"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, Terminal, ArrowRight } from "lucide-react";

const cards = [
  {
    href: "/portfolio",
    icon: Briefcase,
    title: "View Professional Portfolio",
    description: "A clean, recruiter-friendly walkthrough of my experience, education, and projects.",
    preview: "bg-white",
    previewBorder: "border-slate-200",
    accentText: "text-blue-600",
    dotColor: "bg-slate-300",
  },
  {
    href: "/lab",
    icon: Terminal,
    title: "Enter Data Science Lab",
    description: "Query my real project and skills data through a live SQL-style terminal.",
    preview: "bg-[#050709]",
    previewBorder: "border-emerald-500/20",
    accentText: "text-emerald-400",
    dotColor: "bg-emerald-500/60",
  },
];

export function ThemeSwitchCTA() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {cards.map((card, i) => (
        <motion.div
          key={card.href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 * i }}
        >
          <Link
            href={card.href}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
          >
            <div
              className={`mb-5 flex h-24 items-center gap-1.5 rounded-lg border ${card.preview} ${card.previewBorder} px-3`}
            >
              <span className={`h-2.5 w-2.5 rounded-full ${card.dotColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${card.dotColor}`} />
              <span className={`h-2.5 w-2.5 rounded-full ${card.dotColor}`} />
              <span className={`ml-2 text-xs ${card.accentText} font-mono`}>
                {card.href === "/lab" ? "SELECT * FROM skills;" : "About · Experience · Projects"}
              </span>
            </div>
            <card.icon className="mb-3 h-6 w-6 text-accent" />
            <h3 className="mb-1.5 text-lg font-semibold">{card.title}</h3>
            <p className="mb-4 flex-1 text-sm text-muted-foreground">{card.description}</p>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
              Enter
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
