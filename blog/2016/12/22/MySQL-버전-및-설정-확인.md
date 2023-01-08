---
title: MySQL 버전 및 설정 확인
authors: me
tags: [database, mysql]
date: 2016-12-22 22:29:37
---

Database Migration 또는 Module 설치시 MySQL 버전을 자주 물어본다.

# 쿼리

```sql
SELECT version();

SHOW variables LIKE 'datadir';
```

# 설명

첫번째 쿼리 실행시 버전이 나오고, 두번째 쿼리 실행시 설치 경로가 나온다.
