import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { createSessionToken, devLoginEnabled, setSessionCookie, upsertGoogleUser } from "@/lib/auth";

/**
 * Development-only sign-in that skips Google. Enabled ONLY when AUTH_DEV_LOGIN=true.
 * Remove that env var in production.
 */
const schema = z.object({ email: z.string().email(), name: z.string().trim().min(1).max(80) });

export async function POST(request: NextRequest) {
  if (!devLoginEnabled()) return NextResponse.json({ ok: false, error: "Dev login disabled" }, { status: 404 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 422 });
  const user = await upsertGoogleUser({ sub: `dev:${parsed.data.email.toLowerCase()}`, email: parsed.data.email, name: parsed.data.name });
  const res = NextResponse.json({ ok: true, needsPhone: !user.phone });
  setSessionCookie(res, await createSessionToken(user.id));
  return res;
}
