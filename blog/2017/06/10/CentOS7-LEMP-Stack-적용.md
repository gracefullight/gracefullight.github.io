---
title: CentOS7 LEMP Stack 설치하기 (HTTP2, PHP7.1, Maria, Letsencrypt)
authors: me
tags:
  - linux
  - php
  - nginx
  - mariadb
  - letsencrypt
date: 2017-06-10 10:05:06
---

## LEMP

Linux, Nginx, MariaDB, PHP

> **Why LEMP instead of LNMP?**
> We go with LEMP due to the pronunciation for Nginx: Engine-X (en-juhn-ecks).
> Think of how in English, the article an is used instead of a for hour even though it begins with a consonant.
> The importance is the sound of the first letter rather than its written representation.
> Besides, LEMP is actually pronounceable and doesn’t sound like reciting the alphabet.

## PHP

repo 를 등록하고 설치하는 방법이 있지만 php71 등의 이름으로 설정해야되서 번거롭다.
yum 명령어의 --enablerepo 옵션을 사용해 php71 repository 를 가져오자.

```bash
## php repo를 가져오기
$ yum -y install http://rpms.famillecollet.com/enterprise/remi-release-7.rpm

$ vi /etc/yum.repos.d/remi-php71.repo

[remi-php71]
name=Remi\'s PHP 7.1 RPM repository for Enterprise Linux 7 - $basearch
#baseurl=http://rpms.remirepo.net/enterprise/7/php71/$basearch/
mirrorlist=http://rpms.remirepo.net/enterprise/7/php71/mirror
## 이 값을 1로 바꿔준다.
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-remi

$ yum -y install php php-fpm php-devel php-curl php-mcrypt php-mysql php-xmlrpc php-mbstring php-zip 등등

$ systemctl start php-fpm
$ systemctl enable php-fpm
```

## Maria

[예전 포스팅](/2016/12/23/CentOS-Maria-DB-설치/)으로 대체한다. 설치방법은 똑같고 버전만 다르게 해주면 된다.
설치 후 서비스 실행만 `systemctl` 명령어로 해주자.

### Xtrabackup

