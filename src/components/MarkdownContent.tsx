import React from "react";

type MarkdownContentProps = {
  content: string;
};

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] };

const headingPattern = /^(#{1,3})\s+(.+)$/;
const unorderedListPattern = /^-\s+(.+)$/;
const orderedListPattern = /^\d+\.\s+(.+)$/;
const inlinePattern =
  /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)/g;

const parseBlocks = (content: string): Block[] => {
  const lines = content.split(/\r?\n/);
  const blocks: Block[] = [];
  let paragraphLines: string[] = [];
  let unorderedItems: string[] = [];
  let orderedItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length === 0) {
      return;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" ").trim(),
    });
    paragraphLines = [];
  };

  const flushUnorderedList = () => {
    if (unorderedItems.length === 0) {
      return;
    }

    blocks.push({ type: "unordered-list", items: unorderedItems });
    unorderedItems = [];
  };

  const flushOrderedList = () => {
    if (orderedItems.length === 0) {
      return;
    }

    blocks.push({ type: "ordered-list", items: orderedItems });
    orderedItems = [];
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      continue;
    }

    const headingMatch = trimmedLine.match(headingPattern);
    if (headingMatch) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2].trim(),
      });
      continue;
    }

    const unorderedMatch = trimmedLine.match(unorderedListPattern);
    if (unorderedMatch) {
      flushParagraph();
      flushOrderedList();
      unorderedItems.push(unorderedMatch[1].trim());
      continue;
    }

    const orderedMatch = trimmedLine.match(orderedListPattern);
    if (orderedMatch) {
      flushParagraph();
      flushUnorderedList();
      orderedItems.push(orderedMatch[1].trim());
      continue;
    }

    flushUnorderedList();
    flushOrderedList();
    paragraphLines.push(trimmedLine);
  }

  flushParagraph();
  flushUnorderedList();
  flushOrderedList();

  return blocks;
};

const renderInlineMarkdown = (text: string) => {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(inlinePattern)) {
    const fullMatch = match[0];
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      nodes.push(text.slice(lastIndex, matchIndex));
    }

    if (match[2] && match[3]) {
      nodes.push(
        <a
          key={`${fullMatch}-${matchIndex}`}
          href={match[3]}
          target="_blank"
          rel="noreferrer"
        >
          {match[2]}
        </a>,
      );
    } else if (match[5]) {
      nodes.push(<strong key={`${fullMatch}-${matchIndex}`}>{match[5]}</strong>);
    } else if (match[7]) {
      nodes.push(<em key={`${fullMatch}-${matchIndex}`}>{match[7]}</em>);
    } else if (match[9]) {
      nodes.push(<code key={`${fullMatch}-${matchIndex}`}>{match[9]}</code>);
    }

    lastIndex = matchIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const blocks = parseBlocks(content);

  return (
    <div className="markdown-content">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 1) {
            return <h1 key={index}>{renderInlineMarkdown(block.text)}</h1>;
          }

          if (block.level === 2) {
            return <h2 key={index}>{renderInlineMarkdown(block.text)}</h2>;
          }

          return <h3 key={index}>{renderInlineMarkdown(block.text)}</h3>;
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInlineMarkdown(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInlineMarkdown(item)}</li>
              ))}
            </ol>
          );
        }

        return <p key={index}>{renderInlineMarkdown(block.text)}</p>;
      })}
    </div>
  );
};

export default MarkdownContent;
