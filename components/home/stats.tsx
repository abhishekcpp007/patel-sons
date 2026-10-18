import { company } from "@/content/company";
import { Container } from "@/components/ui/container";
import { Counter } from "@/components/ui/counter";

export function Stats() {
  return (
    <section className="relative z-10 -mt-12">
      <Container>
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-ink-900/5 lg:grid-cols-4">
          {company.stats.map((s, i) => (
            <div key={s.label} className={`px-6 py-8 text-center ${i % 2 === 1 ? "border-l border-ink-100" : ""} ${i >= 2 ? "border-t border-ink-100 lg:border-t-0 lg:border-l" : ""}`}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-medium text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
