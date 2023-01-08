---
title: Vue Developer Tools 켜기
authors: me
tags: [javascript, laravel, vue]
date: 2017-09-13 23:02:02
---

Devtools inspection is not available because it's in production mode 란 메세지와 함께
Vue 개발자 도구가 표시되지 않을 경우에 script 상단에 아래 구문을 추가한다.

# 해결

```js
Vue.config.devtools = true;
```

# 개발자 도구에 Vue 탭이 없을 때

`ctrl+shift+i` 키를 Vue 탭이 보일 때 까지 반복해서 눌러준다.
