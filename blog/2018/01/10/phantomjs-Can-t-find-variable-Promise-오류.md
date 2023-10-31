---
title: phantomjs Can't find variable Promise 오류
authors: me
tags: [javascript, nodejs]
date: 2018-01-10 18:40:56
---

## 원인

phantomjs에서 Promise를 지원하지 않기 때문이다.

## 해결

spec html문서에 polyfill을 추가하자

```html
<script src="https://cdn.jsdelivr.net/npm/promise-polyfill"></script>
```
