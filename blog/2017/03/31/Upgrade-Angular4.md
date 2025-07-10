---
title: Angular4로의 업그레이드
authors: me
tags:
  - angular
  - javascript
date: 2017-03-31 17:13:14
---

170323에 Angular2의 stable 버전이라고 할 수 있는 Angular4가 나왔다.
Angular2하고 있었는데 **나도 모르는 사이에 버전이 4가 되었나, 1에서 2가 그렇게 많이 바뀌었는데 Angular4는 얼마나 바뀐걸까?**

Angular2부터는 npm으로 관리되기에 소스의 버전을 따라서 명명을 해 비롯된 것으로 큰 변경점이 없으니 안심해도 된다.

버전별로 보면 이렇다.

- Angular1 : 기존 javascript로 코딩하던 \$scope를 사용했던 버전
- Angular1.x : Component가 도입된 버전
- Angular2 : 처음으로 ts가 사용되고 새로운 앵귤러가 된 버전
- Angular3 : 아무도 모르게 사용을 했었다. package.json에서 @angular/router를 보자 3버전대일 것이다.
- Angular4 : 성능이 개선되었고 모든 Angular 모듈이 4버전

## 변경점

모든 변경점은 [앵귤러 블로그](https://angularjs.blogspot.kr/)에서 확인할 수 있다.

- 컴파일시 가벼워졌다.
- 애니메이션 패키지가 angular/core에서 angular/animation으로 분리되었다.
- ngIf에서 else 구문을 쓸 수 있다.
- angular universial의 기능이 angular/platform-server로 통합되었다.
- typescript 2.1, 2.2버전 호환이 되었다.
- angular-cli가 1버전으로 업그레이드 되어 1버전의 cli로 프로젝트 생성시 angular4 버전으로 생성이 된다.

## 업그레이드

```bash
## angular 및 typescript
$ npm install @angular/common@latest @angular/compiler@latest @angular/compiler-cli@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest @angular/animations@latest typescript@latest --save

## zone.js
$ npm install zone.js@0.8.5 --save

## angular-cli
$ npm install @angular/cli@1.0.0 --save-dev
```

## 충돌

- angular animation 기능을 사용한다면 platform-browser/animation의 BrowserAnimationsModule을 추가적으로 넣어줘야할 수도 있다.
- typescript가 업그레이드 되면서 사용하지 않는 메소드나, 오류가 발생할 수 있는 스코프에 대해 linting이 더 강력해진 느낌이었다.
