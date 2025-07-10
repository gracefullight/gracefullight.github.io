---
title: jQuery serializeObject - form을 json으로 변환
authors: me
tags:
  - javascript
  - jquery
date: 2016-12-28 12:38:00
---

비동기 submit 을 진행시에 form 값을 확인해보고 json object 로 받아 한 번에 request 를 날리고 싶을 때 유용하다.

## 소스

```js
/*
@author https://github.com/macek/jquery-serialize-object
*/
$.fn.serializeObject = function () {
  "use strict";
  const result = {};
  const extend = function (i, element) {
    const node = result[element.name];
    if ("undefined" !== typeof node && node !== null) {
      if ($.isArray(node)) {
        node.push(element.value);
      } else {
        result[element.name] = [node, element.value];
      }
    } else {
      result[element.name] = element.value;
    }
  };

  $.each(this.serializeArray(), extend);
  return result;
};
```

## 예제

```javascript
const formData = $("#form").serializeObject();
```

## 여담

checkbox 같은 경우 여러 개 선택시 하나의 key 에 배열로 반환된다.

```html
<form>
  <input type="checkbox" name="arr" value="1" checked />
  <input type="checkbox" name="arr" value="2" checked />
</form>

<script>
  var formData = $("form").serializeObject();
  // => formData = { arr : [1,2] };
</script>
```

사실 이 기능이 제일 매력적이다.

현재 [serializeObject library](https://github.com/macek/jquery-serialize-object)는 더 높은 버전이 있다.
최신 버전에선 form 의 name 속성에 object 를 직접 관리할 수 있다.
최신 버전을 써도 괜찮고, 가볍게 추가해서 쓰고 싶으면 위 버전을 이용하자.
