import type { LoadContext, Plugin } from "@docusaurus/types";
import { Joi } from "@docusaurus/utils-validation";

export interface PluginGoogleAdSenseOptions {
  googleAdClient: string;
  enablePageLevelAds?: boolean;
}

const pluginGoogleAdSenseOptionsSchema = Joi.object({
  googleAdClient: Joi.string().required(),
  enablePageLevelAds: Joi.boolean().optional(),
});

export default async function googleAdSense(
  _: LoadContext,
  options: PluginGoogleAdSenseOptions
): Promise<Plugin> {
  return {
    name: "@gracefullight/docusaurus-plugin-google-adsense",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
              async: true,
            },
          },
          {
            tagName: "script",
            innerHTML: `(adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "${options.googleAdClient}", 
              enable_page_level_ads: ${
                options.enablePageLevelAds ? "true" : "false"
              }
            });`,
          },
        ],
      };
    },
  };
}

export function validateOptions({ options, validate }) {
  const validatedOptions = validate(pluginGoogleAdSenseOptionsSchema, options);
  return validatedOptions;
}
