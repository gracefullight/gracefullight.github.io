---
title: Laravel - Log::debug vs logger
authors: me
tags:
  - php
  - laravel
date: 2017-07-21 00:46:35
---

로그를 찍기 위해서 Log 파사드 또는 logger 헬퍼 함수를 사용할 수 있다.

두 함수의 차이점은 무엇일까?

## Log::debug

- Log 파사드가 정의되어있어야 한다. `use Log;`
- NULL 값이 들어올시 **NULL이 로그에 출력**된다.

## logger

- 헬퍼함수라 Log 파사드 없이 사용 가능하다.
- NULL 값이 들어올시 아무 내용도 찍히지 않는다.
- debug 레벨이 기본이라, 다른 레벨의 로그를 찍으려면 `logger()->error('에러 로그');` 처럼 함수를 하나 더 호출해야한다.
- 단, info 레벨 로그는 `info();` 헬퍼 함수를 사용할 수 있다.
