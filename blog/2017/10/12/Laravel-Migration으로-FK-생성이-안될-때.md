---
title: Laravel - Migration으로 FK 생성이 안될 때
authors: me
tags: [php, laravel]
date: 2017-10-12 08:19:21
---

참조할 테이블의 PK가 increment로 정의되어 있고, 연결할 테이블의 FK가 integer로 되어있는데, SQL Syntax ERROR가 날 경우에 다음과 같이 처리하면 된다.

# 해결

increment가 기본적으로 unsigned이기 때문에 외래키를 걸 컬럼이 unsigned인지 확인해보자.
(컬럼 타입이 완전히 같은지 확인해보자.)

```php
<?php
...
// FK
$table->integer('pk_id')->unsigned();

// PK
$table->increment('id');
...
```

# 여담

`ALTER TABLE CONSTRAINT FORIEN KEY` 구문에 문제가 있는 줄 알고 한참 삽질
