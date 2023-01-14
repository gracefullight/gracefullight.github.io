---
title: Laravel 5.5 - Log Permission 문제
authors: me
tags: [php, laravel]
date: 2017-08-18 22:11:35
---

웹 서버의 유저로 로그 파일이 생성되어야 하는데, 어느 순간부터 root:root 권한을 달고 daliy log 가 생성되는 경우가 있다.

여러가지 경우의 수가 있는데, 맞는 조건을 찾아서 Permission 오류가 발생하지 않게 처리해보자.

# selinux

storage 에는 쓰기권한이 있어야한다.

```bash
$ chcon -R -t httpd_sys_rw_content_t storage
```

# WebServer user

웹 서버의 유저가 다르게 설정 되어있을 때 권한이 바뀔 수 있다.
서버 설정을 열어서 유저가 제대로 설정되어 있는지 확인해보자.

```conf title="nginx.conf"
user nginx;
```

# php-fpm user

php-fpm 에서 설정하는 user 와 group 이 다르게 설정 되어 있을 때 권한이 바뀔 수 있다.
php-fpm 설정을 열어 유저가 제대로 설정되어 있는지 확인해보자.

```conf title="php-fpm.d/www.conf"
user = nginx
group = nginx

listen.owner = nginx
listen.group = nginx
```

# log rotate

로그 파일이 너무 커지는 걸 막기위해 log rotate 설정이 되어있다면 권한이 바뀔 수 있다.
logrotate 가 cron 에 물려 있는지 설정을 확인해보자.

```bash title="/etc/logroate.d/*"
$ pwd
/etc/logroate.d

$ vi nginx
$ vi php-fpm
```

# cron 사용시

crontab 의 경우 root 유저로 실행이 되면 cron 에서 Laravel 을 호출할 때 log 가 root 권한으로 생성될 수 있다.

## 로그 분기

log 파일을 생성하는 프로세스별로 분기해서 해결할 수 있다. [Stackoverflow](https://stackoverflow.com/questions/27674597/laravel-daily-log-created-with-wrong-permissions) 참조

```php title="bootstrap/app.php"
$app->configureMonologUsing(function(Monolog\Logger $monolog) {
    $filename = storage_path('logs/laravel-'.php_sapi_name().'.log');
    $handler = new Monolog\Handler\RotatingFileHandler($filename);
    $monolog->pushHandler($handler);
});
```

설정을 추가해 놓으면 logs 폴더 하위에 다음과 같이 로그가 분기되어 생성된다.

```bash title="storage/logs"
$ ls -al .
-rw-r--r-- 1 nginx nginx        718 Aug 18 10:56 laravel-fpm-fcgi-2017-08-18.log
```

cron 은 root 에서 실행되나 user shell 에서 Laravel 프로세스를 실행하는 경우 root 에 의해 log 가 생성되었다면 다음과 같이 permission 을 변경해서 생성해야한다. [Post](https://blog.asamaru.net/2017/03/08/laravel-log-files-permisson-change/) 참조

```php title="bootstrap/app.php"
$app->configureMonologUsing(function(Monolog\Logger $monolog) {
    $filename = storage_path('/logs/laravel-' . php_sapi_name() . '.log');
    // 5번째 파라미터로 666 권한을 넘긴다.
    $handler = new Monolog\Handler\RotatingFileHandler($filename, 0, \Monolog\Logger::DEBUG, true, 0666);
    $monolog->pushHandler($handler);
});
```

RotatingFileHandler 의 Parameter 는 [여기](https://github.com/Seldaek/monolog/blob/master/src/Monolog/Handler/RotatingFileHandler.php#L47)를 참조하자.
666 으로 생성 시엔 굳이 `php_sapi_name()`을 사용하지 않아도 된다. (rw 권한이 모두에게 있으니까)

## setfacl

다른 해결 방법으로는 ACL 을 수정해 logs 폴더 자체를 해당 user:group 이 편집할 수 있게 처리하면 된다.

```bash
$ pwd
/public_html/storage/logs

$ setfacl -d -m u:nginx:rwx .

$ getfacl .
default:user:nginx:rwx

# 삭제
$ setfacl -d -x u:nginx .
```

# 여담

Laravel 프로젝트 시작시 `bootstrap/app.php` 안에 로그를 분기 로직을 넣고 개발하는 게 좋아보인다.
