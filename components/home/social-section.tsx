import Image from "next/image";
import { Play, ArrowUpRight } from "lucide-react";
import { company } from "@/content/company";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "@/components/icons/social";

const videos = [
  { title: "Shivalik Greens — Slab casting, Tower B", time: "6:42", img: projects[0].gallery[1] },
  { title: "Site tour: Sarthak Villas handover day", time: "4:15", img: projects[2].gallery[2] },
  { title: "Labour vs with-material contract explained", time: "9:03", img: projects[4].gallery[1] },
];

export function SocialSection() {
  const insta = projects.flatMap((p) => p.gallery).slice(0, 6);
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading align="center" eyebrow="Follow our sites" title="Daily progress on Instagram, Facebook & YouTube" text="See concrete being poured, walls going up and families moving in. We post from every site, every week." />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <a href={company.social.youtube.url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-video overflow-hidden rounded-3xl bg-ink-900 shadow-soft">
              <Image src={videos[0].img} alt={videos[0].title} fill sizes="(min-width:1024px) 60vw, 100vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#FF0000] text-white shadow-[0_10px_40px_-8px_rgb(255_0_0_/_0.8)] transition-transform group-hover:scale-110">
                <Play className="ml-1 h-8 w-8 fill-current" />
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 text-white">
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-300"><YoutubeIcon className="h-4 w-4 text-[#FF0000]" /> {company.social.youtube.handle}</p>
                  <p className="mt-1 text-lg font-bold">{videos[0].title}</p>
                </div>
                <span className="rounded-md bg-black/60 px-2 py-0.5 text-xs font-semibold">{videos[0].time}</span>
              </div>
            </a>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {videos.slice(1).map((v) => (
                <a key={v.title} href={company.social.youtube.url} target="_blank" rel="noopener noreferrer" className="group flex gap-4 rounded-2xl bg-white p-3 shadow-soft ring-1 ring-ink-900/5">
                  <span className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl">
                    <Image src={v.img} alt={v.title} fill sizes="128px" className="object-cover" />
                    <span className="absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] font-semibold text-white">{v.time}</span>
                  </span>
                  <span className="flex flex-col justify-center">
                    <span className="text-sm font-semibold leading-snug text-ink-900 group-hover:text-brand-600">{v.title}</span>
                    <span className="mt-1 text-xs text-ink-500">Patel Sons · YouTube</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="rounded-3xl bg-white p-5 shadow-soft ring-1 ring-ink-900/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white"><InstagramIcon className="h-5 w-5" /></span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{company.social.instagram.handle}</p>
                    <p className="text-xs text-ink-500">12.4k followers · 380 posts</p>
                  </div>
                </div>
                <a href={company.social.instagram.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-500">Follow</a>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-1.5">
                {insta.map((src, i) => (
                  <a key={i} href={company.social.instagram.url} target="_blank" rel="noopener noreferrer" className="group relative aspect-square overflow-hidden rounded-lg">
                    <Image src={src} alt="" fill sizes="150px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </a>
                ))}
              </div>
              <a href={company.social.facebook.url} target="_blank" rel="noopener noreferrer" className="mt-5 flex items-center justify-between rounded-2xl bg-[#1877F2]/8 p-4 transition hover:bg-[#1877F2]/15">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#1877F2] text-white"><FacebookIcon className="h-5 w-5" /></span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">Patel Sons Construction</p>
                    <p className="text-xs text-ink-500">8.9k likes · Launch updates & offers</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#1877F2]" />
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
