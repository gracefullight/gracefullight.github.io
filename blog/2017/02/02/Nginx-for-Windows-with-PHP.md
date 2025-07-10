---
title: Nginx for Windows - 2. PHP 연동
authors: me
tags:
  - windows
  - php
  - nginx
date: 2017-02-02 11:43:37
---

[Nginx 설치](/2017/02/01/Nginx-for-Windows/)에서 이어집니다.

Nginx를 설치했으니 PHP와 연동을 해보자.

## 설치

[이전 포스트](/2017/01/13/로컬-웹서버-돌리기-2-PHP-설치/)로 대체한다.
Apache버전은 상관이 없으니 x64 Thread Safe 버전으로 **3번**까지만 따라서 설치하면된다.

## 연동

### nginx 설정

Nginx 폴더에서 **conf/nginx.conf**를 수정한다.

```nginx
http {
    ...
    server {
        ...
        location / {
            root   html;

            # index.php를 추가
            index  index.html index.htm index.php;
        }
        ...
        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        # 이 부분 주석을 모두 제거해준다.
        location ~ \.php$ {
            root           html;

            # nginx에서 9123포트를 추천한다.
            fastcgi_pass   127.0.0.1:9123;
            fastcgi_index  index.php;

            # SCIPRT를 $document_root 로 변경
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
        ...
    }
}
```

### php-cgi 설정

nssm을 사용하는 방법과 배치 파일을 만드는 방법이 있는데 전자를 추천한다.
bat 파일은 nginx restart를 할 때마다 따로 실행해줘야한다.

> 다른 포스팅에는 php-cgi 서비를 cmd에서 sc create 명령어를 사용하여 등록하는 부분이 있는데 windows10 환경에서 서비스가 1053 오류를 뱉으며 죽는다.
> 시간 낭비하지 말자.

#### nssm

nginx에 지난 스텝에서 설치한 nssm을 사용한다.
nginx\\nssm\\win64 폴더로 이동해 php 등록 커맨드를 입력한다.

```bash
./nssm.exe install php
```

**php-cgi 경로를 선택**한 뒤 아래 **명령어를 Arguments 필드**에 넣어준다.

```bash
## 경로를 알맞게 수정해주자.
D:\php7\php-cgi.exe -b 127.0.0.1:9123 -c D:\php7\php.ini
```

![image from hexo](https://i.imgur.com/oDSsu4M.png)

서비스를 실행한다.
![image from hexo](https://i.imgur.com/tWY4j65.png)

> **실행이 안되는 경우**
> arguments에 앞의 경로를 제거하고 **-b 127.0.0.1:9123 -c D:\php7\php.ini** 만 입력해준다.

#### bat

배치 파일을 만들어 nginx가 실행 되기전만 php-cgi를 킬 수도 있다.

```bash
@ECHO OFF
ECHO Starting PHP CGI...
set PATH=D:\php7;%PATH%
D:\php7\php-cgi.exe -b 127.0.0.1:9123 -c D:\php7\php.ini
```

위 소스의 경로를 알맞게 수정한 뒤 **start-php-cgi.bat으로 저장** 후 실행한다.

## 확인

**nginx\\html\\**에 **index.php**를 만든다.

```php title="index.php"
<?php
phpinfo();
```

localhost:88/index.php로 접속한다.
![image from hexo](https://i.imgur.com/qka7WAd.png)

## 여담

[한 방에 설치](https://kevinworthington.com/nginx-for-windows/)하는 방법도 있지만 현재 버전까지는 C:\\말고 D:\\에 php를 설치한 사람에 대한 배려는 없다. (bat 파일을 건드려봐도 dll 안에 로깅하는 부분에서 오류 발생)
