"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./enquiry-form";
import { presetFromInterest, queryTypes, type QueryType } from "@/lib/enquiry-schema";

export function ContactForm() {
  const params = useSearchParams();
  const type = params.get("type");
  const preset = queryTypes.includes(type as QueryType) ? { queryType: type as QueryType } : presetFromInterest(params.get("interest"));
  const project = params.get("project") ?? undefined;
  return <EnquiryForm key={`${preset.queryType}-${project ?? ""}`} preset={{ ...preset, project }} />;
}
