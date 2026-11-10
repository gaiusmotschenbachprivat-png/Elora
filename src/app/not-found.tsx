import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-elora flex min-h-[70vh] flex-col items-start justify-center pt-32 pb-24">
      <p className="eyebrow text-citrus-700">404</p>
      <h1 className="mt-5 text-h2 font-light text-forest-900">Diese Seite gibt es (noch) nicht.</h1>
      <p className="mt-4 max-w-md text-ink-soft">Vielleicht findest du, was du suchst, auf unserer Startseite.</p>
      <LinkButton href="/" className="mt-8" arrow>
        Zur Startseite
      </LinkButton>
    </section>
  );
}
