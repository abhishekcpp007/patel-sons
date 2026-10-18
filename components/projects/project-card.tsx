import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { type Project, typeLabel } from "@/content/projects";
import { StatusBadge } from "@/components/ui/badge";
import { formatCompactINR, cn } from "@/lib/utils";

export function ProjectCard({ project, large = false, dark = false }: { project: Project; large?: boolean; dark?: boolean }) {
  const price = project.priceFrom ? `From ${formatCompactINR(project.priceFrom)}` : project.priceLabel;
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-3xl shadow-soft ring-1",
        dark ? "bg-ink-900 ring-white/10" : "bg-white ring-ink-900/5",
        large ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3] md:aspect-[5/4]",
      )}
    >
      <Image src={project.cover} alt={project.name} fill sizes={large ? "(min-width:1024px) 80vw, 100vw" : "(min-width:768px) 50vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />

      <div className="absolute left-5 top-5 flex gap-2">
        <StatusBadge status={project.status} />
        <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{typeLabel[project.type]}</span>
      </div>

      <div className="relative mt-auto flex w-full items-end justify-between gap-4 p-6 text-white">
        <div>
          <p className="flex items-center gap-1 text-xs font-medium text-ink-300"><MapPin className="h-3.5 w-3.5" />{project.location}, {project.city}</p>
          <h3 className={cn("mt-1 font-bold", large ? "text-2xl sm:text-3xl" : "text-xl")}>{project.name}</h3>
          <p className="mt-1 line-clamp-1 text-sm text-ink-200">{project.tagline}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-300">
            <span>{project.units}</span>
            <span>{project.sizes}</span>
            {price && <span className="font-semibold text-brand-300">{price}</span>}
          </div>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink-900 transition-all group-hover:bg-brand-500 group-hover:text-white">
          <ArrowUpRight className="h-5 w-5" />
        </span>
      </div>

      {project.status === "ongoing" && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-brand-500" style={{ width: `${project.progress}%` }} />
        </div>
      )}
    </Link>
  );
}
