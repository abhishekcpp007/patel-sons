/** Client-safe constants shared with the server store. */
export const orderStatuses = ["received", "confirmed", "packed", "dispatched", "out-for-delivery", "delivered", "cancelled"] as const;
export type OrderStatus = (typeof orderStatuses)[number];
export const orderStatusLabel: Record<OrderStatus, string> = {
  received: "Order received",
  confirmed: "Price & stock confirmed",
  packed: "Packed at warehouse",
  dispatched: "Dispatched",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
export const ticketStatuses = ["open", "in-progress", "resolved", "closed"] as const;
export type TicketStatus = (typeof ticketStatuses)[number];
export const ticketStatusLabel: Record<TicketStatus, string> = { open: "Open", "in-progress": "In progress", resolved: "Resolved", closed: "Closed" };
export const issueTypes = [
  { value: "quantity-short", label: "Quantity short / under-weight" },
  { value: "damaged", label: "Damaged or broken on delivery" },
  { value: "wrong-grade", label: "Wrong grade, brand or size" },
  { value: "late", label: "Late delivery" },
  { value: "billing", label: "Billing / payment issue" },
  { value: "quality", label: "Quality concern after use" },
  { value: "other", label: "Something else" },
] as const;
