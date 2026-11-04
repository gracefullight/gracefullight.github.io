import type { LoadContext, Plugin } from "@docusaurus/types";
import type { PluginOptions } from "@gracefullight/docusaurus-plugin-copy-markdown";
import type { Compiler } from "webpack";
import type { MarkdownSettings } from "./lazy-copy-markdown-data";

import { createHash } from "node:crypto";
import { resolve } from "node:path";
import copyMarkdownPlugin from "@gracefullight/docusaurus-plugin-copy-markdown";
import { normalizeMarkdownRoute } from "./lazy-copy-markdown-data";

export { validateOptions } from "@gracefullight/docusaurus-plugin-copy-markdown";

type InlineMarkdownData = Omit<MarkdownSettings, "routes"> & {
  routes: Record<
    string,
    { contentType: "blog" | "docs"; markdown: string; permalink: string }
  >;
};

export function externalizeMarkdown(
  inline: InlineMarkdownData,
  baseUrl: string,
) {
  const assets = new Map<string, string>();
  const routes: MarkdownSettings["routes"] = {};
  for (const [pathname, page] of Object.entries(inline.routes)) {
    const route = normalizeMarkdownRoute(pathname);
    if (routes[route]) continue;
    const hash = createHash("sha256").update(page.markdown).digest("hex");
    const filename = `assets/markdown/${hash}.md`;
    assets.set(filename, page.markdown);
    routes[route] = {
      contentType: page.contentType,
      markdownUrl: `${baseUrl.replace(/\/?$/, "/")}${filename}`,
    };
  }
  return { assets, data: { ...inline, routes } satisfies MarkdownSettings };
}

export default async function lazyCopyMarkdownPlugin(
  context: LoadContext,
  options: PluginOptions,
): Promise<Plugin> {
  const upstream = await copyMarkdownPlugin(context, options);
  let assets = new Map<string, string>();
  return {
    ...upstream,
    async allContentLoaded(args) {
      await upstream.allContentLoaded?.({
        ...args,
        actions: {
          ...args.actions,
          setGlobalData(inline) {
            const result = externalizeMarkdown(
              inline as InlineMarkdownData,
              context.baseUrl,
            );
            assets = result.assets;
            args.actions.setGlobalData(result.data);
          },
        },
      });
    },
    configureWebpack(_config, isServer) {
      if (isServer) return {};
      return {
        plugins: [
          {
            apply(compiler: Compiler) {
              compiler.hooks.thisCompilation.tap(
                upstream.name,
                (compilation) => {
                  compilation.hooks.processAssets.tap(
                    {
                      name: upstream.name,
                      stage:
                        compiler.webpack.Compilation
                          .PROCESS_ASSETS_STAGE_ADDITIONAL,
                    },
                    () => {
                      for (const [filename, markdown] of assets) {
                        compilation.emitAsset(
                          filename,
                          new compiler.webpack.sources.RawSource(markdown),
                        );
                      }
                    },
                  );
                },
              );
            },
          },
        ],
      };
    },
    getClientModules() {
      return [resolve(__dirname, "lazy-copy-markdown-client.ts")];
    },
  };
}
