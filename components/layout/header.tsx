"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageSquarePlus } from "lucide-react";
import { openQuery } from "@/lib/query-store";
import { AuthMenu } from "@/components/auth/auth-menu";
import { company, nav } from "@/content/company";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Every page opens on a dark hero except the light legal pages.
  const lightTopRoutes = ["/privacy", "/terms", "/account"];
  const onDarkHero = !lightTopRoutes.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = onDarkHero && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "bg-white/85 shadow-[0_1px_0_0_rgb(11_18_32_/_0.06)] backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo light={light} />

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm font-medium transition-colors xl:px-4",
                  light ? "text-white/80 hover:text-white" : "text-ink-600 hover:text-ink-900",
                  active && (light ? "text-white" : "text-ink-900"),
                )}
              >
                {item.label}
                {active && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={company.phoneHref}
            aria-label={`Call ${company.phone}`}
            className={cn("flex items-center gap-2 whitespace-nowrap text-sm font-semibold", light ? "text-white" : "text-ink-900")}
          >
            <Phone className="h-4 w-4 text-brand-500" />
            <span className="hidden xl:inline">{company.phone}</span>
          </a>
          <Button type="button" size="sm" className="whitespace-nowrap" onClick={() => openQuery()}>
            <MessageSquarePlus className="h-4 w-4" /> Raise a Query
          </Button>
          <AuthMenu light={light} className="whitespace-nowrap" />
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn("grid h-11 w-11 place-items-center rounded-full lg:hidden", light ? "text-white" : "text-ink-900")}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-100 bg-white lg:hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium text-ink-700 hover:bg-ink-50",
                    pathname === item.href && "bg-brand-50 text-brand-700",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between rounded-xl bg-ink-50 px-3 py-2">
                <span className="text-sm text-ink-600">Your account</span>
                <AuthMenu />
              </div>
              <div className="flex gap-3 pt-3">
                <Button href={company.phoneHref} variant="outline" className="flex-1" onClick={() => setOpen(false)}>
                  <Phone className="h-4 w-4" /> Call
                </Button>
                <Button type="button" className="flex-1" onClick={() => { setOpen(false); openQuery(); }}>
                  <MessageSquarePlus className="h-4 w-4" /> Raise a Query
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
