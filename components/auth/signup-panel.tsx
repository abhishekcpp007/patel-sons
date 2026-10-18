"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircleAlert } from "lucide-react";
import { useSession } from "./use-session";
import { GoogleButton } from "./google-button";
import { DevLogin } from "./dev-login";

const errors: Record<string, string> = {
  "not-configured": "Google sign-in is not configured on this server yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.",
  "google-denied": "You cancelled the Google sign-in. Try again whenever you're ready.",
  "state-mismatch": "The sign-in session expired. Please try again.",
  "google-failed": "Google sign-in failed. Please try again or contact us by phone.",
};

export function SignupPanel() {
  const { status, user, providers } = useSession();
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") ?? "/account";
  const error = params.get("error");

  useEffect(() => {
    if (status === "ready" && user) router.replace(user.phone ? next : "/account?step=phone");
  }, [status, user, next, router]);

  return (
    <div className="space-y-4">
      {error && (
        <p className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700"><CircleAlert className="mt-0.5 h-4 w-4 shrink-0" /> {errors[error] ?? "Something went wrong. Please try again."}</p>
      )}
      <GoogleButton next={next} />
      {status === "ready" && !providers.google && !providers.dev && (
        <p className="text-center text-xs text-ink-400">Google sign-in will be enabled once the site owner adds Google credentials.</p>
      )}
      {status === "ready" && providers.dev && <DevLogin next={next} />}
    </div>
  );
}
