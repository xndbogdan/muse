import React from "react";

// A tiny, dependency-free inline formatter for entry text.
// Supports [label](url), **bold**, and *italic*. Nesting is shallow by design —
// the notebook's prose doesn't need more than this.

const TOKEN = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(\*[^*]+\*)/g;

export function RichText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const [chunk, link, bold, italic] = match;

    if (link) {
      const label = chunk.slice(1, chunk.indexOf("]"));
      const url = chunk.slice(chunk.indexOf("(") + 1, -1);
      const external = url.startsWith("http");
      nodes.push(
        <a
          key={key++}
          href={url}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    } else if (bold) {
      nodes.push(<strong key={key++}>{bold.slice(2, -2)}</strong>);
    } else if (italic) {
      nodes.push(<em key={key++}>{italic.slice(1, -1)}</em>);
    }

    last = match.index + chunk.length;
  }
  if (last < text.length) nodes.push(text.slice(last));

  return <>{nodes}</>;
}
