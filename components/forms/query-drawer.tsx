"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useQueryDrawer, closeQuery } from "@/lib/query-store";
import { EnquiryForm } from "./enquiry-form";
import { company } from "@/content/company";
import { WhatsAppIcon } from "@/components/icons/social";
import { SocialLinks } from "@/components/layout/social-links";

export function QueryDrawer() {
  const { open, preset, nonce } = useQueryDrawer();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeQuery();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuery}
            className="fixed inset-0 z-[90] bg-ink-950/60 backdrop-blur-sm"
          />
          <motion.aside
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="query-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-xl flex-col bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-ink-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Raise a query</p>
                <h2 id="query-title" className="mt-1 text-2xl font-bold text-ink-900">How can we help?</h2>
              </div>
              <button onClick={closeQuery} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full bg-ink-50 text-ink-600 hover:bg-ink-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <EnquiryForm key={nonce} preset={preset} />

              <div className="mt-8 rounded-2xl bg-ink-900 p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-300">Or reach us directly</p>
                <ul className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <li><a href={company.phoneHref} className="flex items-center gap-2 hover:text-brand-400"><Phone className="h-4 w-4 text-brand-400" />{company.phone}</a></li>
                  <li><a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-brand-400"><WhatsAppIcon className="h-4 w-4 text-[#25D366]" />WhatsApp us</a></li>
                  <li><a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-brand-400"><Mail className="h-4 w-4 text-brand-400" />{company.email}</a></li>
                  <li className="flex items-center gap-2 text-ink-300"><Clock className="h-4 w-4 text-brand-400" />{company.hours}</li>
                  <li className="flex items-start gap-2 text-ink-300 sm:col-span-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />{company.address}</li>
                </ul>
                <SocialLinks className="mt-5" />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
