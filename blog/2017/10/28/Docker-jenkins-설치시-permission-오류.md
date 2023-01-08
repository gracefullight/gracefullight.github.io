---
title: Docker jenkins 설치시 permission 오류
authors: me
tags: [docker, jenkins]
date: 2017-10-28 19:43:36
---

run시에 젠킨스가 올라가지 않고 `/var/jenkins/home`에 파일 퍼미션 오류가 발생할 때 다음과 같이 해결하면 된다.

# 해결

마운트한 볼륨에 1000 유저 권한을 준다. (jenkins의 uid는 1000) [docker hub](https://hub.docker.com/_/jenkins/)에 나와있는 내용이긴 한다.

```bash
$ chown 1000 {볼륨 경로}
```
