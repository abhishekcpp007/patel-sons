import "server-only";
import { readJson, writeJson } from "./store";
import { SignJWT, jwtVerify, createRemoteJWKSet } from "jose";
import type { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "ps_session";
export const STATE_COOKIE = "ps_oauth_state";
export const VERIFIER_COOKIE = "ps_oauth_verifier";
const SESSION_DAYS = 30;

export interface User {
  id: string;
  googleSub: string | null;
  email: string;
  name: string;
  picture: string | null;
  phone: string | null;
  whatsappOk: boolean;
  createdAt: string;
  updatedAt: string;
}

export type PublicUser = Omit<User, "googleSub">;

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function devLoginEnabled() {
  return process.env.AUTH_DEV_LOGIN === "true";
}

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 16) throw new Error("AUTH_SECRET env var must be set (at least 16 characters)");
  return new TextEncoder().encode(s);
}

/* ---------- users store (see lib/store.ts) ---------- */

async function readUsers(): Promise<User[]> {
  return readJson<User[]>("users.json", []);
}

async function writeUsers(users: User[]) {
  await writeJson("users.json", users);
}

export async function findUserById(id: string) {
  return (await readUsers()).find((u) => u.id === id) ?? null;
}

export async function upsertGoogleUser(profile: { sub: string; email: string; name: string; picture?: string }) {
  const users = await readUsers();
  const now = new Date().toISOString();
  let user = users.find((u) => u.googleSub === profile.sub) ?? users.find((u) => u.email.toLowerCase() === profile.email.toLowerCase());
  if (user) {
    user.googleSub = profile.sub;
    user.name = profile.name || user.name;
    user.picture = profile.picture ?? user.picture;
    user.updatedAt = now;
  } else {
    user = {
      id: crypto.randomUUID(),
      googleSub: profile.sub,
      email: profile.email,
      name: profile.name,
      picture: profile.picture ?? null,
      phone: null,
      whatsappOk: true,
      createdAt: now,
      updatedAt: now,
    };
    users.push(user);
  }
  await writeUsers(users);
  return user;
}

export async function updateUserPhone(id: string, phone: string, whatsappOk: boolean) {
  const users = await readUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  user.phone = phone;
  user.whatsappOk = whatsappOk;
  user.updatedAt = new Date().toISOString();
  await writeUsers(users);
  return user;
}

export function toPublic(u: User): PublicUser {
  const { googleSub: _s, ...rest } = u;
  void _s;
  return rest;
}

/* ---------- session cookie (signed JWT) ---------- */

export async function createSessionToken(userId: string) {
  return new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secret());
}

export async function readSessionUserId(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return typeof payload.uid === "string" ? payload.uid : null;
  } catch {
    return null;
  }
}

export async function getSessionUser(request: NextRequest): Promise<User | null> {
  const uid = await readSessionUserId(request.cookies.get(SESSION_COOKIE)?.value);
  return uid ? findUserById(uid) : null;
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: siteUrl().startsWith("https://"),
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

/* ---------- Google OAuth (PKCE) ---------- */

const GOOGLE_AUTH = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN = "https://oauth2.googleapis.com/token";
const GOOGLE_JWKS = createRemoteJWKSet(new URL("https://www.googleapis.com/oauth2/v3/certs"));

function b64url(bytes: Uint8Array) {
  return Buffer.from(bytes).toString("base64url");
}

export async function buildGoogleAuthUrl(redirectUri: string) {
  const state = b64url(crypto.getRandomValues(new Uint8Array(24)));
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(48)));
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const challenge = b64url(new Uint8Array(digest));
  const url = new URL(GOOGLE_AUTH);
  url.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("prompt", "select_account");
  return { url: url.toString(), state, verifier };
}

export async function exchangeGoogleCode(code: string, verifier: string, redirectUri: string) {
  const body = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
    code_verifier: verifier,
  });
  const res = await fetch(GOOGLE_TOKEN, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!res.ok) throw new Error(`Google token exchange failed: ${res.status}`);
  const json = (await res.json()) as { id_token?: string };
  if (!json.id_token) throw new Error("Google did not return an id_token");
  const { payload } = await jwtVerify(json.id_token, GOOGLE_JWKS, {
    issuer: ["https://accounts.google.com", "accounts.google.com"],
    audience: process.env.GOOGLE_CLIENT_ID!,
  });
  if (!payload.email || payload.email_verified !== true) throw new Error("Google account email is not verified");
  return {
    sub: String(payload.sub),
    email: String(payload.email),
    name: String(payload.name ?? payload.email),
    picture: typeof payload.picture === "string" ? payload.picture : undefined,
  };
}

export const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/;
