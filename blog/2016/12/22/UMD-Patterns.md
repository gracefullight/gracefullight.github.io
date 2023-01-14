---
title: UMD Patterns
authors: me
tags: [javascript]
date: 2016-12-22 18:57:00
---

UMD (Universal Module Definition) Pattern 이란
AMD (requireJS), CommonJS (node), 일반 browser 환경에서 통합해서 쓸 수 있는 javascript module pattern 이다.

jQuery, moment, D3 등의 라이브러리에서도 해당 패턴을 사용한다.

# 예제 - jQeury 종속형

새로 만들 예제의 모듈명은 module1 이고 jQuery 에 종속적이라고 가정한다.

```js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD 환경
    define(["exports", "jquery"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS 환경
    factory(exports, require("jquery"));
  } else {
    // 일반 브라우저
    factory((global.module1 = global.module1 || {}), global.$);
  }
})(this, function (exports, $) {
  // module1의 private 기능 구현

  // exports에 public function을 붙혀주면 된다.
  exports.action = function () {};
});
```

종속되는 모듈을 추가하려면, AMD 는 배열안에, commonJS 와 일반은 파라미터로 추가한 뒤 12 번째 줄의 콜백함수 안에 원하는 변수로 받으면 된다.

# 예제 - 기본형

```js
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    factory(exports);
  } else {
    factory((global.module1 = global.module1 || {}));
  }
})(this, function (exports) {
  exports.action = function () {};
});
```

즉시실행 함수에 window 객체와 함수를 파라미터로 보내서 전역 객체를 생성하는 방식이다.

# 예제 - 3 항연산자 사용

```js
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
    ? define(["exports"], factory)
    : factory((global.module1 = global.module1 || {}));
})(this, function (exports) {
  exports.action = function () {};
});
```

# 설명

window 객체 안에 모듈이 선언되므로, module1.action(); 으로 바로 호출해 사용하면 된다.

더 자세한 설명을 보고싶다면 [umd](https://github.com/umdjs/umd)를 참조하면 된다.
