---
title: jQuery3의 큰 변경점
authors: me
tags: [javascript, jquery]
date: 2016-12-26 13:57:15
---

jQuery3이 기존 버전에서 어떻게 달라졌는지 알아보자.

# load(), unload(), error() 삭제

이 함수들은 이제 ajax 기능으로만 사용할 수 있다.
다음처럼 url 을 로드하는 데에만 사용할 수 있다.

```js
// 사용 가능
$(div).load(url);
```

기존에 사용하던 엘레먼트 로드 시 callback 함수를 받는 구문은 더이상 사용할 수 없지만 `on('load')` 로 충돌을 피할 수 있다.

```js
// 사용 불가능
$(img).load(function () {
  console.log("이미지 로드 완료");
});

// 사용 가능
$(img).on("load", function () {
  console.log("이미지 로드 완료");
});
```

# document on Ready 삭제

document 로드시에 호출되는 함수들을 정의하기 위한 위의 형태는 더 이상 사용할 수 없다.
`$(document).ready(function(){ });` 으로 변경해도 되나

=> `$(function(){ });` **로 사용하자, 권장하는 방법이다.**

# deferred의 Promise 스펙

Promise/A+ 스펙을 지키지 않은 2버전까지는 오류가 있었다고 하는데, then, when 등의 메소드를 사용 중엔 별다른 문제가 없어서
체감상 크게 느껴지지 않았다.

=> **then().then().then().then().catch() 와 같은 구문이 가능하다.**

# bind(), unbind(), delegate() undelegate() 삭제

위 구문 사용시 console.warning이 떴기에 바꿔왔더라면 큰 문제는 없다.

=> **on(), off() 로 대체하면 된다.**

# andSelf() 삭제

이 메소드가 삭제되어 sementic UI 사용시 오류가 발생한다.

=> **addBack() 으로 대체하면 된다.**

# param() 이 %20 을 + 기호로 바꾸지 않음

`$.ajax`로 return 받을 때 가끔씩 빈칸이 더하기로 반환되는 문제가 드디어 해결되었다.

# event.props, event.fixHooks 삭제

jquery.onoff 라이브러리 사용시 오류가 난다.

=> **fixHooks는 fix로 대체 가능하고, props는 빈 배열로 초기화시키면 된다.**

# data attribute 정의시 kebab-case를 사용가능

이 부분은 jQuery 문서의 예제를 참조했다.

```javascript
const $div = $("<div />");
$div.data("clickCount", 2);
$div.data("clickCount"); // 2
$div.data("click-count", 3);
$div.data("clickCount"); // 3
$div.data("click-count"); // 3

const allData = $div.data();
allData.clickCount; // 3
allData["click-count"]; // undefined
allData["click-count"] = 14;
$div.data("click-count"); // 3, NOT 14 as it would be in jQuery 2.x
allData.clickCount; // 3
allData["click-count"]; // 14
```

하지만 헷갈리니 camelCase 로.

기타 변경점은 [링크](https://jquery.com/upgrade-guide/3.0/#data) 참조
