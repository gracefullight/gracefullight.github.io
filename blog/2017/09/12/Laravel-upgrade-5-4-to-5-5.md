---
title: Laravel 5.5로 업그레이드
authors: me
tags: [php, laravel]
date: 2017-09-12 22:46:10
---

Laravel 5.4 에서 5.5 로 업그레이드 후기

## 업그레이드

[공홈](https://laravel.com/docs/5.5/upgrade)을 참조해도 된다.
`composer.json`에서 아래 패키지의 버전을 바꿔준다.

### dependencies

- laravel/framework: 5.5.\*
- phpunit/phpunit: ~6.0

### dev-dependencies

- filp/whoops: ~2.0

```bash
composer clearcache
composer update
```

## 이슈

### Session, DB 문제

```bash
php artisan cache:clear
```

### const UPDATE_AT 문제

`const UPDATED_AT = null;`처럼 timestamps 필드 중 하나를 disable 했을 때 5.5 버전에선 오류가 발생한다.
아래 처럼 모델에 `setUpdatedAt` 함수를 추가해주면 된다.

```php
<?php
public function setUpdatedAt($value) {
  return $this;
}
```

### request has 문제

`request->has`와 같은 기능으로 동작하려면 `request->filled`로 바꿔줘야한다.

```php
<?php
// 5.5에서는 name 값이 비던 안 비던 true
if ($request->has('name')) {

}

// 이게 구버전 has의 기능과 동일하다.
// name 값이 있을 경우만 true
if ($request->filled('name')) {

}
```
