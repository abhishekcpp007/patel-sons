import { NextResponse, type NextRequest } from "next/server";
import { readJson, normalisePhone, orderStatusLabel, type Lead } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";

function publicOrder(l: Lead) {
  return {
    orderNo: l.orderNo,
    placedAt: l.receivedAt,
    status: l.status ?? "received",
    statusLabel: orderStatusLabel[l.status ?? "received"],
    timeline: l.timeline ?? [],
    items: l.items,
    deliveryLocation: l.deliveryLocation,
    preferredDate: l.preferredDate,
    vehicle: l.vehicle,
    driverPhone: l.driverPhone,
    eta: l.eta,
  };
}

/** GET /api/track?order=PS-XXXX&phone=98765... (or signed-in user's own orders) */
export async function GET(request: NextRequest) {
  const orderNo = request.nextUrl.searchParams.get("order")?.trim().toUpperCase();
  const phone = normalisePhone(request.nextUrl.searchParams.get("phone") ?? "");
  const user = await getSessionUser(request);
  const leads = await readJson<Lead[]>("leads.json", []);
  const orders = leads.filter((l) => l.queryType === "materials" && l.orderNo);

  if (orderNo) {
    const o = orders.find((l) => l.orderNo === orderNo && (normalisePhone(String(l.phone)) === phone || (user && l.userId === user.id)));
    if (!o) return NextResponse.json({ ok: false, error: "No order found for that order number and phone." }, { status: 404 });
    return NextResponse.json({ ok: true, order: publicOrder(o) }, { headers: { "Cache-Control": "no-store" } });
  }
  if (user) {
    const mine = orders.filter((l) => l.userId === user.id || (user.phone && normalisePhone(String(l.phone)) === user.phone)).map(publicOrder);
    return NextResponse.json({ ok: true, orders: mine }, { headers: { "Cache-Control": "no-store" } });
  }
  return NextResponse.json({ ok: false, error: "Provide order and phone" }, { status: 400 });
}
