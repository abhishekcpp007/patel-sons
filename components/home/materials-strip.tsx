import Link from "next/link";
import { ArrowRight, Truck, BadgeCheck, Wallet } from "lucide-react";
import { materialCategories } from "@/content/materials";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CategoryIcon } from "@/components/materials/category-icon";

export function MaterialsStrip() {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white lg:p-12">
          <div className="grid-pattern absolute inset-0 opacity-40" />
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-2">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400"><span className="h-px w-6 bg-current" /> Building materials</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Buy the materials we trust, at the rates we pay</h2>
              <p className="mt-3 text-ink-300">Cement, TMT steel, bricks, tiles, sanitaryware and paints from the brands on our own sites. Add to basket, request an order, delivered to your plot.</p>
              <ul className="mt-5 space-y-2 text-sm text-ink-200">
                <li className="flex items-center gap-2"><Wallet className="h-4 w-4 text-brand-400" /> Contractor volume rates</li>
                <li className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-brand-400" /> Grade checked by our engineer</li>
                <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-brand-400" /> Site delivery across Ahmedabad</li>
              </ul>
              <Button href="/materials" className="mt-6">Browse catalogue <ArrowRight className="h-4 w-4" /></Button>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:col-span-3">
              {materialCategories.map((c) => (
                <Link key={c.slug} href={`/materials/${c.slug}`} className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-brand-500 hover:bg-white/10">
                  <CategoryIcon icon={c.icon} className="h-6 w-6 text-brand-400" />
                  <p className="mt-3 text-sm font-semibold leading-snug">{c.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
