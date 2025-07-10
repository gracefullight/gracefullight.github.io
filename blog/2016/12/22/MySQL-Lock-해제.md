---
title: MySQL Lock 해제
authors: me
tags:
  - database
  - mysql
  - mariadb
date: 2016-12-22 22:20:19
---

잘못된 업데이트 쿼리를 돌리다가 테이블이 잠길 경우 Lock을 해제해줘야 한다.

## 쿼리

```bash
show processlist

kill ${processid}
```

## 설명

show processlist 쿼리를 날리면 현재 database를 사용 중인 프로세스의 목록이 나온다.
목록에서 해당 쿼리를 찾은 뒤 process id를 가지고 kill 쿼리를 실행하면 된다.
