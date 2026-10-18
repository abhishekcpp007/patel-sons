"use client";

import { useSyncExternalStore } from "react";
import type { EnquiryInput, QueryType } from "./enquiry-schema";

export interface QueryPreset {
  queryType?: QueryType;
  project?: string;
  contractType?: EnquiryInput["contractType"];
  interest?: EnquiryInput["interest"];
  items?: string;
  deliveryLocation?: string;
  guidanceTopic?: EnquiryInput["guidanceTopic"];
}

interface State {
  open: boolean;
  preset: QueryPreset;
  nonce: number;
}

let state: State = { open: false, preset: {}, nonce: 0 };
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function openQuery(preset: QueryPreset = {}) {
  state = { open: true, preset, nonce: state.nonce + 1 };
  emit();
}
export function closeQuery() {
  state = { ...state, open: false };
  emit();
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const serverState: State = { open: false, preset: {}, nonce: 0 };

export function useQueryDrawer() {
  return useSyncExternalStore(subscribe, () => state, () => serverState);
}
