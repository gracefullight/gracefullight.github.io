---
title: Vue multi page app에서 코드가 미리보이는 현상 제거
authors: me
tags: [vue, javascript]
date: 2017-11-08 10:28:50
---

뷰에 데이터가 바인딩 되기전 `{{태그}}` 구문이 보일 때 다음과 같이 하면 된다.

# 해결

[v-cloak api](https://vuejs.org/v2/api/#v-cloak)에 자세하게 나와있다.

```html
<!-- vue가 바인딩 될 영역에 v-cloak attribute를 추가한다 -->
<div id="vue_area" v-cloak></div>
```

```css
[v-cloak] {
  display: none;
}
```

# 더 멋진 방법

로딩시에 content 영역에 loading...이라는 문구를 찍어주는 방법으로
[여기](https://medium.com/vuejs-tips/v-cloak-45a05da28dc4)에 자세히 설명되어있다.

```css
[v-cloak] > * {
  display: none;
}
[v-cloak]::before {
  content: "loading...";
}
```
