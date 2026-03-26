import { program } from "commander";
import { extractDateFromMarkdown } from "./extract-date-from-markdown";
import { registerNewPostCommand } from "./new-post";
import { registerPdfCommand } from "./pdf";

program.name("blog-cli").description("Blog cli").version("0.1.0");

program
  .command("extract-date")
  .description(
    "Extract date from markdown frontmatter and copy to date directory",
  )
  .action(extractDateFromMarkdown);

registerNewPostCommand(program);
registerPdfCommand(program);

program.parse();
