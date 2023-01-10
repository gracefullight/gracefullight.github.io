import { resolve } from "path";
import { format } from "util";

import { Command, Option } from "clipanion";
import { DateTime } from "luxon";
import { ensureDir, writeFile } from "fs-extra";
import { slugize } from "hexo-util";

const scaffold = `---
title: %s
date: %s
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
      now.year.toString(),
      now.month.toString(),
      now.day.toString()
    );

    this.context.stdout.write(`Create new post "${this.title}"\n`);

    await ensureDir(target);
    await writeFile(
      resolve(target, `${slugize(this.title)}.mdx`),
      format(scaffold, this.title, now.toISO()),
      "utf8"
    );

    this.context.stdout.write("done\n");
  }
}
