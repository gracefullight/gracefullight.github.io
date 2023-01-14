---
title: jQuery Validation과 Materialize의 연동
authors: me
tags: [javascript, jquery]
date: 2016-12-21 23:00:18
---

**jQuery Validation with Materialize CSS**
Materialize CSS 와 연동해 사용할 수 있다.

# 소스

```js
// p 태그를 이용하는 방법
$.validator.setDefaults({
  errorClass: "invalid form-error red-text",
  errorElement: "p",
  errorPlacement: function (error, element) {
    var e = element.get(0);
    if (e.type === "radio" || e.type === "checkbox") {
      var $a = error.appendTo(element.parent());
      $a.css({ "margin-top": "10px" });
    } else {
      error.appendTo(element.parent());
    }
  },
});

// 더 예쁜 방법
$.validator.setDefaults({
  errorClass: "invalid",
  validClass: "valid",
  errorPlacement: function (error, element) {
    var $label = $(element)
      .closest("form")
      .find("label[for='" + element.attr("id") + "']");

    $label.attr("data-error", error.text());
    $label.addClass("active");
  },
});
```

# 여담

bootstrap tooltip 을 활용한 validation 처럼 toast 를 활용한 플러그인이 나오면 좋으련만...
