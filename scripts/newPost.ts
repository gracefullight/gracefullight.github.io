import { resolve } from "node:path";
import { format } from "node:util";

import { Command, Option } from "clipanion";
import { ensureDir, writeFile } from "fs-extra";
import { slugize } from "hexo-util";
import { DateTime } from "luxon";

const scaffold = `---
title: %s
date: %s
description: %s
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
      now.toFormat("dd"),
    );

    this.context.stdout.write(`Create new post "${this.title}"\n`);

    await ensureDir(target);

    const mdxPath = resolve(target, `${slugize(this.title)}.mdx`);
    await writeFile(
      mdxPath,
      format(scaffold, this.title, now.toISO(), this.title),
      "utf8",
    );

    this.context.stdout.write(`Done: ${mdxPath}\n`);
  }
}
