import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { isAdmin } from "@/lib/admin";
import { readJson, writeJson, ticketStatuses, type Ticket } from "@/lib/store";

const schema = z.object({ status: z.enum(ticketStatuses), text: z.string().trim().min(1).max(500) });

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 422 });
  const tickets = await readJson<Ticket[]>("tickets.json", []);
  const t = tickets.find((x) => x.id === id || x.ticketNo === id);
  if (!t) return NextResponse.json({ ok: false, error: "Ticket not found" }, { status: 404 });
  const now = new Date().toISOString();
  t.status = parsed.data.status;
  t.updatedAt = now;
  t.updates.push({ at: now, by: "patel-sons", text: parsed.data.text, status: parsed.data.status });
  await writeJson("tickets.json", tickets);
  return NextResponse.json({ ok: true, ticket: t });
}
