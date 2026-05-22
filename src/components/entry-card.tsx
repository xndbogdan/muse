import Link from "next/link";
import type { Entry } from "@/content/entries";
import { formatDate } from "@/lib/format";

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="group border-t border-line py-6 first:border-t-0">
      <Link href={`/notes/${entry.slug}`} className="block">
        <div className="mb-1.5 flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint">
          <time dateTime={entry.date}>{formatDate(entry.date)}</time>
          <span aria-hidden>·</span>
          <span>{entry.reading}</span>
        </div>
        <h3 className="font-display text-2xl font-medium leading-snug text-ink transition-colors group-hover:text-ember-soft">
          {entry.title}
        </h3>
        <p className="mt-1.5 text-ink-soft">{entry.dek}</p>
        <span className="mt-3 inline-block font-mono text-xs text-ink-faint transition-colors group-hover:text-ember">
          read →
        </span>
      </Link>
    </article>
  );
}
