import { resolve } from "path";
import { format } from "util";

import { Command, Option } from "clipanion";
import { DateTime } from "luxon";
import { ensureDir, writeFile } from "fs-extra";
import { slugize } from "hexo-util";

const scaffold = `---
title: %s
date: %s
authors: me
tags: []
---\n`;

export class NewPost extends Command {
  static paths = [[`new`]];

  title = Option.String();

  async execute(): Promise<number | void> {
    const now = DateTime.now();

    const target = resolve(
      __dirname,
      "..",
      "blog",
      now.toFormat("yyyy"),
      now.toFormat("MM"),
      now.toFormat("dd")
    );

    this.context.stdout.write(`Create new post "${this.title}"\n`);

    await ensureDir(target);

    const mdxPath = resolve(target, `${slugize(this.title)}.mdx`);
    await writeFile(mdxPath, format(scaffold, this.title, now.toISO()), "utf8");

    this.context.stdout.write(`Done: ${mdxPath}\n`);
  }
}
