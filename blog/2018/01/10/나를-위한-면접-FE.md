---
title: 나를 위한 면접 (Frontend Developer Interview Questions)
authors: me
tags: [interview]
date: 2018-01-10 22:32:52
---

[FE Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions)를 아는 만큼 답해보았다
지극히 주관적이라 정답이 아닐 수 있습니다

# event delegation

> 사용자의 액션에 의해 이벤트 발생 시 이벤트는 document 레벨까지 버블링 되어 올라간다.
> 이 때문에 자식 엘리먼트에서 발생하는 이벤트를 부모 엘리먼트에서도 감지할 수 있다.
> 이러한 동작을 이용해 사용할 수 있는 방법이 `event delegation`이다.
> 특정 엘리먼트에 하나하나 이벤트를 등록하지 않고 하나의 부모에 등록하여 부모에게 이벤트를 위임하는 방법

```js
// 버튼마다 onClick Event Listener 등록
document.getElementById("btn1").addEventListener("click", (event) => {});

document.getElementById("btn2").addEventListener("click", (event) => {});

document.getElementById("btn3").addEventListener("click", (event) => {});

// Event Delegation
document.getElementById("div").addEventListener("click", (event) => {
  switch (event.target.id) {
    case "btn1":
      break;
    case "btn2":
      break;
    case "btn3":
      break;
  }
});
```

