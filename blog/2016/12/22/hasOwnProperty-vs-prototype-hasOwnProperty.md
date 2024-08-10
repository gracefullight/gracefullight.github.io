---
title: hasOwnProperty vs prototype.hasOwnProperty
authors: me
tags: [javascript]
date: 2016-12-22 20:26:49
---

## hasOwnProperty

for-in 구문을 쓸 때 상속된 프로퍼티나 this 구문을 방지하기 위하여 보통 hasOwnProperty 로 체크한다.

```javascript
for (prop in obj) {
  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty(prop)) {
    // code...
  }
}
```

### 문제점

위와 같은 방식은 아래와 같이 hasOwnProperty 가 재정의 된 객체에서 오류를 발생할 수 있다.

### 소스

```js
const obj = {
  hasOwnProperty: function () {
    return false;
  },
  data1: 1,
};

for (prop in obj) {
  // obj.hasOwnProperty(prop) 의 결과는 항상 false
  // eslint-disable-next-line no-prototype-builtins
  if (obj.hasOwnProperty(prop)) {
    // 이 구문은 실행되지 않는다.
  }
}
```

## prototype.hasOwnProperty

따라서 prototype 을 사용해 코딩해야한다.

### 소스

```js
for (prop in obj) {
  // 첫번째 방법
  if ({}.hasOwnProperty.call(obj, prop)) {
    // 체크
  }

  // 두번째 방법
  if (Object.prototype.hasOwnProperty.call(obj, prop)) {
    // 체크
  }
}
```

### 설명

첫번째 방법은 익명 Object 를 생성한 후 obj 와 prop 을 밀어넣는 방식이고
두번째 방법은 기본 Object 의 hasOwnProperty 를 가져와 obj 와 prop 을 밀어넣는 방식이다.

두번째 방법이 새(익명) Object 를 생성하지 않기에 이 방법을 사용하면 된다.

더 자세하게 알고 싶다면 [mdn](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty)을 참조한다.
