---
title: 로컬 웹서버 돌리기 - 1. Apache 설치
authors: me
tags: [windows, php]
date: 2017-01-13 20:49:41
---

APM_setup 은 좋은 선택이지만, PHP 버전업에 있어서 충돌이 너무 심하고
Nginx 도 좋은 선택이지만 나중에 정리하기로 하자.

## 아파치 다운로드

[여기](https://www.apachelounge.com/download/)에서 운영체제에 맞는 버전을 다운로드 한다.
![image from hexo](https://i.imgur.com/4S3iGn0.jpg)
VC14, VC11 은 PHP 버전과도 관련있으니 다운받으면서 확인해 놓는다.
압축을 풀면 Apache24 폴더가 생기는데 이 폴더를 원하는 경로로 옮겨준다. (D:\Apache24)

## 경로 변경

C:\Apache24 에 압축을 풀었다면 #httpd-서비스-등록으로 넘어가자

**Apache24/conf/httpd.conf**를 열어 경로를 변경한다.
![image from hexo](https://i.imgur.com/XCfgmlg.jpg)
초기 설치 상태에서 C:\로 검색시 4 개정도 찾아지는데 모두 변경해주면 된다.

## httpd 서비스 등록

cmd 를 관리자 권한으로 실행 후 아래 명령어를 입력해준다.

- Windows10 : 시작메뉴 우클릭 > 명령 프롬프트(관리자) 메뉴
- Windows7 : 시작메뉴 > 모든 프로그램 > 보조 프로그램 > 명령 프롬프트 우클릭 > 관리자 권한으로 실행

```bash
httpd.exe -k install
```

![image from hexo](https://i.imgur.com/XLLvKNp.jpg)

## httpd 구동

**Apache24\bin\ApacheMonitor.exe** 실행한 뒤 **작업표시줄**에서 **Apache** 아이콘 클릭 후 서비스를 시작한다.
![image from hexo](https://i.imgur.com/MqSFUaW.png)

## localhost 접근

![image from hexo](https://i.imgur.com/BkBSLeL.jpg)
👏👏👏 다음 장에서는 [PHP 를 설치해 Apache 와 연동](/2017/01/13/로컬-웹서버-돌리기-2-PHP-설치/)을 해보겠습니다.
