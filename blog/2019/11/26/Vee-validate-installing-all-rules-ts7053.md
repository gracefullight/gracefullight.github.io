---
title: vee-validate3 모든 규칙 추가시 TS7053 오류
authors: me
tags: [javascript, vue, typescript]
date: 2019-11-26 20:29:46
---

## TS7053

3.0 버전이 되면서 `HOC` 기반으로 변경되며 `rules`를 상위 컴포넌트에서 확장하게 되었다.
문제는 `typescript` 기반에서 룰 전체 등록이 **TS(7053)** 에러를 발생시킨다.

```ts
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]); // rules[rule] 에서 타입오류 발생
});
```

```txt
Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'typeof import(".../node_modules/vee-validate/dist/rules")'.
No index signature with a parameter of type 'string' was found on type 'typeof import(".../node_modules/vee-validate/dist/rules")'.ts(7053)
```

## 원인

import, export 의 모듈명은 string index 로 쳐지지 않아 발생한다.

## 해결방법

`Object.entries`와 `for of`를 사용해 타입에 안전하게 돌려주면 된다.

```ts
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation,
  });
}
```

## 여담

- 새로운 구문 (async/await, import/export)를 사용해 돌릴 땐 먼저 `for of`를 사용하는 습관을 들여야겠다.
- 머지되어서 다음 사람의 삽질은 없을 듯 하다.

## 참조

- **Merged** [docs: added Installing All Rules with typescript](https://github.com/logaretm/vee-validate/pull/2511)
- [vee-validate#installing-all-rules](https://logaretm.github.io/vee-validate/guide/rules.html#installing-all-rules)
