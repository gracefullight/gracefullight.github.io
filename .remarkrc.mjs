import { gfmTableToMarkdown } from "mdast-util-gfm-table";
import { mathToMarkdown } from "mdast-util-math";

const compactTables = gfmTableToMarkdown({ tablePipeAlign: false });
const defaultInlineMath = mathToMarkdown().handlers.inlineMath;

function inlineMath(node, parent, state, info) {
  const value = defaultInlineMath(node, parent, state, info);
  const sole =
    parent?.type === "paragraph" &&
    parent.children.every(
      (child) =>
        child === node || (child.type === "text" && !child.value.trim()),
    );

  return sole && !value.startsWith("$$") ? `$${value}$` : value;
}

inlineMath.peek = defaultInlineMath.peek;

export default {
  plugins: ["remark-frontmatter", "remark-gfm", "remark-math"],
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
