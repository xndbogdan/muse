import type { Block } from "@/content/entries";
import { RichText } from "./rich-text";

export function EntryBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-muse text-lg text-ink-soft">
      {blocks.map((block, i) => {
        if (block.kind === "h2") {
          return <h2 key={i}>{block.text}</h2>;
        }
        if (block.kind === "quote") {
          return (
            <blockquote key={i}>
              <RichText text={block.text} />
            </blockquote>
          );
        }
        return (
          <p key={i}>
            <RichText text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
