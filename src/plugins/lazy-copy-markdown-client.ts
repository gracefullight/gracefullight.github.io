import type { ClientModule } from "@docusaurus/types";
import type { MarkdownSettings } from "./lazy-copy-markdown-data";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import translations from "@generated/codeTranslations";
import globalData from "@generated/globalData";
import {
  COPY_MARKDOWN_PLUGIN,
  copyMarkdownText,
  createMarkdownLoader,
  normalizeMarkdownRoute,
  resolveMarkdownLabels,
} from "./lazy-copy-markdown-data";
import "./lazy-copy-markdown-client.css";

const settings = (
  globalData as Record<string, Record<string, MarkdownSettings>>
)[COPY_MARKDOWN_PLUGIN]?.default;
const loadMarkdown = settings
  ? createMarkdownLoader(settings.routes)
  : undefined;
let cleanup: () => void = () => undefined;
let controlId = 0;

function icon(paths: string[]) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  for (const d of paths) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.append(path);
  }
  return svg;
}

function button(label: string, className: string) {
  const result = document.createElement("button");
  result.type = "button";
  result.className = className;
  result.textContent = label;
  return result;
}

function sharingLink(label: string, href: string) {
  const result = document.createElement("a");
  result.textContent = label;
  result.href = href;
  result.target = "_blank";
  result.rel = "noopener noreferrer";
  return result;
}

function attachControl(pathname: string, config: MarkdownSettings) {
  const route = config.routes[normalizeMarkdownRoute(pathname)];
  if (!route) return;
  const heading = document.querySelector<HTMLElement>(
    "article h1, article .theme-doc-markdown h1, article .markdown h1",
  );
  if (!heading) return;
  const labels = resolveMarkdownLabels(
    config,
    translations,
    document.documentElement.lang,
  );
  const { copied, ui, copy: label } = labels;
  const container = document.createElement("div");
  container.className = "lazy-copy-markdown";
  container.lang = ui.language;
  container.dataset.alignment = config.buttonAlignment ?? "right";
  const controls = document.createElement("div");
  controls.className = "lazy-copy-markdown__controls";
  const copy = button(label, "lazy-copy-markdown__copy");
  copy.lang = labels.copyLanguage;
  if (config.buttonClassName)
    copy.classList.add(
      ...config.buttonClassName.trim().split(/\s+/).filter(Boolean),
    );
  const copyLabel = document.createElement("span");
  copyLabel.textContent = label;
  copyLabel.lang = labels.copyLanguage;
  copy.replaceChildren(icon(["M8 8h13v13H8z", "M16 8V3H3v13h5"]), copyLabel);
  const more = button("", "lazy-copy-markdown__more");
  more.setAttribute("aria-label", ui.more);
  more.setAttribute("aria-expanded", "false");
  more.append(icon(["m6 9 6 6 6-6"]));
  const options = document.createElement("div");
  options.className = "lazy-copy-markdown__options";
  options.id = `lazy-copy-markdown-options-${controlId++}`;
  options.setAttribute("role", "group");
  options.setAttribute("aria-label", ui.more);
  more.setAttribute("aria-controls", options.id);
  options.hidden = true;
  const copyPage = button(ui.copyPage, "lazy-copy-markdown__option");
  const url = encodeURIComponent(window.location.href);
  options.append(
    copyPage,
    sharingLink(
      ui.chatgpt,
      `https://chatgpt.com/?hint=search&q=Read%20${url}%20so%20I%20can%20ask%20questions%20about%20it.`,
    ),
    sharingLink(
      ui.claude,
      `https://claude.ai/new?q=Read%20${url}%20so%20I%20can%20ask%20questions%20about%20it.`,
    ),
  );
  const status = document.createElement("p");
  status.className = "lazy-copy-markdown__status";
  status.setAttribute("role", "status");
  controls.append(copy, more, options);
  container.append(controls, status);
  const anchor =
    route.contentType === "blog"
      ? (heading.closest("header") ?? heading)
      : heading;
  anchor.insertAdjacentElement("afterend", container);
  let busy = false;
  let reset = 0;
  const close = () => {
    options.hidden = true;
    more.setAttribute("aria-expanded", "false");
  };
  const copyCurrentPage = async () => {
    if (busy || !loadMarkdown) return;
    busy = true;
    copy.disabled = true;
    copyPage.disabled = true;
    copy.setAttribute("aria-busy", "true");
    window.clearTimeout(reset);
    copyLabel.textContent = ui.loading;
    copyLabel.lang = ui.language;
    copy.lang = ui.language;
    status.textContent = "";
    close();
    try {
      const markdown = await loadMarkdown(pathname);
      if (!container.isConnected) return;
      await copyMarkdownText(markdown, document, navigator.clipboard);
      copyLabel.textContent = copied;
      copyLabel.lang = labels.copiedLanguage;
      copy.lang = labels.copiedLanguage;
      status.textContent = copied;
      status.lang = labels.copiedLanguage;
      reset = window.setTimeout(() => {
        copyLabel.textContent = label;
        copyLabel.lang = labels.copyLanguage;
        copy.lang = labels.copyLanguage;
        status.textContent = "";
      }, 2000);
    } catch {
      copyLabel.textContent = label;
      copyLabel.lang = labels.copyLanguage;
      copy.lang = labels.copyLanguage;
      status.textContent = ui.error;
      status.lang = ui.language;
    } finally {
      busy = false;
      copy.disabled = false;
      copyPage.disabled = false;
      copy.removeAttribute("aria-busy");
    }
  };
  copy.addEventListener("click", () => void copyCurrentPage());
  copyPage.addEventListener("click", () => void copyCurrentPage());
  more.addEventListener("click", () => {
    options.hidden = !options.hidden;
    more.setAttribute("aria-expanded", String(!options.hidden));
  });
  const outside = (event: MouseEvent) => {
    if (event.target instanceof Node && !controls.contains(event.target))
      close();
  };
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && !options.hidden) {
      close();
      more.focus();
    }
  };
  document.addEventListener("click", outside);
  document.addEventListener("keydown", handleEscape);
  cleanup = () => {
    window.clearTimeout(reset);
    document.removeEventListener("click", outside);
    document.removeEventListener("keydown", handleEscape);
    container.remove();
  };
}

const client: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (
      !(ExecutionEnvironment.canUseDOM && settings) ||
      location.pathname === previousLocation?.pathname
    )
      return;
    cleanup();
    attachControl(location.pathname, settings);
  },
};

export default client;
