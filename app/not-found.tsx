import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink-950 pt-20 text-white">
      <Container className="text-center">
        <p className="font-display text-8xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 text-3xl font-bold">This page hasn&apos;t been built yet.</h1>
        <p className="mt-3 text-ink-300">The link may be old or mistyped.</p>
        <div className="mt-8 flex justify-center gap-3"><Button href="/">Go home</Button><Button href="/projects" variant="white">View projects</Button></div>
      </Container>
    </section>
  );
}
