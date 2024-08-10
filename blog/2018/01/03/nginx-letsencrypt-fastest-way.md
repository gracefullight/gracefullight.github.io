---
title: nginx에 letsencrypt 인증서로 https 가장 빨리 적용하기
authors: me
tags: [linux, nginx, letsencrypt]
date: 2018-01-03 13:29:33
---

> centos7 기준

## nginx 설치

```bash
$ vi /etc/yum.repos.d/nginx.repo

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1

$ yum makecache
$ yum install -y nginx

$ vi /etc/nginx/conf.d/default.conf
## server_name에 도메인 연결

## 문법 체크
$ nginx -t

## nginx 시작
$ systemctl enable nginx
$ systemctl start nginx
```

## certbot 설치

```bash
$ yum install -y epel-release
$ yum install -y certbot-nginx

## 인증
$ certbot --nginx -d my.domain.com
```

## ssl nginx 설정

[기존 포스트](/2017/06/10/CentOS7-LEMP-Stack-%EC%A0%81%EC%9A%A9/#nginx-%EC%97%B0%EB%8F%99) nginx 연동 탭 참조

## renew 설정

```bash
$ crontab -e

1 0 1 * * certbot renew --nginx

$ systemctl restart crond
```

`systemctl restart nginx` 하면 완료
