---
title: HTML 태그 모두 제거
authors: me
tags: [javascript, html]
date: 2016-12-22 21:08:10
---

스마트 에디터 같은 에디터를 쓸 대 내용을 텍스트로만 받아야할 경우가 있다.

## 예제

```javascript
var data = data.replace(/[<][^>]*[>]/g, "");
```

## 설명

< > 안의 태그들을 모두 빈값으로 치환한다.
