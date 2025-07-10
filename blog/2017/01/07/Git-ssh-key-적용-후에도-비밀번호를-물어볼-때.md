---
title: Git .ssh key 적용 후에도 비밀번호를 물어볼 때
authors: me
tags:
  - git
  - linux
date: 2017-01-07 22:23:42
---

Git 사용을 위해 ssh key 생성해 서버에 추가했는데도 비밀번호를 물어보는 경우가 있다.

## 원인

윈도우에서 ~/.ssh 경로를 인식하지 못해 발생한다.

## 해결

**시스템 > 고급 시스템 설정 > 환경변수** 메뉴로 들어가
HOME 변수로 **%HOMEDRIVE%%HOMEPATH%** 값을 추가 후 재부팅해주면 된다.
![image from hexo](https://i.imgur.com/JtBqLho.png)
