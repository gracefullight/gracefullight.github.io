---
title: 로컬 웹서버 돌리기 - 2. PHP 설치
authors: me
tags: [windows, php]
date: 2017-01-13 22:01:34
---

[1. Apache 설치](/2017/01/13/로컬-웹서버-돌리기-1-Apache-설치/)에서 이어집니다.

## PHP 다운로드

[여기](https://windows.php.net/download/)서 Apache 의 VC 버전에 맞는 Thread Safe 타입의 PHP 를 다운받으면 된다.
![image from hexo](https://i.imgur.com/4BY9Y7E.jpg)

압축을 풀고 Apache 와 같은 폴더에 php7 로 변경해 저장한다. (D:\php7)
폴더 안의 **php.ini-development**를 **php.ini**로 변경한다.

## 모듈 활성화

사용할 모듈의 세미콜론을 지워주면 된다.
![image from hexo](https://i.imgur.com/lOKahxa.jpg)
**curl, mysqli, gettext, mbstring, openssl, pdomysql**는 기본으로 지워주고, 나머진 나중에 지워도 된다.

## 설정 변경

**php.ini** 파일의 설정을 변경한다.

### 시간대 설정

date.timezone 을 추가한다.
![image from hexo](https://i.imgur.com/Q4uTX7J.jpg)

### short_open_tag 설정

`<?php` 를 `<?` 로도 사용할 수 있게 해주는 short_open_tag 옵션을 켠다.
![image from hexo](https://i.imgur.com/P1zVPs6.jpg)

### 에러 리포팅 설정

에러 발생시 서버에 오류가 노출되기에 에러 노출 단계를 낮춰주자.
![image from hexo](https://i.imgur.com/BYKY6gP.jpg)

```apache
error_reporting = E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_USER_DEPRECATED
```

모든오류 & not runtime notice & not deprecated & not user deprecated 의 상태이면 오류를 출력한다.

### 확장 모듈 경로 설정

C:\\php에 php 설치를 하지 않았을 경우 확장 모듈 경로를 변경해줘야한다.

```apache
extension_dir = "D:\php7\ext"
```

## Apache에 PHP 연동

**httpd.conf** 파일을 열고 아래 구문을 모두 추가한다.

```apache
## 인덱스 파일 설정
DirectoryIndex index.php index.html index.htm
## 모듈 연동 (php 설치 경로를 적는다)
LoadModule php7_module "D:/php7/php7apache2_4.dll"
## 핸들러 및 타입 연동
AddHandler application/x-httpd-php .php
AddType application/x-httpd-php .php .html
## PHP INI 경로 설정
PHPIniDir "D:/php7"
```

![image from hexo](https://i.imgur.com/Fbq28aU.jpg)

## 연동 확인

D:\Apache24\htdocs 경로의 index.html 파일을 index.php 로 변경 후 저장한다.

```php title="index.php"
<?
    phpinfo();
?>

```

![image from hexo](https://i.imgur.com/bydLSlO.jpg)

## 여담

php5에서 php7로 오는 중 큰 변경점이 몇 가지 있다.

1. 속도가 php5보다 2배 향상
2. mysql 함수 사용 불가 (Mysqli로 대체)
3. 기본값 연산자 사용 가능 (A ?? B ?? C 로 사용가능)

👏👏👏 다음 장에서는 실제 프로젝트를 웹서버에 돌리기 위한 [Virtual Host 설정](/2017/01/13/로컬-웹서버-돌리기-3-Virtual-Host-설정/)을 해보겠습니다.

```

```
