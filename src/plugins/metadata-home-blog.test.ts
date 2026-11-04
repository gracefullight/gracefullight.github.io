import type { BlogPostMetadata } from "@docusaurus/plugin-content-blog";
import type {
  PluginContentLoadedActions,
  RouteConfig,
} from "@docusaurus/types";

import { expect, it, vi } from "vitest";
import { metadataHomepageRoute } from "./metadata-home-blog";

const component = "@theme/BlogListPage";

function fixture(baseUrl = "/") {
  const posts: BlogPostMetadata[] = Array.from({ length: 10 }, (_, index) => ({
    authors: [],
    date: new Date("2026-11-04T00:00:00.000Z"),
    description: `Notes about topic ${index}`,
    frontMatter: {
      image: `/img/post-${index}.png`,
      keywords: ["research", `topic-${index}`],
      title: `Real post ${index}`,
    },
    hasTruncateMarker: false,
    lastUpdatedAt: undefined,
    lastUpdatedBy: undefined,
    permalink: `${baseUrl}notes/post-${index}/`,
    source: `@site/blog/post-${index}.md`,
    tags: [],
    title: `Real post ${index}`,
    unlisted: false,
  }));
  const route: RouteConfig = {
    component,
    exact: true,
    modules: {
      items: posts.map((post) => ({
        content: {
          __import: true,
          path: post.source,
          query: { truncated: true },
        },
      })),
      sidebar: "@generated/sidebar.json",
    },
    path: baseUrl,
    props: { metadata: { permalink: baseUrl, totalCount: 940 } },
  };
  const createData = vi.fn<PluginContentLoadedActions["createData"]>(
    async (name) => `/generated/${name}`,
  );
  return {
    createData,
    metadata: new Map(posts.map((post) => [post.source, post])),
    posts,
    route,
  };
}

it("replaces only homepage body imports with four small metadata modules", async () => {
  const { route, posts, metadata, createData } = fixture();
  const result = await metadataHomepageRoute(
    route,
    "/",
    component,
    metadata,
    createData,
  );
  expect(result.path).toBe(route.path);
  expect(result.props).toBe(route.props);
  expect(result.modules?.sidebar).toBe(route.modules?.sidebar);
  expect(result.modules?.items).toEqual(
    [0, 1, 2, 3].map((index) => ({
      content: `/generated/homepage-post-${index}.json`,
    })),
  );
  expect(createData).toHaveBeenCalledTimes(4);
  for (let index = 0; index < 4; index += 1) {
    expect(createData).toHaveBeenNthCalledWith(
      index + 1,
      `homepage-post-${index}.json`,
      {
        assets: { authorsImageUrls: [] },
        frontMatter: posts[index].frontMatter,
        metadata: posts[index],
      },
    );
  }
  expect(JSON.stringify(result.modules?.items)).not.toContain(".md");
  expect(JSON.stringify(route.modules?.items)).toContain("truncated");
});

it("supports the exact translated homepage and preserves metadata language and URLs", async () => {
  const { route, posts, metadata, createData } = fixture("/en/");
  const result = await metadataHomepageRoute(
    route,
    "/en/",
    component,
    metadata,
    createData,
  );
  expect(result.path).toBe("/en/");
  expect(createData.mock.calls[0][1]).toEqual({
    assets: { authorsImageUrls: [] },
    frontMatter: posts[0].frontMatter,
    metadata: posts[0],
  });
  expect(posts[0].permalink).toBe("/en/notes/post-0/");
});

it("preserves structured-data image and keywords after JSON serialization", async () => {
  const { route, posts, metadata, createData } = fixture();
  await metadataHomepageRoute(route, "/", component, metadata, createData);
  const content = JSON.parse(JSON.stringify(createData.mock.calls[0][1]));
  expect(content.assets.image ?? content.frontMatter.image).toBe(
    posts[0].frontMatter.image,
  );
  expect(content.frontMatter.keywords).toEqual(["research", "topic-0"]);
  expect(content.metadata.permalink).toBe(posts[0].permalink);
});

it("retains the upstream image pipeline for a co-located cover image", async () => {
  const { route, posts, metadata, createData } = fixture();
  posts[0].frontMatter.image = "./local-cover.png";
  const result = await metadataHomepageRoute(
    route,
    "/",
    component,
    metadata,
    createData,
  );
  const resultItems = result.modules?.items;
  const originalItems = route.modules?.items;
  if (!(Array.isArray(resultItems) && Array.isArray(originalItems))) {
    throw new Error("The homepage should retain its item array.");
  }
  expect(resultItems[0]).toBe(originalItems[0]);
  expect(createData).toHaveBeenCalledTimes(3);
  expect(JSON.stringify(resultItems[0])).toContain("@site/blog/post-0.md");
});

it("preserves article, archive, tag and paginated blog routes byte for byte", async () => {
  const { route, metadata, createData } = fixture("/en/");
  for (const path of [
    "/en/notes/post-0/",
    "/en/archive/",
    "/en/tags/ai/",
    "/en/page/2/",
    "/enough/",
    "/",
  ]) {
    const other = { ...route, path };
    await expect(
      metadataHomepageRoute(other, "/en/", component, metadata, createData),
    ).resolves.toBe(other);
  }
  expect(createData).not.toHaveBeenCalled();
});

it("leaves a different root component unchanged instead of overriding its route", async () => {
  const { route, metadata, createData } = fixture();
  const custom = { ...route, component: "@theme/BlogArchivePage" };
  await expect(
    metadataHomepageRoute(custom, "/", component, metadata, createData),
  ).resolves.toBe(custom);
  expect(createData).not.toHaveBeenCalled();
});

it("fails clearly if upstream post metadata cannot satisfy a homepage import", async () => {
  const { route, metadata, createData } = fixture();
  metadata.clear();
  await expect(
    metadataHomepageRoute(route, "/", component, metadata, createData),
  ).rejects.toThrow("Homepage metadata is missing");
});
