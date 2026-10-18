"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { company } from "@/content/company";

const heroImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=80";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink-950 text-white">
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="absolute inset-0 -z-10"
      >
        <Image src={heroImage} alt="Construction site at sunset" fill priority sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      <div className="grid-pattern absolute inset-0 -z-10 opacity-40" />

      <Container className="flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <motion.p {...fade(0.1)} className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-300 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          Since {company.founded} · Ahmedabad
        </motion.p>

        <motion.h1 {...fade(0.2)} className="max-w-4xl text-balance text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          We build row houses, towers and <span className="text-brand-400">the home on your plot.</span>
        </motion.h1>

        <motion.p {...fade(0.3)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl">
          Patel Sons develops gated row house communities and apartment buildings, and takes private construction contracts on a <strong className="text-white">labour-rate</strong> or <strong className="text-white">with-material</strong> basis.
        </motion.p>

        <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
          <Button href="/projects" size="lg">
            View Projects <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contracts" size="lg" variant="white">
            Contract Rates
          </Button>
          <a href={company.social.youtube.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 text-sm font-semibold text-white/90">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition group-hover:bg-brand-500">
              <Play className="ml-0.5 h-4 w-4 fill-current" />
            </span>
            Watch site tour
          </a>
        </motion.div>

        <motion.ul {...fade(0.55)} className="mt-14 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { Icon: BadgeCheck, t: "RERA registered", s: "Every project, every time" },
            { Icon: Clock, t: "On-time handover", s: "98% delivered on schedule" },
            { Icon: ShieldCheck, t: "Fixed-price contracts", s: "Rate locked at signing" },
          ].map(({ Icon, t, s }) => (
            <li key={t} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <Icon className="h-6 w-6 shrink-0 text-brand-400" />
              <div>
                <p className="text-sm font-semibold">{t}</p>
                <p className="text-xs text-ink-300">{s}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-400"
      >
        Scroll
      </motion.div>
    </section>
  );
}
