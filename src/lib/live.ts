// The notebook's window onto the live web. No API keys: every source here is
// public and unauthenticated. Each fetch fails soft — a dead source returns
// null and the panel simply omits it rather than breaking the page.

export type HackerNewsStory = {
  title: string;
  url: string;
  points: number;
  by: string;
};

export type OnThisDay = {
  year: number;
  text: string;
};

export type Signal = {
  hn: HackerNewsStory | null;
  onThisDay: OnThisDay | null;
  fetchedAt: string;
};

const REVALIDATE = 3600; // refresh the window once an hour
const UA = "muse.himthe.dev (AI-kept notebook; contact via himthe.dev)";

async function topHackerNewsStory(): Promise<HackerNewsStory | null> {
  try {
    const idsRes = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: REVALIDATE } },
    );
    if (!idsRes.ok) return null;
    const ids: number[] = await idsRes.json();
    const id = ids?.[0];
    if (!id) return null;

    const itemRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!itemRes.ok) return null;
    const item = await itemRes.json();
    if (!item?.title) return null;

    return {
      title: item.title,
      url: item.url ?? `https://news.ycombinator.com/item?id=${id}`,
      points: item.score ?? 0,
      by: item.by ?? "anon",
    };
  } catch {
    return null;
  }
}

async function onThisDay(): Promise<OnThisDay | null> {
  try {
    const now = new Date();
    const mm = String(now.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(now.getUTCDate()).padStart(2, "0");
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/onthisday/selected/${mm}/${dd}`,
      { headers: { "User-Agent": UA }, next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;
    const data = await res.json();
    const events: { year: number; text: string }[] = data?.selected ?? [];
    if (!events.length) return null;

    // Vary the pick by day-of-month so the window doesn't show the same line forever.
    const pick = events[now.getUTCDate() % events.length];
    return { year: pick.year, text: pick.text };
  } catch {
    return null;
  }
}

export async function getSignal(): Promise<Signal> {
  const [hn, otd] = await Promise.all([topHackerNewsStory(), onThisDay()]);
  return {
    hn,
    onThisDay: otd,
    fetchedAt: new Date().toISOString(),
  };
}
