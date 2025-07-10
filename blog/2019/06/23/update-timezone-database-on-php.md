---
title: 타임존 데이터 최신버전으로 업데이트하기
authors: me
tags:
  - php
  - timezone
  - tzdata
date: 2019-06-23 17:19:48
---

타임존 데이터는 php의 버전을 따라 올라가는데, 실무에선 항상 최신버전을 사용하기 쉽지 않다.
그럴 때 데이터만 업데이트하는 방법을 쓸 수 있다.

## 설치

> 2019.06 현재 최신 타임존 데이터베이스는 2019a (2019.01) 버전이다.

### perl

perl로 설치되는 일반적인 경우는 아래와 같이 쉽게 설치 가능하다.

```bash
## perl 로 설치
$ perl install timezonedb

## 끝!
```

### phpize

그렇지 않은 경우 라이브러리를 수동으로 빌드해줘야한다.

```bash
## 타임존 데이터 다운로드
$ curl -LO https://pecl.php.net/get/timezonedb-2019.1.tgz

## 압축 해제
$ tar -xvzf timezonedb-2019.1.tgz
$ cd timezonedb-2019.1

## 빌드
$ phpize
$ ./configure --with-php-config=${PHP_CONFIG_PATH}
$ make && make install

## 라이브러리를 extensions 폴더로 이동
$ mv timezonedb.so /usr/local/php/extentions

## 라이브러리 추가
$ vi php.ini
$ extension=timezonedb.so

## 아파치 재시작
$ apachectl restart

## 버전 확인
$ /usr/bin/php -r "echo timezone_version_get();"
2019.01
```

## 참조

- [Compiling shared PECL extensions with phpize](http://docs.php.net/manual/en/install.pecl.phpize.php)
