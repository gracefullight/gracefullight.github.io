---
title: Alpine Linux AWS Cli 설치
authors: me
tags: [aws, alpine]
date: 2017-09-22 07:51:15
---

## 설치

차례대로 실행만 해주면 된다.

```bash
## python 설치 안 된 경우
## $ apt install python

## pip 설치
$ curl -O https://bootstrap.pypa.io/get-pip.py
$ python get-pip.py --user

## PATH 등록
$ export PATH=~/.local/bin:$PATH
## aws cli 설치
$ pip install awscli --upgrade --user

$ aws --version
```
