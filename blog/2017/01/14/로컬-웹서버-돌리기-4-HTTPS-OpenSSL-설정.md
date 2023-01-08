---
title: 로컬 웹서버 돌리기 - 4. HTTPS OpenSSL 설정
authors: me
tags: [windows, php, openssl]
date: 2017-01-14 22:58:03
---

[3. Virtual Host 설정](/2017/01/13/로컬-웹서버-돌리기-3-Virtual-Host-설정/)에서 이어집니다.
**로컬에서 HTTPS 통신으로 프로젝트에 접근하시고 싶지 않으시다면 3 장으로 웹서버 구동은 완료됩니다.**

# Apache SSL 사용 설정

## 모듈 활성화

**Apache24\conf\httpd.conf**에서 ssl_module 과 socache_shmcb_module 의 주석을 해제한다.
![image from hexo](https://i.imgur.com/EDVCnSW.jpg)

## 설정 활성화

**Include conf/extra/httpd-ssl.conf**의 주석을 해제한다.
![image from hexo](https://i.imgur.com/akbjdpP.png)

# SSL 설정 변경

## 디렉토리 생성

**Apache24\conf** 경로에서 **ssl**폴더를 만든 뒤 **conf/openssl.cnf** 파일을 ssl 폴더로 복사한다.

## 키 생성

ssl 폴더로 들어와 cmd 창을 연 뒤 키를 생성한다.

```bash
$ openssl genrsa -out domain.key 1024
$ openssl req -new -config openssl.cnf -days 365 -key domain.key -out domain.csr
```

> 위 명령어를 입력하면 입력 폼 형식이 나오는데, 주제에 맞게 입력하면 된다. (KR, Seoul 등)

생성된 **domain.key**, **domain.csr** 파일을 확인한 뒤 아래 명령어를 입력한다.

```bash
$ openssl x509 -in domain.csr -out domain.crt -req -signkey domain.key -days 365
```

**완성된 파일 구조의 형태는 다음과 같아야한다.**
![image from hexo](https://i.imgur.com/bwbQsHm.jpg)

# SSL 연동

**httpd-ssl.conf**를 열어 키 파일을 연동해준다.
![image from hexo](https://i.imgur.com/K2nMCyM.jpg)
그 밖에 다른 경로로 연결된 설정이 있다면 바로 잡아주면 된다.

# HTTPS 접속

Apache restart 후 접속해보자.
![image from hexo](https://i.imgur.com/oKKwECF.jpg)

# 여담

## 오류 발생시

오류가 발생할 경우 **Apache24\logs\error.log** 파일을 확인해가며 진행하면 된다.

## Virtual Host 설정

Virtual Host 에 직접 key 파일을 지정할 수도 있다.

```apache
<VirtualHost *:443>
    SSLEngine on
    SSLCertificateFile "d:/Apache24/conf/ssl/domain.crt"
    SSLCertificateKeyFile "d:/Apache24/conf/ssl/domain.key"

    DocumentRoot "D:/workspace/test"
    ServerName local.test.com
</VirtualHost>
```

👏👏👏 이로서 로컬 HTTPS 서버를 가지게 되었습니다.
다음 장에서는 서버 통신을 위해 [CURL 설정](/2017/01/14/로컬-웹서버-돌리기-5-CURL-설정/)을 해보겠습니다.
