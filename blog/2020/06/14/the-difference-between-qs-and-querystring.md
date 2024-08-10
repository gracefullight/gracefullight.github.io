---
title: qs 모듈과 querystring 모듈 비교
authors: me
tags: [javascript, nodejs, rfc]
date: 2020-06-14 22:36:28
---

## qs 모듈과 querystring 모듈 비교

대부분의 포스트에서는 `qs.stringify` 와 `qs.parse` 는 확장된 쿼리스트링 변환이 가능하다고 나온다.
기본 모듈인 `querystring.stringify`, `querystring.parse` 대비 쿼리스트링의 중첩을 가능하게한 모듈인데, 다른 변경점이 하나 더 있다.

### rfc3986

**rfc3986**은 `!, ', (, ), *` 문자에 대해 추가적으로 엔티티화 한다.
자바스크립트에서 이 스펙을 준수하려면 다음과 같이 `encodeURIComponent` 함수를 합성해야한다.
노드에서도 이는 마찬가지이며 `querystring` 모듈은 이 스펙을 준수하지 않았다.

```js
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
```

하지만 `qs` 모듈은 이 스펙을 기본으로 준수한다.

> RFC3986 used as default option and encodes ' ' to %20 which is backward compatible.
> In the same time, output can be stringified as per RFC1738 with ' ' equal to '+'.

따라서 언어 간 호환성 및 표준을 맞추기 위해는 qs 모듈을 사용하는 것이 마음이 편하다.

## 참조

- [ljharb/qs](https://github.com/ljharb/qs#rfc-3986-and-rfc-1738-space-encoding)
- [MDN encodeURIComponent](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- [Node.js querystring](https://nodejs.org/api/querystring.html)
