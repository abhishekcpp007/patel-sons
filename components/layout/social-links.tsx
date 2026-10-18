import { company } from "@/content/company";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/social";
import { cn } from "@/lib/utils";

const items = [
  { key: "instagram", Icon: InstagramIcon, hover: "hover:bg-[#E1306C]" },
  { key: "facebook", Icon: FacebookIcon, hover: "hover:bg-[#1877F2]" },
  { key: "youtube", Icon: YoutubeIcon, hover: "hover:bg-[#FF0000]" },
] as const;

export function SocialLinks({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {items.map(({ key, Icon, hover }) => {
        const s = company.social[key];
        return (
          <a
            key={key}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.handle}
            className={cn(
              "grid place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:-translate-y-0.5 hover:border-transparent hover:shadow-soft",
              size === "md" ? "h-10 w-10" : "h-12 w-12",
              hover,
            )}
          >
            <Icon className={size === "md" ? "h-4.5 w-4.5" : "h-5 w-5"} />
          </a>
        );
      })}
    </div>
  );
}
