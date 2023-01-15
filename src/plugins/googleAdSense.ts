import type { LoadContext, Plugin } from "@docusaurus/types";
import { Joi } from "@docusaurus/utils-validation";

export interface PluginGoogleAdSenseOptions {
  googleAdClient: string;
}

const pluginGoogleAdSenseOptionsSchema = Joi.object({
  googleAdClient: Joi.string().required(),
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
            tagName: "link",
            attributes: {
              rel: "preconnect",
              href: "https://pagead2.googlesyndication.com",
            },
          },
          {
            tagName: "script",
            attributes: {
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${options.googleAdClient}`,
              async: true,
              crossOrigin: "anonymous",
            },
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
