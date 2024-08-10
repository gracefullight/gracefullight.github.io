---
title: connection using old (pre-4.1.1) authentication protocol refused
authors: me
tags: [database, mysql, windows]
date: 2016-12-22 21:14:44
---

MySQL Workbench에서 database 연결 도중 `connection using old (pre-4.1.1) authentication protocol refused`와 같은 오류가 발생시 다음과 같이 해결하자.

## 원인

서버에 설치된 MySQL 버전이 5.1보다 낮아서이다.

## 해결방법

![image from hexo](https://i.imgur.com/OliMFVc.jpg)

연결시 Advanced 탭에서 Use the old authentication protocol을 체크해주자.
