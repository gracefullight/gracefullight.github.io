---
title: Laravel 5.5 - 로그인(Auth) 붙히기
authors: me
tags: [php, laravel]
date: 2017-07-09 22:46:57

---

[이전 포스팅](/2017/06/06/Laravel-5-4-Eloquent-Model/)에서 데이터를 가져왔으니, 로그인을 구현해보자.

# Basic Auth

라라벨에서 제공하는 회원가입, 로그인, 비밀번호 찾기 기능을 사용하고 싶다면 artisan 명령어로 간단하게 시작할 수 있다.

```bash
$ php artisan make:auth
```

명령어를 실행하면 **resources/views/auth** 폴더에 뷰가 **app/Http/Controllers/Auth**에 로직이 생성되고 **routes/web.php**에 라우팅이 등록된다.
DB도 같이 만들고 싶다면 [Docs](https://laravel.com/docs/5.4/authentication)를 따라하자.

## 다른 테이블 사용

제공된 user 테이블을 안 쓰려면 커스터마이징이 필요하다.

### 설정 변경

**config/auth.php** 파일로 이동해 다른 모델을 등록하자.

```php title="config/auth.php"
<?php
'providers' => [
  'users' => [
    'driver' => 'eloquent',
    // 여기에 사용할 모델을 등록한다.
    'model' => App\Models\Member::class,
  ]
]
```

> config 안의 파일을 변경하면 config:clear를 실행해 혹시 모를 캐시를 날려주자

그리고 **app/Models/Member.php**로 이동해 내 모델을 라라벨 기본 인증 모듈을 사용할 수 있게 추가해야한다.

```php title="app/Models/Member.php"
<?
// 라라벨 인증 사용
use Illuminate\Foundation\Auth\User as Authenticatable;
// 비밀번호 변경 메일을 위해 필요한 trait
use Illuminate\Notifications\Notifiable;

// Authenticatable 를 상속받는다.
class Member extends Authenticatable {
  // Notifiable trait를 추가한다.
  use Notifiable;

  protected $guarded = [
    'member_id', 'remember_token'
  ];

  protected $hidden = [
    'password', 'remember_token',
  ];
}
```

### 인증 필드 변경

Basic Auth는 기본 필드를 email로 잡고 있기 때문에 id 필드를 사용하게 변경해야한다.

```php title="app/Http/Controllers/Auth/LoginController.php"
<?php
// username 메소드를 추가
public function username() {
  // 반환할 필드를 선언한다.
  return 'id';
}
```

## 회원가입 후 자동로그인

회원가입이 성공하면 세션을 생성해줘야한다.

```php title="app/Http/Controllers/Auth/RegisterController.php"
<?php
// registered 메소드를 Override
protected function registered(Request $request, $user) {
  // 세션 생성
  Auth::attempt([
    'id' => $request->input('id'),
    'password' => $request->input('password')
  ]);

  return response(null, 204);
}
```

## ajax 처리

### 로그인

로그인을 ajax로 처리해야될 경우 커스터마이징이 필요하다.

```php title="app/Http/Controllers/Auth/LoginController.php"
<?php
// authenticated 메소드를 Override
protected function authenticated(Request $request, $user) {
  // 인증이 된 경우 페이지 전환이 아닌 전환될 페이지를 json으로 반환한다.
  if ($request->ajax()) {
    return response()->json([
      'href' => url()->previous()
    ]);

  } else {
    return abort(405);
  }
}
```

### 비밀번호 찾기

비밀번호 찾기를 ajax로 처리해야될 경우 커스터마이징이 필요하다.

```php title="app/Http/Controllers/Auth/ForgotPasswordController.php"
<?php
public function sendResetLinkEmail(Request $request) {
  $this->validateId($request);
  // email이 아닌 아이디로 검색을 해 메일을 찾고 싶다면
  $data = Member::where('id', $request->only('id'))
    ->first(['email']);

  $email = isset($data->email) ? $data->email : null;

  // 여기서 email이 User Model(Member Model)에 바인딩된다.
  // 아래의 sendPasswordResetNotification 메소드에서 $this->email 값이다.
  $response = $this->broker()->sendResetLink([
    'email' => $email
  ]);

  // 리턴 값을 변경해주자.
  return response()->json([
    'email' => $email
  ], $response == Password::RESET_LINK_SENT ? 200 : 500 );
}
```

## routing 예외

ajax 요청으로 바꿨다면 굳이 필요없는 기본 route는 등록할 필요가 없다. (예를 들면 로그인 페이지)
먼저 **routes/web.php**에서 `Auth::routes();` 를 지워주고 라라벨 route 파일을 열어보자.

```php title="vendor/laravel/Illuminate/Routing/Router.php"
// 994 라인
public function auth()
{
  // Authentication Routes...
  $this->get('login', 'Auth\LoginController@showLoginForm')->name('login');
  $this->post('login', 'Auth\LoginController@login');
  $this->post('logout', 'Auth\LoginController@logout')->name('logout');

  // Registration Routes...
  $this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
  $this->post('register', 'Auth\RegisterController@register');

  // Password Reset Routes...
  $this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
  $this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
  $this->get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
  $this->post('password/reset', 'Auth\ResetPasswordController@reset');
}
```

입맛에 맞게 web.php로 가져와 사용하자.

## notification 예외

Noticifation은 사용자에게 빠르게 알림을 보낼 수 있는 기능이지만, 정해져 있는 템플릿을 사용하므로 커스터마이징이 되게 힘들다.
비밀번호 찾기시에 보낼 메일을 정해진 템플릿을 사용할 수 없다면 메소드를 수정하자.

```php title="app/Models/Member.php"
<?php
// 이 메소드를 override해야한다.
// 첫 파라미터는 비밀번호 인증용 token이 들어온다.
public function sendPasswordResetNotification($token) {
  Mail::to($this->email)->send(new PasswordReset($token));
}
```

# Auth

Basic Auth를 사용하는데 건드려야 되는 곳이 많으므로 Auth 모듈만 사용하는게 정신건강에 좋다고 본다.
(Bootstrap 기반의 Laravel에 딱 맞는 모양을 입은 프로젝트라면 기본 인증이 좋겠지만)

## 로그인

**먼저 사용할 모델에 Authenticatable 클래스를 상속 받자**
그리고 LoginController에서 **Auth::attempt()** 메소드를 실행하면 끝이다.

```php title="app/Http/Controllers/LoginController.php"
public function login(Request $request) {
  $password = $request->password;

  if(Auth::attempt([ 'id' => $request->id, 'password' => $password ])){
    return response(null, 200);

  }else{
    return abort(401);
  }
}
```

### not bcrypt

Auth 모듈은 기본으로 bcrypt를 사용해 비밀번호를 암호화하고 비교하는데 다른 암호화 방식을 사용해야하는 경우가 있다.
bcrypt를 사용하지 않게 처리해보자.

```php title="app/Models/Member.php"
// 이 메소드를 override 해야한다.
public function getAuthPassword() {
  // bcrypt 비교를 하지 않기 위해 강제로 해시를 생성한다.
  return Hash::make($this->password);
}
```

이제 **Auth::attempt()** 메소드에 패스워드를 넘길 때 암호화를 해주고 넘기면 된다.

## N개의 세션

관리자와 회원은 같은 세션을 사용하면 안 된다. 세션을 분기해보자.

### 모델 생성

먼저 모델을 하나 만들고 Authenticatable 클래스를 상속받는다.

```php title="app/Models/Admin.php"
<?php

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable {
  // 속성은 테이블에 맞게 알아서 정리하자
}
```

### 설정 추가

만든 모델을 Laravel Auth에서 사용한다고 등록을 해줘야한다.

```php title="config/auth.php"
<?php
return [
  'guards' => [
    ...
    // 아래에 등록된 provider를 admin이란 이름의 guard로 사용
    'admin' => [
      'driver'   => 'session',
      'provider' => 'admin'
    ]
  ],
  'providers' => [
    ...
    // 방금 만든 모델을 Auth의 Provider로 등록
    'admin' => [
      'driver'   => 'eloquent',
      'model' => App\Models\Admin::class
    ]
  ],
];
```

passowrds 속성은 제공되는 password_resets 기능을 사용할 경우에만 추가해주면 된다.

### 미들웨어

관리자 세션이 인증된 사람만 관리자 페이지에 접근할 수 있어야한다.
**php artisan make:middleware Admin** 명령어를 실행해 Admin Middleware를 만들자.

```php title="app/Http/Middleware/Admin.php"
<?php
use Auth;
use Closure;

class Admin {

  public function handle($request, Closure $next) {
    // admin session이 있는 경우만 request를 진행한다.
    if (Auth::guard('admin')->check()) {
      return $next($request);
    }

    // 아닐경우 관리자 로그인 페이지로 넘긴다.
    return redirect()->route('admin.login');
  }
}
```

그리고 Http Kernel에 방금 만든 Admin Middleware를 라우팅에서 사용할 수 있게 등록해준다.

```php title="app/Http/Kernel.php"
<?php
  ...
  protected $routeMiddleware = [
    'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
    'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
    'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
    'can' => \Illuminate\Auth\Middleware\Authorize::class,
    'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
    'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
    // admin 이름으로 Admin Middleware를 호출할 수 있게 등록
    'admin' => \App\Http\Middleware\Admin::class,
  ];
```

새로운 라우팅 파일로 관리하기 위해 RouteServiceProvider에 설정을 추가한다.

```php title="app/Providers/RouteServiceProvider.php"
<?php
...
  public function map() {
    ...
    $this->mapAdminRoutes();
  }

  protected function mapAdminRoutes() {
    // /admin 으로 들어오는 요청에 대해 처리한다.
    Route::prefix('admin')
    // 이런식으로 한 번에 추가할 수도 있다. 하지만 except 함수를 쓸 수 없는 것 같고,
    // 라우팅 페이지에서 미들웨어를 등록해주는 게 더 편했다.
    // ->middleware(['web', 'admin'])
      ->middleware('web')
      ->namespace($this->namespace)
    // routes/admin.php 파일을 관리자 라우팅 파일로 등록한다.
      ->group(base_path('routes/admin.php'));
  }
```

마지막으로 라우팅 파일에 미들웨어를 넣어준다.

```php title="routes/admin.php"
<?php
// admin middleware를 사용하고, namespace에 admin.을 추가한다.
Route::group(['middleware' => 'admin', 'as' => 'admin.'], function() {
  // 이 라우팅은 route('admin.main') 으로 접근이 가능해진다.
  Route::get('/', 'AdminController@index')->name('main');
});
```

### 활용

기존 Auth 메소드들에 guard만 추가해주면 쉽게 사용 가능하다.

```php
<?php
Auth::guard('admin')->attepmt();
Auth::guard('admin')->check();
Auth::guard('admin')->user();
Auth::guard('admin')->logout();
```

## 로그아웃

**Auth::logout()** 메소드를 호출하면 된다.

# 이슈

## 세션 아이디

라라벨에선 로그인을 할 때 세션아이디를 새로운 값으로 엎어쳐버린다.
따라서 같은 환경에서 접근했는데, 로그인을 하면 다른 사용자가 되는 경우가 생긴다.
(로그아웃시에는 그대로다.)

```php
<?php
// 로그인 전에 세션아이디를 가져와
$old_session_id = Session::getId();
// 로그인이 성공하면 DB에서 등록된 세션값을 업데이트하자.
```

# 소셜 로그인

`laravel/socialite` 패키지를 설치하고 아주 쉽게 연동이 가능하다.

## 세팅

```bash
$ composer require laravel/socialite
```

기본 socialite 패키지는 `facebook`, `twitter`, `linkedin`, `google`, `github` or `bitbucket` 만 연동이 가능하므로 다른 소셜 로그인을 연동하고 싶을 경우 [`Socialite Providers`](https://socialiteproviders.github.io/) 패키지를 사용하면 된다.

> Socialite Providers 사이트에는 Naver, Kakao, BattleNet(?) 등의 소셜 연동이 가능한 패키지가 무수히 많다.

# 여담

[JWT 인증](/2017/11/03/Laravel-5-5-JWT-Auth-Guide)과 같이본다면 Laravel을 사용한 실무에서 필요한 인증은 다 마무리한 셈일 듯
