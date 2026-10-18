import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./container";

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  image: string;
  crumbs: { name: string; path: string }[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pb-20 pt-36 text-white lg:pb-28 lg:pt-44">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/60 via-ink-950/70 to-ink-950" />
      <div className="grid-pattern absolute inset-0 -z-10 opacity-40" />
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-xs text-ink-300">
          {crumbs.map((c, i) => (
            <span key={c.path} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i === crumbs.length - 1 ? <span className="text-white">{c.name}</span> : <Link href={c.path} className="hover:text-white">{c.name}</Link>}
            </span>
          ))}
        </nav>
        <p className="mb-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
          <span className="h-px w-6 bg-current" /> {eyebrow}
        </p>
        <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        {text && <p className="mt-5 max-w-2xl text-lg text-ink-200">{text}</p>}
        {children}
      </Container>
    </section>
  );
}