- [출처](https://github.com/nhnent/fe.javascript/wiki/August-22-August-26,-2016)

# this는 어떻게 작동하는가?

- Global Context: window
- Function Context: "use strict" ? 실행 시 할당 : window
- Object method: 자기 자신 객체
- Object Prototype Chain: 자기 자신 객체
- Getter, Setter: get 또는 set 되는 속성 객체
- 생성자: 생성된 자신
- call, apply: 지정해 주는 객체
- bind: 바인딩 될 때의 this
- Dom Event: event.currentTarget === event.target === this
- in-line Event: Element

- [출처](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)

# prototype 기반 상속은 어떻게 하는가?

> `Object.create`로 prototype을 확장하던지 **proto**로 prototype link를 걸던지

# AMD와 CommonJS는 뭐고 어떻게 생각하나?

- AMD: requireJS
- CommonJS: NodeJS 방식

결국엔 UMD 패턴으로 모듈을 만들어야한다.
둘 다 실무에서 쓰려면 번들링이 필요하고, Webpack 쓸 바에 두 개 다 필요없이 import 구문으로 처리하겠다.

# 다음 코드가 즉시 호출 함수 표현식(IIFE)로 동작하지 않는 이유?

> Immediately Invoked Function Expression

```js
// function foo(){}()
```

함수선언문을 어떻게 실행하냐 함수를 괄호로 감싸면 됨

# null과 undefined 그리고 undeclared의 차이점

- null: 선언되었지만 값 없음
- undefined: 선언조차 안됨
- undeclared: 선언문 (var 등) 없이 전역변수로 할당되는 유효범위를 지정하지 않은 건데 린팅에 어긋남

# 클로져(Closure)는 무엇이며, 어떻게/왜 사용?

- 무엇: 초기화시의 상태를 내부에 가지고 있는 형태의 함수
- 어떻게:`return`으로 공개할 메소드 또는 데이터를 꺼냄
- 왜: private 기능 구현, for문에서 context 참조

# 익명함수(anonymous functions)는 주로 어떤 상황에서 사용?

- 함수 표현식 (변수로 함수 선언), callback

# 당신의 코드를 어떻게 구성하는지?

- ESLint airbnb + prettier + commitlint

# 호스트 객체 vs 네이티브 객체

- Host Objects: 사용자에 의해 생성된 객체
- Native Objects: 브라우저 또는 구동 엔진에 내장된 객체

# 다음 코드의 차이점?

```js
function Person() {} // 선언문
var person = Person(); // 함수 표현식
var person = new Person(); // 생성자
```

# .call과 .apply의 차이점?

- `call()`은 함수에 전달될 여러 개의 인자를 받는데 비해
- `apply()`는 배열로 된 하나의 인자를 받는다

# Function.prototype.bind?

- 호출될 때의 함수의 this 값을 넘겨준 값으로 바인딩

# document.write()는 언제 사용?

- 스크립트 심을 때 `document.write`는 block 되지 않으므로
- 근데 `appendChild`로 심을 수 있어서 안씀

# AJAX

- XMLHttpRequest 객체를 사용해 비동기 방식으로 서버와 통신을 하는 것
- 장점: 화면 전환 없이 특정 영역만 갱신 (업데이트) 가능
- 단점: 없음

# JSONP vs AJAX

- JSONP는 스크립트 태그를 심어서 로드될 때 콜백 함수를 호출하는 거고 `get`만 가능
- `Same origin policy`를 벗어날 수 있음

# 호이스팅

- 자바스크립트 엔진이 실행 컨텍스트를 생성하면서 scope 를 정의 할때
- 코딩 순서에 상관없이 선언부에 대한 처리를 맨 위로 끌어올려 먼저 해석하는 것

# Event Bubbling

- 자식 이벤트가 부모로 전달 되는 것
- `event.stopPropagation`으로 막을 수 있음
- 다른 리스너를 실행시키지 않는건 `event.stopImmediatePropagation`

# 속성(Attribute) vs 요소(property)

- Attribute: HTML 요소에 추가적인 정보 전달
- Property: Attribute에 대한 HTML DOM tree에서의 표현

# 내장된 JavaScript 객체를 확장하는 것이 좋지 않은 이유?

- 그것을 참조한 모든 객체가 확장한 구문을 따라가기 때문에

# document load event vs DOMContentLoaded event

- document.load: DOM 안의 모든 게 로딩이 끝나야 발생 (더 느림)
- DOMContentLoaded: DOM 초기화시 발생

# == vs ===

- 타입 체크

# 동일출처정책(the same-origin policy)

- js나 문서가 다른 origin에서 fetch되지 못하게 하는 정책

# 삼항식(Ternary statement)을 사용하는 이유?

- if else의 간소화

# use strict

> When adding 'use strict';, the following cases will throw a SyntaxError before the script is executing:

- Octal syntax `var n = 023`;
- with statement
- Using delete on a variable name `delete myVariable`
- Using eval or arguments as variable or function argument name
- Using one of the newly reserved keywords (in prevision for ECMAScript 2015): implements, interface, let, package, private, protected, public, static, and yield
- Declaring function in blocks if (a < b) { function f() {} }
- Obvious errors

  - Declaring twice the same name for a property name in an object literal {a: 1, b: 3, a: 7} This is no longer the case in ECMAScript 2015 (bug 1041128).
  - Declaring two function parameters with the same name function f(a, b, b) {}

- [출처](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode/Transitioning_to_strict_mode)

# 전역 scope를 사용했을 때

- 장점: 어디에서나 접근 가능
- 단점: release 꼬임, 추적 힘듦.

# 때때로 load event를 사용하는 이유? 단점과 대안은?

- DOM의 모든 게 로드가 끝난 후에 이벤트를 걸어야할 것이 있을 때 사용 (lazy loading)

# SPA에서 SEO에 유리하도록 만들기 위한 방법

- Sitemap, JSON-LD, UA가 Bot일 경우 SSR

# Promise vs Callback

- 장점: Chaining, 가독성, 여러 Promise를 한 번에 제어 가능
- 단점: 없다

# JavaScript를 디버깅할 때 사용하는 도구?

- VSCode, Chrome Dev Tools

# 객체 안의 속성과 배열의 아이템을 순회할 때 사용하는 문법?

- Object: for in hasOwnProperty, Object.keys().forEach, for of
- Array: for, Array.forEach, for of

# mutable object vs immutable object

- mutable: 변경 가능
- immutable: 변경 불가능, Object freeze 또는 Object assign으로 metadata 수정

# JavaScript에서 immutable 객체의 예

- String: 문자열이 생성되면 그 다음에 수정할 수 없음
- Symbol: 유일한 값

# immutability의 장단점?

- 장점: 변경점 찾기 및 디버깅이 쉬움
- 단점: mutable한 코드보다 훨씬 느림

# 자신의 코드에서 불변성(immutability)을 어떻게 달성할 수 있나요?

- eslint-plugin-functional 또는 immutableJS

# 동기방식과 비동기 방식 함수의 차이

- 은행 번호표

# event loop

- JS에서 사용하는 동시성 처리 모델

```js
// 현재 아무 메시지도 없다면 새로운 메시지 도착을 동기적으로 기다림
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

# call stack

- 함수 호출시 저장되는 스택, 재귀를 생각하면 됨

# task queue

- 비동기 함수가 저장되는 큐, call stack이 비워지면 실행 됨

# function foo() {}와 var foo = function() {}에서 foo 의 차이

- 전자는 호이스팅, 후자는 안 됨

# let, var, const의 차이점

- var: function-scoped 로 호이스팅, 재선언 가능
- let: block-scoped 로 재선언 불가, 재할당 가능
- const: block-scoped 로 재선언 불가, 재할당 불가

# test code를 작성하면서 개발하는 방식의 장단점

- 장점: 결과가 나와있고 로직을 맞추면되서 디버깅, 리팩토링이 쉬워지고 유지보수에도 좋음
- 단점: 시간

# test code를 테스트하는 툴 사용경험

- Jest, Puppeteer, supertest

# 단위 테스트 vs 기능 테스트

- unit test: unit 즉 method 별로 테스트
- functional test: 전체 시스템에서 기능을 테스트, 많은 method와 서비스가 연결되어있음

# code style linting tool을 사용했을때 장점?

- 모두가 일관된 스타일로 코딩 가능, 가독성 증가

# 성능관련 이슈들을 발견하기 위해서 사용하는 방법?

- 실행시간 timestamp 로깅
- Chrome Dev Tools Performance 탭

# 웹사이트 scrolling 성능을 향상시키기 위한 방법?

- throttle

# 브라우저의 layout, painting, compositing

- `Layout`: 각 element가 차지하는 공간과 배치할 공간을 결정
- `Painting`: element를 그리고, element의 모든 시각적 부분을 그리는 작업
- `Compositing`: element를 올바른 순서로 화면에 그려 페이지를 렌더링

- [출처](https://developers.google.com/web/fundamentals/performance/rendering/?hl=ko)

# 웹사이트의 assets을 여러 도메인으로 서빙했을 때 장점

> 브라우저 마다 다르지만 HTTP1.1에서는 하나의 호스트당 평균 4개의 동시 다운로드만 가능해서, 병렬 처리를 하기 위해 여러 도메인으로 서빙을 했었다 하지만 이젠 http2로 다 해결 가능

## 참고

- [Why it is better to serve site assets from multiple domains](https://travishorn.com/why-it-is-better-to-serve-site-assets-from-multiple-domains-972a2bf69d71)
- [브라우저의 리소스 병렬 다운로드를 가로막는 자바스크립트](http://programmingsummaries.tistory.com/285)
- [HTTP/2 소개 #요청 및 응답 다중화](https://developers.google.com/web/fundamentals/performance/http2/?hl=ko#_4)
- [Blief history of http](https://hpbn.co/brief-history-of-http/)

# URL로 접속했을 때 어떤 플로우로 화면에 웹사이트가 그려지는지 네트워크 관점

- 로컬 DNS에서 URL IP 확인
- 3way handshake로 IP에 TCP 연결 설정 후 HTTP 헤더와 Body 요청 전송
- 응답받은 HTTP 헤더와 Body로 웹사이트 렌더링

# Long-Polling과 Websocket, Server-Sent Event

- Long-Polling: response를 닫지 않고 계속 보내주는 것
- Websocket: subscribe 후에 양방향으로 메세지 교환
- Server-Sent Event: Push, HTTP 사용

# request headers

- Expires headers tell the browser whether they should request a specific file from the server or whether they should grab it from the browser's cache.
- Date: The date and time that the message was sent
- The Age response-header field conveys the sender's estimate of the amount of time since the response (or its revalidation) was generated at the origin server.
- The If-Modified-Since request-header field is used with a method to make it conditional: if the requested variant has not been modified since the time specified in this field, an entity will not be returned from the server; instead, a 304 (not modified) response will be returned without any message-body.
- Do Not Track: disable either its tracking or cross-site user tracking
- Cache-Control: Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds
- Transfer-Encoding: The form of encoding used to safely transfer the entity to the user. Currently defined methods are: chunked, compress, deflate, gzip, identity.
- ETag: An identifier for a specific version of a resource.
- X-Frame-Options can be used to indicate whether or not a browser should be allowed to render a page in a `frame`, `iframe` or `object`.

- [출처](https://quizlet.com/175329230/web-developer-interview-questions-network-flash-cards/)
- [HTTP Cache 튜토리얼](https://www.letmecompile.com/http-cache-%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC/)

# HTTP Methods

- GET: 리소스 요청
- HEAD: 리소스 요청이나 body가 없음
- POST: 리소스 생성
- PUT: 리소스 업데이트
- PATCH: 리소스 부분 업데이트
- DELETE: 리소스 삭제
- OPTIONS: Cross Domain request에서 해당 메소드가 안전한지 확인하기 위해 사용
