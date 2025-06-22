import { Builtins, Cli } from "clipanion";
import { ExtractDateFromMarkdownCommand } from "./extract-date-from-markdown";
import { NewPostCommand } from "./new-post";
import { PdfCommand } from "./pdf";

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: "Blog cli",
  binaryName: `${node} ${app}`,
  binaryVersion: "0.1.0",
});

cli.register(ExtractDateFromMarkdownCommand);
cli.register(NewPostCommand);
cli.register(PdfCommand);
cli.register(Builtins.HelpCommand);
cli.runExit(args);
