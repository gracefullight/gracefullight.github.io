---
title: ASP woff 404 오류
authors: me
tags:
  - asp
date: 2017-01-08 01:46:27
---

Classic asp 에서 .woff 확장자를 가진 글자 파일을 가져오지 못하는 경우가 있다.
Console 확인시 404 오류가 난다.

## 해결

IIS 에서 MIME 형식에 woff 확장자를 추가한다.
![image from hexo](https://i.imgur.com/0wX0c3M.jpg)
