import type { LoadContext, Plugin } from "@docusaurus/types";
import { Joi } from "@docusaurus/utils-validation";

// ? https://analytics.naver.com/management/mysites.html
export interface PluginNaverAnalyticsOptions {
  siteId: string;
}

const pluginNaverAnalyticsOptionsSchema = Joi.object({
  siteId: Joi.string().required(),
});

export default async function naverAnalytics(
  _: LoadContext,
  options: PluginNaverAnalyticsOptions
): Promise<Plugin> {
  return {
    name: "@gracefullight/docusaurus-plugin-naver-analytics",
    injectHtmlTags() {
      return {
        postBodyTags: [
          {
            tagName: "script",
            attributes: {
              src: "https://wcs.naver.net/wcslog.js",
            },
          },
          {
            tagName: "script",
            innerHTML: `if(!wcs_add) var wcs_add = {};
            wcs_add["wa"] = "${options.siteId}";
            if(window.wcs) {
              wcs_do();
            }`,
          },
        ],
      };
    },
  };
}

export function validateOptions({ options, validate }) {
  const validatedOptions = validate(pluginNaverAnalyticsOptionsSchema, options);
  return validatedOptions;
}
