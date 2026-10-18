import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin";
import { readJson, writeJson, orderStatuses, type Lead } from "@/lib/store";

const schema = z.object({
  status: z.enum(orderStatuses),
  note: z.string().trim().max(300).optional(),
  vehicle: z.string().trim().max(40).optional(),
  driverPhone: z.string().trim().max(20).optional(),
  eta: z.string().trim().max(60).optional(),
});

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  const leads = await readJson<Lead[]>("leads.json", []);
  const lead = leads.find((l) => l.id === id || l.orderNo === id);
  if (!lead) return NextResponse.json({ ok: false, error: "Order not found" }, { status: 404 });
  const now = new Date().toISOString();
  lead.status = parsed.data.status;
  lead.timeline = [...(lead.timeline ?? []), { status: parsed.data.status, at: now, note: parsed.data.note }];
  if (parsed.data.vehicle !== undefined) lead.vehicle = parsed.data.vehicle;
  if (parsed.data.driverPhone !== undefined) lead.driverPhone = parsed.data.driverPhone;
  if (parsed.data.eta !== undefined) lead.eta = parsed.data.eta;
  await writeJson("leads.json", leads);
  return NextResponse.json({ ok: true, order: lead });
}
