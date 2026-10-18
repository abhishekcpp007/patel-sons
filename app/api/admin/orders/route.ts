import { NextResponse, type NextRequest } from "next/server";
import { isAdmin } from "@/lib/admin";
import { readJson, type Lead, type Ticket } from "@/lib/store";

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  const leads = await readJson<Lead[]>("leads.json", []);
  const tickets = await readJson<Ticket[]>("tickets.json", []);
  return NextResponse.json(
    {
      ok: true,
      orders: leads.filter((l) => l.queryType === "materials" && l.orderNo).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)),
      leads: leads.filter((l) => l.queryType !== "materials").sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)).slice(0, 100),
      tickets: tickets.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
