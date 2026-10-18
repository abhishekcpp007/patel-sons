import "server-only";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE = "ps_admin";

export function adminToken() {
  return process.env.ADMIN_TOKEN ?? "";
}

export function isAdmin(request: NextRequest) {
  const t = adminToken();
  return Boolean(t) && request.cookies.get(ADMIN_COOKIE)?.value === t;
}
