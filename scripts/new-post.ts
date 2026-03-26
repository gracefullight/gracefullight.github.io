import type { Command as CommandType } from "commander";

import { readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { format } from "node:util";
import { ensureDir, pathExists, writeFile } from "fs-extra";
import { slugize } from "hexo-util";
import { DateTime } from "luxon";
import pc from "picocolors";

const scaffold = `---
title: %s
date: %s
description: %s
authors: me
tags:
  %s
---\n`;

async function writePostFile(
  dir: string,
  fileName: string,
  title: string,
  tags: string[],
  description: string,
  body: string,
) {
  await ensureDir(dir);
  const now = DateTime.now();
  const frontmatterTags = tags.map((tag) => `- ${tag}`).join("\n  ");
  const content =
    format(scaffold, title, now.toISO(), description, frontmatterTags) + body;
  await writeFile(resolve(dir, fileName), content, "utf8");
  process.stdout.write(pc.green(`Done: ${resolve(dir, fileName)}\n`));
}

function parseTags(tags: string): string[] {
  let parsed = tags
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x);
  if (parsed.length === 0) {
    parsed = ["me"];
  }
  return parsed;
}

async function handleIeltsMode(title?: string) {
  const targetDir = resolve(
    __dirname,
    "..",
    "blog",
    "ielts",
    "troubleshooting",
  );
  await ensureDir(targetDir);

  const files = await readdir(targetDir);
  const pattern = /^ielts-transcription-(\d{3})\.md$/;
  let maxNum = 0;
  for (const file of files) {
    const match = file.match(pattern);
    if (match) {
      const num = Number.parseInt(match[1], 10);
      if (num > maxNum) maxNum = num;
    }
  }
  const nextNum = (maxNum + 1).toString().padStart(3, "0");
  const fileName = `ielts-transcription-${nextNum}.md`;

  const resolvedTitle = title || `IELTS Transcription @${nextNum}`;
  const tags = ["ielts"];
  const desc = `IELTS Writing Transcription @${nextNum}`;
  const body = `\n## Task1\n\n> 1\n\n![task1](./assets/ielts-transcription-${nextNum}.png)\n\n1\n\n## Task2\n\n> 1\n\n1\n`;
  await writePostFile(targetDir, fileName, resolvedTitle, tags, desc, body);
}

async function handlePeMode(title: string, tagsInput: string) {
  let parsedTags = parseTags(tagsInput);

  if (!parsedTags.includes("pe")) {
    parsedTags.unshift("pe");
  }

  parsedTags = parsedTags.map((tag) => {
    if (tag === "pe" || tag.startsWith("pe/")) return tag;
    return `pe/${tag}`;
  });

  const subTag = parsedTags.find((t) => t.startsWith("pe/") && t !== "pe");
  let targetDir: string;
  if (subTag) {
    const sub = subTag.slice("pe/".length);
    const subFolderPath = resolve(__dirname, "..", "blog", "pe", sub);
    const exists = await pathExists(subFolderPath);
    if (!exists) {
      throw new Error(`Folder does not exist: blog/pe/${sub}`);
    }
    targetDir = subFolderPath;
  } else {
    targetDir = resolve(__dirname, "..", "blog", "pe");
  }

  const fileName = `${slugize(title)}.md`;
  await writePostFile(targetDir, fileName, title, parsedTags, title, "");
}

async function handleDateMode(title: string, tagsInput: string) {
  const parsedTags = parseTags(tagsInput);

  const targetDir = resolve(
    __dirname,
    "..",
    "blog",
    DateTime.now().toFormat("yyyy"),
    DateTime.now().toFormat("MM"),
    DateTime.now().toFormat("dd"),
  );
  await ensureDir(targetDir);

  const fileName = `${slugize(title)}.md`;
  await writePostFile(targetDir, fileName, title, parsedTags, title, "");
}

export function registerNewPostCommand(program: CommandType) {
  program
    .command("new [title]")
    .description("Create a new blog post")
    .option("--tags <tags>", "comma-separated tags", "")
    .option("-P, --pe", "below pe folder", false)
    .option("-I, --ielts", "IELTS troubleshooting transcription mode", false)
    .action(
      async (
        title: string | undefined,
        opts: { tags: string; pe: boolean; ielts: boolean },
      ) => {
        if (!(opts.ielts || title)) {
          process.stderr.write(
            pc.red(
              "Error: 제목(title)은 필수입니다. --ielts 모드만 생략 가능합니다.\n",
            ),
          );
          process.exit(1);
        }

        if (opts.ielts) {
          await handleIeltsMode(title);
        } else if (opts.pe) {
          await handlePeMode(title!, opts.tags);
        } else {
          await handleDateMode(title!, opts.tags);
        }
      },
    );
}
