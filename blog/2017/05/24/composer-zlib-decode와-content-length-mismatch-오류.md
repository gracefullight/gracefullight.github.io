---
title: composer zlib_decode와 content-length mismatch 오류
authors: me
tags:
  - php
  - composer
date: 2017-05-24 22:14:22
---

## 오류

컴포저로 패키지를 다운 받은 후에 갑자기 오류가 나면서 다른 설치조차 안되는 경우가 있다.
오류 메세지는 아래 두 경우로 나타난다.

### zlib_decode

json 파일 디코딩이 실패했다는 오류이다.

```bash
Failed to decode response: zlib_decode(): data error
Retrying with degraded mode, check https://getcomposer.org/doc/articles/troubleshooting.md#degraded-mode for more info

[ErrorException]
zlib_decode(): data error
```

위의 링크를 따라가 보면 해결책으로 다음과 같이 제시가 되는데
ESET antivirus는 아직 국내에서 쓰는 사람을 못 봤고, IPv6을 막아도 그대로일 것이다.

- If you are using ESET antivirus, go in "Advanced Settings" and disable "HTTP-scanner" under "web access protection"
- If you are using IPv6, try disabling it. If that solves your issues, get in touch with your ISP or server host, the problem is not at the Packagist level but in the routing rules between you and Packagist (i.e. the internet at large). The best way to get these fixed is raise awareness to the network engineers that have the power to fix it. Take a look at the next section for IPv6 workarounds.
- If none of the above helped, please report the error.

### content-length mismatch

composer의 패키지 list를 가지고 있는 json파일이 다 안받아졌다는 내용의 오류이다.

```bash
[Composer\Downloader\TransportException]
Content-Length mismatch
```

## 해결

구글링 해보면 clear-cache를 한 뒤에 composer -vvv 명령어를 사용해 디버깅 로그를 확인해보라는 내용이 주류인데 별 도움은 안 된다.
http 연결이아닌 https로 packagist에 붙어보라는 것도 해결되지 않았다.

### packagist repository 변경

packagist는 유럽에 있어서 한국에서 유럽까지 갔다가 다시 돌아오는 구조라,
[packagist 일본 미러](https://packagist.jp/)를 이용하면 이 문제가 해결된다.

```bash
## 이 명령어로 global config에 repos.packagist 를 추가한다.
$ composer config -g repos.packagist composer https://packagist.jp

## 설정이 되었는지 확인한다..
$ composer config -gl|grep repo

## 아래 설정이 보이면 추가가 된 것이다.
[repositories.packagist.org.type] composer
[repositories.packagist.org.url] https://packagist.jp
```

### 캐시 제거

```bash
composer global clear-cache
composer clear-cache
```

이제 다시 패키지를 설치하면 설치가 될 것이다.

## 다운로드 속도 향상

병렬 다운로드를 가능하게 하는 [hirak/prestissimo](https://github.com/hirak/prestissimo) 패키지를 설치하자.
288s -> 26s 가 되는 마법이 일어난다고 한다.

```bash
composer global require hirak/prestissimo
```
