---
title: Javascript Unix Timestamp
authors: me
tags: [javascript, linux]
date: 2016-12-22 12:30:44
---

API 통신시 Unix Timestamp가 필요한 경우가 있다.

# 소스

```js
// === PHP time();
var timestamp = Math.round(new Date().getTime() / 1000);
// 또는
// new Date().getTime() 을 Date.now() 로 바꿀 수 있다.
```

# 여담

lodash 라이브러리를 사용하면 **\_.now()** 함수로 현재 타임스탬프를 가져올 수 있다.
소스처럼 1,000으로 나눠줘야한다.
