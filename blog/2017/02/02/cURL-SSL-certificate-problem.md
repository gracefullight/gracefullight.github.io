---
title: cURL error 60 SSL certificate problem
authors: me
tags: [php]
date: 2017-02-02 23:50:09
---

window localhost php 에서 cURL 함수 사용시
cURL error 60: SSL certificate problem...으로 시작하는 오류가 발생할 때가 있다.

![image from hexo](https://i.imgur.com/u6XZCfz.png)

# 해결

## 키 다운로드

[root certificate bundle](https://curl.haxx.se/ca/cacert.pem)을 다운로드 받아 php 하위 경로로 넣어준다.

## 등록

**php.ini**에서 키를 추가한다.

```ini title="php.ini"
[curl]
; A default value for the CURLOPT_CAINFO option. This is required to be an
; absolute path.
curl.cainfo = D:/php7/extras/ssl/cacert.pem
```

# 참조

- [PHP cURL error code 60](http://stackoverflow.com/questions/21114371/php-curl-error-code-60)
