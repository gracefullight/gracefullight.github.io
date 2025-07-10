---
title: 로컬 웹서버 돌리기 - 5. CURL 설정
authors: me
tags:
  - windows
  - php
date: 2017-01-14 23:17:39
---

[4. OpenSSL 설정](/2017/01/14/로컬-웹서버-돌리기-4-HTTPS-OpenSSL-설정/)에서 이어집니다.

리눅스에서는 Curl 모듈을 확장만 하면 사용이 가능하지만 윈도우 로컬 서버에서는 사용이 되지 않는다. 해결해보자.

## 모듈 확장

**php.ini**에서 **php_curl** 모듈의 주석을 해제한다.
![image from hexo](https://i.imgur.com/FY06asi.jpg)

## dll 복사

총 4 개의 dll 파일을 **C:\Windows\system32** 폴더로 복사해야한다.

- php7\ **libeay32.dll**
- php7\ **libssh2.dll**
- php7\ **ssleay32.dll**
- php7\ext\ **php_curl.dll**

![image from hexo](https://i.imgur.com/1qE7oyH.jpg)

이제 php curl command 를 사용할 수 있다.
