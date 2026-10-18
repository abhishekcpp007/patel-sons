import { company } from "@/content/company";
import { WhatsAppIcon } from "@/components/icons/social";

export function WhatsAppButton() {
  const text = encodeURIComponent("Hi Patel Sons, I'd like to know more about your projects / contract services.");
  return (
    <a
      href={`https://wa.me/${company.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-white shadow-[0_10px_30px_-8px_rgb(37_211_102_/_0.7)] transition-transform hover:scale-105"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="text-sm font-semibold">Chat with us</span>
    </a>
  );
}
