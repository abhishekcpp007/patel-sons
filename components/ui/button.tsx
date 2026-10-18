import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";
const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 hover:shadow-glow active:scale-[0.98]",
  secondary: "bg-ink-900 text-white hover:bg-ink-800 active:scale-[0.98]",
  outline: "border border-ink-900/15 bg-white text-ink-900 hover:border-ink-900 hover:bg-ink-50",
  ghost: "text-ink-900 hover:bg-ink-100",
  white: "bg-white text-ink-900 hover:bg-ink-100 active:scale-[0.98]",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type Props = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">)
);

export function Button({ variant = "primary", size = "md", className, children, ...rest }: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if ("href" in rest && rest.href) {
    const { href, ...linkProps } = rest;
    return (
      <Link href={href} className={cls} {...linkProps}>
        {children}
      </Link>
    );
  }
  const btnProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={cls} {...btnProps}>
      {children}
    </button>
  );
}
