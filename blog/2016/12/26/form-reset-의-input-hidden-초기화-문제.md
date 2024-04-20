---
title: form.reset()의 input hidden 초기화 문제
authors: me
tags: [javascript, jquery]
date: 2016-12-26 14:41:00
---

Javascript 의 form 의 reset() 메소드는 hidden field 와 check, radio button 에 대해 초기화를 시켜주지 않는다.

따라서 form 의 모든 field 를 초기화 시키려면 아래의 메소드가 필요하다.

# 소스

```js
$.fn.clearForm = function () {
  return this.each(function () {
    const type = this.type,
      tag = this.tagName.toLowerCase();
    if (tag === "form") {
      return $(":input", this).clearForm();
    }
    if (
      type === "text" ||
      type === "password" ||
      type === "hidden" ||
      tag === "textarea"
    ) {
      this.value = "";
    } else if (type === "checkbox" || type === "radio") {
      this.checked = false;
    } else if (tag === "select") {
      this.selectedIndex = -1;
    }
  });
};
```

# 예제

```javascript
$("#form").clearForm();
```

# 설명

[여기](https://www.sitepoint.com/jquery-function-clear-form-data/)의 clearForm 메소드를 hidden 도 초기화할 수 있게 커스터마이징 했다.
