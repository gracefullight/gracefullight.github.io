import type { LoadContext, Plugin } from "@docusaurus/types";

import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import copyMarkdownPlugin from "@gracefullight/docusaurus-plugin-copy-markdown";
import { afterEach, expect, it, vi } from "vitest";
import lazyCopyMarkdownPlugin, {
  externalizeMarkdown,
} from "./lazy-copy-markdown";
import {
  copyMarkdownText,
  createMarkdownLoader,
  normalizeMarkdownRoute,
  resolveMarkdownLabels,
} from "./lazy-copy-markdown-data";

afterEach(() => vi.unstubAllGlobals());

const routes = {
  "/en/notes/비전": {
    contentType: "blog" as const,
    markdownUrl: "/en/assets/markdown/a.md",
  },
};

it("uses Korean interface language instead of untranslated English fallback messages", () => {
  const labels = resolveMarkdownLabels(
    { routes },
    {
      "copyMarkdown.buttonLabel": "Copy page as Markdown",
      "copyMarkdown.copiedLabel": "Copied!",
    },
    "ko-KR",
  );
  expect(labels.copy).toBe("마크다운으로 복사");
  expect(labels.copied).toBe("복사했습니다");
  expect(labels.ui.more).toBe("공유 옵션");
  expect(labels.copyLanguage).toBe("ko");
});

it("preserves custom labels and annotates their language independently of the page", () => {
  const labels = resolveMarkdownLabels(
    {
      customButtonLabel: "Copy these notes",
      customCopiedLabel: "복사 완료",
      routes,
    },
    {},
    "ko",
  );
  expect(labels.copy).toBe("Copy these notes");
  expect(labels.copyLanguage).toBe("en");
  expect(labels.copiedLanguage).toBe("ko");
  expect(labels.ui.error).toContain("다시 시도");
});

it("retains actual translated button labels and provides English sharing actions on English pages", () => {
  const labels = resolveMarkdownLabels(
    { routes },
    { "copyMarkdown.buttonLabel": "이 글을 마크다운으로 복사" },
    "en",
  );
  expect(labels.copy).toBe("이 글을 마크다운으로 복사");
  expect(labels.copyLanguage).toBe("ko");
  expect(labels.ui.chatgpt).toBe("Open in ChatGPT");
});

it("does not fetch until requested and shares an in-flight request across route aliases", async () => {
  const fetchMarkdown = vi.fn<typeof fetch>().mockResolvedValue(
    new Response("# Vision notes\n\nThe exact source.", {
      headers: { "content-type": "text/markdown" },
    }),
  );
  const load = createMarkdownLoader(routes, fetchMarkdown);
  expect(fetchMarkdown).not.toHaveBeenCalled();
  const first = load("/en/notes/%EB%B9%84%EC%A0%84/");
  const second = load("/en/notes/비전#architecture");
  expect(first).toBe(second);
  await expect(first).resolves.toBe("# Vision notes\n\nThe exact source.");
  expect(fetchMarkdown).toHaveBeenCalledExactlyOnceWith(
    "/en/assets/markdown/a.md",
  );
});

it("does not request unknown routes or mistake a failed asset response for Markdown", async () => {
  const fetchMarkdown = vi.fn<typeof fetch>();
  const load = createMarkdownLoader(routes, fetchMarkdown);
  await expect(load("/archive/")).rejects.toThrow("no Markdown");
  expect(fetchMarkdown).not.toHaveBeenCalled();
  fetchMarkdown.mockResolvedValueOnce(
    new Response("Not found", { status: 404 }),
  );
  await expect(load("/en/notes/비전")).rejects.toThrow("could not be loaded");
  fetchMarkdown.mockResolvedValueOnce(
    new Response("<!doctype html><h1>App fallback</h1>", {
      headers: { "content-type": "text/html" },
    }),
  );
  await expect(load("/en/notes/비전")).rejects.toThrow("could not be loaded");
});

it("allows a real retry after a network failure instead of caching the failure", async () => {
  const fetchMarkdown = vi
    .fn<typeof fetch>()
    .mockRejectedValueOnce(new Error("offline"))
    .mockResolvedValueOnce(new Response("# Recovered"));
  const load = createMarkdownLoader(routes, fetchMarkdown);
  await expect(load("/en/notes/비전/")).rejects.toThrow("offline");
  await expect(load("/en/notes/비전/")).resolves.toBe("# Recovered");
  expect(fetchMarkdown).toHaveBeenCalledTimes(2);
});

