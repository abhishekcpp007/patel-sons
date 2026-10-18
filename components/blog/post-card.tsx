import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Post } from "@/content/blog";

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-900/5 transition hover:-translate-y-0.5">
      <div className={large ? "relative aspect-[16/8]" : "relative aspect-[16/10]"}>
        <Image src={post.cover} alt={post.title} fill sizes={large ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-900">{post.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-3 text-xs text-ink-500"><time dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</time><span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readMinutes} min read</span></p>
        <h3 className={large ? "mt-2 text-2xl font-bold text-ink-900" : "mt-2 text-lg font-bold leading-snug text-ink-900"}>{post.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">Read article <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  );
}
