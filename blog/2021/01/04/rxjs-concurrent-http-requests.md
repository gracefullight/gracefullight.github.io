---
title: RxJS 병렬 HTTP 요청
authors: me
tags: [rxjs, javascript]
date: 2021-01-04 19:27:14
---

# 개요

- 앵귤러 같기도 하고 코드를 머리를 써서 읽어야한다는 것 때문에 최대한 안 쓰고 싶다.
- 하지만 async/await 로 동시성 제어가 힘드므로 이 쪽이 답인 것 같다.

# 소스

- 데이터 배열에서 5개씩 끊어서 병렬 요청한다.
- `delay, catchError, delayWhen` 의 조건만 다르게 하여 사용하면 된다.

```js
import { EMPTY, from, of } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  finalize,
  map,
  mergeMap,
  retry,
  tap,
  toArray,
} from "rxjs/operators";

// 슈도코드임
const fetchObservable = (data) => {
  return from(
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data,
        });
      }, 300);
    })
  );
};

const concurrency = 5;
const fetchConcurrently$ = from(YOUR_DATA).pipe(
  mergeMap((token) => {
    return fetchObservable(YOUR_DATA).pipe(
      map(({ data }) => data),
      delay(1000),
      retry(1),
      catchError(() => EMPTY)
    );
  }, concurrency),
  map((data) => {
    return data.id;
  }),
  toArray(),
  delayWhen(() => Promise.resolve()),
  finalize(() => console.log("done"))
);

fetchConcurrently$.subscribe((ids) => console.log(ids));
```

# 테스트

- 테스트 시에 `jest` 에서 done callback 을 적절히 호출해주자.

# 여담

- marble 테스트도 작성해보고 싶었는데 레퍼런스로 삼을만한 문서를 못 찾아서 아쉽다.
- 매번 of 와 from 을 헷갈리는데, 전자는 하나씩이고 후자는 덩어리다.