it("preserves encoded slash boundaries rather than mapping them to a different post", () => {
  expect(normalizeMarkdownRoute("/notes/a%2Fb/")).toBe("/notes/a%2Fb");
  expect(normalizeMarkdownRoute("/notes/a/b/")).toBe("/notes/a/b");
});

it("uses clipboard text without touching the document when permission is available", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  await copyMarkdownText("# Source", {} as Document, { writeText });
  expect(writeText).toHaveBeenCalledExactlyOnceWith("# Source");
});

function fallbackDocument(success: boolean) {
  class FocusedElement {
    focus = vi.fn();
  }
  vi.stubGlobal("HTMLElement", FocusedElement);
  const focused = new FocusedElement();
  const textarea = {
    readOnly: false,
    remove: vi.fn(),
    select: vi.fn(),
    style: {},
    value: "",
  };
  const fake = {
    activeElement: focused,
    body: { append: vi.fn() },
    createElement: vi.fn(() => textarea),
    execCommand: vi.fn(() => success),
  };
  return { document: fake as unknown as Document, fake, focused, textarea };
}

it("falls back after clipboard denial and restores focus without leaving a textarea", async () => {
  const { document, fake, focused, textarea } = fallbackDocument(true);
  await copyMarkdownText("# Full source", document, {
    writeText: vi.fn().mockRejectedValue(new Error("denied")),
  });
  expect(textarea.value).toBe("# Full source");
  expect(fake.execCommand).toHaveBeenCalledExactlyOnceWith("copy");
  expect(textarea.remove).toHaveBeenCalledTimes(1);
  expect(focused.focus).toHaveBeenCalledExactlyOnceWith({
    preventScroll: true,
  });
});

it("reports fallback failure and still cleans up the temporary control", async () => {
  const { document, textarea } = fallbackDocument(false);
  await expect(copyMarkdownText("# Source", document)).rejects.toThrow(
    "Copy failed",
  );
  expect(textarea.remove).toHaveBeenCalledTimes(1);
});

it("retains upstream Markdown transformations while reducing global data to asset URLs", async () => {
  const siteDir = await mkdtemp(join(tmpdir(), "lazy-markdown-test-"));
  try {
    await writeFile(
      join(siteDir, "post.md"),
      "---\ntitle: A real title\n---\n\nThe full post.\n\n<!-- truncate -->\n\n## Details\n\nMore text.",
    );
    const context = {
      baseUrl: "/en/",
      siteConfig: { baseUrl: "/en/" },
      siteDir,
    } as unknown as LoadContext;
    const args = {
      actions: { setGlobalData: vi.fn() },
      allContent: {
        "docusaurus-plugin-content-blog": {
          default: {
            blogPosts: [
              {
                metadata: {
                  permalink: "/en/notes/example/",
                  source: "post.md",
                },
              },
            ],
          },
        },
      },
    } as unknown as Parameters<NonNullable<Plugin["allContentLoaded"]>>[0];
    const upstream = await copyMarkdownPlugin(context, {});
    await upstream.allContentLoaded?.(args);
    const setGlobalData = vi.mocked(args.actions.setGlobalData);
    const inline = setGlobalData.mock.calls[0][0] as Parameters<
      typeof externalizeMarkdown
    >[0];
    const converted = externalizeMarkdown(inline, "/en/");
    const source = inline.routes["/en/notes/example/"].markdown;
    expect(source).toContain("# A real title");
    expect(source).toContain("## Details");
    expect(source).not.toContain("truncate");
    expect(converted.assets.size).toBe(1);
    expect([...converted.assets.values()]).toEqual([source]);
    expect(Object.keys(converted.data.routes)).toEqual(["/en/notes/example"]);
    expect(converted.data.routes["/en/notes/example"].markdownUrl).toMatch(
      /^\/en\/assets\/markdown\/[a-f0-9]{64}\.md$/,
    );
    expect(JSON.stringify(converted.data)).not.toContain("The full post.");
    setGlobalData.mockClear();
    const plugin = await lazyCopyMarkdownPlugin(context, {});
    await plugin.allContentLoaded?.(args);
    expect(setGlobalData).toHaveBeenCalledExactlyOnceWith(converted.data);
    expect(plugin.name).toBe(upstream.name);
    expect(plugin.getClientModules?.()[0]).toContain(
      "lazy-copy-markdown-client.ts",
    );
  } finally {
    await rm(siteDir, { force: true, recursive: true });
  }
});
