---
title: .NET targetFramework 오류
authors: me
tags:
  - c#
date: 2017-01-10 16:34:43
---

targetFramework가 인식할 수 없다고 페이지가 안 띄워지는 경우가 있다.

## 원인

IIS의 .NET버전과 프로젝트의 .NET버전이 달라 발생한다.
![image from hexo](https://i.imgur.com/RZAuzpC.jpg)

## 해결

**IIS > 응용프로그램 풀 > 내 프로젝트 클릭 > 기본설정** 메뉴에서 **.NET Framework 버전** 속성을 변경해준다.
![image from hexo](https://i.imgur.com/5DHb75H.png)
