"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { UserRound, LogOut, Phone, ChevronDown, CircleAlert } from "lucide-react";
import { useSession, signOut } from "./use-session";
import { cn } from "@/lib/utils";

export function AuthMenu({ light = false, className }: { light?: boolean; className?: string }) {
  const { status, user } = useSession();
  const [open, setOpen] = useState(false);

  if (status === "loading") return <span className={cn("h-9 w-24 rounded-full bg-white/10", className)} aria-hidden />;

  if (!user) {
    return (
      <Link
        href="/signup"
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition",
          light ? "border-white/25 text-white hover:bg-white/10" : "border-ink-200 text-ink-900 hover:border-ink-900",
          className,
        )}
      >
        <UserRound className="h-4 w-4" /> Sign up
      </Link>
    );
  }

  const initials = user.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn("flex h-9 items-center gap-2 rounded-full pl-1 pr-3 text-sm font-semibold transition", light ? "bg-white/10 text-white hover:bg-white/20" : "bg-ink-100 text-ink-900 hover:bg-ink-200")}
      >
        {user.picture ? (
          <Image src={user.picture} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" unoptimized />
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white">{initials}</span>
        )}
        <span className="max-w-[9rem] truncate">{user.name.split(" ")[0]}</span>
        {!user.phone && <CircleAlert className="h-4 w-4 text-brand-400" aria-label="Mobile number missing" />}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-20 mt-2 w-64 overflow-hidden rounded-2xl bg-white p-2 text-ink-900 shadow-soft ring-1 ring-ink-900/10"
            >
              <div className="px-3 py-2">
                <p className="truncate text-sm font-bold">{user.name}</p>
                <p className="truncate text-xs text-ink-500">{user.email}</p>
                <p className={cn("mt-1 flex items-center gap-1 text-xs", user.phone ? "text-ink-500" : "font-semibold text-brand-600")}>
                  <Phone className="h-3 w-3" /> {user.phone ? `+91 ${user.phone}` : "Add mobile number"}
                </p>
              </div>
              <Link href="/account" role="menuitem" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-ink-50">
                <UserRound className="h-4 w-4 text-brand-500" /> My account & queries
              </Link>
              <button role="menuitem" onClick={() => { void signOut(); setOpen(false); }} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-ink-50">
                <LogOut className="h-4 w-4 text-ink-500" /> Sign out
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
