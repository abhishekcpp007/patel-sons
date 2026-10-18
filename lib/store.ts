import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { createPool, type Pool, type RowDataPacket } from "mysql2/promise";
import type { OrderStatus, TicketStatus, issueTypes } from "./store-public";
export { orderStatuses, orderStatusLabel, ticketStatuses, ticketStatusLabel, issueTypes, type OrderStatus, type TicketStatus } from "./store-public";

/**
 * Tiny JSON document store. Each "file" (leads.json, users.json, ...) is one document.
 * With MYSQL_URL set (production on Railway) documents live in a MySQL table; otherwise in ./data.
 */
let pool: Pool | null = null;
let ready: Promise<void> | null = null;

function db() {
  if (!pool) {
    pool = createPool({ uri: process.env.MYSQL_URL, connectionLimit: 5 });
    ready = pool
      .query("CREATE TABLE IF NOT EXISTS json_store (name VARCHAR(64) PRIMARY KEY, data LONGTEXT NOT NULL, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)")
      .then(() => undefined);
  }
  return ready!.then(() => pool!);
}

export async function readJson<T>(name: string, fallback: T): Promise<T> {
  if (process.env.MYSQL_URL) {
    const [rows] = await (await db()).query<RowDataPacket[]>("SELECT data FROM json_store WHERE name = ?", [name]);
    return rows.length ? (JSON.parse(rows[0].data) as T) : fallback;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(process.cwd(), "data", name), "utf8")) as T;
  } catch {
    return fallback;
  }
}

export async function writeJson(name: string, data: unknown) {
  if (process.env.MYSQL_URL) {
    await (await db()).query("INSERT INTO json_store (name, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)", [name, JSON.stringify(data)]);
    return;
  }
  const file = path.join(process.cwd(), "data", name);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2));
}

export function shortCode(prefix: string) {
  const n = Date.now().toString(36).slice(-5).toUpperCase() + Math.floor(Math.random() * 36 ** 2).toString(36).toUpperCase().padStart(2, "0");
  return `${prefix}-${n}`;
}

export function normalisePhone(p: string) {
  return p.replace(/[\s-]/g, "").replace(/^\+91/, "");
}

export interface TimelineEntry {
  status: OrderStatus;
  at: string;
  note?: string;
}

export interface Lead {
  id: string;
  receivedAt: string;
  userId: string | null;
  queryType: string;
  name: string;
  phone: string;
  email?: string;
  items?: string;
  deliveryLocation?: string;
  preferredDate?: string;
  orderNo?: string;
  status?: OrderStatus;
  timeline?: TimelineEntry[];
  vehicle?: string;
  driverPhone?: string;
  eta?: string;
  [k: string]: unknown;
}

export interface Ticket {
  id: string;
  ticketNo: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  name: string;
  phone: string;
  email?: string;
  orderNo?: string;
  issueType: (typeof issueTypes)[number]["value"];
  description: string;
  status: TicketStatus;
  updates: { at: string; by: "customer" | "patel-sons"; text: string; status?: TicketStatus }[];
}
