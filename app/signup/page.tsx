import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { CircleCheck, ShieldCheck, Phone, Bell } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SignupPanel } from "@/components/auth/signup-panel";
import { GoogleButton } from "@/components/auth/google-button";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = { ...pageMeta({ title: "Sign up", description: "Create your Patel Sons account with Google to track your queries, book site visits and get project updates.", path: "/signup" }), robots: { index: false, follow: true } };

const perks = [
  { Icon: Phone, t: "One-tap callbacks", s: "Your mobile number is saved, so raising a query takes seconds." },
  { Icon: Bell, t: "Project updates", s: "Launch news, construction progress and offers for projects you follow." },
  { Icon: CircleCheck, t: "Track your queries", s: "See every query, site visit and callback you've requested in one place." },
  { Icon: ShieldCheck, t: "Private by default", s: "We never share or sell your details. Opt out any time." },
];

export default function SignupPage() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-28 text-white lg:pb-24 lg:pt-36">
      <div className="grid-pattern absolute inset-0 -z-10 opacity-40" />
      <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400"><span className="h-px w-6 bg-current" /> Create your account</p>
          <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Sign up in two steps. Google, then your mobile number.</h1>
          <p className="mt-4 max-w-md text-ink-300">No passwords to remember. We use your Google account to sign you in and your mobile number to call or WhatsApp you about your queries.</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {perks.map(({ Icon, t, s }) => (
              <li key={t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <Icon className="h-5 w-5 text-brand-400" />
                <p className="mt-2 text-sm font-bold">{t}</p>
                <p className="mt-1 text-xs text-ink-300">{s}</p>
              </li>
            ))}
          </ul>
          <div className="relative mt-10 hidden aspect-[16/9] overflow-hidden rounded-3xl lg:block">
            <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Patel Sons row house" fill sizes="50vw" className="object-cover opacity-80" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="mx-auto w-full max-w-md rounded-[2rem] bg-white p-8 text-ink-900 shadow-soft">
            <ol className="flex items-center gap-3 text-xs font-semibold">
              <li className="flex items-center gap-2 text-brand-600"><span className="grid h-6 w-6 place-items-center rounded-full bg-brand-500 text-white">1</span> Google</li>
              <li className="h-px flex-1 bg-ink-200" />
              <li className="flex items-center gap-2 text-ink-400"><span className="grid h-6 w-6 place-items-center rounded-full bg-ink-100">2</span> Mobile number</li>
            </ol>
            <h2 className="mt-6 text-2xl font-bold">Continue with Google</h2>
            <p className="mt-1 text-sm text-ink-500">We only read your name, email and profile photo.</p>
            <div className="mt-6">
              <Suspense fallback={<GoogleButton />}>
                <SignupPanel />
              </Suspense>
            </div>
            <p className="mt-6 text-center text-xs text-ink-400">By continuing you agree to our <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
