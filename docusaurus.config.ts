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
  title: "gracefullight.dev",
  tagline: `Gracefullight's Blog`,
  url: "https://gracefullight.dev",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // ? https://docusaurus.io/docs/deployment#deploying-to-github-pages
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "gracefullight", // Usually your GitHub org/user name.
  projectName: "gracefullight.github.io", // Usually your repo name.
  deploymentBranch: "gh-pages",
  trailingSlash: true,

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

  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          blogSidebarCount: 10,
          feedOptions: {
            type: "all",
            limit: 10,
          },
          remarkPlugins: [remarkMath, remarkFlexibleMarkers],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-E99DNE7S05",
          anonymizeIP: false,
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    // ? https://docusaurus.io/docs/markdown-features/math-equations#configuration
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
      type: "text/css",
      crossorigin: "anonymous",
    },
  ],

  plugins: [
    [
      "@docusaurus/plugin-pwa",
      /** @type {import('@docusaurus/plugin-pwa').Options} */
      {
        debug: process.env.NODE_ENV === "development",
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/img/favicon-32x32.png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "#f28913",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#f28913",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "/img/apple-touch-icon.png",
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

  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preconnect",
        href: "https://cdn.jsdelivr.net",
      },
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Person",
        name: "Eunkwang Shin",
        url: "https://gracefullight.dev",
        logo: "https://gracefullight.dev/img/apple-touch-icon.png",
        image: "https://avatars.githubusercontent.com/u/11773683?v=4",
        email: "mailto:gracefullight.dev@gmail.com",
        jobTitle: "FullStack JavaScript Developer",
        nationality: "Korean",
        sameAs: [
          "https://github.com/gracefullight",
          "https://linkedin.com/in/gracefullight",
        ],
      }),
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: "dark",
      disableSwitch: true,
    },
    metadata: [
      // ? https://search.google.com/search-console
      {
        name: "google-site-verification",
        content: "gcY9SiftHgQoJjBZ7IgwNNN5_atLPAX6kWb1nFVfa6E",
      },
      // ? https://www.bing.com/webmasters/home
      { name: "msvalidate.01", content: "65AD1E28C0D057CEB3C68FBC0293E55B" },
      // ? https://searchadvisor.naver.com/console/board
      {
        name: "naver-site-verification",
        content: "d024c2837887f72dc7b3792b958be74d69ba9593",
      },
      // ? https://webmaster.yandex.com
      { name: "yandex-verification", content: "6672f93d837354fb" },
      { name: "baidu-site-verification", content: "yZEdU1ABcR" },
      {
        name: "facebook-domain-verification",
        content: "uelupjqqsm5egzlhy1aev2rfxow5yt",
      },
    ],
    // ? https://www.algolia.com/apps/T6L0PPYQJB/dashboard
    algolia: {
      appId: "RFS69RSYOJ",
      apiKey: "ed845a181b33267d7d7f830674259972",
      indexName: "gracefullight",
    },
    navbar: {
      title: "gracefullight.dev",
      logo: {
        alt: "gracefullight.dev blog logo",
        src: "img/favicon-32x32.png",
      },
      items: [
        {
          type: "localeDropdown",
          position: "left",
        },
        {
          to: "/archive",
          label: "Archives",
        },
        {
          to: "/tags",
          label: "Tags",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Eunkwang Shin.`,
      links: [
        {
          title: "Support Me",
          items: [
            {
              html: `<a href="https://www.buymeacoffee.com/LOUB2kN" target="_blank" rel="noopener noreferrer" style="cursor: pointer;">
                <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" style="height: auto !important;width: auto !important;" >
              </a>`,
            },
          ],
        },
        {
          title: "Feeds",
          items: [
            {
              label: "RSS",
              href: "https://gracefullight.dev/rss.xml",
            },
            {
              label: "Atom",
              href: "https://gracefullight.dev/atom.xml",
            },
          ],
        },
      ],
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
