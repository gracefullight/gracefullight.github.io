---
title: Maria DB에서 정규식 치환하기

authors: me
tags: [mariadb, database]
date: 2017-11-16 12:28:08
---

MySQL에서는 정규식 치환 함수가 없지만 Maria에서는 `REGEX_REPLACE` 함수로 제공된다.

## 사용법

### 구문

```sql
REGEXP_REPLACE(subject, pattern, replace)
```

### 예제

```sql
SELECT REGEXP_REPLACE('gracefullight.dev@gmail.com', '(graceful)(light)\.(.*)', '\\1 \\3 \\2');

/* 결과 */
'graceful dev@gmail.com light'
```

## 참조

자세한 예제는 [여기](https://mariadb.com/kb/en/library/regexp_replace/)서 확인 가능하다.
