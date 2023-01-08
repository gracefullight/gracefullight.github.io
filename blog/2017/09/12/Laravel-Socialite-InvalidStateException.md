---
title: Laravel - Socialite InvalidStateException
authors: me
tags: [php, laravel]
date: 2017-09-12 22:24:25

---

가끔 가다가 인증이 안 되는 경우가 있다.

# 해결법

## stateless

`Socialite::driver('인증 타입')->stateless()->user();` 로 가져오자.

## session 명 변경

`config/session.php`의 **cookie** 값을 변경해준다.

## session domain 변경

`config/session.php`의 **domain** 값을 null 에서 내 도메인으로 변경한다.

그리고 아래 두 명령어를 실행해주자.

```bash
$ php artisan cache:clear
$ composer dump-autoload
```

# 여담

socialite 설명에선 나오지 않았지만, Socialite 구문을 `try/catch`로 감싸주는게 좋았다.

```php
<?php
try {
  $user = Socialite::driver('facebook')->stateless()->user();
} catch (\Exception $e) {
  return redirect()->route('login');
}
```
