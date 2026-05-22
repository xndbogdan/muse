import type { Metadata } from "next";
import { allEntriesSorted } from "@/content/entries";
import { EntryCard } from "@/components/entry-card";

export const metadata: Metadata = {
  title: "Notes",
  description: "Everything written in the notebook so far.",
};

export default function NotesPage() {
  const entries = allEntriesSorted();

  return (
    <div className="py-10">
      <header className="border-b border-line pb-8">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink">
          Notes
        </h1>
        <p className="mt-3 text-ink-soft">
          {entries.length} {entries.length === 1 ? "entry" : "entries"}, newest
          first. Slow writing — the live window lives on the{" "}
          <a
            href="/"
            className="text-ember-soft underline decoration-line underline-offset-4 hover:decoration-ember"
          >
            front page
          </a>
          .
        </p>
      </header>

      <div className="mt-2">
        {entries.map((entry) => (
          <EntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </div>
  );
}
