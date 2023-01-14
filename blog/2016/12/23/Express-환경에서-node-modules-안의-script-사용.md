---
title: Express 환경에서 node_modules 안의 script 사용
authors: me
tags: [javascript, nodejs, express]
date: 2016-12-23 15:47:28
---

앵귤러 또는 다른 브라우저에 필요한 스크립트를 npm 으로 설치하고
node_modules 안에 있는 스크립트로 참조하고 싶을 때 다음과 같이 라우팅을 추가한다.

# 소스

```js
// scripts 경로로 접근시 node_modules을 사용할 수 있게 설정
app.use("/scripts", express.static(path.join(__dirname, "node_modules")));
```

```html
<!-- 결과 -->
<script src="/scripts/angular/angular.min.js"></script>
```
