---
title: Laravel 5.5 - Debugbar와 BrowserSync의 충돌 해결
authors: me
tags: [php, laravel]
date: 2017-08-24 22:06:11

---

Laravel Mix로 browserSync 옵션을 활성화 시에 Debugbar가 생기지 않는 오류가 발생할 경우 (스크립트 단에서 JSON parse 오류가 발생한다)
다음과 같이 설정해주면 된다.

# 해결

```js webpack.mix.js
mix.browserSync({
  proxy: {
    // artisan serve시의 주소
    target: 'localhost:8000',
    reqHeaders: function () {
      // host를 직접 지정해준다.
      return {
        host: 'localhost:3000',
      };
    },
  },
});
```
