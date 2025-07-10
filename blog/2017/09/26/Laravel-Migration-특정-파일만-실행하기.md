---
title: Laravel - Migration 특정 파일만 실행하기
authors: me
tags:
  - php
  - laravel
date: 2017-09-26 22:31:31
---

전체를 migration 하지 않고 부분만 migration하고 싶을 때 다음과 같이 하면 된다.

## 실행

database/migrations 아래에 selected 폴더를 생성하고 옮기고 싶은 마이그레이션 파일을 넣는다.

path 옵션을 주어 selected 폴더만 migrate한다.

```bash
php artisan migrate --path="database/migrations/selected"
```

## 여담

파일을 직접지정해서 실행하는 방법은 없나보다.
