---
title: jQuery Enter Event
authors: me
tags: [javascript, jquery]
date: 2016-12-28 12:24:35
---

로그인 폼을 만들 때 tab 과 enter 를 이용해 로그인 할 수 있게 해줘야한다.

# 소스

```js
$('#id').keypress(function (e) {
  if (e.which === 13) {
    // do something
  }
});
```

# 여담

로그인 폼을 매번 만들지 않기 때문에, e.which 는 매번 헷갈린다..
