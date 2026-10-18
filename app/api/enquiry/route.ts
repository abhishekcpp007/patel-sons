import { enquirySchema } from "@/lib/enquiry-schema";
import { getSessionUser } from "@/lib/auth";
import { readJson, writeJson, shortCode } from "@/lib/store";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  if (parsed.data.website) {
    // honeypot filled → silently accept
    return Response.json({ ok: true });
  }

  const { website: _ignored, ...data } = parsed.data;
  void _ignored;
  const sessionUser = await getSessionUser(request);
  const now = new Date().toISOString();
  const order =
    data.queryType === "materials"
      ? { orderNo: shortCode("PS"), status: "received" as const, timeline: [{ status: "received" as const, at: now, note: "Order request received. Our engineer will confirm price, stock and delivery slot." }] }
      : {};
  const lead = { id: crypto.randomUUID(), receivedAt: now, userId: sessionUser?.id ?? null, ...data, ...order };

  try {
    const leads = await readJson<unknown[]>("leads.json", []);
    leads.push(lead);
    await writeJson("leads.json", leads);
  } catch (err) {
    console.error("Failed to store lead", err);
    return Response.json({ ok: false, error: "Could not save enquiry" }, { status: 500 });
  }

  return Response.json({ ok: true, id: lead.id, orderNo: "orderNo" in lead ? lead.orderNo : undefined });
}
