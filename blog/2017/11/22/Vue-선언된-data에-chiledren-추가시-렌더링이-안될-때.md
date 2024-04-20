---
title: Vue 선언된 data에 chiledren 추가시 렌더링이 안될 때
authors: me
tags: [javascript, vue]
date: 2017-11-22 16:10:02
---

`data`가 이미 정의 되어있고 나중에 데이터를 추가하면 `observer`가 생성되지 않아 데이터가 갱신이 되어도 DOM이 업데이트가 안 된다.

# 예시

## 템플릿

```html
<div id="memberList">
  <div v-for="member in members">
    {{ member.name }}
    <ul v-if="member.logs && member.logs.length > 0">
      <li v-for="log in member.logs"></li>
    </ul>
  </div>
</div>
```

## JS

```js
new Vue({
  el: "#memberList",
  data: {
    members: [{ id: 1, name: "gracefullight" }],
  },

  mounted: function () {
    /* member의 logs 데이터는 그냥 배열로 선언된다. */
    this.members[0].logs = [];
    /* 데이터를 넣어도 위 템플릿의 <li> 부분이 반복되지 않는다. */
    this.members[0].logs = [
      { id: 1, message: "test action", created_at: "2017-11-22" },
    ];
  },
});
```

# 해결

`set` 메소드 또는 `$forceUpdate` 메소드를 사용하면 된다.

```js
/* 1안 */
const option = {
  mounted: function () {
    this.$set(this.members[0], "logs", []);
    this.members[0].logs = [
      // ...
    ];
  },
};
```

```js
/* 2안 */
const option = {
  mounted: function () {
    this.members[0].logs = [];
    this.members[0].logs = [
      // ...
    ];
    this.$forceUpdate();
  },
};
```
