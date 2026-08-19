import { gfmTableToMarkdown } from "mdast-util-gfm-table";
import { mathToMarkdown } from "mdast-util-math";

const compactTables = gfmTableToMarkdown({ tablePipeAlign: false });
const defaultInlineMath = mathToMarkdown().handlers.inlineMath;

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
  plugins: ["remark-frontmatter", "remark-gfm", "remark-math", markDisplayMath],
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
