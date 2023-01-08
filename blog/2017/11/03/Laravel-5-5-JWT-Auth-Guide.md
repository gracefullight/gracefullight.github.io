---
title: Laravel 5.5에 JWT (Json Web Token) Auth 추가하기
authors: me
tags: [php, laravel, jwt, oauth2]
date: 2017-11-03 07:59:40

---

검색해 나온 포스트들은 5.4버전에 대해서만 나와있어서, 5.5에서는 아무짝에 쓸모가 없었다.
라라벨에서 좃인증을 시작해보자.

# 설치

## jwt-auth

171103 기준으로 dev-develop 버전의 패키지를 설치해야한다.

```bash
$ composer require tymon/jwt-auth:1.0.0-rc.1
```

## service provider 등록

```php config/app.php
<?php

'providers' => [
  ...
  Tymon\JWTAuth\Providers\LaravelServiceProvider::class,
],

'alias' => [
  ...
  'JWTAuth' => Tymon\JWTAuth\Facades\JWTAuth::class
],
```

## 설정파일 publish

```bash
$ php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" --force
```

## secret key 생성

```bash
$ php artisan jwt:secret
```

# 연동

## API Route 설정

API 가드와 유저 모델을 설정하다.

```php config/auth.php
<?php
return [
  'defaults' => [
    'guard' => 'api', // 기본 가드를 api로 변경
    'passwords' => 'users',
  ],

  'guards' => [
    ...
    'api' => [
      'driver' => 'jwt', // api 가드를 jwt 인증을 사용
      'provider' => 'users',
    ],
  ],

  'providers' => [
    'users' => [
      'driver' => 'eloquent',
      'model' => App\Models\Member::class, // 유저 모델을 해당 모델로 변경
    ],
  ],
  ...
];
```

## Member Model 설정

```php app/Models/Member.php
<?php
...
// jwt를 모델에서 사용하기 위해 추가한다.
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
...

class Member extends Authenticatable implements JWTSubject
{
  // 아래 두 메소드가 구현되어야 실행된다.
  public function getJWTIdentifier() {
    return $this->getKey();
  }

  public function getJWTCustomClaims() {
    return [];
  }
}
```

# 사용하기

## login

```php app/Http/MemberController.php
<?php
public function login(Request $request) {
  $credentials = $this->validate($request, [
    'id' => 'required|string',
    'password' => 'required|string'
  ]);

  if ($token = $this->guard()->attempt($credentials)) {
    return $this->respondWithToken($token);
  }

  return response()->json(['message' => 'Unauthorized'], 401);
}

protected function respondWithToken($token) {
  return response()->json([
    'access_token' => $token,
    'token_type' => 'bearer',
    'expires_in' => $this->guard()->factory()->getTTL() * 60
  ]);
}

public function guard() {
  return Auth::guard();
}
```

## Authorized Routes

### Accept Header

> **application/json** 로 설정해야 오류가 예쁘게 반환된다.

### token 태우기

```bash
# header 이용한 방법
Authorization: Bearer yourtokens...

# Querystring으로도 인증 가능
https://gracefullight.github.io/me?token=yourtokens...
```

### routes

```php routes/api.php
Route::group(['middleware' => 'auth:api'], function() {
  Route::get('member/logout', 'MemberController@logout');
  Route::get('member/me', 'MemberController@me');
});
```

## logout

```php app/Http/MemberController.php
<?php
public function logout(Request $request) {
  $this->guard()->logout();
  return response(null, 204);
}
```

## refresh

refresh는 auth:api 미들웨어 없이 처리되어야한다.

```php app/Http/MemberController.php
<?php
public function refresh() {
  return $this->respondWithToken($this->guard()->refresh());
}
```

# 여담

Expired거나 Unauthoriezed경우 status code로 체크하면 된다.
5.5버전 메뉴얼이 부족하다.
