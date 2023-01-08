---
title: CentOS Tomcat 및 Java(JDK) 설치
authors: me
tags: [linux, java]
date: 2017-01-10 22:32:28
---

rpm이 설치되어있지 않은 환경에서의 compile 설치 방법을 다룬다.

# 운영체제 확인

```bash
$ cat /etc/issue
# bit 확인
$ getconf LONG_BIT
```

# JDK 설치

## 다운로드

[여기](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)에서 다운로드하면 된다.
![image from hexo](https://i.imgur.com/61lE7iN.jpg)

## 업로드 및 압축 해제

```bash
$ tar -zxvf jdk.tar.gz
```

## 경로 설정

```bash
$ vi .profile

# 추가 내용
export JAVA_HOME=/유저경로/java
export CLASSPATH=$JAVA_HOME/lib:$JAVA_HOME/jre/lib/ext:$JAVA_HOME/lib/tools.jar
export PATH=/bin:/usr/bin:/usr/local/bin:$JAVA_HOME/bin

# 저장
$ :wq!
```

bin 폴더 PATH들은 명령어를 위해 필요하고 \$PATH < 기존 PATH를 추가하지 않는 이유는 TOMCAT 실행시 기본 설치 PATH를 먼저 읽어오기 때문이다.

## 경로 갱신

```bash
$ source .profile
```

## 설치 확인

```bash
$ javac -version
```

# Tomcat 설치

## 다운로드

[여기](https://tomcat.apache.org/download-80.cgi)에서 다운로드하면 된다.

## 업로드 및 압축 해제

apache-tomcat-...의 이름이 길어 tomcat으로 변경 후 업로드하시면 편합니다.

```bash
$ tar -zxvf tomcat.tar.gz
```

## 경로 설정

```bash
$ vi .profile

# PATH 뒤에 tomcat/bin 경로를 추가
export PATH=/bin:/usr/bin:/usr/local/bin:$JAVA_HOME/bin:/home/myuser/tomcat/bin
```

## 경로 확인

```bash
$ $PATH

/bin:/usr/bin:/usr/local/bin:$JAVA_HOME/bin:/home/myuser/tomcat/bin
# 위에 설정한 PATH의 값이 보이면 정상
```

# Tomcat 설정 추가

**tomcat\bin\catalina.sh**를 열고 Tomcat과 Java의 경로를 추가해준다.

```bash
CATALINA_HOME="/where/to/tomcat"
CATALINA_BASE="/where/to/tomcat"

JAVA_HOME="/where/to/java"
```

## 주의

catalina.sh의 주석 표시된 내용을 읽으면 변수를 추가하지 말고 setenv.sh를 만들어서 커스터마이징 옵션을 분리하라고 나온다.

setenv.sh를 수정하고 싶으면 파일을 열고 아래와 같이 추가해준다.

```bash
export CATALINA_HOME="/where/to/tomcat"
export CATALINA_BASE="/where/to/tomcat"

export JAVA_HOME="/where/to/java"
```

# 서버 실행

**tomcat\webapps**에 war파일을 옮긴 후 서버를 실행한다.

```bash
$ startup.sh

Tomcat started.
```
