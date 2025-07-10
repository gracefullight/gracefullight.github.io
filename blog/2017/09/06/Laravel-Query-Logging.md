---
title: Laravel Query Logging, 쿼리 로그
authors: me
tags:
  - php
  - laravel
date: 2017-09-06 21:38:37
---

Laravel DebugBar 를 이용하는게 편하지만 dump 나 json 리턴시에 DebugBar 가 보이지 않으므로 직접 찍어줘야하는 경우가 많다.

## 소스

```php
<?php
## DB 파사드를 추가한다.
use DB;
...

public function your_func(Request $request) {
  // 로그를 enable 시키고
  DB::enableQueryLog();
  // 쿼리를 여기에 실행한다.
  Member::where('조건', '값')->get();
  Product::find(1);

  // 쿼리 로그를 찍는다.
  $queryLogs = DB::getQueryLog();
  dump($queryLogs);
}
```

## 결과

배열에 query, bindings (preparedStatement 를 위한 것), time 이 상세하게 나온다.
