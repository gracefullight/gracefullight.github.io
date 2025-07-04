import { readdir } from "node:fs/promises";
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

  // 글 제목 (선택, 없으면 자동 생성)
  title = Option.String({ required: false });

  // --tags 옵션: 태그 입력 (예: --tags "conv")
  tags = Option.String("--tags", "");

  // -P 또는 --pe 옵션: pe 폴더/태그 자동 처리
  pe = Option.Boolean("-P,--pe", false, { description: "below pe folder" });

  // -I 또는 --ielts 옵션: IELTS transcription 자동 생성
  ielts = Option.Boolean("-I,--ielts", false, {
    description: "IELTS troubleshooting transcription mode",
  });

  /**
   * 실행 분기: 옵션에 따라 각 모드별 파일 생성 로직 호출
   * 우선순위: ielts > pe > (기본) 날짜 폴더
   */
  async execute(): Promise<number | undefined> {
    // --ielts가 아닌데 title이 없으면 에러
    if (!(this.ielts || this.title)) {
      this.context.stderr.write(
        "Error: 제목(title)은 필수입니다. --ielts 모드만 생략 가능합니다.\n",
      );
      return 1;
    }

    switch (true) {
      case this.ielts:
        return await this.handleIeltsMode();
      case this.pe:
        return await this.handlePeMode();
      default:
        return await this.handleDateMode();
    }
  }

  /**
   * --ielts 옵션 처리
   * blog/ielts/troubleshooting/ielts-transcription-XXX.md 형식으로 순번 파일 생성
   * 태그: ["ielts"]
   */
  private handleIeltsMode = async (): Promise<number> => {
    // 1. 폴더 경로 지정
    const targetDir = resolve(
      __dirname,
      "..",
      "blog",
      "ielts",
      "troubleshooting",
    );
    await ensureDir(targetDir);

    // 2. 파일명 패턴: ielts-transcription-XXX.md
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

    // 3. 타이틀, 태그, 파일명 결정
    const title = this.title || `IELTS Transcription @${nextNum}`;
    const tags = ["ielts"];
    const desc = `IELTS Writing Transcription @${nextNum}`;
    const body = `\n## Task1\n\n> 1\n\n![task1](./assets/ielts-transcription-${nextNum}.png)\n\n1\n\n## Task2\n\n> 1\n\n1\n`;
    return await this.writePostFile(
      targetDir,
      fileName,
      title,
      tags,
      desc,
      body,
    );
  };

  /**
   * --pe 옵션 처리
   * blog/pe/xxx/slug-title.md 또는 blog/pe/slug-title.md 생성
   * 태그: ["pe", "pe/xxx", ...] (입력값에 따라 동적)
   * 폴더가 없으면 예외 발생
   */
  private handlePeMode = async (): Promise<number> => {
    let parsedTags = this.parseTags(this.tags);

    // "pe"가 없으면 태그에 추가
    if (!parsedTags.includes("pe")) {
      parsedTags.unshift("pe");
    }

    // "pe"가 아닌 태그에는 "pe/" 접두어 붙이기 (이미 붙어있으면 그대로)
    parsedTags = parsedTags.map((tag) => {
      if (tag === "pe" || tag.startsWith("pe/")) return tag;
      return `pe/${tag}`;
    });

    // pe/xxx 서브태그가 있으면 해당 폴더, 없으면 blog/pe
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

    // 파일명: 제목을 slug로 변환
    const title = this.title ?? "Untitled";
    const fileName = `${slugize(title)}.md`;
    return await this.writePostFile(
      targetDir,
      fileName,
      title,
      parsedTags,
      title,
      "",
    );
  };

  /**
   * 기본(날짜) 모드 처리
   * blog/yyyy/MM/dd/slug-title.md 형식으로 파일 생성
   * 태그: 입력값 없으면 ["me"]
   */
  private handleDateMode = async (): Promise<number> => {
    const parsedTags = this.parseTags(this.tags);

    // 날짜 기반 폴더 생성
    const targetDir = resolve(
      __dirname,
      "..",
      "blog",
      DateTime.now().toFormat("yyyy"),
      DateTime.now().toFormat("MM"),
      DateTime.now().toFormat("dd"),
    );
    await ensureDir(targetDir);

    // 파일명: 제목을 slug로 변환
    const title = this.title ?? "Untitled";
    const fileName = `;
    $;
    slugize(title);
    .md`;
    return await this.writePostFile(
      targetDir,
      fileName,
      title,
      parsedTags,
      title,
      "",
    );
  };

  /**
   * 태그 파싱: 입력값이 없으면 ["me"] 반환
   */
  private parseTags(tags: string): string[] {
    let parsed = tags
      .split(",")
      .map((x) => x.trim())
      .filter((x) => x);
    if (parsed.length === 0) {
      parsed = ["me"];
    }
    return parsed;
  }

  /**
   * 공통 파일 생성/출력/프론트매터 생성
   * - dir: 생성할 폴더
   * - fileName: 파일명
   * - title: 포스트 제목
   * - tags: 태그 배열
   * - description: 설명
   * - body: 본문
   */
  private async writePostFile(
    dir: string,
    fileName: string,
    title: string,
    tags: string[],
    description: string,
    body: string,
  ): Promise<number> {
    await ensureDir(dir);
    const now = DateTime.now();
    const frontmatterTags = tags.map((tag) => `- ${tag}`).join("\n  ");
    const content =
      format(scaffold, title, now.toISO(), description, frontmatterTags) + body;
    await writeFile(resolve(dir, fileName), content, "utf8");
    this.context.stdout.write(`Done: ${resolve(dir, fileName)}\n`);
    return 0;
  }
}
