---
title: Vue에서 jquery와 bootstrap 전역으로 사용하기
authors: me
tags: [vue, bootstrap, javascript, jquery]
date: 2017-11-17 16:45:23
---

`expose-loader`의 설치가 필요 없는 방법을 사용해보자

[Vuejs-kr](https://vuejs-kr.github.io/jekyll/update/2017/03/02/vuejs-jquery-bootstrap/)에 좋은 내용이 있지만 웹팩을 통해 jquery를 꺼내는 방법이 더 간단하다.

## 설치

```bash
yarn add jquery bootstrap
```

## 설정

### webpack

```js title="build/webpack.base.conf.js"
const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery",
      jQuery: "jquery",
    }),
  ],
};
```

### eslint

```js title=".enlintrs.js"
module.exports = {
  globals: {
    $: true,
    jQuery: true,
  },
};
```

## 연동

```js title="src/main.js"
import "bootstrap";

new Vue({});
```
