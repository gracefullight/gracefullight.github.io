---
title: Docker로 LEMP Stack 구축하기
authors: me
tags:
  - linux
  - docker
  - php
  - mariadb
  - nginx
date: 2017-08-14 23:41:38
---

이 포스트 전에 웹서버 세팅을 하나씩 설치해서 띄워보는 걸 권장하고
Docker, SSH Login, LetsEncrypt, sed 명령어의 사용법을 알고 있어야 한다.
구성할 서버 스택은 다음과 같다.

- **Docker**
- **Docker-compose**
- Host 에 사용될 Linux (Centos7)
- Alpain Linux
- Nginx ^1.13
- MariaDB ^10.2
- PHP ^7.1
- Laravel =5.4
- LetsEncrypt
- HTTP2
- Redis

## Docker 설치

[이전 포스트](/2017/07/23/Install-docker-docker-compose-to-centos/)를 참조하자.

## Container 쇼핑

[Docker Hub](https://hub.docker.com/)에서 마음에 드는 Container 를 사용해도 되지만, 생각처럼 돌아가는 Container 는 다음과 같았다.

- [nginx-php-fpm](https://hub.docker.com/r/richarvey/nginx-php-fpm/) (2M)
- [official mariadb](https://hub.docker.com/_/mariadb/) (10M)
- [bitnami redis](https://hub.docker.com/r/bitnami/redis/) (500K)

> **왜 [Laradock](https://github.com/laradock/laradock)을 안 썼죠?**
>
> 1. Laradock 에서 caddy 를 사용하지 않고 nginx 와 certbot 만을 이용해 http2 환경을 구성하는 예제가 없었다.
> 2. 그래도 시도해봤으나 certbot 인증시에 DocumentRoot 를 잡지 못하는 현상을 삽질로 매꿀 시간이 없었다.
> 3. Git repo 를 Clone 받아서 Docker-compose 로 Container 를 구동하기 때문에 추후 ECS 에 적용할 수가 없는 구조였다.
> 4. 직접 구축해보고 싶었다.

## 세팅

### nginx-php-fpm

Laravel 용 및 튜닝을 위해 Docker hub 의 이미지 대신 Git repo 의 이미지를 Clone 해서 세팅을 해보자.

> 내용 추가 중..
