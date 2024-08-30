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
tags:
  %s
---\n`;

export class NewPost extends Command {
  static readonly paths = [[`new`]];

  title = Option.String();
  tags = Option.String("--tags", "");
  pe = Option.Boolean("-P,--pe", false, { description: "below pe folder" });

  async execute(): Promise<number | void> {
    const now = DateTime.now();

    const target = this.pe
      ? resolve(__dirname, "..", "blog", "pe")
      : resolve(
          __dirname,
          "..",
          "blog",
          now.toFormat("yyyy"),
          now.toFormat("MM"),
          now.toFormat("dd"),
        );

    this.context.stdout.write(`Create new post "${this.title}"\n`);

    let tagList = "- me";
    if (this.tags) {
      tagList = `- ${this.tags.replace(/,/g, "\n  - ")} `;
    }

    if (this.pe) {
      tagList = `- pe\n  ${tagList}`;
    }

    await ensureDir(target);

    const mdxPath = resolve(target, `${slugize(this.title)}.md`);
    await writeFile(
      mdxPath,
      format(scaffold, this.title, now.toISO(), this.title, tagList),
      "utf8",
    );

    this.context.stdout.write(`Done: ${mdxPath}\n`);
  }
}
