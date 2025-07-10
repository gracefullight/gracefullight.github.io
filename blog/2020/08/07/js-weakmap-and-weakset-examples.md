---
title: WeakMap, WeakSet 예제
authors: me
tags:
  - javascript
date: 2020-08-07 22:45:42
---

항상 `WeakMap`, `WeakSet`을 어떤 방식으로 쓸까 많이 고민되었다.
참조가 없는 경우 메모리를 반환하는데에 이점이 있는데, 여러 활용방안이 있었다.

## WeakMap

### Cache

```js
// 📁 cache.js
const cache = new WeakMap();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    const result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// 📁 main.js
let obj = {
  /* some object */
};

const result1 = process(obj);
const result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;
```

### Sealer

값을 봉인하고 `box`를 반환해 `box` object 전체가 와야만 내부값을 알 수 있게 해준다.

```js
function sealerFactory() {
  const weakMap = new WeakMap();
  return {
    sealer(obj) {
      const box = Object.freeze(Object.create(null));
      weakMap.set(box, object);
      return box;
    },

    unsealer(box) {
      return weakMap.get(box);
    },
  };
}
```

## WeakSet

### Circular references

```js
// Execute a callback on everything stored inside an object
function execRecursively(fn, subject, refs = null) {
  if (!refs) {
    refs = new WeakSet();
  }

  // Avoid infinite recursion
  if (refs.has(subject)) {
    return;
  }

  fn(subject);
  if (typeof subject === "object") {
    refs.add(subject);
    for (const key in subject) {
      execRecursively(fn, subject[key], refs);
    }
  }
}

const foo = {
  foo: "Foo",
  bar: {
    bar: "Bar",
  },
};

foo.bar.baz = foo; // Circular reference!
execRecursively((obj) => console.log(obj), foo);
```

## 참조

- [MDN WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
- [The Modern JavaScript Tutorial - WeakMap](https://javascript.info/weakmap-weakset#use-case-caching)
- How JavaScript Works
