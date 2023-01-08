---
title: adonisjs에 response.sendStatus 추가하기
authors: me
tags: [nodejs, javascript]
date: 2018-02-06 10:02:51

---

`express`에 있는 sendStatus 기능을 활용하기 위해 **start/hooks.js**에도 다음 로직을 추가하자

# 소스

```js start/hooks.js
const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Response = use('Adonis/Src/Response');

  Response.macro('sendStatus', function (status) {
    this.status(status).send('');
  });
});
```

추가 후엔 `controller`에서 `response.sendStauts(403)`과 같은 응답을 반환할 수 있다
