---
title: 연속된 번호 카운트 알고리즘
authors: me
tags:
  - javascript
  - algorithm
date: 2017-02-19 17:33:38
---

연번 체크 알고리즘이라고도 하는 것 같다.
통계 또는 비밀번호의 연속성을 체크하기 위해 필요할 때가 있다.
비밀번호 연속성 체크에는 target[j]의 데이터를 charCodeAt 을 붙여 처리하면 된다.

## 소스

```js
function checkSequenceNumbers(target, counterLength = 6) {
  // under es6
  // let sequentialCounter = Array.apply(null, Array(counterLength)).map(Number.prototype.valueOf,0);
  const sequentialCounter = new Array(counterLength).fill(0);
  let count = 0;

  for (let i = 0, len = target.length; i < len; i++) {
    let subCount = 0;

    for (let j = 1; j < len; j++) {
      if (target[j] === target[i] + 1) {
        subCount = subCount + 1;
      } else {
        continue;
      }
    }

    count = count + subCount;
    if (subCount === 0) {
      sequentialCounter[count] = sequentialCounter[count] + 1;
      count = 0;
    }
  }

  return sequentialCounter;
}

const target = [1, 2, 3, 5, 6, 7, 8, 10, 11, 13, 16, 17];
console.log(checkSequnceNumbers(target));
// => [1, 2, 1, 1, 0, 0]
```

## 설명

n 과 n+1... n+n-1 을 비교해서 카운트한다.
결과는 sequentialCounter 배열에 각 포지션에 들어간다.

> 2 연속 숫자 1 개가 있다면 sequentialCounter[2] = 1;

## 여담

왜 이런걸 공유를 안할까?
