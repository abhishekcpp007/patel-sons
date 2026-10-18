import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { readJson, writeJson, normalisePhone, type Lead } from "@/lib/store";
import { getSessionUser } from "@/lib/auth";
import { seedReviews, type Review } from "@/content/reviews";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(/^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/, "Enter a valid 10-digit Indian mobile number").optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5),
  product: z.string().trim().max(120).optional().or(z.literal("")),
  category: z.string().trim().max(60).optional().or(z.literal("")),
  text: z.string().trim().min(10, "Please write at least a sentence").max(1000),
  website: z.string().max(0).optional(),
});

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const stored = await readJson<Review[]>("reviews.json", []);
  const all = [...stored.filter((r) => r.approved), ...seedReviews].filter((r) => !category || r.category === category);
  const avg = all.length ? all.reduce((s, r) => s + r.rating, 0) / all.length : 0;
  return NextResponse.json({ ok: true, reviews: all.sort((a, b) => b.date.localeCompare(a.date)), count: all.length, average: Math.round(avg * 10) / 10 }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const user = await getSessionUser(request);
  const phone = parsed.data.phone ? normalisePhone(parsed.data.phone) : user?.phone ?? "";
  // "Verified buyer" = we have a material order from this phone or account
  const leads = await readJson<Lead[]>("leads.json", []);
  const verified = leads.some((l) => l.queryType === "materials" && ((user && l.userId === user.id) || (phone && normalisePhone(String(l.phone)) === phone)));
  const review: Review = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    rating: parsed.data.rating,
    product: parsed.data.product || undefined,
    category: parsed.data.category || undefined,
    text: parsed.data.text,
    date: new Date().toISOString().slice(0, 10),
    verified,
    approved: true, // auto-publish; flip to false if you want to moderate in /admin
  };
  const stored = await readJson<Review[]>("reviews.json", []);
  stored.push(review);
  await writeJson("reviews.json", stored);
  return NextResponse.json({ ok: true, review });
}
