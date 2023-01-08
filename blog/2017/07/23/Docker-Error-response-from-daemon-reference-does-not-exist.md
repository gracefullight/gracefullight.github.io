---
title: 'Docker Error response from daemon: reference does not exist'
authors: me
tags: [linux, docker]
date: 2017-07-23 20:52:51
---

Docker rmi명령어로 이미지를 삭제하는데 `Error response from daemon: reference does not exist` 오류가 나면서 이미지 삭제가 안 되는 경우 다음과 같이 하면된다.

# 해결

구글링하면 다시 설치하거나 cache를 비우거나 하라는데 해결되진 않았고 쉽게 접근하면 된다.
그냥 **이미지 폴더를 날리자**

```bash
$ sudo systemctl stop docker
$ sudo rm -rf /var/lib/docker
$ sudo systemctl start docker
```
