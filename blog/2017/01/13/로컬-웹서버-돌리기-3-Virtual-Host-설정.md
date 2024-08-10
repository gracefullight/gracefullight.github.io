---
title: 로컬 웹서버 돌리기 - 3. Virtual Host 설정
authors: me
tags: [windows, php]
date: 2017-01-13 22:51:23
---

[2. PHP 설치](/2017/01/13/로컬-웹서버-돌리기-2-PHP-설치/)에서 이어집니다.

Apache와 PHP의 연동은 끝났지만 사용하고 싶은 프로젝트를 연동하는 작업을 해주어야 원하는 폴더를 웹으로 볼 수 있을 것이다.

## Virtual Host 사용

**httpd.conf**를 열어 맨 아래쪽으로 내리면 있는 **httpd-vhost.conf**의 주석을 해제한다.
![image from hexo](https://i.imgur.com/zWwtfhL.jpg)

## 디렉토리 접근 권한 변경

httpd.conf에서 모든 디렉토리 접근권한은 기본적으로 차단되어있기에 변경해야한다.

```apache
<Directory />
    Options FollowSymLinks
    AllowOverride none
    Order allow,deny
    Allow from all
</Directory>
```

![image from hexo](https://i.imgur.com/kMrNR6d.jpg)

## Virtual Host 설정

**./conf/extra/httpd-vhosts.conf** 파일을 연다.
임시로 있는 VirtualHost를 지워주고 아래처럼 내가 사용할 프로젝트를 입력한다.
![image from hexo](https://i.imgur.com/ipgklju.jpg)
**DocumentRoot**에는 프로젝트 경로, **ServerName**은 URL로 접근할 경로를 적는다.

## Host 파일 수정

C:\Windows\system32\drivers\etc\hosts 파일을 관리자 권한으로 열고 주소를 추가한다.

```http
127.0.0.1 local.test.com
```

### 저장 불가일시

잠시 [hosts 파일을 수정가능하게](/2017/01/13/Windows10에서-hosts-파일-저장이-안될-때/) 손을 보고 다시 오자.

## 연동 확인

Apache restart 후에 확인한다.
![image from hexo](https://i.imgur.com/dq3Qtpo.jpg)

👏👏👏 이로서 기본 웹서버 설치는 마무리 됬습니다.
다음 장에서는 HTTPS 환경을 위해 [OpenSSL 설정](/2017/01/14/로컬-웹서버-돌리기-4-HTTPS-OpenSSL-설정/)을 해보겠습니다.
