---
title: Database 유저 생성 및 권한 설정
authors: me
tags: [database, mariadb, mysql]
date: 2016-12-22 22:46:07
---

## 유저 생성

```sql
CREATE USER '유저명'@'%' IDENTIFIED BY '비밀번호'; -- 모든 아이피 접근
CREATE USER '유저명'@'localhost' IDENTIFIED BY '비밀번호'; -- 로컬호스트 접근
CREATE USER '유저명'@'127.0.0.1' IDENTIFIED BY '비밀번호'; -- 로컬호스트 접근
```

## 데이터베이스에 모든 권한 부여

```sql
-- 해당 디비명의 유저의 모든권한 설정
GRANT ALL PRIVILEGES ON 디비명.* TO '유저명'@'%' WITH GRANT OPTION;
```

## 권한 적용

```sql
FLUSH PRIVILEGES;
```

## 권한 확인

```sql
SHOW GRANTS FOR '유저명'@'%';
```

## 여담

권한 부여는 쉘상에서 접근해야지 오류가 없다.

부분 권한 또는 부분 테이블로 권한을 제한하고 싶다면, [MySQL Grant Syntax](http://dev.mysql.com/doc/refman/5.7/en/grant.html)를 참조한다.
