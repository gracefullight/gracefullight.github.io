---
title: Nginx for Windows - 1. Setup
authors: me
tags: [windows, php, nginx]
date: 2017-02-01 16:16:28
---

Windows에서 Nginx로 로컬 웹서버를 돌려보자.

# 설치

## 다운로드

[Nginx 홈페이지](https://nginx.org/en/download.html)에서 Windows 버전을 다운로드 받는다.
![image from hexo](https://i.imgur.com/jAa4K3q.png)

압축을 풀어 원하는 위치(D:\\nginx)로 옮겨주자

## 설정

apache, iis가 중복이 된다면 **conf/nginx.conf** 파일을 열어 포트 설정을 바꿔준다.

```nginx title="nginx.conf"
http {
    ...
    server {
        listen       88; # 여기를 수정해주자.
        server_name  localhost;
    ...
    }
...
}
```

## 실행

nginx.exe를 **더블 클릭**한다.

# 서비스 등록

실행은 되었지만 서비스를 등록해야 자동으로 실행되고 on/off를 관리하기가 쉽다.
다른 포스트에 있는 github의 2011년 엔진엑스 서비스 등록 소스는 찾아봐도 없길래 새로운 방법으로 등록한다.

## nssm

[nssm](https://nssm.cc/download)에서 서비스 등록 프로그램을 다운받는다.
![image from hexo](https://i.imgur.com/GZ2lJwN.png)

압축을 풀어주고(D:\\nginx\\nssm-2.24) 자신의 windows bit에 맞는 폴더에서 **nssm.exe**를 커맨드로 실행하면 된다.

```cmd
$ ./nssm.exe install nginx
```

nginx 경로를 잡아주고 **Install Service** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/l5qXzJn.png)

## 실행

**services.msc**를 실행해 서비스 창을 열어 nginx를 실행한다.
![image from hexo](https://i.imgur.com/KirkgSs.png)

# 확인

![image from hexo](https://i.imgur.com/v9k90wt.png)

[Nginx - 2. PHP 연동](/2017/02/02/Nginx-for-Windows-with-PHP/)으로 이어집니다.
