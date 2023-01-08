---
title: Javascript 기본값 연산자 (축약된 삼항연산자)
authors: me
tags: [javascript, php]
date: 2016-12-22 15:15:46
---

# Javascript 기본값 연산자 (축약된 삼항연산자)

한번 쓰면 헤어나올 수 없는 기본값 연산자에 대해 알아보자.

## 소스

```js
// JavaScript syntax to set a default value
var text = someString || 'default text';
var text2 = someString || someString2 || 'default text2';
```

## 설명

someString 이 있으면 someString 을 반환, 아니면 default text 를 반환한다.
계속 붙혀나가면서 쓸 수 있다.

php7 에서는 해당 기능이 추가되었다. **||** 대신에 **??** 를 사용하면 된다.

lodash 에선 [defaultTo](https://lodash.com/docs/4.17.2#defaultTo)를 사용하면 된다.