이제 mysqldump 를 좀 놓아주고 Incremental Backup 을 해주자.
이게 왜 좋은지는 [공홈](https://www.percona.com/software/mysql-database/percona-xtrabackup/feature-comparison)이나 [책](http://www.yes24.com/24/goods/12982561?scode=032&OzSrank=1)이나 다른 블로그에 자세히 설명되어있다.

```bash
## xtrabackup 설치
$ yum -y install xtrabackup

## 증분백업을 위해 전체 백업이 한 번 필요하다.
## root가 아닌 유저일 경우 해당 DB를 백업하기 위해 PROCESS 등 여러 권한을 추가해야한다.
## (로그 메세지로 추가하라고 나온다.)
$ innobackupex --user='root' --password='암호' --databases='DB' --no-timestamp /백업위치

## 증분백업
$ innobackupex --user='root' --password='암호' --incremental --incremental-basedir='/백업위치/xtrabackup_checkpoints' --no-timestamp /증분백업위치

## 증분백업을 전체백업 위에 얹기
$ innobackupex --apply-log --redo-only --incremental-dir='/증분백업위치' /백업위치

## 증분백업 삭제
$ rm -rf /증분백업위치


## 복원
$ systemctl stop mariadb

## 데이터 폴더를 날려야한다. (만약을 대비해 백업)
$ rm -rf /var/lib/mysql/*
$ innobackupex --copy-back /백업위치

## 권한부여
$ chown -R mysql:mysql /var/lib/mysql
$ systemctl start mariadb
```

## Nginx

**HTTP2 를 적용하기 위해서는 Nginx 1.9 버전과 Openssl 1.0.2 버전 이상이 필요**한데, 기본 repository 에는 이 버전이 적용되어있지 않다.
따라서 검색해보면 컴파일 설치를 해야 된다는 글이 다수다. 모든 패키지는 패키지 매니져로 관리하는게 좋다고 생각하는 나로썬 그냥 넘어갈 수 없다.
Nginx 최신 repository 를 관리해주는 [나이스한 곳](https://brouken.com/brouken-centos-7-repo/)을 찾았다.

```bash
$ yum -y install yum-utils
$ yum-config-manager --add-repo https://brouken.com/brouken.repo

## 기존 nginx repo를 사용하지 않는다는 옵션
$ yum-config-manager --save --setopt=epel.exclude=nginx*;
$ yum -y install nginx

$ systemctl start nginx
$ systemctl enable nginx

## nginx 버전 확인
$ Nginx -V
nginx version: nginx/1.13.1
built with OpenSSL 1.0.2k 26 Jan 2017
```

### setopt 가 오류가 날 경우

ngixn.repo 를 만들어주고 연결하자.

```bash
$ vi /etc/yum.repos.d/nginx.repo

## vim /etc/yum.repos.d/nginx.repo

[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=0
enabled=1

## 저장하고 설치 시작

$ yum update
$ yum -y install nginx
$ systemctl start nginx
$ systemctl enable nginx
```

## LetsEncrypt

공짜 SSL 인 LetsEncrypt 의 이름이 certbot 으로 바뀌었다. [공홈](https://certbot.eff.org/#centosrhel7-nginx)을 참조해도 좋다.
인증을 받기위해 먼저 도메인을 따야한다.

```bash
$ yum -y install certbot

## 인증
$ certbot certonly --standalone -d example.com -d www.example.com

## 갱신 확인
$ certbot renew --dry-run

## 갱신하면서 nginx 재부팅
## 이 명령어를 적절히 cron에 넣어주자.
$ certbot renew --pre-hook="systemctl stop nginx" --post-hook="systemctl start nginx"
```

인증이 성공하면 **/etc/letsencrypt/live/example.com/** 경로 아래에 키가 떨어질 것이다.
자세한 명령어 옵션은 [Docs](https://certbot.eff.org/docs/using.html) 참조.

### nginx 연동

ssl 을 적용하면서 HTTP2 도 붙혀보자.
HTTP2 에서는 bundling 보다 파일을 쪼개서 보내는게 더 효율적이라고 한다. (non-blocking 이니까)

```conf
## HTTP
server {
    listen 80;
    server_name example.com www.example.com;

    # certbot --webroot 인증을 받기위한 설정
    #location ^~ /.well-known/acme-challenge/ {
    # default_type "text/plain";
    # root /var/www/letsencrypt;
    #}

    # 80 접속시 443으로 redirect
    location / {
       return 301 https://$server_name$request_uri;
    }
}

## HTTPS
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name example.com www.example.com;
  root /var/nginx/www/public;
  index index.php index.html;

  # 지저분한 보안 옵션은 추천옵션이니 넣어주자.
  ssl on;
  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
  ssl_trusted_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_session_tickets off;

  #ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_protocols TLSv1.2;
  ssl_ciphers EECDH+AESGCM:EECDH+AES;
  ssl_ecdh_curve secp384r1;
  ssl_prefer_server_ciphers on;

  ssl_stapling on;
  ssl_stapling_verify on;

  location / {
    try_files $uri $uri/ /index.php?$query_string;
  }

  location ~ \.php {
    fastcgi_split_path_info ^(.+\.php)(/.+)$;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_param SCRIPT_NAME $fastcgi_script_name;
    fastcgi_index index.php;
    fastcgi_pass 127.0.0.1:9000;
  }

  location ~ /\.ht {
    deny all;
  }

  # 캐싱할 데이터가 있다면 추가
  location ~* \.(?:jpg|jpeg|gif|png|ico|cur|gz|svg|svgz|mp4|ogg|ogv|webm|htc|woff)$ {
    expires 1M;
    add_header Cache-Control "public";
  }

  location ~* \.(?:css|js)$ {
    expires 7d;
    add_header Cache-Control "public";
  }
}
```

해당 세팅은 Laravel5.4 용이다.

nginx.conf 에는 해당 옵션들도 추가해주자.

```bash title="nginx.conf"
  # CPU 물리 코어에 따라 설정한다.
  # 1코어에선 1로 나머지는 auto로 설정하면 된다.
  # grep ^processor /proc/cpuinfo | wc -l 로 확인 가능
  worker_processes 1;

  events {
    # 각 worker process에서 한 번에 처리할 수 있는 최대 연결 수
    # ulimit -n의 값과 같게 설정하자.
    worker_connections 1024;
    # I/O event 노티 방식을 epoll로 사용. (poll보다 발전한 방식)
    use epoll;
    # worker가 한 번에 모든 연결을 수용할 수 있도록 설정
    multi_accept on;
  }

  http {
    # access_log 제거
    access_log off;
    server_tokens off;

    # iframe 보안 이슈 DENY
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # PHP 서버라는 header 제거
    fastcgi_hide_header X-Powered-By;
    # static file 제공 최적화
    sendfile       on;
    # TCP multiple buffer를 individual packet으로 전송하게 변경
    tcp_nopush     on;
    # TCP에서 TCP_CORK 옵션을 활성화
    # MTU에서 IP 헤더의 40-60 Byte를 뺀값과 같다는데 뭐라는건지 모르겠다.
    tcp_nodelay    on;
    # keep alive 설정
    keepalive_timeout  65;
    # keepalive_requests 100000;

    # gzip 압축설정
    gzip on;
    gzip_min_length 1000;
    gzip_types application/x-javascript text/css application/javascript text/javascript text/plain text/xml application/json application/vnd.ms-fontobject application/x-font-opentype application/x-font-truetype application/x-font-ttf application/xml font/eot font/opentype font/otf image/svg+xml image/vnd.microsoft.icon;
    gzip_disable "MSIE [1-6]\.";
  }
```

적용 후에 [HTTP2 확인 확장프로그램](https://chrome.google.com/webstore/detail/http2-and-spdy-indicator/mpbpobfflnpcgagjijhmgnchggcjblin?utm_source=chrome-ntp-icon) 설치 후 이 프로그램에 파란불이 들어오면 성공이다.

## 파일 백업

소스는 git 으로 관리가 되는데 static 파일은 주기적으로 백업이 필요하다.

```bash title="file_backup.sh"
NOW_DATE=`date`
BACKUP_DATE=`date +"%Y%m%d"`
FILE_DIR=백업할 폴더 경로
BACKUP_DIR=백업된 파일 경로

## gz 압축
tar zcvf ${BACKUP_DIR}/${BACKUP_DATE}.tar.gz ${FILE_DIR}

## 3일 이상된 백업파일은 제거
find ${BACKUP_DIR}/ -mtime +3 -exec rm -f {} \;
## find ${BACKUP_DIR}/ -mtime 3 -delete
```

## 여담

다음부터 Ubuntu 쓸까 생각했는데, Nginx 최신 Repo 를 찾은게 컸다. 하지만 빨리 Docker 책 읽자.
Nginx, Reverse Proxy, Redis, PHP, Jenkins 를 한 번에 해결해주겠지.
이제 DockerFile 이 잘 읽히긴 하는데, 언제쯤 갈아탈 수 있으려나
