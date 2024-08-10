---
title: React-Router Code Splitting - 가장 쉬운 방법
authors: me
tags: [javascript, react]
date: 2017-11-23 10:58:22
---

`create-react-app`으로 생성한 리액트 앱에 시작시 가져오는 컴포넌트 빼고는 비동기로 불러와야 메인이 가벼워진다.

검색해보면 `AsyncComponent`를 만들라는 게 보이는데, 더 쉬운 방법이 있다.

## React-Loadable

[React-router 의 Code Splitting](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/code-splitting.md#code-splitting)탭 에서 찾아볼 수 있는데, 아주 간결하게 컴포넌트를 불러 온다.

```js
import React, { Component } from "react";
import Loadable from "react-loadable";
import Loading from "./Loading";

const LoadableComponent = Loadable({
  loader: () => import("./Dashboard"),
  /* 컴포넌트 로딩시 보여지는 로딩 컴포넌트 */
  loading: Loading,
});

export default class LoadableDashboard extends Component {
  render() {
    return <LoadableComponent />;
  }
}
```

너무 너무 쉽다. 진작에 이 정도 레벨의 추상화가 있었어야했다.

### 옵션

자세한 옵션 `delay`, `timeout` 등은 [여기](https://github.com/thejameskyle/react-loadable#------------api-docs)서 확인할 수 있다.
