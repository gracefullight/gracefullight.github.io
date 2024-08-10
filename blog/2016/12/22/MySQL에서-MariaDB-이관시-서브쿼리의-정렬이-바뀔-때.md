---
title: MySQL에서 MariaDB 이관시 서브쿼리의 정렬이 바뀔 때
authors: me
tags: [database, mysql, mariadb]
date: 2016-12-22 22:35:17
---

@Rownum 변수를 사용해 페이징 쿼리를 구현했는데, MySQL 에서는 정상적으로 정렬이 되다가 Maria 로 이관 후에 정렬이 반대로 나오는 경우가 있다.

## 오류

### 쿼리

```sql
SELECT SQL_CALC_FOUND_ROWS @RNUM:=@RNUM+1 AS ROWNUM, R.* FROM (
    SELECT @RNUM:=0, Q.* FROM (

        SELECT * FROM TABLE1
        WHERE ID = '1'
        ORDER BY REG DESC
    ) Q
) R
LIMIT 0,10
```

### 설명

Rownum 변수를 사용해 TABLE1 에서 최신 날짜 순으로 데이터를 가지고 온다.

## 해결

**LIMIT 2^64-1**를 서브쿼리 내에 추가해준다.

LIMIT 의 최댓값은 unsigned 64bit-1 이므로 해당 값을 날려준다.

### 쿼리

```sql
SELECT SQL_CALC_FOUND_ROWS @RNUM:=@RNUM+1 AS ROWNUM, R.* FROM (
    SELECT @RNUM:=0, Q.* FROM (

        SELECT * FROM TABLE1
        WHERE ID = '1'
        ORDER BY REG DESC

        LIMIT 18446744073709551615
    ) Q
) R
LIMIT 0,10
```

### 원인

Optimizer 가 임시테이블을 만든 후 filesort 하기 때문에 발생한다.
