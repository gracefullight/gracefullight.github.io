---
title: Visual Studio 콘솔창 유지
authors: me
tags: [windows]
date: 2017-01-08 17:25:39
---

VS에서 코딩 후 빌드를 하면 콘솔창이 결과를 보여주자마자 닫히는 경우가 있다.
수동으로 닫을 때까지 콘솔창이 유지되게 해보자.

# 해결

**프로젝트 > 속성 > 구성 속성 > 링커 > 시스템 메뉴**에 들어가 **하위시스템 옵션**을 **콘솔**로 변경한다.
![image from hexo](https://i.imgur.com/3oalbKH.png)
