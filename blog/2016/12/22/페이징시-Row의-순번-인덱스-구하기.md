---
title: 페이징시 Row의 순번(인덱스) 구하기
authors: me
tags:
  - javascript
date: 2016-12-22 12:58:57
---

전체 레코드 수와 현재 페이지 번호, 페이지에 표시되는 레코드의 수를 안다면 쉽게 구할 수 있다.

## 소스

```js
let totalCount;
let currentPageNum;
let shownRowNum;

for (let i = 0, len = data.length; i < len; i++) {
  const index = Number(totalCount) - (i + (currentPageNum - 1) * shownRowNum);
}
```

## 여담

매번 공식을 알아내는게 귀찮아서 포스팅
