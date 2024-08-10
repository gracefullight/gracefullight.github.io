---
title: jQuery Change Class
authors: me
tags: [javascript, jquery]
date: 2016-12-28 15:49:31
---

Toggle Event 사용시 AAA 로 명명된 클래스를 BBB 로 바꾸고 싶을 때가 있다.

```javascript
$("#id").removeClass("AAA").addClass("BBB");
```

보통 이런 방식으로 사용하는데, alterClass 함수를 곁들이면 더 나이스하게 바꿀 수 있다.

## 소스

```js
/**
@author https://gist.github.com/peteboere/1517285
*/
$.fn.alterClass = function (removals, additions) {
  if (removals.indexOf("*") === -1) {
    // Use native jQuery methods if there is no wildcard matching
    this.removeClass(removals);
    return !additions ? this : this.addClass(additions);
  }

  const pattern = new RegExp(
    "\\s" +
      removals.replace(/\*/g, "[A-Za-z0-9-_]+").split(" ").join("\\s|\\s") +
      "\\s",
    "g",
  );

  this.each(function (i, it) {
    let cn = " " + it.className + " ";
    while (pattern.test(cn)) {
      cn = cn.replace(pattern, " ");
    }
    it.className = $.trim(cn);
  });

  return !additions ? this : this.addClass(additions);
};
```

## 예제

```javascript
// AAA to BBB
$("#id").alterClass("AAA", "BBB");
// AAA-12, BBB-13 to AAABBB
$("#id").alterClass("AAA-* BBB-*", "AAABBB");
```

**asterisk(\*)**를 이용해 여러 개의 클래스를 한꺼번에 원하는 클래스로 변경할 수 있다.

## 여담

jQuery UI 를 사용 중이라면, [.switchClass](https://api.jqueryui.com/switchclass/)를 사용하면 된다.
