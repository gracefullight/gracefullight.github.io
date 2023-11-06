---
title: Laravel 5.5 - 시작하기
authors: me
tags: [php, laravel]
date: 2017-05-16 22:34:39
---

# 왜 라라벨인가?

![image from hexo](https://i.imgur.com/TuwFZD4.png)

1등이 된지가 14년 7월이다. 이 글은 17년 글이다.
다른 장점이 궁금하다면 다른 포스트나 stackoverflow에서 해결해줄 것 같다.

이 글을 읽어주시는 분들은 **Modern PHP에 대해 이해**하고 있다고 생각했기 떄문에 문법적인 것들은 설명하지 않을 것이다.
_더군다나 라라벨을 도입하면서 삽질한 내용을 정리하고 있기에, 입문용은 절대 아니다._
기본적으로 아래와 같은 PHP 개념을 알고 있어야한다.

- PSR
- Composer
- Class
- Namespace
- Closure
- Trait
- PDO

추가적으로 이런 걸 사용해 봤다면 더 쉬울 듯하다.

- Monolog
- 다른 MVC 프레임워크
- Lodash

# 설치

## PHP

PHP 7 이상을 설치해주고, 아래 Extension은 웬만하면 열어주는 것들이니 크게 신경쓰지 말자.

- PHP >= 7.0.0
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

## Composer

[Composer 홈페이지](https://getcomposer.org/download/)에서 다운받고 전역설정만 해주면 된다.

## Laravel Cli

Laravel 명령어를 사용할 수 있게 composer로 전역 설치하자.

```bash
composer global require "laravel/installer"
```

# 프로젝트 생성

## 초기 생성

```bash
laravel new 프로젝트명
```

위 명령어를 실행하면, 알아서 composer 패키지까지 설치된다.

## clone 했을 때

환경 설정 파일과 프로젝트 키가 없으므로 적절하게 세팅해줘야한다.

```bash
# 패키지 의존성 설치
$ composer install

# .env 파일 복사 (설정파일 생성)
# post-root-package-install scripts로 들어가 있긴한데, 복사가 안 되는 경우
$ cp .env.example .env

# 프로젝트 키 생성
$ php artisan key:generate
```

## 실행

프로젝트를 실행해보자.

```bash
php artisan serve
```

이제 localhost:8000으로 라라벨 프로젝트에 접근이 가능하다.

> php artisan 명령어는 laravel에서 사용하는 커맨드 쉘이다.
> **php artisan**로 명령어 리스트가 나오고 **php artisan help 명령어** 로 해당 명령어의 옵션을 볼 수 있다.

# 프로젝트 구조

[라라벨 한글 메뉴얼](https://laravel.kr/docs/5.4/structure)이나 [공식 메뉴얼](https://laravel.com/docs/5.4/structure)을 보면 되는데 마치 사전을 펴놓았는데 어떤 단어를 찾는지 까먹은 느낌이 들 것이다.

모든 프레임워크는 Model, View, Controller, Routing만 알면 끝이라는 것을 잠시 기억 속에서 꺼내보고 **딱 3가지 경로만 기억**하자.

- **Route**: routes/
- **Controller**: app/Http/Controllers/
- **View** : resources/views/

> 모델은 어딨어? 라고 생각할 것 같은데 Model을 완벽하게 사용하려면 ORM을 써야하고 DB를 ORM에 맞게 정규화해야하며 이 작업은 처음 진행하기에 고통스럽다.
> 다음 포스트에 진행해보자.

## Route

모든 웹 프레임워크의 기본은 Routing이다.
routes 폴더에 기본으로 api, channels, console, web 파일이 보이는데 그 중 2가지만 알면 된다.

- api.php: Token 인증이 필요한 라우터로 `/api/{route}` 로 접근이 가능하다.
- web.php: 기본적인 Route이다. GET이 아닌 다른 메소드는 CSRF Token이 있어야만 호출이 가능하다.

## Controller

Routing 요청을 처리하는 로직이 들어있는 부분이다.

## View

Controller에서 처리된 데이터를 플랫폼에 보여주는 부분이다.

# 프로젝트 세팅

## App 설정

### env 파일

.env 파일에서 APP_NAME과 DB로 시작하는 설정을 바꿔준다.

### app 파일

```php title="config/app.php"
<?php
return [
  // 시간대 세팅을 한다.
  'timezone' => 'Asia/Seoul',
  // 언어 설정을 한다.
  // fallback_locale은 언어팩이있어야 하므로 아래에서 진행할 laravel-lang 설치 후 바꿔주자.
  'locale' => 'ko',
]
```

### database 파일

```php title="config/database.php"
<?php
return [
  'connections' => [
    'mysql' => [
      // mysql일 경우 utf8로 설정해준다 (maria는 utf8mb4)
      // DB 설정과 다르게 Model 이용시 charset 및 collation이 지정되어 들어가기에 꼭 설정해줘야한다.
      'charset' => 'utf8',
      'collation' => 'utf8_general_ci',
      // 내 테이블의 접두사가 필요하다면 여기서 설정한다.
      // 예를들어 test_member, test_product 이런식의 테이블 명명규칙이라면 아래처럼 주면된다.
      'prefix' => 'test_',
      // engine 옵션은 my.ini에서 만져주자..
      'engine' => null,
    ],
];
```

> config 내의 파일과 .env파일을 건드릴 경우 laravel 환경을 다시 캐싱해주거나 아예 삭제해야 적용이 된다.
> **php artisan config:cache** 명령어 또는 **php artisan config:clear** 명령어를 실행해주자.

## Debug Bar

정말 멋진 디버깅 툴이다.
간단히 설치 후에 .env 파일의 **APP_DEBUG** 옵션이 true이면 자동으로 View 하단에 생성된다.
아래와 같은 데이터를 확인할 수 있다.

- 로그 내역
- 뷰 데이터 바인딩 확인
- 오류
- 라우팅
- 쿼리 실행
- 메일 발송 데이터
- 실행 시간
- Request

### 설치

```bash
composer require barryvdh/laravel-debugbar
```

## laravel-lang

기본 오류 메세지들의 localization 패키지이다.

### 설치

```bash
composer require caouecs/laravel-lang:~3.0
```

### 적용

`vendor/caouecs/laravel-lang/src/{국가}` 폴더를
`resources/lang/{국가}` 로 복사하고 **config/app.php** 의 **fallback_locale**을 `{국가}`로 바꿔주면 된다.

```bash
# 귀찮으니 git bash에서 날려봅시다.
$ cp -r ./vendor/caouecs/laravel-lang/src/ko ./resources/lang/ko
```

# 라우팅

```php title="routes/web.php"
<?php
// url 변수
Route::get('/your_url/{id}', function($id) {
  return $id;
});

Route::get('/your_url/{id?}', function($id = null) {
  return $id;
});
```

# 컨트롤러

## 생성

artisan 명령어로 간단히 생성할 수 있다.

```bash
# make:controller 폴더명/컨트롤러명
$ php artisan make:controller TestController

# 리소스 메소드를 같이 생성
$ php artisan make:controller TestController --resource
```

## 연결

```php title="routes/web.php"
<?php
// 컨트롤러명@메소드명 으로 바로 연결시킬 수 있다.
Route::get('/url/{id}', 'TestController@get');
Route::post('/url', 'TestContoller@post');

// CRUD가 명확한 컨트롤러인 경우 Resource를 사용하는 게 편할 수 있다.
Route::resource('tests', 'TestController');
// only 또는 except로 원하는 resource만 가져갈 수 있다.
Route::resource('tests', 'TestController', [
  'only' => [
    'index', 'show'
  ]
]);
```

```php title="app/Http/Controllers/TestController.php"
<?php
use Illuminate\Http\Request;

class TestController extends Controller{

  public function get($id){

    // 뷰를 호출
    return view('test.detail', [
      'data' => $data
    ]);
  }

  public function post(Request $request, $id){
    // Request 데이터를 제어할 수 있다.
    $input = $request->all();
    $name = $request->input('name');

    $data = [];

    // json body와 201 http code를 반환
    return response()->json([
      'data' => $data
    ], 201);
  }
}
```

### Resource

리소스 사용시라면 아래와 같은 메소드로 구성되어야한다.
게시판 컨트롤러라면 아래와 같은 구성일 것이다.

| 메소드    | 경로                | 액션              | 라우트.메소드  |
| --------- | ------------------- | ----------------- | -------------- |
| GET       | /boards             | 게시판 메인       | boards.index   |
| GET       | /boards/create      | 게시글 생성페이지 | boards.create  |
| POST      | /boards             | 게시글 저장       | boards.store   |
| GET       | `/boards/{id}`      | 게시글 상세페이지 | boards.show    |
| GET       | `/boards/{id}/edit` | 게시글 수정페이지 | boards.edit    |
| PUT/PATCH | `/boards/{id}`      | 게시글 수정로직   | boards.update  |
| DELETE    | `/boards/{id}`      | 게시글 삭제       | boards.destroy |

# 뷰

블레이드 템플릿을 사용하며 [홈페이지](https://laravel.com/docs/5.4/blade#control-structures) 설명이 꽤나 자세하다.
당장 알아야 할건 아래 두 개 정도 뿐이다. 나머지는 그때 그때 문서를 참조하자.

```php title="resources/views/test/detail.blade.php"
// 바인딩한 데이터를 {{ }} 구문으로 바로 접근할 수 있다.
{{ $data->name }}님의 정보입니다.
```

```php title="resources/views/test/create.blade.php"
// post로 전송시
<form method="post" url="/url">
  // post로 데이터를 전송시 csrf 토큰이 필요하다.
  // 이 헬퍼함수를 호출하면 자동으로 토큰 값이 들어간 input hidden 필드가 생성된다.
  {{ csrf_field() }}
  이름: <input type="text" name="name" vavlue="">
</form>

// 기타 메소드로 전송시
<form method="post" url="/url">
  {{ crsf_field() }}
  // PUT, PATCH, DELETE 와 같은 메소드로 전송시 form 태그에서는 지원을 해주지 않으므로 method spoofing이 필요하다.
  // 이 헬퍼함수를 호출하면 해결된다.
  {{ method_field('PUT')}}
</form>
```

# 여담

이제 라라벨을 이용해 데이터를 서버에 보내고 뷰를 구성할 수 있게 되었다.
[다음 포스팅](/2017/06/06/Laravel-5-4-Eloquent-Model/)에서는 DB 연동과 ORM 모델을 사용해 데이터를 가져오고 페이징 처리를 해보자.
