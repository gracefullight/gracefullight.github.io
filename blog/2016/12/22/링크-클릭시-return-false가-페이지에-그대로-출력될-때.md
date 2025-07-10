---
title: 링크 클릭시 return false가 페이지에 그대로 출력될 때
authors: me
tags:
  - javascript
date: 2016-12-22 13:13:35
---

링크를 클릭했는데, 페이지에 `return false;`가 찍혀나오는 경우가 있다.

## 소스

```html
<script>
  function test() {
    if (true) {
      return false;
    }
  }
</script>

<!-- 페이지에 return false;가 출력됨 -->
<a href="javascript:test();">테스트</a>

<!-- 대체 -->
<a href="javascript://" onClick="test();">테스트</a>
```

## 설명

a href 속성 안에 javascript 를 사용시 발생한다.
javascript 호출문인 onClick 을 이용하자.
