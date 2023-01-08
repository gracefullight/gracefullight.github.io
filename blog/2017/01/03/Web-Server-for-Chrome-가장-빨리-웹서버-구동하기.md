---
title: Web Server for Chrome - 가장 빨리 웹서버 구동하기
authors: me
tags: [chrome]
date: 2017-01-03 12:25:23
---

github의 예제 프로젝트나 라이브러리를 받을 때, 데모를 실행시키고 싶을 때가 있다.
그럴려면 node나 apache, nginx, iis 등의 웹서버에서 해당 폴더를 설정하고, hosts파일에서 열어줘야하는 번거로움이 있다.

Web Server for Chrome을 사용하면 몇 초 안으로 데모를 띄울 수 있다.

# 설치

![image from hexo](https://i.imgur.com/kicCaPZ.png)

1. [크롬](https://www.google.co.kr/chrome/browser/desktop/) 설치 후 [웹스토어](https://chrome.google.com/webstore/category/extensions) 접속
2. 검색란에서 [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) 검색
3. 설치

# 사용법

## Web Server 실행

![image from hexo](https://i.imgur.com/NEJhjLE.png)
`chrome://apps/`에 접속 후 Web Server 아이콘을 클릭한다.

## 설정 및 구동

![image from hexo](https://i.imgur.com/ncN1klT.png)
**Automatically show index.html 설정**을 체크한 후 **CHOOSE FOLDER**로 웹서버를 돌릴 폴더를 선택해주자.
그리고 **127.0.0.1:8887** (또는 localhost:8887)로 접속하면 끝!

# 여담

Html과 Javascript로 나만의 UI를 만들고 빠르게 확인하는데 좋을 것 같다.
Service Worker 같은 Https가 필요한 기술도 실행이 가능하다.
