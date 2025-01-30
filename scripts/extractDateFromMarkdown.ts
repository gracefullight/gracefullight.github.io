import { resolve } from "node:path";

import { Command } from "clipanion";
import { copy, ensureDir, readdir, readFile } from "fs-extra";

export class ExtractDateFromMarkdownCommand extends Command {
  static readonly paths = [[`extract-date`]];

  private getDateMetadata(text: string) {
    const metadataRegex = /^---\n((?:.+\n)+?)---\n/;
    const metadataMatch = RegExp(metadataRegex).exec(text);
    if (!metadataMatch) {
      return null;
    }

    const metadataString = metadataMatch[1];
    const metadataLines = metadataString.split("\n");

    const metadata: Record<string, string | undefined> = {};
    for (const line of metadataLines) {
      const [key, value] = line.split(": ");
      metadata[key] = value;
    }

    const metadataDate = metadata.date;
    if (!metadataDate) {
      return null;
    }

    // * 2019-02-17 21:39:40
    const [created] = metadataDate.split(" ");
    return created;
  }

  async execute() {
    const directory = resolve(__dirname, "..", "blog");
    this.context.stdout.write(`Read: ${directory}`);

    const files = await readdir(directory);
    const mdFilesPromises = files
      // * Markdown files that do not start with a date
      .filter((file) => /^(?!\d{4}-\d{2}-\d{2}).+\.md$/.test(file))
      .map(async (mdFile) => {
        const oldPath = resolve(directory, mdFile);
        const text = await readFile(oldPath, "utf8");
        const created = this.getDateMetadata(text);
        if (!created) {
          this.context.stderr.write(mdFile);
          return;
        }

        const targetDirectory = resolve(
          directory,
          created.split("-").join("/"),
        );
        const newPath = resolve(targetDirectory, mdFile);
        await ensureDir(targetDirectory);
        // * copy md file into the date directory
        await copy(oldPath, newPath, {
          overwrite: true,
        });

        return newPath;
      });

    const copiedMarkdownFiles = await Promise.all(mdFilesPromises);
    this.context.stdout.write(JSON.stringify(copiedMarkdownFiles, null, 2));
  }
}
