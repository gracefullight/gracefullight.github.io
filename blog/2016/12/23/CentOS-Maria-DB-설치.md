---
title: CentOS Maria DB 설치
authors: me
tags: [database, linux, mariadb]
date: 2016-12-23 08:08:50
---

Maria DB 를 써야하는 이유는
MySQL 이 지원이 끝났기 때문이고, 오라클이 소유하고 있어 언제 유료화가 될지 모르고,
Thread Pool, 강화된 스토리지 엔진 (InnoDB -> XtraDB), 새로운 스토리지 엔진 (Aria, Cassandra)과 HandlerSocket, Virtual Column 등의 새로운 기능이 있기 때문이다.

설치를 시작해보자!

## 버전 확인 후 yum repo 추가

### 버전 및 bit 확인

```bash
## get version
$ cat /etc/*release*
## get bit
$ getconf LONG_BIT
```

### yum repo 복사

[maria](https://downloads.mariadb.org/mariadb/repositories/#mirror=kaist&distro=CentOS&distro_release=centos6-amd64--centos6&version=10.1)로 이동해 맞는 버전을 추가한다.

![image from hexo](https://i.imgur.com/X3A73UI.png)

### yum repo 추가

```bash
vi /etc/yum.repos.d/MariaDB.repo
```

명령어로 MariaDB repository 를 생성한 뒤 복사한 내용을 붙히고 저장한다.

## 설치

```bash
yum install -y MariaDB-server MariaDB-client
```

혹여 설치가 안되면 [maria](https://mariadb.com/kb/en/mariadb/yum/) 문서를 참고해서 따라해보자 (영어)

## 부팅 서비스 등록

```bash
$ chkconfig mysql on
## 또는
$ chkconfig --add mysql
$ chkconfig --level 345 mysql on

## 등록 확인
$ chkconfig --list mysql
```

※ [maria](https://mariadb.com/kb/en/mariadb/starting-and-stopping-mariadb-automatically/)에서는 345 레벨을 on 하라고 했는데, chkconfig mysql on 으로 실행시켜 2345 레벨을 모두 on 시켰다.
2 레벨은 not networking 이라 DB 의 원격지 접속이 안될테니 off 시켜도 무관하다.

## 서비스 실행

```bash
service mysql start
```

Starting MySQL.... [ **OK** ]

Maria 의 서비스명은 MySQL 로 뜬다.

## Config 파일 수정 및 통합

처음 설치시 my.cnf 에서 my-server, my-client 등의 파일을 임포트해 분할 관리하게 되어있는데,
하나로 합쳐보자.

MariaDB 설치 폴더를 들어가면 My innoDB Huge 라는 config 파일이 존재한다.
이걸 그대로 사용해도 되고, 사용자 환경에 맞게 커스터마이징해서 사용해도 된다.

서버의 메모리가 8 GB 이상, innoDB 환경에서 사용가능한 config 파일을 첨부하니 이걸 써도 된다.

Thread Pool 기능을 사용하기 위해 extra_port 를 3307 로 줬다.

### 소스

```ini title="my.cnf"
[client]
port = 3306
socket = /var/lib/mysql/mysql.sock

[mysqld]
port = 3306
socket = /var/lib/mysql/mysql.sock

character-set-server = utf8mb4
collation_server = utf8mb4_general_ci

back_log = 100
max_connections = 100
max_connect_errors = 10
table_open_cache = 2048
max_allowed_packet = 16M

binlog_cache_size = 4M
binlog_format = row

max_heap_table_size = 16M

read_buffer_size = 2M
read_rnd_buffer_size = 16M
sort_buffer_size = 8M
join_buffer_size = 8M

query_cache_type = 0
default-storage-engine = InnoDB
thread_stack = 256K
tmp_table_size = 16M

secure_auth =1

skip_external_locking
skip_symbolic_links

## Replication related settings
server-id = 1
expire_logs_days = 3
log_slave_updates

## MyISAM Specific options
key_buffer_size = 32M
bulk_insert_buffer_size = 64M
myisam_sort_buffer_size = 8M
myisam_max_sort_file_size = 16M
myisam_repair_threads = 1
myisam_recover = FORCE,BACKUP

## INNODB Specific options
innodb_additional_mem_pool_size = 16M
innodb_buffer_pool_size = 2G
innodb_data_file_path = ibdata1:10M:autoextend
#innodb_data_home_dir = <directory>
innodb_thread_concurrency = 16
innodb_flush_log_at_trx_commit = 0

innodb_log_buffer_size = 32M
innodb_log_file_size = 1024M
innodb_log_files_in_group = 2
#innodb_log_group_home_dir

innodb_max_dirty_pages_pct = 75

[mysqldump]
quick
max_allowed_packet = 16M
default-character-set = utf8

[mysql]
no-auto-rehash

[myisamchk]
key_buffer_size = 512M
sort_buffer_size = 512M
read_buffer = 8M
write_buffer = 8M

[mysqlhotcopy]
interactive-timeout

[mysqld_safe]
open-files-limit = 8192

[mariadb]
## thread pool
thread_handling=pool-of-threads
thread_pool_idle_timeout = 3600
thread_pool_stall_limit = 100
extra_port = 3307
extra_max_connections=10
```
