---
title: Openshift를 이용한 무료 서버 구축
authors: me
tags: [openshift, linux]
date: 2017-01-04 13:26:48
---

## 개요

구글링을 통해 얻은 Openshift 자료들은 최신 버전이 아니라 사용할 수 없다.

Google Cloud나 Heroku, AWS를 사용하여 테스트용 서버를 만들 수 있지만
무료 기간이 모두 정해져 있다. RedHat에서 운영하는 100% 무료 클라우드인 오픈시프트의 최신 버전을 사용해보자.

## 가입

### Github로 로그인

[openshift](https://www.openshift.com/devpreview/register.html)의 새로운 버전은 [Github](https://github.com/join?source=header-home) 아이디로만 가입이 가능하다.
Github 아이디를 먼저 생성한 후 **Login With GitHub** 버튼을 클릭한다.

### 신청서 작성

![image from hexo](https://i.imgur.com/VXmkRtI.png)

신청서 작성 후 입력한 Email 주소로 오는 승인 메일을 기다려야한다.

### 승인 및 로그인

The OpenShift Team에게 **Welcome to the OpenShift Online (Next Gen) Developer Preview** 란 제목으로 메일을 받으면 openshift를 이용할 수 있다.

상단 메뉴의 My Account를 클릭 후 **(NEXT GEN) WEB CONSOLE** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/KC75ZDi.png)

> 다음 단계부터는 OpenShift의 승인이 나야지만 진행할 수 있다.
> 하루정도 안에 승인 메일이 오니 기다려보자.

## 프로젝트 생성

프로젝트는 하나의 클라우드를 신청한다고 보면 된다.

로그인 후 **New Project** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/rP3yAxj.png)
고민하지 말고 적어도 된다.

## 웹서버 생성

프로젝트 생성이 끝나면 이미지를 선택하는 창이 나온다.
검색창에 원하는 이미지를 검색 후 선택한다.
![image from hexo](https://i.imgur.com/A9PhDWz.png)

### 서버 이미지 추가

mongodb를 사용시 **nodejs-mongo-persistent** 이미지를 사용하고, nodejs만 필요할 경우 **nodejs:4** 이미지를 사용하면 된다.
일단 nodejs 웹서버만 필요하기에 해당 이미지를 선택했다.

![image from hexo](https://i.imgur.com/RllhNcT.png)
Git Repository를 입력해야하는데, Github에 가지고 있는 자신의 nodejs application이 있다면 그 주소를 등록하면되고 그렇지 않은 경우 **Try It**버튼을 클릭해 [Sample Repo](https://github.com/openshift/nodejs-ex.git)를 추가하자.

샘플 소스는 express와 ejs를 사용하고 있다.

**Show advenced routing...** 버튼을 클릭하면 도메인 세팅, Webhook 등 고급 설정을 할 수 있는데 **Resource Limit**에서 메모리를 늘릴 수 있다. (기본 512MB)

> 추후 메모리 용량 확인은 가능하나, 확장하는 부분은 아직 못 찾았다. (없을지도)
> 미리 메모리를 1GB로 늘려주고 시작하자

### Fork Sample Repository

이제 node 서버를 수정할 수 있게 나의 Github로 옮기는 작업이 필요하다.
[Sample Repo](https://github.com/openshift/nodejs-ex.git)에 접속해 프로젝트를 Fork한다.
![image from hexo](https://i.imgur.com/xuOtprG.png)

### Change Source Repository

Builds > Builds 메뉴로 들어가 내 application을 선택한 뒤 우측 Actions에서 **Edit** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/uO5GtKC.png)

Source Repository URL에 위에서 Fork한 Git Repository를 등록한다.
![image from hexo](https://i.imgur.com/CMz9N1X.png)
그리고 우측 GitHub Webhooks URL을 복사한 뒤 저장한다.

### Webhooks URL 등록

fork된 내 Repository로 와서 Settings > Webhooks 메뉴로 들어가 **Add webhook** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/rcgSVCg.png)

### Rebuild

Builds > Builds 메뉴로 돌아가 **Start Build** 버튼을 클릭한다.

빌드가 완료되면 버전이 #2로 보이고, 내 Git Repo와 연결된 버전이 생성된다.

### 확인

Overview 메뉴에서 내 링크를 클릭해보자
![image from hexo](https://i.imgur.com/X8qZv0v.png)

이 화면이 보인다면 성공이다.
![image from hexo](https://i.imgur.com/XiFBTd4.png)

## 소스 수정

Git Repository를 Clone한 뒤 기존 Github 이용하듯 수정하면 된다.

```bash
$ git clone <git_url> <directory_to_create>

## Within your project directory
## Commit your changes and push to OpenShift
$ git commit -a -m 'Some commit message'
$ git push
```

## 여담

잘가 Google Cloud Platform!
