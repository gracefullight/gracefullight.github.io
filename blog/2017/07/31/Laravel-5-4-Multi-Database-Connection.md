---
title: Laravel 5.5 - Multi DB Connection
authors: me
tags: [php, laravel]
date: 2017-07-31 22:54:58

---

여러 데이터베이스에서 데이터를 가져와야되는 경우가 있다. (마이그레이션 또는 발송 모듈 DB의 분기 등등)
라라벨에선 아주 쉽게 설정이 가능하다.

# 설정

**config/database.php**에 새로운 커넥션 정보를 넣어주자.
새 커낵션은 `mysql_new` 라고 이름지었다.

```php config/database.php
<?php
return [
  ...
  'connections' => [
    // 기본 커넥션
    'mysql' => [
      ...
    ],
    // 새 친구
    'mysql_new' => [
      'driver' => 'mysql',
      'host' => '111.111.111.111',
      'port' => '3306',
      'database' => 'test',
      'username' => 'test',
      'password' => 'test1234',
      'unix_socket' => '',
      'charset' => 'utf8',
      'collation' => 'utf8_general_ci',
      'prefix' => null,
      'engine' => null
    ],
  ],
];
```

# 모델

새 커넥션에 사용할 모델을 만들어주고, 모델에서 연결할 커넥션을 설정해주자.

```php model.php
<?php
...
class OldMember extends Model
{
    // 커넥션 변수를 다시 설정해주면 끝
    protected $connection = 'mysql_new';
    protected $table = 'test';
    ...
}
```

# 사용

기존 모델 사용법과 똑같다. 아주 간단하다.
