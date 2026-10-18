"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const DEPTH = 10; // px thickness of the 3D tile
const SIZE = 44;

function HouseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-1, 1], [18, -18]), { stiffness: 200, damping: 18 });
  const tiltY = useSpring(useTransform(mx, [-1, 1], [-18, 18]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const face = "absolute inset-0 grid place-items-center rounded-xl [backface-visibility:hidden]";
  const edge = "absolute top-0 left-1/2 h-full rounded-sm";

  return (
    <Link
      href="/"
      aria-label="Patel Sons home"
      className={cn("group inline-flex items-center gap-3", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* 3D tile */}
      <motion.span
        className="relative block"
        style={{ width: SIZE, height: SIZE, perspective: 500 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.span className="absolute inset-0 [transform-style:preserve-3d]" style={{ rotateX: tiltX, rotateY: tiltY }}>
          <motion.span
            className="absolute inset-0 [transform-style:preserve-3d]"
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            {/* front */}
            <span
              className={cn(face, "bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 text-white shadow-[0_8px_24px_-8px_rgb(242_106_27_/_0.9)]")}
              style={{ transform: `translateZ(${DEPTH / 2}px)` }}
            >
              <HouseGlyph className="h-6 w-6 drop-shadow" />
              <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/0 to-white/25" />
            </span>
            {/* back */}
            <span
              className={cn(face, "bg-gradient-to-br from-ink-700 via-ink-900 to-ink-950 font-display text-sm font-extrabold tracking-tight text-brand-400 ring-1 ring-white/10")}
              style={{ transform: `rotateY(180deg) translateZ(${DEPTH / 2}px)` }}
            >
              PS
            </span>
            {/* right edge */}
            <span className={cn(edge, "bg-brand-700")} style={{ width: DEPTH, marginLeft: -DEPTH / 2, transform: `rotateY(90deg) translateZ(${SIZE / 2}px)` }} />
            {/* left edge */}
            <span className={cn(edge, "bg-brand-600")} style={{ width: DEPTH, marginLeft: -DEPTH / 2, transform: `rotateY(-90deg) translateZ(${SIZE / 2}px)` }} />
          </motion.span>
        </motion.span>
        {/* ground shadow */}
        <motion.span
          className="absolute -bottom-2 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-brand-500/40 blur-[3px]"
          animate={{ scaleX: [1, 0.75, 1], opacity: [0.5, 0.25, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.span>

      {/* wordmark */}
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-extrabold tracking-tight transition-transform duration-300 group-hover:translate-x-0.5", light ? "text-white" : "text-ink-900")}>
          Patel{" "}
          <span className="bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 bg-[length:200%_100%] bg-clip-text text-transparent transition-[background-position] duration-700 group-hover:bg-[position:100%_0]">
            Sons
          </span>
        </span>
        <span className={cn("mt-1 text-[10px] font-semibold uppercase tracking-[0.25em]", light ? "text-ink-300" : "text-ink-400")}>Construction</span>
      </span>
    </Link>
  );
}
