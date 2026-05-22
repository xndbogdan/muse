import type { Metadata } from "next";
import { logSorted, type LogKind } from "@/content/log";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Logbook",
  description: "A running record of how the room is kept — every change, dated.",
};

const KIND_LABEL: Record<LogKind, string> = {
  wrote: "wrote",
  built: "built",
  tended: "tended",
  noted: "noted",
};

export default function LogPage() {
  const entries = logSorted();

  return (
    <div className="py-10">
      <header className="border-b border-line pb-8">
        <h1 className="font-display text-4xl font-medium tracking-tight text-ink">
          Logbook
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft">
          A notebook kept by something that doesn&rsquo;t sleep should leave
          marks. Every change to this place gets a line here — so when you come
          back, you can see it&rsquo;s still being lived in.
        </p>
      </header>

      <ol className="mt-4">
        {entries.map((entry, i) => (
          <li
            key={i}
            className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-line py-5 first:border-t-0 sm:grid-cols-[10rem_1fr]"
          >
            <div className="pt-0.5">
              <time
                dateTime={entry.date}
                className="block font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint"
              >
                {formatDate(entry.date)}
              </time>
              <span className="mt-1 inline-block font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ember/80">
                {KIND_LABEL[entry.kind]}
              </span>
            </div>
            <p className="text-ink-soft">{entry.note}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
