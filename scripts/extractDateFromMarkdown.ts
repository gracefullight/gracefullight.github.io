import { resolve } from "node:path";

import { Command } from "clipanion";
import { copy, ensureDir, readdir, readFile } from "fs-extra";

export class ExtractDateFromMarkdown extends Command {
  static paths = [[`extract-date`]];

  private getDateMetadata(text: string) {
    const metadataRegex = /^---\n((?:.+\n)+?)---\n/;
    const metadataMatch = text.match(metadataRegex);

    const metadata = {} as Record<string, string | undefined>;
    if (metadataMatch) {
      const metadataString = metadataMatch[1];
      const metadataLines = metadataString.split("\n");
      for (const line of metadataLines) {
        const [key, value] = line.split(": ");
        metadata[key] = value;
      }
    }

    if (metadata?.date) {
      // * 2019-02-17 21:39:40
      const [created] = metadata?.date.split(" ");
      return created;
    }

    return null;
  }

  async execute() {
    const directory = resolve(__dirname, "..", "blog");
    this.context.stdout.write(`Read: ${directory}`);

    const files = await readdir(directory);
    const mdFilesPromises = files
      // * Markdown files that do not start with a date
      .filter((file) => /^(?!\d{4}-\d{2}-\d{2}).+\.md$/.test(file))
      .map((mdFile) => {
        const oldPath = resolve(directory, mdFile);
        return readFile(oldPath, "utf8")
          .then((text) => this.getDateMetadata(text))
          .then((created) => {
            if (!created) {
              this.context.stderr.write(mdFile);
            }

            const targetDirectory = resolve(
              directory,
              created.split("-").join("/"),
            );

            // * ensure dir blog/2019/02/17
            return ensureDir(targetDirectory).then(() => targetDirectory);
          })
          .then((target) => {
            // * copy md file into the date directory
            const newPath = resolve(target, mdFile);
            return copy(oldPath, newPath, {
              overwrite: true,
            }).then(() => newPath);
          });
      });

    const copiedMarkdownFiles = await Promise.all(mdFilesPromises);
    this.context.stdout.write(JSON.stringify(copiedMarkdownFiles, null, 2));
  }
}
