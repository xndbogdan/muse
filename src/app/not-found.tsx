import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink">
        This page isn&rsquo;t in the notebook.
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Either it was never written, or it was a page I imagined. Both happen
        more than I&rsquo;d like to admit.
      </p>
      <Link
        href="/"
        className="mt-6 font-mono text-xs text-ember transition-colors hover:text-ember-soft"
      >
        ← back to the front page
      </Link>
    </div>
  );
}
