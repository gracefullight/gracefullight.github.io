export const COPY_MARKDOWN_PLUGIN =
  "@gracefullight/docusaurus-plugin-copy-markdown";

export type MarkdownRoute = {
  contentType: "blog" | "docs";
  markdownUrl: string;
};

export type MarkdownSettings = {
  buttonAlignment?: "left" | "center" | "right";
  buttonClassName?: string;
  customButtonLabel?: string;
  customCopiedLabel?: string;
  routes: Record<string, MarkdownRoute>;
};

const messages = {
  en: {
    chatgpt: "Open in ChatGPT",
    claude: "Open in Claude",
    copied: "Copied!",
    copy: "Copy page as Markdown",
    copyPage: "Copy page",
    error: "Could not copy this page. Please try again.",
    language: "en",
    loading: "Loading Markdown…",
    more: "More sharing options",
  },
  ko: {
    chatgpt: "ChatGPT에서 열기",
    claude: "Claude에서 열기",
    copied: "복사했습니다",
    copy: "마크다운으로 복사",
    copyPage: "페이지 복사",
    error: "복사하지 못했습니다. 다시 시도해 주세요.",
    language: "ko",
    loading: "마크다운을 불러오는 중…",
    more: "공유 옵션",
  },
} as const;

function labelLanguage(text: string, fallback: string) {
  if (/[가-힣]/.test(text)) return "ko";
  return /[A-Za-z]/.test(text) ? "en" : fallback;
}

export function resolveMarkdownLabels(
  settings: MarkdownSettings,
  translations: Record<string, string>,
  language: string,
) {
  const ui = language.toLowerCase().startsWith("ko")
    ? messages.ko
    : messages.en;
  const translatedCopy = translations["copyMarkdown.buttonLabel"];
  const translatedCopied = translations["copyMarkdown.copiedLabel"];
  const copy =
    settings.customButtonLabel ??
    (translatedCopy && translatedCopy !== messages.en.copy
      ? translatedCopy
      : ui.copy);
  const copied =
    settings.customCopiedLabel ??
    (translatedCopied && translatedCopied !== messages.en.copied
      ? translatedCopied
      : ui.copied);
  return {
    copied,
    copiedLanguage: labelLanguage(copied, ui.language),
    copy,
    copyLanguage: labelLanguage(copy, ui.language),
    ui,
  };
}

export function normalizeMarkdownRoute(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0];
  let decoded = path;
  try {
    decoded = decodeURI(path);
  } catch {
    // Malformed escaped URLs cannot match a generated route.
  }
  return decoded.length > 1 ? decoded.replace(/\/+$/, "") : decoded;
}

export function createMarkdownLoader(
  routes: Record<string, MarkdownRoute>,
  fetchMarkdown: typeof fetch = fetch,
) {
  const pending = new Map<string, Promise<string>>();
  return (pathname: string): Promise<string> => {
    const route = routes[normalizeMarkdownRoute(pathname)];
    if (!route) return Promise.reject(new Error("This page has no Markdown."));
    const cached = pending.get(route.markdownUrl);
    if (cached) return cached;
    const request = fetchMarkdown(route.markdownUrl)
      .then(async (response) => {
        if (!response.ok) throw new Error("The Markdown could not be loaded.");
        const type = response.headers.get("content-type") ?? "";
        const markdown = await response.text();
        if (
          type.includes("text/html") ||
          /^\s*<!doctype html/i.test(markdown)
        ) {
          throw new Error("The Markdown could not be loaded.");
        }
        return markdown;
      })
      .catch((error: unknown) => {
        pending.delete(route.markdownUrl);
        throw error;
      });
    pending.set(route.markdownUrl, request);
    return request;
  };
}

export async function copyMarkdownText(
  markdown: string,
  document: Document,
  clipboard?: Pick<Clipboard, "writeText">,
) {
  if (clipboard) {
    try {
      await clipboard.writeText(markdown);
      return;
    } catch {
      // Older browsers and denied clipboard permission use the native fallback.
    }
  }
  const focused = document.activeElement;
  const textarea = document.createElement("textarea");
  textarea.value = markdown;
  textarea.readOnly = true;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  try {
    if (!document.execCommand("copy")) {
      throw new Error("Copy failed. Please try again.");
    }
  } finally {
    textarea.remove();
    if (focused instanceof HTMLElement) focused.focus({ preventScroll: true });
  }
}
