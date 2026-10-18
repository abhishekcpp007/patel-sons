import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { readJson, writeJson, shortCode, normalisePhone, issueTypes, type Ticket } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email().max(120).optional().or(z.literal("")),
  orderNo: z.string().trim().max(20).optional().or(z.literal("")),
  issueType: z.enum(issueTypes.map((i) => i.value) as [string, ...string[]]),
  description: z.string().trim().min(10, "Please describe the issue").max(2000),
  website: z.string().max(0).optional(),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const user = await getSessionUser(request);
  const now = new Date().toISOString();
  const ticket: Ticket = {
    id: crypto.randomUUID(),
    ticketNo: shortCode("HELP"),
    createdAt: now,
    updatedAt: now,
    userId: user?.id ?? null,
    name: parsed.data.name,
    phone: normalisePhone(parsed.data.phone),
    email: parsed.data.email || undefined,
    orderNo: parsed.data.orderNo?.toUpperCase() || undefined,
    issueType: parsed.data.issueType as Ticket["issueType"],
    description: parsed.data.description,
    status: "open",
    updates: [{ at: now, by: "patel-sons", text: "Complaint received. A support engineer will call you within 2 working hours.", status: "open" }],
  };
  const tickets = await readJson<Ticket[]>("tickets.json", []);
  tickets.push(ticket);
  await writeJson("tickets.json", tickets);
  return NextResponse.json({ ok: true, ticketNo: ticket.ticketNo });
}

/** Track a ticket by number + phone */
export async function GET(request: NextRequest) {
  const no = request.nextUrl.searchParams.get("ticket")?.trim().toUpperCase();
  const phone = normalisePhone(request.nextUrl.searchParams.get("phone") ?? "");
  const user = await getSessionUser(request);
  const tickets = await readJson<Ticket[]>("tickets.json", []);
  if (no) {
    const t = tickets.find((x) => x.ticketNo === no && (x.phone === phone || (user && x.userId === user.id)));
    if (!t) return NextResponse.json({ ok: false, error: "No complaint found for that number and phone." }, { status: 404 });
    return NextResponse.json({ ok: true, ticket: t }, { headers: { "Cache-Control": "no-store" } });
  }
  if (user) {
    return NextResponse.json({ ok: true, tickets: tickets.filter((t) => t.userId === user.id || t.phone === user.phone) }, { headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json({ ok: false, error: "Provide ticket and phone" }, { status: 400 });
}

