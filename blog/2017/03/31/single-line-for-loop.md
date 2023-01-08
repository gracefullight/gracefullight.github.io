---
title: Single line for loop
authors: me
tags: [javascript]
date: 2017-03-31 11:06:37
---

# 예제

## Single line

```js
var i,
  sum = 0;
for (i = 0; i < 10; ++i, sum += i);

console.log(`${i} ${sum}`);
```

## 일반적인 형태

```js
var j,
  sum2 = 0;
for (j = 0; j < 10; ++j) {
  sum2 += j;
}

console.log(`${j} ${sum2}`);
```

두 예제의 결과는 어떻게 나올까.
첫번째는 **10 55**, 두번째는 **10 45**가 나온다.

# 설명

i 와 j 의 전위 후위 연산은 별로 중요하지 않다. (++i 나 i++이나 결과는 같게 나온다)

## Single line

```js
var i,
  sum = 0;
//  1    2     3    4
for (i = 0; i < 10; ++i, sum += i);

console.log(`${i} ${sum}`);
```

## 일반적인 형태

```js
var j,
  sum2 = 0;
//  1    2     4
for (j = 0; j < 10; ++j) {
  // 3
  sum2 += j;
}

console.log(`${j} ${sum2}`);
```

## 안티패턴의 끝

```js
var k,
  sum3 = 0;
//  1    2     4    5
for (k = 0; k < 10; ++k, sum3 += k)
  //  3
  console.log(`${k} ${sum3}`);
```

연산의 실행 순서가 다르다고 이해하면 되겠다.
