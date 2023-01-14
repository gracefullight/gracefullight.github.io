---
title: MySQL Dump 명령어
authors: me
tags: [database, mysql]
date: 2016-12-23 07:56:42
---

# MySQL Dump 명령어 사용법

## 스크립트 생성

```bash
$ vi dump.sh
```

dump.sh 파일을 만들고 아래 내용을 추가해 준다.

```bash
$ mysqldump -u 유저명 -p비밀번호 데이터베이스명> 경로`date+%y%m%d%H`.sql
```

스크립트를 원하는 시간대로 cron 에 등록한다.

## 예제

ID : test, PW: test, DB : test 의 dump 를 생성하고 싶을 때

```bash
$ mysqldump -u test-ptest test> /home/test/dump/`date+%y%m%d%H`.sql
```
