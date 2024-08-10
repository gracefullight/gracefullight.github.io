---
title: unpkg cdn 사용하기 (jsdelivr)
authors: me
tags: [javascript, nodejs]
date: 2017-07-16 15:50:21
---

최근 소스들을 까보다가 발견했는데, npm에 등록된 패키지를 CDN으로 바로 활용 가능한 서비스가 있다.
바로 [unpkg](https://unpkg.com/#/)이다. 리젼은 [여기](https://unpkg.com/#/stats)서 확인 가능하다.

## 사용

사용법은 엄청나게 간단하다.
node_modules 폴더 안에 있는 구조를 URL에 그대로 입력만 해주면 된다.
몇 가지 예로 확인해보자.

```html
<!-- React -->
<script src="https://unpkg.com/react@15.3.1/dist/react.min.js"></script>
<!-- Lodash -->
<script src="https://unpkg.com/lodash@4.17.4/lodash.min.js"></script>
<!-- Bootstrap css -->
<script src="https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css"></script>
```

node_modules 안의 경로가 생각나지 않는다 라면 폴더 경로까지만으로 웹에서 접근해보자.
예를 들어 [Bootstrap4](https://unpkg.com/bootstrap@4.0.0-alpha.6/)라면 <https://unpkg.com/bootstrap@4.0.0-alpha.6/> 까지만 들어가면 폴더 구조가 보인다.

## 여담

블로그의 스크립트도 unpkg로 바꿨는데, 로딩속도가 1초 가까이 줄어든 느낌이다.

## 이슈

unpkg로 스크립트를 가져오는 도중에 503 timeout 에러가 발생해서 블로그가 동작하지 않았었다.
같은 방법으로 동작하지만 좀 더 reliable한 서비스인 [jsdelivr](https://www.jsdelivr.com/)를 사용하자.
