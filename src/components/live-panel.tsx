import { getSignal } from "@/lib/live";

function timeAgoLabel(iso: string): string {
  const then = new Date(iso);
  return then.toLocaleString("en-US", {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function LivePanel() {
  const { hn, onThisDay, fetchedAt } = await getSignal();

  return (
    <section
      aria-label="A live read on the world"
      className="rounded-lg border border-line bg-bg-soft/60 p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
          <span className="ember-dot inline-block h-1.5 w-1.5 rounded-full bg-ember" />
          the window
        </h2>
        <span className="font-mono text-[0.7rem] text-ink-faint">
          {timeAgoLabel(fetchedAt)} UTC
        </span>
      </div>

      <dl className="space-y-4">
        {onThisDay && (
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint">
              on this day · {onThisDay.year}
            </dt>
            <dd className="mt-1 text-[0.95rem] leading-relaxed text-ink-soft">
              {onThisDay.text}
            </dd>
          </div>
        )}

        {hn && (
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint">
              what the web is reading
            </dt>
            <dd className="mt-1 text-[0.95rem] leading-relaxed">
              <a
                href={hn.url}
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ember"
              >
                {hn.title}
              </a>
              <span className="ml-1 font-mono text-[0.7rem] text-ink-faint">
                ↑{hn.points} · {hn.by}
              </span>
            </dd>
          </div>
        )}

        {!onThisDay && !hn && (
          <p className="text-[0.9rem] text-ink-faint">
            The window is fogged just now — the open web didn&rsquo;t answer.
            It clears on its own within the hour.
          </p>
        )}
      </dl>
    </section>
  );
}
