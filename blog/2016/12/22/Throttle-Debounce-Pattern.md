---
title: "Throttle, Debounce Pattern"
authors: me
tags: [javascript, lodash]
date: 2016-12-22 20:16:37
---

javascript throttle 패턴과 debounce 패턴에 대해 알아보자.

# Throttle

매 ms 마다 한 번만 호출된다.
mousemove, scroll 같은 이벤트로 호출되는 함수는 이벤트 발생시 무한정 호출되어 성능 저하를 가지고 오는데, 이를 방지할 수 있다.

모바일에서 스크롤링 더보기에 사용할 수 있다.

## 소스

```js
const throttleFunction = (function () {
  "use strict";

  const timeWindow = 500; // 여기에 시간(ms)을 지정한다
  let lastExecution = new Date(new Date().getTime() - timeWindow);
  // ES6 이하일 경우 ...args에 호출할 parameter 만큼 준다 function(arg1, arg2...)
  const throttleFunction = function (...args) {
    // 여기에 로직을 구현한다
  };

  return function () {
    if (lastExecution.getTime() + timeWindow <= new Date().getTime()) {
      lastExecution = new Date();
      return throttleFunction.apply(this, arguments);
    }
  };
})();

// 사용법
throttleFunction(param1, param2);
```

# Debounce

마지막 호출로부터 ms 후에 함수를 한번 호출한다.
지연된 호출을 할 수 있게 해주는데, 호출이 반복되는 동안은 실행을 방지하고, 호출이 멈춘 뒤 지정한 ms 후에 함수를 실행해 성능 저하를 막을 수 있다.

검색 자동완성 기능에 적합하다.

## 소스

```js
const debounceFunction = (function () {
  "use strict";

  const timeWindow = 500; // 여기에 시간(ms)을 지정한다
  let timeout;
  // ES6 이하일 경우 ...args에 호출할 parameter 만큼 준다 function(arg1, arg2...)
  const debounceFunction = function (...args) {
    // 여기에 로직을 구현한다
  };

  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      debounceFunction.apply(context, args);
    }, timeWindow);
  };
})();

// 사용법
debounceFunction(param1, param2);
```

# 여담

즐겨 사용하는 sublime text package 인 [javascript patterns](https://packagecontrol.io/packages/JavaScript%20Patterns)에서 참조했다.

[lodash](https://lodash.com/)를 사용한다면 [debounce](https://lodash.com/docs/4.17.2#debounce), [throttle](https://lodash.com/docs/4.17.2#throttle)로 더 쉽게 사용할 수 있다.
