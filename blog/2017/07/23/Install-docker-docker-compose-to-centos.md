---
title: Docker와 Docker-compose 제대로 설치하기
authors: me
tags:
  - docker
  - liux
date: 2017-07-23 20:57:07
---

구글링하면 너무 예전 버전 (1버전 대)의 설치방법만 나와있다.

영문을 따라할 수 있으면 [공홈](https://docs.docker.com/engine/installation/linux/docker-ce/centos/)을 보고하면 된다.

## Docker 설치

### 옛 버전 삭제

```bash
$ sudo yum remove docker \
  docker-common \
  docker-selinux \
  docker-engine
```

서비스를 내리고 docker를 삭제해도 `/var/lib/docker/` 폴더는 지워지지 않고 여기에 기존 데이터가 모두 남아있다.

### 필수 패키지 설치

```bash
$ sudo yum install -y yum-utils device-mapper-persistent-data lvm2
## docker repo를 등록한다.
$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
## yum package를 업데이트
$ sudo yum makecache fast
```

### 다운로드

```bash
sudo yum install docker-ce
```

### 실행

```bash
$ sudo systemctl start docker
$ sudo systemctl enable docker

$ sudo docker --version
Docker version 17.06.0-ce, build 02c1d87
```

## Docker-compose 설치

### 다운로드

```bash
## root로 로그인해야한다.
$ curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
```

### 실행 권한 부여

```bash
$ chmod +x /usr/local/bin/docker-compose

## 설치 확인
$ docker-compose --version
docker-compose version 1.14.0, build 1719ceb
```

설치가 완료되었다.

## Centos6에서 설치하기

centos6 버전에서는 위의 설치방법으로 Docker를 설치할 수 없다. (RHEL7 버전 전용이기에)
다음과 같이 설치하자.

```bash
yum install http://mirrors.yun-idc.com/epel/6/i386/epel-release-6-8.noarch.rpm

yum install -y docker-io

service docker start

chkconfig docker on
```
