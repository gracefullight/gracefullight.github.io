---
title: CentOS 버전 및 Bit 확인
authors: me
tags: [linux]
date: 2017-01-13 00:33:12
---

리눅스에 모듈을 설치할 때 항상 버전과 Bit확인이 필요하다.

# Version

```bash
$ cat /etc/*release*

CentOS release 6.6 (Final)
```

# Bit

```bash
$ getconf LONG_BIT

64
```
