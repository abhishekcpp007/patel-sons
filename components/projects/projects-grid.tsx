"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Funnel } from "lucide-react";
import { projects, statusLabel, typeLabel, type ProjectStatus, type ProjectType } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { cn } from "@/lib/utils";

const statuses: ("all" | ProjectStatus)[] = ["all", "ongoing", "completed", "upcoming"];
const types: ("all" | ProjectType)[] = ["all", "row-house", "building", "contract"];

export function ProjectsGrid() {
  const [status, setStatus] = useState<(typeof statuses)[number]>("all");
  const [type, setType] = useState<(typeof types)[number]>("all");

  const list = useMemo(
    () => projects.filter((p) => (status === "all" || p.status === status) && (type === "all" || p.type === type)),
    [status, type],
  );

  const chip = (active: boolean) =>
    cn(
      "rounded-full px-4 py-2 text-sm font-medium transition-all",
      active ? "bg-ink-900 text-white shadow-soft" : "bg-white text-ink-600 ring-1 ring-ink-200 hover:ring-ink-900",
    );

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl bg-ink-50 p-4 ring-1 ring-ink-900/5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink-500"><Funnel className="h-3.5 w-3.5" /> Status</span>
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatus(s)} className={chip(status === s)}>
              {s === "all" ? "All" : statusLabel[s]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-ink-500">Type</span>
          {types.map((t) => (
            <button key={t} onClick={() => setType(t)} className={chip(type === t)}>
              {t === "all" ? "All" : typeLabel[t]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-500">
        Showing <strong className="text-ink-900">{list.length}</strong> {list.length === 1 ? "project" : "projects"}
      </p>

      <motion.div layout className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="mt-10 rounded-3xl border border-dashed border-ink-200 p-12 text-center text-ink-500">No projects match these filters.</div>
      )}
    </div>
  );
}
