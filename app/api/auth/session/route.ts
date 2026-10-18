import { NextResponse, type NextRequest } from "next/server";
import { getSessionUser, googleConfigured, devLoginEnabled, toPublic } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request);
  return NextResponse.json(
    { user: user ? toPublic(user) : null, providers: { google: googleConfigured(), dev: devLoginEnabled() } },
    { headers: { "Cache-Control": "no-store" } },
  );
}
