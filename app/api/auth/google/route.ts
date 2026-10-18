import { NextResponse, type NextRequest } from "next/server";
import { connection } from "next/server";
import { buildGoogleAuthUrl, googleConfigured, siteUrl, STATE_COOKIE, VERIFIER_COOKIE } from "@/lib/auth";

export async function GET(request: NextRequest) {
  await connection(); // always run at request time so env changes (Google credentials) take effect
  if (!googleConfigured()) {
    return NextResponse.redirect(new URL("/signup?error=not-configured", siteUrl()));
  }
  const next = request.nextUrl.searchParams.get("next") ?? "/account";
  const redirectUri = `${siteUrl()}/api/auth/google/callback`;
  const { url, state, verifier } = await buildGoogleAuthUrl(redirectUri);
  const res = NextResponse.redirect(url);
  const opts = { httpOnly: true, sameSite: "lax" as const, secure: siteUrl().startsWith("https://"), path: "/", maxAge: 600 };
  res.cookies.set(STATE_COOKIE, `${state}|${next.startsWith("/") ? next : "/account"}`, opts);
  res.cookies.set(VERIFIER_COOKIE, verifier, opts);
  return res;
}
