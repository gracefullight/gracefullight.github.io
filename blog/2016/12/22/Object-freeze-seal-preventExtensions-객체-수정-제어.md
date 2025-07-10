---
title: "Object freeze, seal, preventExtensions - 객체 수정 제어"
authors: me
tags:
  - javascript
date: 2016-12-22 16:44:30
---

es5 부터 객체의 수정을 제어할 수 있다.
ie9 부터 지원하고, ie8 은 [es5-sham](https://github.com/es-shims/es5-shim)을 추가하면 된다.

## freeze method

객체를 불변으로 만든다.

### 예제

```js
const frozenObject = {
  value1: 1,
  value2: 2,
};

Object.freeze(frozenObject);
console.log(Object.isFrozen(frozenObject)); // true

// 삭제 불가
delete frozenObject.value1;
console.log(frozenObject.value1); // 1

// 변경 불가
frozenObject.value2 = 3;
console.log(frozenObject.value2); // 2

// 객체 추가 불가
frozenObject.value3 = 3;
console.log(frozenObject.value3); // undefined
```

## seal method

확장, 축소는 불가능하지만 writable 쓰기 가능하다.

### 예제

```js
const sealedObject = {
  value1: 1,
  value2: 2,
};

Object.seal(sealedObject);
console.log(Object.isSealed(sealedObject)); // true

// 삭제 불가
delete sealedObject.value1;
console.log(sealedObject.value1); // 1

// 변경 가능
sealedObject.value2 = 3;
console.log(sealedObject.value2); // 3

// 객체 추가 불가
sealedObject.value3 = 3;
console.log(sealedObject.value3); // undefined
```

## preventExtensions method

확장만 불가능하다.

### 예제

```js
const preventExtensionObject = {
  value1: 1,
  value2: 2,
};

Object.preventExtensions(preventExtensionObject);
console.log(Object.isExtensible(preventExtensionObject)); // false

// 삭제 가능
delete preventExtensionObject.value1;
console.log(preventExtensionObject.value1); // undefined

// 변경 가능
preventExtensionObject.value2 = 3;
console.log(preventExtensionObject.value2); // 3

// 객체 추가 불가
preventExtensionObject.value3 = 3;
console.log(preventExtensionObject.value3); // undefined
```

## 설명

불변하게 하려면 얼리고,
수정이 가능하게 하려면 봉인하고
추가만 불가능하게 하려면 확장방지하자

client 에서 객체 변조를 못하게 전역변수를 얼려버리자

## 여담

freeze 는 중첩된 object 에 적용이 안 되는데,
이 때 deepFreeze 함수를 사용해 재귀적으로 객체를 얼려버리면 된다.

### deepFreeze method

[mdn](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)을 참조했다.

### 소스

```js
function deepFreeze(obj) {
  if (!Object.isFrozen(obj)) {
    Object.freeze(obj);
  }

  for (const key in obj) {
    if (
      {}.hasOwnProperty.call(obj, key) ||
      !(
        typeof obj[key] === "function" ||
        (typeof obj[key] === "object" && !!obj[key])
      )
    ) {
      continue;
    }

    deepFreeze(obj[key]);
  }
}
```
