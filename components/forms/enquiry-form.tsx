"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle, Send, CircleCheck, Phone, Mail } from "lucide-react";
import {
  enquirySchema,
  queryTabs,
  budgetOptions,
  timelineOptions,
  timeOptions,
  guidanceOptions,
  type EnquiryInput,
  type QueryType,
} from "@/lib/enquiry-schema";
import { projects } from "@/content/projects";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/social";
import { cn } from "@/lib/utils";
import { useSession } from "@/components/auth/use-session";

const field =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/15";
const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-500";
const opt = "normal-case tracking-normal text-ink-400";

export interface EnquiryPreset {
  queryType?: QueryType;
  project?: string;
  contractType?: EnquiryInput["contractType"];
  interest?: EnquiryInput["interest"];
  items?: string;
  deliveryLocation?: string;
  guidanceTopic?: EnquiryInput["guidanceTopic"];
}

export function EnquiryForm({
  preset = {},
  showTabs = true,
  compact = false,
  className,
  onSuccess,
}: {
  preset?: EnquiryPreset;
  showTabs?: boolean;
  compact?: boolean;
  className?: string;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<{ orderNo?: string; phone?: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      queryType: preset.queryType ?? "general",
      name: "",
      phone: "",
      email: "",
      interest: preset.interest ?? "either",
      project: preset.project ?? "",
      contractType: preset.contractType ?? "not-sure",
      plotSize: "",
      location: "",
      budget: "undecided",
      timeline: "exploring",
      preferredContact: "call",
      preferredDate: "",
      preferredTime: "morning",
      items: preset.items ?? "",
      deliveryLocation: preset.deliveryLocation ?? "",
      guidanceTopic: preset.guidanceTopic ?? "plot-buying",
      message: "",
      website: "",
    },
  });

  // Apply preset changes coming from the drawer store.
  useEffect(() => {
    if (preset.queryType) setValue("queryType", preset.queryType);
    if (preset.project !== undefined) setValue("project", preset.project);
    if (preset.contractType) setValue("contractType", preset.contractType);
    if (preset.interest) setValue("interest", preset.interest);
    if (preset.items !== undefined) setValue("items", preset.items);
    if (preset.deliveryLocation !== undefined) setValue("deliveryLocation", preset.deliveryLocation);
    if (preset.guidanceTopic) setValue("guidanceTopic", preset.guidanceTopic);
  }, [preset.queryType, preset.project, preset.contractType, preset.interest, preset.items, preset.deliveryLocation, preset.guidanceTopic, setValue]);

  // Prefill from the signed-in user's account (name, phone, email) when fields are still empty.
  const { user } = useSession();
  const name = useWatch({ control, name: "name" });
  const phone = useWatch({ control, name: "phone" });
  const email = useWatch({ control, name: "email" });
  useEffect(() => {
    if (!user) return;
    if (!name) setValue("name", user.name);
    if (!phone && user.phone) setValue("phone", user.phone);
    if (!email) setValue("email", user.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.phone]);

  const queryType = useWatch({ control, name: "queryType" });
  const tab = queryTabs.find((t) => t.value === queryType) ?? queryTabs[0];

  const onSubmit = async (values: EnquiryInput) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (!res.ok) throw new Error("failed");
      const j = (await res.json().catch(() => ({}))) as { orderNo?: string };
      setResult({ orderNo: j.orderNo, phone: values.phone });
      setStatus("done");
      reset();
      onSuccess?.();
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className={cn("rounded-3xl bg-emerald-50 p-8 text-center ring-1 ring-emerald-200", className)}>
        <CircleCheck className="mx-auto h-12 w-12 text-emerald-500" />
        <h3 className="mt-4 text-xl font-bold text-ink-900">{result?.orderNo ? "Order request received!" : "Query received. Thank you!"}</h3>
        {result?.orderNo && (
          <>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-ink-500">Your order number</p>
            <p className="font-display text-3xl font-extrabold tracking-wider text-ink-900">{result.orderNo}</p>
            <p className="mt-2 text-sm text-ink-600">Our engineer will confirm price, stock and delivery slot the same day. Track it live any time.</p>
            <Link href={`/track?order=${result.orderNo}&phone=${encodeURIComponent(result.phone ?? "")}`} className="mt-4 inline-flex items-center justify-center rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-500">Track this order</Link>
          </>
        )}
        {!result?.orderNo && <p className="mt-2 text-sm text-ink-600">Our team will reach you within one working day on your preferred channel.</p>}
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Raise another query
        </Button>
      </div>
    );
  }

  const grid = cn("grid grid-cols-1 gap-4", !compact && "sm:grid-cols-2");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-5", className)} noValidate>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      {showTabs && (
        <div>
          <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1" role="tablist" aria-label="Query type">
            {queryTabs.map((t) => {
              const active = t.value === queryType;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setValue("queryType", t.value)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition",
                    active ? "text-white" : "bg-ink-50 text-ink-600 ring-1 ring-ink-200 hover:ring-ink-900",
                  )}
                >
                  {active && <motion.span layoutId="query-tab" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                  <span className="relative">{t.label}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-ink-500">{tab.hint}</p>
        </div>
      )}

      <div className={grid}>
        <div>
          <label className={label} htmlFor="q-name">Full name</label>
          <input id="q-name" className={field} placeholder="Your name" autoComplete="name" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className={label} htmlFor="q-phone">Mobile number</label>
          <input id="q-phone" className={field} placeholder="98765 43210" inputMode="tel" autoComplete="tel" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div className={grid}>
        <div>
          <label className={label} htmlFor="q-email">Email <span className={opt}>(optional)</span></label>
          <input id="q-email" className={field} placeholder="you@example.com" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className={label}>Preferred contact</label>
          <div className="grid grid-cols-3 gap-2 [&>*]:min-w-0">
            {(
              [
                { v: "call", Icon: Phone, t: "Call" },
                { v: "whatsapp", Icon: WhatsAppIcon, t: "WhatsApp" },
                { v: "email", Icon: Mail, t: "Email" },
              ] as const
            ).map(({ v, Icon, t }) => (
              <label key={v} className="relative">
                <input type="radio" value={v} className="peer sr-only" {...register("preferredContact")} />
                <span className="flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-ink-200 px-2 py-3 text-xs font-semibold text-ink-600 transition peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/15">
                  <Icon className="h-4 w-4" /> {t}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={queryType} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="space-y-4">
          {queryType === "buy" && (
            <>
              <div className={grid}>
                <div>
                  <label className={label} htmlFor="q-interest">Looking for</label>
                  <select id="q-interest" className={field} {...register("interest")}>
                    <option value="row-house">Row house / villa</option>
                    <option value="apartment">Apartment</option>
                    <option value="either">Either, show me options</option>
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="q-project">Project <span className={opt}>(optional)</span></label>
                  <select id="q-project" className={field} {...register("project")}>
                    <option value="">Any project</option>
                    {projects.filter((p) => p.type !== "contract").map((p) => (
                      <option key={p.slug} value={p.name}>{p.name} — {p.location}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={grid}>
                <SelectField id="q-budget" label="Budget" options={budgetOptions} reg={register("budget")} />
                <SelectField id="q-timeline" label="When do you plan to buy?" options={timelineOptions} reg={register("timeline")} />
              </div>
            </>
          )}

          {queryType === "build" && (
            <>
              <div className={grid}>
                <div>
                  <label className={label} htmlFor="q-contract">Contract type</label>
                  <select id="q-contract" className={field} {...register("contractType")}>
                    <option value="labour-rate">Labour rate (I buy materials)</option>
                    <option value="with-material">With material (turnkey)</option>
                    <option value="not-sure">Not sure, advise me</option>
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="q-plot">Plot size</label>
                  <input id="q-plot" className={field} placeholder="e.g. 300 sq. yd." {...register("plotSize")} />
                </div>
              </div>
              <div className={grid}>
                <div>
                  <label className={label} htmlFor="q-location">Plot location</label>
                  <input id="q-location" className={field} placeholder="Area, city" {...register("location")} />
                </div>
                <SelectField id="q-budget2" label="Construction budget" options={budgetOptions} reg={register("budget")} />
              </div>
              <SelectField id="q-timeline2" label="When do you want to start?" options={timelineOptions} reg={register("timeline")} />
            </>
          )}

          {queryType === "materials" && (
            <>
              <div>
                <label className={label} htmlFor="q-items">Items & quantities</label>
                <textarea id="q-items" rows={5} className={cn(field, "font-mono text-xs")} placeholder={"e.g.\n50 bags UltraTech OPC 53\n1 tonne Tata Tiscon 12 mm"} {...register("items")} />
                <p className="mt-1 text-xs text-ink-400">Tip: add items from the <Link href="/materials" className="font-semibold text-brand-600 underline">materials catalogue</Link> and they appear here automatically.</p>
              </div>
              <div className={grid}>
                <div>
                  <label className={label} htmlFor="q-delivery">Delivery site address</label>
                  <input id="q-delivery" className={field} placeholder="Plot no., area, Ahmedabad" {...register("deliveryLocation")} />
                </div>
                <div>
                  <label className={label} htmlFor="q-date3">Needed by <span className={opt}>(optional)</span></label>
                  <input id="q-date3" type="date" className={field} {...register("preferredDate")} />
                </div>
              </div>
            </>
          )}

          {queryType === "guidance" && (
            <>
              <div className={grid}>
                <div>
                  <label className={label} htmlFor="q-guidance">I need help with</label>
                  <select id="q-guidance" className={field} {...register("guidanceTopic")}>
                    {guidanceOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="q-location2">Plot / property location <span className={opt}>(optional)</span></label>
                  <input id="q-location2" className={field} placeholder="Area, city" {...register("location")} />
                </div>
              </div>
              <div className={grid}>
                <SelectField id="q-budget3" label="Budget" options={budgetOptions} reg={register("budget")} />
                <SelectField id="q-timeline3" label="Timeline" options={timelineOptions} reg={register("timeline")} />
              </div>
            </>
          )}

          {queryType === "site-visit" && (
            <>
              <div>
                <label className={label} htmlFor="q-project2">Project to visit</label>
                <select id="q-project2" className={field} {...register("project")}>
                  <option value="">Help me choose</option>
                  {projects.filter((p) => p.status !== "upcoming").map((p) => (
                    <option key={p.slug} value={p.name}>{p.name} — {p.location}</option>
                  ))}
                </select>
              </div>
              <div className={grid}>
                <div>
                  <label className={label} htmlFor="q-date">Preferred date</label>
                  <input id="q-date" type="date" className={field} {...register("preferredDate")} />
                </div>
                <SelectField id="q-time" label="Preferred time" options={timeOptions} reg={register("preferredTime")} />
              </div>
            </>
          )}

          {queryType === "callback" && (
            <div className={grid}>
              <div>
                <label className={label} htmlFor="q-date2">Call me on <span className={opt}>(optional)</span></label>
                <input id="q-date2" type="date" className={field} {...register("preferredDate")} />
              </div>
              <SelectField id="q-time2" label="Best time to call" options={timeOptions} reg={register("preferredTime")} />
            </div>
          )}

          <div>
            <label className={label} htmlFor="q-message">
              {queryType === "general" ? "Your query" : "Anything else we should know?"} {queryType !== "general" && <span className={opt}>(optional)</span>}
            </label>
            <textarea id="q-message" rows={compact ? 3 : 4} className={field} placeholder="Requirement, budget, timeline, questions…" {...register("message")} />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
          </div>
        </motion.div>
      </AnimatePresence>

      {status === "error" && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">Something went wrong. Please try again or call us directly.</p>}

      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === "sending" ? "Sending…" : tab.value === "callback" ? "Request callback" : tab.value === "site-visit" ? "Book site visit" : tab.value === "materials" ? "Request order & price" : tab.value === "guidance" ? "Book free consultation" : "Send query"}
      </Button>
      <p className="text-center text-xs text-ink-400">By submitting you agree to be contacted by Patel Sons. No spam, ever.</p>
    </form>
  );
}

function SelectField({
  id,
  label: text,
  options,
  reg,
}: {
  id: string;
  label: string;
  options: readonly { value: string; label: string }[];
  reg: ReturnType<ReturnType<typeof useForm<EnquiryInput>>["register"]>;
}) {
  return (
    <div>
      <label className={label} htmlFor={id}>{text}</label>
      <select id={id} className={field} {...reg}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
