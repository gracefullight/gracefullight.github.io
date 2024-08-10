---
title: Can't connect to localhost
authors: me
tags: [chrome, dns]
date: 2017-01-08 17:09:23
---

웹서버를 크롬에서 띄울시 localhost 가 요청되지 않는 경우가 있다.
DNS 에 문제가 있어 연결할 수 없다는 에러가 나온다.

## 해결

**Chrome > 설정 > 개인정보** 메뉴에서 **네트워크 활동을 예측하여 페이지 로드 성능 개선** 기능을 해제한다.
![image from hexo](https://i.imgur.com/V8u3jUM.png)
