import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";

import dotenv from "dotenv";
import { themes } from "prism-react-renderer";
import rehypeKatex from "rehype-katex";
import remarkFlexibleMarkers from "remark-flexible-markers";
import remarkMath from "remark-math";

// Note: type annotations allow type checking and IDEs autocompletion
dotenv.config();

// ? https://github.com/FormidableLabs/prism-react-renderer/tree/master/packages/prism-react-renderer/src/themes
const config: Config = {
  baseUrl: "/",
  deploymentBranch: "gh-pages",
  favicon: "img/favicon.ico",

  headTags: [
    {
      attributes: {
        href: "https://cdn.jsdelivr.net",
        rel: "preconnect",
      },
      tagName: "link",
    },
    {
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Person",
        email: "mailto:gracefullight.dev@gmail.com",
        image: "https://avatars.githubusercontent.com/u/11773683?v=4",
        jobTitle: "FullStack JavaScript Developer",
        logo: "https://gracefullight.dev/img/apple-touch-icon.png",
        name: "Eunkwang Shin",
        nationality: "Korean",
        sameAs: [
          "https://github.com/gracefullight",
          "https://linkedin.com/in/gracefullight",
        ],
        url: "https://gracefullight.dev",
      }),
      tagName: "script",
    },
  ],

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "ko",
    locales: ["ko", "en"],
  },

  markdown: {
    mermaid: true,
  },
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn", // Usually your GitHub org/user name.

  // ? https://docusaurus.io/docs/deployment#deploying-to-github-pages
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "gracefullight", // Usually your repo name.

  plugins: [
    [
      "@docusaurus/plugin-pwa",
      /** @type {import('@docusaurus/plugin-pwa').Options} */
      {
        debug: process.env.NODE_ENV === "development",
        pwaHead: [
          {
            href: "/img/favicon-32x32.png",
            rel: "icon",
            tagName: "link",
          },
          {
            href: "/manifest.json",
            rel: "manifest",
            tagName: "link",
          },
          {
            content: "#f28913",
            name: "theme-color",
            tagName: "meta",
          },
          {
            content: "yes",
            name: "apple-mobile-web-app-capable",
            tagName: "meta",
          },
          {
            content: "#f28913",
            name: "apple-mobile-web-app-status-bar-style",
            tagName: "meta",
          },
          {
            href: "/img/apple-touch-icon.png",
            rel: "apple-touch-icon",
            tagName: "link",
          },
        ],
      },
    ],
    // ! Can't use ts directly https://docusaurus.io/docs/typescript-support#typing-config
    [
      "@gracefullight/docusaurus-plugin-google-adsense",
      {
        adClient: "ca-pub-3004788392777865",
      },
    ],
    [
      "@gracefullight/docusaurus-plugin-microsoft-clarity",
      {
        projectId: "aongv9xgi6",
      },
    ],
    [
      "@gracefullight/docusaurus-plugin-naver-analytics",
      {
        siteId: "156bc73a81e3bd0",
      },
    ],
    [
      "@gracefullight/docusaurus-plugin-channelio",
      {
        pluginKey: "0fd130ba-a1a6-4b7e-802a-e82a885a7fd8",
      },
    ],
    [
      "@gracefullight/docusaurus-plugin-cloudflare-analytics",
      {
        token: "c0899829e72b45e98dff77241127252c",
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        blog: {
          blogSidebarCount: 10,
          feedOptions: {
            limit: 10,
            type: "all",
            xslt: true,
          },
          rehypePlugins: [rehypeKatex],
          remarkPlugins: [remarkMath, remarkFlexibleMarkers],
          routeBasePath: "/",
          showReadingTime: true,
        },
        debug: true,
        docs: false,
        gtag: {
          anonymizeIP: false,
          trackingID: "G-E99DNE7S05",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      } satisfies Preset.Options,
    ],
  ],
  projectName: "gracefullight.github.io",

  stylesheets: [
    // ? https://docusaurus.io/docs/markdown-features/math-equations#configuration
    {
      crossorigin: "anonymous",
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
      type: "text/css",
    },
  ],
  tagline: `Gracefullight's Blog`,

  themeConfig: {
    // ? https://www.algolia.com/apps/T6L0PPYQJB/dashboard
    algolia: {
      apiKey: "ed845a181b33267d7d7f830674259972",
      appId: "RFS69RSYOJ",
      indexName: "gracefullight",
    },
    colorMode: {
      defaultMode: "light",
    },
    footer: {
      copyright: `Copyright © 2016-${new Date().getFullYear()} Eunkwang Shin.`,
      links: [
        {
          items: [
            {
              html: `<a href="https://www.buymeacoffee.com/LOUB2kN" target="_blank" rel="noopener noreferrer" style="cursor: pointer;">
                <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" style="height: auto !important;width: auto !important;" >
              </a>`,
            },
          ],
          title: "Support Me",
        },
        {
          items: [
            {
              href: "https://gracefullight.dev/rss.xml",
              label: "RSS",
            },
            {
              href: "https://gracefullight.dev/atom.xml",
              label: "Atom",
            },
          ],
          title: "Feeds",
        },
      ],
      style: "dark",
    },
    metadata: [
      // ? https://search.google.com/search-console
      {
        content: "gcY9SiftHgQoJjBZ7IgwNNN5_atLPAX6kWb1nFVfa6E",
        name: "google-site-verification",
      },
      // ? https://www.bing.com/webmasters/home
      { content: "65AD1E28C0D057CEB3C68FBC0293E55B", name: "msvalidate.01" },
      // ? https://searchadvisor.naver.com/console/board
      {
        content: "d024c2837887f72dc7b3792b958be74d69ba9593",
        name: "naver-site-verification",
      },
      // ? https://webmaster.yandex.com
      { content: "6672f93d837354fb", name: "yandex-verification" },
      { content: "yZEdU1ABcR", name: "baidu-site-verification" },
      {
        content: "uelupjqqsm5egzlhy1aev2rfxow5yt",
        name: "facebook-domain-verification",
      },
    ],
    navbar: {
      items: [
        {
          position: "left",
          type: "localeDropdown",
        },
        {
          label: "Archives",
          to: "/archive",
        },
        {
          label: "Tags",
          to: "/tags",
        },
        {
          "aria-label": "GitHub repository",
          className: "header-github-link",
          href: "https://github.com/gracefullight",
          position: "right",
        },
      ],
      logo: {
        alt: "gracefullight.dev blog logo",
        src: "img/favicon-32x32.png",
      },
      title: "gracefullight.dev",
    },
    prism: {
      // ? https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9
      // ? https://github.com/PrismJS/prism/tree/master/components
      additionalLanguages: [
        "bash",
        "csharp",
        "diff",
        "docker",
        "http",
        "ini",
        "php",
        "scss",
      ],
      darkTheme: themes.vsDark,
      theme: themes.github,
    },
  } satisfies Preset.ThemeConfig,

  themes: ["@docusaurus/theme-mermaid"],
  title: "gracefullight.dev",
  trailingSlash: true,
  url: "https://gracefullight.dev",
};

export default config;
