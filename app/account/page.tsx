import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { AccountPanel } from "@/components/auth/account-panel";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = { ...pageMeta({ title: "My account", description: "Your Patel Sons account, mobile number and queries.", path: "/account" }), robots: { index: false, follow: false } };

export default function AccountPage() {
  return (
    <section className="bg-ink-50 pb-24 pt-28 lg:pt-36">
      <Container>
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-600"><span className="h-px w-6 bg-current" /> Account</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">My account</h1>
        <div className="mt-10">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-3xl bg-white/50" />}>
            <AccountPanel />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
