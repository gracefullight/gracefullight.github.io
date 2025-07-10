---
title: mysql, maria 등의 서비스 포트 변경이 안 될때
authors: me
tags:
  - linux
  - selinux
  - mysql
  - mariadb
date: 2017-01-10 23:01:42
---

## 일반적인 포트 변경

### 포트 확인

```bash
## grep 뒤에 확인할 포트를 적으면 된다.
$ netstat -lp | grep 3307
```

### iptable 수정

```bash
$ vi /etc/sysconfig/iptables

## 해당 포트를 방화벽에서 열어준다.
-A INPUT -p tcp -m state --state NEW -m tcp --dport 3307 -j ACCEPT
```

### database 포트 변경

```bash
$ vi /etc/my.cnf

## 포트가 설정되있는 부분을 찾아 변경한다.
port = 3307
```

### 서비스 재시작

```bash
service mysql restart
```

> 잘 했는데 서비스가 올라가지 않는다!!!

## 원인

### 로그 확인

mysql 설치 경로로 이동하여 로그를 살펴보자.

```bash
$ cd /var/lib/mysql/ # basedir 설정이 되어있다면 해당경로를 덧붙힌다.

$ cat {hostname}.err

[ERROR] Cant start server: Bind on TCP/IP port. Got error: 13: Permission denied
[ERROR] Do you already have another mysqld server running on port: 3307 ?
[ERROR] Aborting
```

해당 포트에 권한이 없다. 해당 포트를 다른 mysqld 서비스가 사용하는가? 라고 로그가 남겨져있다.

### SELinux 확인

```bash
$ sestatus

SELinux status: enabled
```

혹시나 역시나 SELinux가 활성화 되어있다.
SELinux에서 포트가 서비스용으로 활성화가 되지 않았기 때문에 계속 거절당한 것이였다.

## 해결

### SELinux 설정 확인

semanage 명령어를 사용해서 확인하고 변경할 수 있다.
명령어 실행이 안될 경우 policycoreutils-python 패키지를 설치해주면 된다.

```bash
## semanage 설치
$ yum install -y policycoreutils-python

## 포트 확인
## mysql
$ semanage port -l | grep mysqld_port_t
## http
$ semanage port -l | grep http_port_t

mysqld_port_t tcp 1186, 3306, 63132-63164
```

변경하려는 3307 포트는 등록되어 있지 않다.

### SELinux에 포트 등록

```bash
semanage port -a -t mysqld_port_t -p tcp 3307
```

명령어가 iptables에 등록하는 것과 유사하다.

### 확인

```bash
$ semanage port -l | grep mysqld_port_t

mysqld_port_t tcp 3307, 1186, 3306, 63132-63164
```

이제 mysql restart를 하면 정상적으로 구동된다.

## 여담

리눅스에서 정상적으로 진행했는데 뭔가 안된다면 SELinux부터 의심해보자.
