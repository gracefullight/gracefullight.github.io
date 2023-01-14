---
title: Linux 유저 비밀번호 변경
authors: me
tags: [linux]
date: 2017-01-12 20:44:58
---

# passwd

리눅스 유저 비밀번호를 변경해보자.
비밀번호를 변경하고 싶은 유저로 로그인을 한 뒤 아래 명령어를 날리면 된다.

```bash
$ passwd
```

Root 권한이라면 다른 아이디의 비밀번호도 변경이 가능하다.

```bash
# passwd 뒤에 유저아이디를 적는다
$ passwd userid
```
