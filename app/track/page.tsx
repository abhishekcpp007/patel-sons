import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { TrackOrder } from "@/components/materials/track-order";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Track Your Material Order", description: "Live status of your Patel Sons building material order: confirmed, packed, dispatched, out for delivery, delivered. Vehicle and driver details on dispatch.", path: "/track", noindex: true });

export default function TrackPage() {
  return (
    <>
      <PageHero eyebrow="Live order status" title="Track your materials from warehouse to site" text="Enter your order number (PS-…) or complaint ticket (HELP-…) with the mobile number you used. Status refreshes automatically." image="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80" crumbs={[{ name: "Home", path: "/" }, { name: "Materials", path: "/materials" }, { name: "Track order", path: "/track" }]} />
      <section className="py-16 lg:py-24">
        <Container className="max-w-4xl">
          <Suspense fallback={<div className="h-40 animate-pulse rounded-3xl bg-white/60" />}><TrackOrder /></Suspense>
        </Container>
      </section>
    </>
  );
}
