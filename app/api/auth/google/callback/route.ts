import { NextResponse, type NextRequest } from "next/server";
import {
  createSessionToken,
  exchangeGoogleCode,
  setSessionCookie,
  siteUrl,
  upsertGoogleUser,
  STATE_COOKIE,
  VERIFIER_COOKIE,
} from "@/lib/auth";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const code = params.get("code");
  const state = params.get("state");
  const [savedState, next = "/account"] = (request.cookies.get(STATE_COOKIE)?.value ?? "").split("|");
  const verifier = request.cookies.get(VERIFIER_COOKIE)?.value;

  const fail = (reason: string) => NextResponse.redirect(new URL(`/signup?error=${reason}`, siteUrl()));

  if (params.get("error")) return fail("google-denied");
  if (!code || !state || !savedState || state !== savedState || !verifier) return fail("state-mismatch");

  try {
    const profile = await exchangeGoogleCode(code, verifier, `${siteUrl()}/api/auth/google/callback`);
    const user = await upsertGoogleUser(profile);
    const token = await createSessionToken(user.id);
    const dest = user.phone ? next : "/account?step=phone";
    const res = NextResponse.redirect(new URL(dest, siteUrl()));
    setSessionCookie(res, token);
    res.cookies.set(STATE_COOKIE, "", { path: "/", maxAge: 0 });
    res.cookies.set(VERIFIER_COOKIE, "", { path: "/", maxAge: 0 });
    return res;
  } catch (err) {
    console.error("Google sign-in failed", err);
    return fail("google-failed");
  }
}
