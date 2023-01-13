import type { LoadContext, Plugin } from "@docusaurus/types";
import { Joi } from "@docusaurus/utils-validation";

export interface PluginMicrosoftClarityOptions {
  projectId: string;
}

const pluginMicrosoftClarityOptionsSchema = Joi.object({
  projectId: Joi.string().required(),
});

export default async function microsoftClarity(
  _: LoadContext,
  options: PluginMicrosoftClarityOptions
): Promise<Plugin> {
  return {
    name: "@gracefullight/docusaurus-plugin-microsoft-clarity",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${options.projectId}");`,
          },
        ],
      };
    },
  };
}

export function validateOptions({ options, validate }) {
  const validatedOptions = validate(
    pluginMicrosoftClarityOptionsSchema,
    options
  );
  return validatedOptions;
}
