import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em]", dark ? "text-brand-400" : "text-brand-600")}>
          <span className="h-px w-6 bg-current" />
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-balance text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-ink-900")}>
        {title}
      </h2>
      {text && <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-ink-300" : "text-ink-500")}>{text}</p>}
    </div>
  );
}
