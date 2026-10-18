import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getSessionUser, phoneRegex, toPublic, updateUserPhone } from "@/lib/auth";

const schema = z.object({
  phone: z.string().trim().regex(phoneRegex, "Enter a valid 10-digit Indian mobile number"),
  whatsappOk: z.boolean().default(true),
});

export async function POST(request: NextRequest) {
  const user = await getSessionUser(request);
  if (!user) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  const phone = parsed.data.phone.replace(/[\s-]/g, "").replace(/^\+91/, "");
  const updated = await updateUserPhone(user.id, phone, parsed.data.whatsappOk);
  return NextResponse.json({ ok: true, user: updated ? toPublic(updated) : null });
}
