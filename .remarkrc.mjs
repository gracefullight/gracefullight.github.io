import { gfmTableToMarkdown } from "mdast-util-gfm-table";
import { mathToMarkdown } from "mdast-util-math";

const compactTables = gfmTableToMarkdown({ tablePipeAlign: false });
const defaultInlineMath = mathToMarkdown().handlers.inlineMath;

function isCodeFenceToggle(line, inCodeFence, codeFenceChar) {
  const fence = line.match(/^([ \t]*)([`~]{3,})/);
  if (!fence) return null;

  const marker = fence[2][0];
  if (!inCodeFence) return { codeFenceChar: marker, inCodeFence: true };
  if (marker === codeFenceChar && /^[ \t]*[`~]{3,}[ \t]*$/.test(line)) {
    return { codeFenceChar: "", inCodeFence: false };
  }
  return null;
}

function splitGluedOpenFence(line) {
  const open = line.match(/^([ \t]*)\$\$(\S.*)$/);
  if (!open || open[2].includes("$$")) return null;

  const [, indent, rest] = open;
  const lines = [`${indent}$$`];
  const gluedClose = rest.match(/^(.*\S)\$\$[ \t]*$/);
  if (gluedClose && /\\|[_^{}]/.test(gluedClose[1])) {
    lines.push(`${indent}${gluedClose[1]}`, `${indent}$$`);
  } else {
    lines.push(`${indent}${rest}`);
  }
  return lines;
}

function splitGluedCloseFence(line) {
  const close = line.match(/^([ \t]*)(.+?)\s*\$\$[ \t]*$/);
  if (
    !close ||
    close[2].startsWith("$$") ||
    close[2].includes("$$") ||
    !/\\|[_^{}]/.test(close[2])
  ) {
    return null;
  }

  const [, indent, rest] = close;
  return [`${indent}${rest}`, `${indent}$$`];
}

/**
 * micromark math flow treats `$$` like a code fence: content on the opening
 * line becomes fence meta (where `\\` is unescaped to `\`), and a closing `$$`
 * glued to latex never terminates the fence. Split those onto their own lines
 * before parse so display math round-trips through format-on-save.
 */
export function normalizeMathFences(markdown) {
  const out = [];
  let inCodeFence = false;
  let codeFenceChar = "";

  for (const line of markdown.split("\n")) {
    const toggle = isCodeFenceToggle(line, inCodeFence, codeFenceChar);
    if (toggle) {
      inCodeFence = toggle.inCodeFence;
      codeFenceChar = toggle.codeFenceChar;
      out.push(line);
      continue;
    }

    if (inCodeFence) {
      out.push(line);
      continue;
    }

    const openLines = splitGluedOpenFence(line);
    if (openLines) {
      out.push(...openLines);
      continue;
    }

    const closeLines = splitGluedCloseFence(line);
    if (closeLines) {
      out.push(...closeLines);
      continue;
    }

    out.push(line);
  }

  return out.join("\n");
}

function normalizeGluedMathFences() {
  const parse = this.parser;
  this.parser = (doc, file) => parse(normalizeMathFences(String(doc)), file);
}

function markDisplayMath() {
  return (tree) => {
    for (const child of tree.children ?? []) {
      if (child.type !== "paragraph") continue;

      const content = child.children.filter(
        (node) => !(node.type === "text" && !node.value.trim()),
      );

      if (content.length === 1 && content[0].type === "inlineMath") {
        content[0].data = { ...content[0].data, displayMath: true };
      }
    }
  };
}

function inlineMath(node, parent, state, info) {
  const value = defaultInlineMath(node, parent, state, info);
  return node.data?.displayMath && !value.startsWith("$$")
    ? `$${value}$`
    : value;
}

inlineMath.peek = defaultInlineMath.peek;

export default {
  plugins: [
    normalizeGluedMathFences,
    "remark-frontmatter",
    "remark-gfm",
    "remark-math",
    markDisplayMath,
  ],
  settings: {
    bullet: "-",
    handlers: {
      ...compactTables.handlers,
      inlineMath,
    },
    join: [
      (_left, _right, parent) => {
        if (parent.type === "list") {
          return 0;
        }
      },
    ],
    rule: "-",
  },
};
