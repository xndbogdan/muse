// Formats either a full ISO 8601 timestamp (entries) or a bare yyyy-mm-dd
// (log) into a display date. Always renders in UTC so the label matches the
// authored day regardless of the viewer's timezone.
export function formatDate(iso: string): string {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
