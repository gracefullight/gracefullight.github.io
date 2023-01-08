---
title: selinux 설정시 ftp 접근이 안될 때
authors: me
tags: [linux]
date: 2017-01-10 22:54:09
---

selinux 를 끄는건 보안상 취약하다. 하지만 켜놓으면 ftp 가 접근이 안되거나, 접근이 되어도 패시브모드가 접근이 안 되는 경우가 있다.

# 해결

아래 세가지 명령어를 실행해서 selinux 의 설정을 바꿔준다.

``` bash
$ setsebool -P httpd_enable_homedirs 1
$ setsebool -P httpd_can_network_connect 1
$ setsebool -P allow_ftpd_full_acccess 1
```

# 여담

옵션명이 곧 설명을 대신한다고 믿는다.
