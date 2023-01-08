---
title: 'React에서 jquery, bootstrap 전역으로 사용하기'
authors: me
tags: [react, javascript, bootstrap, jquery]
date: 2017-11-14 16:55:37
---

create-react-app으로 만들어진 react 앱에서 jquery와 bootstrap을 사용하려면 다음과 같이 설정해주면 된다.

```js index.js
import 'jquery/src/jquery';
import 'bootstrap';
```
