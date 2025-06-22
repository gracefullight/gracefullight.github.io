import { resolve } from "node:path";
import { format } from "node:util";
import { Command, Option } from "clipanion";
import { ensureDir, pathExists, writeFile } from "fs-extra";
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

export class NewPostCommand extends Command {
  static readonly paths = [["new"]];

  // 글 제목
  title = Option.String();

  // --tags 옵션 (예: --tags "conv")
  tags = Option.String("--tags", "");

  // -P 또는 --pe 옵션
  pe = Option.Boolean("-P,--pe", false, { description: "below pe folder" });

  async execute(): Promise<number | undefined> {
    const now = DateTime.now();

    // 1) 태그 배열 파싱
    const parsedTags = this.parseTags();
    // 예: --pe --tags "conv" => ["pe", "pe/conv"]

    // 2) 서브 태그가 있는지 확인 (단 하나라고 가정)
    const subTag = parsedTags.find((t) => t.startsWith("pe/") && t !== "pe");

    // 3) 폴더 경로 결정
    const targetDir = await this.getTargetDirectory(now, subTag);

    // 4) Frontmatter 태그 문자열 변환
    const frontmatterTags = parsedTags.map((tag) => `- ${tag}`).join("\n  ");

    // 5) 출력 및 파일 생성
    this.context.stdout.write(`Create new post "${this.title}"\n`);
    await ensureDir(targetDir);

    const filePath = resolve(targetDir, `${slugize(this.title)}.md`);
    await writeFile(
      filePath,
      format(scaffold, this.title, now.toISO(), this.title, frontmatterTags),
      "utf8",
    );

    this.context.stdout.write(`Done: ${filePath}\n`);
    return 0;
  }

  /**
   * 태그 파싱:
   *   --tags "conv" -> ["conv"]
   *   --pe 사용 시 -> ["pe", "pe/conv"]
   *   (이미 "pe/conv" 라면 그대로 두고,
   *    "conv" 라면 "pe/conv" 붙이는 식)
   */
  private parseTags(): string[] {
    // 1) 기본 파싱
    let parsed = this.tags
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x);

    // 2) --pe 옵션이 있으면
    //    pe 태그가 없으면 추가,
    //    다른 태그에는 pe/ 접두어 붙임
    if (this.pe) {
      // "pe"가 없으면 앞에 추가
      if (!parsed.includes("pe")) {
        parsed.unshift("pe");
      }

      // 나머지 태그들에 "pe/"를 붙이기
      parsed = parsed.map((tag) => {
        if (tag === "pe") return tag;
        if (tag.startsWith("pe/")) return tag;
        return `pe/${tag}`;
      });
    }

    // 3) 아무 것도 없으면 기본 "me"
    if (parsed.length === 0) {
      parsed = ["me"];
    }

    return parsed;
  }

  /**
   * md 파일을 생성할 폴더 결정
   *  1) pe/xxx 가 있다면 blog/pe/xxx
   *     - 폴더 없으면 throw
   *  2) pe만 있고 subTag가 없다면 blog/pe
   *  3) --pe가 아니면 날짜 폴더
   */
  private async getTargetDirectory(
    now: DateTime,
    subTag?: string,
  ): Promise<string> {
    // 1) --pe가 아니면 날짜 폴더
    if (!this.pe) {
      return resolve(
        __dirname,
        "..",
        "blog",
        now.toFormat("yyyy"),
        now.toFormat("MM"),
        now.toFormat("dd"),
      );
    }

    // 2) --pe인 경우, subTag가 있으면 blog/pe/xxx
    if (subTag) {
      const sub = subTag.slice("pe/".length); // ex: "conv"
      const subFolderPath = resolve(__dirname, "..", "blog", "pe", sub);

      // 폴더가 없으면 에러
      const exists = await pathExists(subFolderPath);
      if (!exists) {
        throw new Error(`Folder does not exist: blog/pe/${sub}`);
      }
      return subFolderPath;
    }

    // 3) subTag가 없으면 pe 폴더
    return resolve(__dirname, "..", "blog", "pe");
  }
}
