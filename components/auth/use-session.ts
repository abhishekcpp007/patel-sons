"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  picture: string | null;
  phone: string | null;
  whatsappOk: boolean;
}

interface SessionState {
  status: "loading" | "ready";
  user: SessionUser | null;
  providers: { google: boolean; dev: boolean };
}

let state: SessionState = { status: "loading", user: null, providers: { google: false, dev: false } };
const serverState = state;
const listeners = new Set<() => void>();
let inflight: Promise<void> | null = null;

function set(next: SessionState) {
  state = next;
  listeners.forEach((l) => l());
}

export async function refreshSession() {
  if (!inflight) {
    inflight = fetch("/api/auth/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((j) => set({ status: "ready", user: j.user ?? null, providers: j.providers ?? state.providers }))
      .catch(() => set({ ...state, status: "ready" }))
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

export async function signOut() {
  await fetch("/api/auth/logout", { method: "POST" });
  set({ ...state, user: null });
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function useSession() {
  const s = useSyncExternalStore(subscribe, () => state, () => serverState);
  useEffect(() => {
    if (state.status === "loading") void refreshSession();
  }, []);
  const refresh = useCallback(() => refreshSession(), []);
  return { ...s, refresh };
}
