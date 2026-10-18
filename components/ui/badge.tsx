import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/content/projects";

const styles: Record<ProjectStatus, string> = {
  ongoing: "bg-brand-500 text-white",
  completed: "bg-emerald-500 text-white",
  upcoming: "bg-ink-900 text-white",
};

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider", styles[status], className)}>
      {status === "ongoing" && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />}
      {status}
    </span>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-1 text-xs font-medium text-ink-600", className)}>
      {children}
    </span>
  );
}
