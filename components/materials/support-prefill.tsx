"use client";

import { useSearchParams } from "next/navigation";
import { ComplaintForm } from "./complaint-form";

export function SupportOrderPrefill() {
  const params = useSearchParams();
  return <ComplaintForm orderNo={params.get("order") ?? undefined} />;
}
