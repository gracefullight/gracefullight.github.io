---
title: puppeteer 크롤링 속도 증가시키기
authors: me
tags: [javascript, nodejs, puppeteer]
date: 2019-07-29 21:44:24
---

페이지를 가져온 뒤 css, image, font를 차단하면 더 빠른 DOM 액세스가 가능하다.

# 리소스 차단

```ts
// @types/puppeteer
import { launch, Browser, Request, Page } from "puppeteer";

const browser: Browser = await launch({
  headless: true,
});

const page: Page = await browser.newPage();
await page.setRequestInterception(true);

page.on("request", (req: Request) => {
  switch (req.resourceType()) {
    case "stylesheet":
    case "font":
    case "image":
      req.abort();
      break;
    default:
      req.continue();
      break;
  }
});

await page.goto("URL");
```
