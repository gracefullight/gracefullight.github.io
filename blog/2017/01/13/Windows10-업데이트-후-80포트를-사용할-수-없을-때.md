---
title: Windows10 업데이트 후 80포트를 사용할 수 없을 때
authors: me
tags:
  - windows
date: 2017-01-13 14:26:00
---

Windows10 Anniversary 업데이트 후에 갑자기 80 포트 또는 Apache 서비스를 사용할 수 없는 경우가 있다.

## 원인

WWW Publishing service 가 80 포트를 사용해서 충돌이 발생했다.

## 해결

services.msc 를 실행해 **\*WWW Publishing 서비스**를 **사용안함**으로 체크한 뒤 재부팅해주면 된다.
(로컬 웹을 돌릴 정도면 서비스창을 띄울 수 있을 것이라 믿는다)
![image from hexo](https://i.imgur.com/SqPkZ4A.png)
