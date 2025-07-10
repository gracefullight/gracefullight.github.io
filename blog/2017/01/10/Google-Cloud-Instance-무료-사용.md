---
title: Google Cloud Instance 무료 사용
authors: me
tags:
  - gcp
date: 2017-01-10 17:02:17
---

구글 클라우드 인스턴스를 생성해 **무료** 서버를 만들어보자.

## 프로젝트 생성

[구글 클라우드 플랫폼](https://console.cloud.google.com)에 로그인해 **프로젝트 만들기** 버튼을 클릭해 프로젝트를 생성한다.
![image from hexo](https://i.imgur.com/jf9F2Ak.png)

## 클라우드 서버 생성

**좌측 메뉴 > Compute Engine > VM 인스턴스** 메뉴에서 **인스턴스 만들기** 버튼을 클릭해 인스턴스를 생성한다.
![image from hexo](https://i.imgur.com/3Nd09Nj.png)

### 인스턴스 생성

이름은 하고싶은 이름으로 영역은 한국이니 **아시아 데이터센터**로 설정하고
머신 유형은 테스트용이니 **초소형 공유 CPU**를 사용하면 된다.

> **US 데이터 센터**, **공유 CPU**, **HDD 30GB↓**를 선택한다면 **평생 무료**로 바뀌었다.
> [Free Tier 페이지](https://cloud.google.com/free/)에서 정책을 확인할 수 있다.

이미지에 원하는 OS 를 선택하면 되는데, CentOS 가 막강하니 선택해주자.
액세스 범위 영역에서 **모든 Cloud API 액세스 허용**을 해줘야 구글 내부 API 를 사용할 수 있다.
![image from hexo](https://i.imgur.com/zsZ1Y7f.png)

돈이 나간다고 하는데 이미 무료 \$300 이 있고, 6 개월간은 무료다.
기본 상품을 업그레이드 하지 않으면 **과금이 발생하지 않는다**.

## SSH KEY 생성

### 직접 생성

ssh 접근을 위해 Git-bash 창을 열어 구글 계정으로 키를 생성한다.

```bash
ssh-keygen -t rsa -C "your google id@gmail.com"
```

### Putty 로 생성

[PuTTY Key Generator](https://the.earth.li/~sgtatham/putty/latest/x86/puttygen.exe)를 [여기](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)서 다운로드 받고 키를 생성한다.
![image from hexo](https://i.imgur.com/avpj2Wk.png)
**Key Comment**에 구글 계정을 넣어주고 **Generate**한 뒤 Key 를 추출하자

## SSH Public KEY 등록

### 키 복사

유저 디렉토리의 .ssh 폴더로 이동해 **공개 키 파일(.pub) 데이터**를 복사하고 등록한다.

### 등록

**메타데이터** 메뉴에서 등록할 수 있다.
![image from hexo](https://i.imgur.com/XBGZ0CO.png)

## SSH Private KEY 등록

각자 사용하는 쉘 프로그램에 Private Key 를 저장하는 기능이 있을 것이다.
![image from hexo](https://i.imgur.com/PYo2ERW.png)
Token2Shell 을 이용해 등록 후 접속한 화면

## 서버 세팅

yum 등의 root 명령어를 사용할 때는 sudo 를 붙혀주고 명령어를 입력하면 된다.
yum update 를 먼저 실행해보자

```bash
sudo yum update
```
