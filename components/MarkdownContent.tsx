import type { ReactNode } from "react";

function InlineCode({ children }: { children: string }) {
  return (
    <code className="rounded border border-line bg-black/45 px-1.5 py-0.5 font-mono text-[0.85em] text-electric">
      {children}
    </code>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return <InlineCode key={index}>{part.slice(1, -1)}</InlineCode>;
    }

    return part;
  });
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let codeLines: string[] = [];
  let inCodeBlock = false;
  let codeLanguage = "";

  function flushList() {
    if (listItems.length === 0) {
      return;
    }

    elements.push(
      <ul
        key={`list-${elements.length}`}
        className="my-6 space-y-3 border-l border-electric/30 pl-5 text-sm leading-7 text-slate-300"
      >
        {listItems.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  }

  function flushCode() {
    elements.push(
      <pre
        key={`code-${elements.length}`}
        className="my-6 overflow-x-auto rounded border border-line bg-black/50 p-4 text-sm leading-6 text-slate-200"
      >
        <code data-language={codeLanguage}>{codeLines.join("\n")}</code>
      </pre>
    );
    codeLines = [];
    codeLanguage = "";
  }

  lines.forEach((line) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCode();
        inCodeBlock = false;
        return;
      }

      flushList();
      inCodeBlock = true;
      codeLanguage = line.replace("```", "").trim();
      return;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      return;
    }

    flushList();

    if (!line.trim()) {
      return;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="mt-10 text-xl font-semibold tracking-tight text-white"
        >
          {renderInline(line.slice(3))}
        </h2>
      );
      return;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${elements.length}`}
          className="mt-10 text-2xl font-semibold tracking-tight text-white"
        >
          {renderInline(line.slice(2))}
        </h1>
      );
      return;
    }

    elements.push(
      <p
        key={`p-${elements.length}`}
        className="my-5 text-sm leading-7 text-slate-300 sm:text-base"
      >
        {renderInline(line)}
      </p>
    );
  });

  flushList();

  return <div>{elements}</div>;
}
