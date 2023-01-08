---
title: lynx 리눅스 브라우저 사용법
authors: me
tags: [linux, lynx]
date: 2017-01-10 22:50:44
---

lynx(링스) 브라우저를 설치하고 사용해보자

# 설치

```bash
# 설치 확인
$ yum list installed | grep lynx

# lynx 설치
$ yum install -y lynx
```

# 예제

```bash
# lynx로 브라우저 호출
$ lynx https://gracefullight.github.io

# 브라우저 호출'만' 하고 싶을 때 (결과를 표시하지 않음)
$ lynx -dump https://gracefullight.github.io
```

# 여담

crontab과 병행해서 서버의 API를 주기적으로 동작시킬 수 있다.
