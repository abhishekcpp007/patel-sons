import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AdminPanel } from "@/components/admin/admin-panel";

export const metadata: Metadata = { title: "Staff panel", robots: { index: false, follow: false } };

export default function AdminPage() {
  return (
    <section className="min-h-[80vh] bg-ink-50 pb-24 pt-28 lg:pt-36">
      <Container>
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"><span className="h-px w-6 bg-current" /> Staff only</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">Orders, complaints & leads</h1>
        <p className="mt-2 text-sm text-ink-500">Update an order&apos;s status, vehicle and ETA and the customer sees it live on the tracking page. Reply to complaints here.</p>
        <div className="mt-8"><AdminPanel /></div>
      </Container>
    </section>
  );
}
