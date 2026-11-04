import { expect, it } from "vitest";
import { isHomepagePath } from "./home-route";

it.each([
  ["/", "/"],
  ["/en/", "/en/"],
  ["/en", "/en/"],
  ["/notes/en", "/notes/en/"],
])("uses the contact close at the exact locale homepage %s", (path, base) => {
  expect(isHomepagePath(path, base)).toBe(true);
});

it.each([
  ["/archive/", "/"],
  ["/en/archive/", "/en/"],
  ["/en/2026/01/31/agentic-sdlc/", "/en/"],
  ["/enpost/", "/en/"],
  ["/enough", "/en/"],
  ["/notes/en/archive/", "/notes/en/"],
  ["/", "/en/"],
])("keeps the blog footer at %s", (path, base) => {
  expect(isHomepagePath(path, base)).toBe(false);
});
