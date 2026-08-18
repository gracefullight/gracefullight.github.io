import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { gfmTableToMarkdown } from "mdast-util-gfm-table";

const compactTables = gfmTableToMarkdown({ tablePipeAlign: false });

export default {
  plugins: [remarkFrontmatter, remarkGfm, remarkMath],
  settings: {
    bullet: "-",
    handlers: compactTables.handlers,
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
