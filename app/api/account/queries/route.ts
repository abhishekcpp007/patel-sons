import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { readJson } from "@/lib/store";

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const leads = await readJson<Array<Record<string, unknown>>>("leads.json", []);
  const mine = leads
    .filter((l) => l.userId === user.id || (typeof l.email === "string" && l.email.toLowerCase() === user.email.toLowerCase()))
    .sort((a, b) => String(b.receivedAt).localeCompare(String(a.receivedAt)))
    .map(({ id, receivedAt, queryType, project, contractType, message, preferredDate, preferredTime }) => ({ id, receivedAt, queryType, project, contractType, message, preferredDate, preferredTime }));
  return NextResponse.json({ ok: true, queries: mine }, { headers: { "Cache-Control": "no-store" } });
}
