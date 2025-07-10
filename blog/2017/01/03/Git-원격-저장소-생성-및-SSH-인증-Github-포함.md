---
title: Git 원격 저장소 생성 및 SSH 인증 - Github 포함
authors: me
tags:
  - git
  - ssh
  - bash
date: 2017-01-03 13:46:23
---

## Git 원격 저장소 생성

> **서버**에서 실행

```bash
## 서버에 로그인 후 원하는 위치에서 폴더를 만든다.
$ mkdir [이름].git

## 해당 폴더로 이동한다.
$ cd [이름].git

## Git 원격 저장소를 초기화한다.
$ git init --bare
```

## SSH 생성

> **클라이언트**에서 실행

### Email 인증 방식

Github 인증을 하려면 이 방식을 이용해야한다.

```bash
## 키 발급
$ ssh-keygen -t rsa -C "your@email.com"

## 클라이언트에 이메일 키 추가
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_rsa
```

### 사용자 인증 방식

```bash
## 키 발급
$ ssh-keygen -t rsa
```

## SSH 폴더로 이동해 인증키 복사

> **클라이언트**에서 실행

```bash
$ cd ~/.ssh
$ vi id_rsa.pub

## id_rsa.pub의 내용을 복사한다.
```

## 인증키 등록

### 일반 서버

> **서버**에서 실행

```bash
## ssh 폴더로 이동
$ cd ~/.ssh

## 인증키 파일을 연다.
$ vi authorized_keys

## id_rsa.pub에서 복사된 인증키를 하단에 추가한다.
```

### Github

> **Github**에서 실행

Email-인증-방식 으로 인증키를 생성해야하고 이메일은 github 에 로그인하는 이메일과 같아야한다

#### 키 등록

github 에 로그인 후 설정에 가서 복사한 키를 등록한다.
![image from hexo](https://i.imgur.com/dHzioqG.png)

#### 인증여부 확인

> **클라이언트**에서 실행

```bash
## 등록 후 에 클라이언트에서 인증여부를 확인한다.
$ ssh -T git@github.com

## You've successfully authenticated 가 보이면 인증완료
```

## Git Repositiory 초기화

> **클라이언트**에서 실행

```bash
$ git clone 서버유저명@서버아이피:[이름].git
## ex ) git clone git@1.22.333.444:test.git
```
