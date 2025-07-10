---
title: Cannot start container iptables failed
authors: me
tags:
  - linux
  - docker
date: 2017-08-19 16:32:08
---

## 오류

Container를 다시 올릴 때 다음과 같은 오류로 올라가지 않는 경우가 있다.
docker kill이 아닌 stop, rm으로 container를 지웠을 때 뭔가 충돌이 나는 것 같다.

```bash
Error response from daemon: Cannot start container aca936f2822fce32235e627ff539c58b74b2f4e66cfa701de47ce609e2590d13: iptables failed: iptables -t nat -A DOCKER -p tcp -d 0/0 --dport 50000 -j DNAT --to-destination 172.17.0.10:50000 ! -i docker0: iptables: No chain/target/match by that name.
 (exit status 1)
```

## 해결

이 중 마음에 드는 방법으로 해결하면 된다.

### 서비스 restart

docker 서비스를 restart 한다.

### iptables rule 추가

오류 메세지에 필요한 rule을 추가한다.

```bash
iptables -t filter -N DOCKER
iptables -t nat -N DOCKER
```
