---
title: RxJS의 모든 것
authors: me
tags:
  - rxjs
  - javascript
date: 2019-04-30 14:12:58
---

## RxJS

리액티브 프로그래밍은 개인적으로 비동기 프로그래밍과 함수형 프로그래밍의 종착지라고 생각한다.
[Stage1 Draft](https://github.com/tc39/proposal-observable)로 제안되어 더 이상 피할 수 없는 **Observable** 을 알아보자.

### 정의

[위키피디아](https://en.wikipedia.org/wiki/Reactive_programming)에선 다음과 같이 정의되어있다.

> reactive programming is a declarative programming paradigm concerned with data streams and the propagation of change.
> 데이터 스트림과 변화의 전파에 중점을 둔 프로그래밍 패러다임

2011년 태초에 RX 의 개념을 만든 MS 문서에서는 [**Reactive eXtensions**](<https://docs.microsoft.com/en-us/previous-versions/dotnet/reactive-extensions/hh242985(v=vs.103)>) 다음과 같다.

> Reactive Extensions (Rx) is a library for composing asynchronous and event-based programs using observable sequences and LINQ-style query operators.
> 옵져버블 시퀀스와 링큐 쿼리 연산자를 사용하는 비동기, 이벤트 기반 프로그래밍 라이브러리

조금 더 디테일하게 말하면 데이터스트림을 Pulling 방식의 이터레이터 패턴인 `IEnumerable<T>/IEnumerator<T>` 로 만들어 Pushing 방식의 옵저버 패턴인 `IObservable<T>/IObserver<T>`로 전파/구독하는 것이다.

Rx를 모두 이해한 뒤 이 정의를 보면 어쩜 이렇게 깔끔하게 한 줄로 이 내용을 다 담았을까? 란 생각이 드는데, 처음보는 입장에선 _비동기인 건 알겠네_ 정도로만 이해가 되는 듯하다.
어려운 게 당연하다. 멀티쓰레드 프로그래밍을 처음 배울 때의 감정을 생각해보자.

### 용어

- 비동기 프로그래밍: 이 문서를 볼 정도면 설명이 필요 없을 것 같다.
- 함수형 프로그래밍: 함수를 FirstClass 로 취급해 파라미터, 리턴, 변수에 할당 가능하며 함수 합성이 가능하고 원하는 시점에 호출이 쉽다.
- 데이터스트림: file stream, event stream, http stream 의 친구로 data 식 표현
- 이터레이터: 설명 필요 없을 듯.
- 옵져버: 디자인패턴 책의 옵져버패턴 단원 참조, 자바스크립트에선 이미 이벤트리스너가 옵져버 패턴이다.
- 옵져버블: 특정 객체를 관찰하는 옵저버에게 여러 이벤트나 값을 전파하는 역할
- 풀: 데이터를 받을지 결정
- 푸쉬: 데이터를 보낼지 결정
- 싱글: 하나의 값이나 이벤트를 다룸
- 멀티플: 여러 개의 값이나 이벤트를 다룸

이 모든 용어를 하나의 표로 정리하면 다음과 같다.

|      | 싱글     | 멀티플     |
| ---- | -------- | ---------- |
| 풀   | 함수     | 이터레이터 |
| 푸쉬 | 프로미스 | 옵져버블   |

### 패턴

- 옵져버블의 변수 스타일은 이름 뒤에 `const click$` 처럼 `$`을 뒤에 붙혀주는게 정형화되어있다.
- `subscribe` 는 `next, error, complete`를 파라미터로 받는다.

### 마블 다이어그램

마블 다이어그램은 연산자를 쉽게 이해하기 위해, 옵져버블을 테스트하기위해 도식화된 다이어그램이다.
타이밍과 값의 변화를 한 눈에 파악할 수 있다.

![map](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/map.png)

- 위에 줄은 input 이고 연산자를 만나고나면 아래 줄에서 output 이 어떻게 바뀌는지 보여진다.
- 가로 줄은 하나의 옵져버블이다.
- 줄의 | 파이프는 구독 완료를 나타낸다.

## 소스

### 생성

가장 간단한 옵져버블을 만들고 확인해보자.

```js
const { Observable } = require("rxjs");

const test$ = Observable.create((observer) => {
  console.log("create");
  observer.next(1);
  observer.next(2);
  observer.complete();
  console.log("done");
});

test$.subscribe(
  (item) => {
    console.log(item);
  },
  (error) => {},
  () => {
    console.log("complete");
  },
);

/*
create
1
2
complete
done
*/
```

간단하지만 이터레이터이면서 구독가능하다는 걸 확인할 수 있다.

### 구독해제

옵져버블의 리턴함수로 구독해제 콜백을 지원한다, 콜백이 필요하지 않다면 `unsubscribe()` 를 호출해주기만 하면 된다.

```js
const test$ = Observable.create((observer) => {
  const interval = setInterval(() => {
    console.log("test");
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});

const subscription = test$.subscribe();
subscription.unsubscribe();
```

### 파이퍼블 연산자

Pipeable 연산자는 옵져버블 인스턴스를 pipe 함수 안에서 다룰 수 있는 연산자이다.
기본적으로 **rxjs/operators** 라이브러리 안에 들어있다.

```js
const { map } = require("rxjs/operators");

const test$ = Observable.create((observer) => {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

test$.pipe(map((value) => value * 2)).subscribe((item) => console.log(item));

/*
2
4
*/
```

소스 옵져버블에서 발행된 값을 원하는대로 바꿀 수 있다.

### 연산자

#### of

args 순서대로 값을 반환한다.

#### from

- Observable
- Array
- Promise
- Iterable
- String
- ArrayLike

위 타입을 옵져버블로 변환해준다.

#### fromEvent

EventEmitter 클래스의 객체와 조합하거나 브라우저의 이벤트를 옵져버블로 바꿀 때 사용한다.

#### defer

팩토리 함수로 옵져버블을 생성한 후 구독한느 시점에 팩토리 함수를 호출해 이미 생성한 옵져버블을 리턴받아 구독한다.

from 과의 차이는 다름과 같다.

- from
  - 프로미스 내부 구현부가 언제 실행되던지 상관 없을 때
  - 이미 실행 중이거나 완료한 프로미스를 옵져버블로 만들 때
- defer
  - 옵져버블을 구독하는 시점에 프로미스를 생성해 구현부가 실행되어야할 때
  - 프로미스 객체 생성 시점이 구독하는 시점이여야할 때

#### range

범위 지정 후 그 값을 순서대로 발행한다. 반복문이 필요할 때 사용된다.

#### interval

ms 단위로 값을 발행한다.

#### timer

파라미터가 하나일 경우 ms 이후에 한 번 값을 발행하고,
두 개일 경우 ms 이후에 두번 째 파라미터만큼 주기적으로 값을 발행한다.

#### empty

값 발행 후 중간에 멈춰야하는 상황에 사용한다. 이 함수만 사용하지는 않고 다른 함수나 연산자와 조합해서 complete 함수를 호출해야 할 때 사용된다.
즉, 바로 구독을 완료해야될때 사용된다.

```js
// 상수로 사용된다.
const { EMPTY } = require("rxjs");
```

#### never

아무 것도 하지 않고 옵져버블 생성이 필요할 때 사용된다.

```js
// 상수로 사용된다.
const { NEVER } = require("rxjs");
```

#### throwError

옵져버블로 값을 발행하다가 에러를 발생시키고 종료해야하는 상황에 사용한다.

#### filter

주로 파이퍼블 연산자와 연결해서 사용된다.

```js
const { filter } = require("rxjs/operators");
// 1~10 중 짝수 필터
range(1, 10)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe((x) => console.log(x));
```

#### first

처음으로 일치하는 값을 발행한다. 두 번째 인자로 기본 값을 줄 수 있다.

#### last

마지막으로 일치하는 값을 발행한다. 두 번째 인자로 기본 값을 줄 수 있다.

#### take

정해진 갯수만큼 구독하고 구독을 해제한다.
interval 과 같이 무한 반복이 실행되는 연산자와 같이 쓰면 된다.

```js
const { take } = require("rxjs/operators");

interval(1000)
  .pipe(take(3))
  .subscribe((x) => console.log(x));

/*
0
1
2
*/
```

#### takeUntil

특정 이벤트가 발생할 때까지 옵져버블을 구독해야할 때 사용한다.
예시로 보는 게 빠르다.

```js
interval(1000)
  .pipe(
    take(100),
    takeUntil(fromEvent(document.querySelector("#btn"), "click")),
  )
  .subscribe((x) => console.log(x));
```

#### takeWhile

take 와 filter 가 합쳐진 연산자이다.

```js
interval(1000)
  .pipe(takeWhile((x) => x <= 10))
  .subscribe((x) => console.log(x));
```

#### takeLast

Last 의 파라미터 수 만큼 저장해뒀다가 구독 완료시에 일괄적으로 발행한다.
발행하는 값이 `[0, 2, 4, 6, 8, 10]` 일 때 `takeLast(3)` 일 경우 내부에 저장된 값은 다음과 같다.

| 발행값 | 내부배열   |
| ------ | ---------- |
| 0      | [0]        |
| 2      | [0, 2]     |
| 4      | [0, 2, 4]  |
| 6      | [6, 2, 4]  |
| 8      | [6, 8, 4]  |
| 10     | [6, 8, 10] |

#### skip

이름 그대로 n 개만큼의 발행을 건너 뛴다.

#### skipUntil

takeUntil 과의 반대로 옵져버블이 실행될 때까지 건너 뛴다.

```js
const time = 1000;
interval(time)
  .pipe(skipUntil(interval(time * 5)), take(2))
  .subscribe((x) => console.log(x));

/*
4
5
*/
```

#### skipWhile

조건을 만족하지 않는 순간부터 값을 발행한다.

#### debounce

많이 사용하진 않지만, 디바운스할 옵져버블을 계산값을 리턴해주는 함수를 파라미터로 주면 된다.

#### debounceTime

로대쉬나 다른 라이브러리의 debounce 와 같다.

#### distinct

중복은 제거하고 발행한다. 값 비교에는 === 연산자가 사용된다.

```js
of({ id: 1 }, { id: 1 }, { id: 2 }, { id: 3 })
  .pipe(
    distinct((data) => data.id),
    map((data) => data.id),
  )
  .subscribe((x) => console.log(x));

/**
1
2
3
*/
```

두번째 파라미터로 `flush` 조건을 옵져버블로 넘겨 중복 조건을 초기화시킬 수 있다.

#### distinctUntilChanged

중복값이 연속으로 발행된 경우만 제거한다.

```js
of(1, 2, 3, 3, 4, 1)
  .pipe(distinctUntilChanged())
  .subcribe((x) => console.log(x));

/**
1
2
3
4
1
*/
```

첫번째 파라미터로는 비교함수 (prev, next 를 파라미터로 받는)를 넣어 연속 비교조건을 변경할 수 있다.

두번째 파라미터로는 비교할 값 셀렉터를 변경해줄 수 있다.

```js
of(
  { a: 1, b: 10 },
  { a: 1, b: 10 },
  { a: 2, b: 20 },
  { a: 3, b: 30 },
  { a: 3, b: 30 },
  { a: 2, b: 20 },
)
  .pipe(distinctUntilChanged(null, (data) => data.a))
  .subscribe((x) => console.log(x));
```

#### sample

이건 마블 다이어그램으로 이해하는 게 빠르다.

![sample](https://rxjs-dev.firebaseapp.com/assets/images/marble-diagrams/sample.png)

notifier 옵져버블(x 옵져버블)이 발행되면 이전 최근 값을 발행한다.
값 c 처럼 소스 옵져버블에 새로운 값이 없을 경우 값을 중복으로 발행하지 않는다.

#### sampleTime

일정 간격 사이에 있는 최근 값을 발행한다.

#### pluck

기본 map 연산자는 뻔하기에 적지 않았다.
map 처럼 동작하지만 소스 옵져버블에서 객체를 리턴할 때 객체의 property 를 뽑아낸다.

#### mergeMap

#### switchMap

#### concatMap

#### scan

#### partition

#### groupBy

#### buffer

#### bufferCount

#### window

#### windowCount

## 여담

- RxJS 의 장점은 이벤트 구독을 취소하고, 모든 이벤트를 하나의 스트림으로 제어할 수 있는 것이라고 생각한다.
- 이해하는데 상당한 기간이 소요되었지만, 웹에선 다음과 같은 상황에서 사용될 것 같다.
  - SPA
  - 에디터와 같이 많은 컴포넌트끼리 통신이 필요할 때
- 이 상황에서도 앵귤러가 아닌 스토어 기반의 리액트, 뷰를 사용한다면 **RxJS를 쓸거야** 라고 보여주기 위해 사용하는 느낌이 든다.
- 모두가 같이 가기엔 꽤 어려운 개념이다.
- 싱글 스레드 기반의 백엔드에서 더 유용하게 쓰일 수 있을 듯
- [learn-rxjs](https://github.com/btroncone/learn-rxjs)의 예제를 분석하는 게 더 많은 도움이 될 것 같다.
