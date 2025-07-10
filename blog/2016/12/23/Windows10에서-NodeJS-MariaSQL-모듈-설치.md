---
title: Windows10에서 NodeJS MariaSQL 모듈 설치
authors: me
tags:
  - javascript
  - nodejs
  - windows
  - mariadb
date: 2016-12-23 15:34:12
---

## 오류

mariasql package 설치 명령어 실행시
오류를 내뿜으며 node-debug.log 를 확인하라고 명령어가 나올 경우 아래와 같이 하면 된다.

debug log 에는 node-gyp rebuild 를 하라고 나오는데, 이 오류메세지와는 아무 관련이 없다.

## 해결

### Python 2.7 설치

윈도우에 Python 2.7 버전이 설치되어있지 않으면 설치해야한다.
파이썬 2 이상 3 미만 버전을 쓰면 되는데, 2.7 을 강조하니 쓰자.

[여기](https://www.python.org/ftp/python/2.7.12/python-2.7.12.msi)서 다운로드 한다.
**설치시 Window PATH 등록 옵션을 꼭 선택해야한다.**

### Python 경로를 npm 에 등록

```bash
npm config set python "/the/python/path" --global
```

the/python/path 에 자신의 python 설치 경로를 넣어주자.

### Microsoft Visual Studio Community 2015 설치

왜 VS 2015 를 설치해야하지? 라고 생각이 들텐데, **Visual C++**을 사용하기 때문이다.

[여기](https://www.microsoft.com/ko-kr/download/details.aspx?id=48146)서 다운로드한다.
**설치시 프로그래밍언어 탭에서 Visual C++을 꼭 선택해서 설치해야한다.**

기존에 VS2015 가 설치되어있는 경우, 프로그램 추가/삭제에서 선택 후 수정 메뉴를 눌러
Visual C++ 옵션을 추가한 뒤 업데이트해준다.

> **2017 년 기준 위 링크가 만료되어 [cpp-build-tools](http://landinghub.visualstudio.com/visual-cpp-build-tools)를 설치해야한다**

### Visual Studio 버전을 npm 에 등록

```bash
npm config set msvs_version "2015" --global
```

### MariaSQL Package 설치

```bash
npm install mariasql --save
```

## 여담

Windows10 에서 mariasql package 설치시 C++ 컴파일이 필요하니,
VS2015 로 C++ 컴파일러를 설치해야된다라는 걸 msdn 이나 npm 에 친절히 남겨줬으면 이렇게까지 시간을 날리지 않았을텐데...

### 최근 해결방법

빠르고 위의 오류가 절대 발생하지 않는 [mysql2](https://github.com/sidorares/node-mysql2) 패키지를 사용하면 된다.

![image from hexo](https://78.media.tumblr.com/tumblr_lyod8mfp621qm9ue5o2_r2_500.png)
