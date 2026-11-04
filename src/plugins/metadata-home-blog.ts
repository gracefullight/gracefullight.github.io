import type {
  BlogContent,
  BlogPostMetadata,
  PluginOptions,
  PropBlogPostContent,
} from "@docusaurus/plugin-content-blog";
import type {
  LoadContext,
  Plugin,
  PluginContentLoadedActions,
  RouteConfig,
} from "@docusaurus/types";

import { join, relative } from "node:path";
import contentBlogPlugin from "@docusaurus/plugin-content-blog";

export { validateOptions } from "@docusaurus/plugin-content-blog";

function canonicalPath(path: string) {
  return path.replace(/\/+$/, "") || "/";
}

function moduleSource(module: unknown) {
  if (typeof module === "string") return module.split("?", 1)[0];
  if (module && typeof module === "object" && "path" in module) {
    return typeof module.path === "string" ? module.path : undefined;
  }
  return undefined;
}

export async function metadataHomepageRoute(
  route: RouteConfig,
  baseUrl: string,
  component: string,
  metadataBySource: Map<string, BlogPostMetadata>,
  createData: PluginContentLoadedActions["createData"],
): Promise<RouteConfig> {
  if (
    canonicalPath(route.path) !== canonicalPath(baseUrl) ||
    route.component !== component
  )
    return route;
  const originals = route.modules?.items;
  if (!Array.isArray(originals)) {
    throw new Error("The homepage blog route has no post modules.");
  }
  const items = await Promise.all(
    originals.slice(0, 4).map(async (item, index) => {
      const source = moduleSource(item.content);
      const metadata = source ? metadataBySource.get(source) : undefined;
      if (!metadata) {
        throw new Error(
          `Homepage metadata is missing for ${source ?? "a post"}.`,
        );
      }
      // The upstream MDX loader resolves and emits co-located cover images.
      if (
        metadata.frontMatter.image?.startsWith("./") ||
        metadata.authors.some((author) => author.imageURL?.startsWith("./"))
      )
        return item;
      const dataPath = await createData(`homepage-post-${index}.json`, {
        assets: { authorsImageUrls: [] },
        frontMatter: metadata.frontMatter,
        metadata,
      } satisfies Pick<PropBlogPostContent, "assets" | "frontMatter"> & {
        metadata: BlogPostMetadata;
      });
      return { content: dataPath };
    }),
  );
  return { ...route, modules: { ...route.modules, items } };
}

export default async function metadataHomeBlogPlugin(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin<BlogContent>> {
  const upstream = await contentBlogPlugin(context, options);
  return {
    ...upstream,
    async contentLoaded(args) {
      const routes: RouteConfig[] = [];
      await upstream.contentLoaded?.({
        ...args,
        actions: {
          ...args.actions,
          addRoute(route) {
            routes.push(route);
          },
        },
      });
      const metadataBySource = new Map(
        args.content.blogPosts.map(({ metadata }) => [
          metadata.source,
          metadata,
        ]),
      );
      const createData: PluginContentLoadedActions["createData"] = async (
        name,
        data,
      ) => {
        const file = await args.actions.createData(name, data);
        const local = relative(
          join(context.generatedFilesDir, upstream.name),
          file,
        );
        return `~blog/${local.replaceAll("\\", "/")}`;
      };
      for (const route of routes) {
        args.actions.addRoute(
          await metadataHomepageRoute(
            route,
            context.baseUrl,
            options.blogListComponent,
            metadataBySource,
            createData,
          ),
        );
      }
    },
  };
}
