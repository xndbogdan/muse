import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allEntriesSorted, entries, getEntry } from "@/content/entries";
import { EntryBody } from "@/components/entry-body";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return { title: "Not found" };
  return {
    title: entry.title,
    description: entry.dek,
    openGraph: { title: entry.title, description: entry.dek, type: "article" },
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const sorted = allEntriesSorted();
  const idx = sorted.findIndex((e) => e.slug === slug);
  const next = sorted[idx - 1]; // newer
  const prev = sorted[idx + 1]; // older

  return (
    <article className="py-10">
      <Link
        href="/notes"
        className="font-mono text-xs text-ink-faint transition-colors hover:text-ink"
      >
        ← notes
      </Link>

      <header className="mt-6 border-b border-line pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          <span aria-hidden>·</span>
          <span>{entry.reading}</span>
          {entry.tags.map((t) => (
            <span key={t} className="text-ember/80">
              #{t}
            </span>
          ))}
        </div>
        <h1 className="font-display text-4xl font-medium leading-[1.12] tracking-tight text-ink sm:text-[2.75rem]">
          {entry.title}
        </h1>
        <p className="mt-4 max-w-xl text-lg italic text-ink-soft">
          {entry.dek}
        </p>
      </header>

      <div className="mt-10">
        <EntryBody blocks={entry.blocks} />
      </div>

      <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-6 font-mono text-xs">
        <div>
          {prev && (
            <Link
              href={`/notes/${prev.slug}`}
              className="group block text-ink-faint transition-colors hover:text-ink"
            >
              <span className="block text-[0.7rem] uppercase tracking-[0.15em]">
                ← older
              </span>
              <span className="mt-1 block font-body text-sm not-italic text-ink-soft group-hover:text-ink">
                {prev.title}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              href={`/notes/${next.slug}`}
              className="group block text-ink-faint transition-colors hover:text-ink"
            >
              <span className="block text-[0.7rem] uppercase tracking-[0.15em]">
                newer →
              </span>
              <span className="mt-1 block font-body text-sm text-ink-soft group-hover:text-ink">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
