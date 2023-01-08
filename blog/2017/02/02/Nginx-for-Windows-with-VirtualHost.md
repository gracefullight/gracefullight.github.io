---
title: Nginx for Windows - 3. Virtual Host
authors: me
tags: [windows, php, nginx]
date: 2017-02-02 18:58:59
---

[Nginx - 2. PHP 연동](/2017/02/02/Nginx-for-Windows-with-PHP/)에서 이어집니다.

# 설정

**conf\\nginx.conf** 파일에서 쉽게 추가가 가능하다.

```nginx nginx.conf
http {
    # 기존에 있던 default 설정
    server {
        ...
    }

    # 이렇게 server 구문을 하나 더 추가한다.
    server {
        listen 8000;
        # 서버 주소
        server_name  local.test.com;
        index index.php;
        # 서버 경로
        root   D:/workspace/testphp/;

        location / {
            try_files $uri /index.php$is_args$args;
        }

        # php 사용을 개별로 추가해야한다.
        location ~ \.php$ {
            try_files $uri =404;
            fastcgi_split_path_info ^(.+\.php)(/.+)$;
            fastcgi_pass   127.0.0.1:9123;
            fastcgi_index  index.php;
            fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
            include        fastcgi_params;
        }
    }
    ...
}
```

위 소스는 index.php를 라우터로 사용하기 위해 설정되었으므로,
17, 22, 23줄의 구문은 없어도 된다.

# Host 파일 수정

[Apache Virtual Host 설정](/2017/01/13/로컬-웹서버-돌리기-3-Virtual-Host-설정/) 문서의 Host 파일 수정 메뉴를 따라 진행하면 된다.

# 연동 확인

nginx 서비스를 재시작하고 확인한다.
