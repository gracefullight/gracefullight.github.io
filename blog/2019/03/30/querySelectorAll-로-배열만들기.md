---
title: querySelectorAll 로 배열만들기
authors: me
tags: [javascript]
date: 2019-03-30 22:11:05
---

`document.querySelectorAll('.class')` 와 같이 엘레먼트를 받았는데, `for`문을 돌리면 오류가 발생한다.

# 해결

```js
// 이 방법이나
let classes = Array.from(document.querySelectorAll(".class"));
// 이렇게 가능하다
classes = [...document.querySelectorAll(".class")];

// 구버전 브라우저를 지원해야한다면
classes = Array.prototype.slice.call(document.querySelectorAll(".class"));
```

# 여담

puppeteer 로 크롤링할 때 항상 헷갈린다.
삽질로 찾았는데 stackoverflow 에 정리된 게 있는 듯..
