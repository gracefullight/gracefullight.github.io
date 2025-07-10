---
title: Vimeo Upload API - 1. Vimeo Developers
authors: me
tags:
  - php
  - vimeo
date: 2017-01-16 23:47:41
---

## 앱 등록

[비메오 개발자 커뮤니티](https://developer.vimeo.com/) 로그인 후 **MyApps > Create New App** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/hyD4cDi.jpg)
사용할 앱의 이름, 설명, URL 경로와 앱 로고 URL을 등록한다.
App Callback URL은 하나의 계정안에 멀티 유저를 두고 각자의 유저명으로 여러 동영상을 등록할시
OAuth2.0 인증을 통해 인증을 받기위한 것인데, 단순한 업로드 로직일 경우에는 필요가 없다.
앱에서 업로드가 있는 폴더안으로 경로만 대충 잡아주면 된다.

## 권한 신청

생성된 앱으로 들어가 **Request Upload Access**를 클릭한다.
![image from hexo](https://i.imgur.com/S5SgDDD.jpg)
![image from hexo](https://i.imgur.com/7Q0KsI1.jpg)
1번은 이 앱(test)에 요금을 받을 것인지를 묻는다.
Yes 클릭시 비메오측 승인이 없으면 요금청구를 할 수 없다는 경고문과 함께 어떻게 차징을 할지 이유를 쓰는 란이 생긴다.
업로드로 과금을 받진 않을 것이니 No를 선택하자.

2번은 업로더의 계정으로 업로드를 할 것인지, 내 계정으로만 업로드를 할 것인지를 선택한다.
전자를 선택시에 Callback URL을 필히 설정해주어야하고 Callback URL에 Return된 Multi-User의 Access Token을 가지고 분기 업로드를 해주는 로직을 구현해야 한다.
하지만 우리는 한가지 계정에서의 비디오 업로드를 구현하기에 후자를 선택하면 된다.

**My account** 선택시 비디오의 제작자를 묻는 선택지가 나오는데 선택해준다.

3번은 어떤 종류에 대한 비디오가 업로드가 될지 영문으로 설명을 해야한다.
간단히 "test용이다" 라고 적으니 Reject메일이 날라오는 걸로 보아 구체적으로 적어야한다.
샘플 동영상을 링크 걸어주는게 가장 간단한 인증방법이 될 것이다.

Request Upload Access를 클릭하면 5영업일 내에 처리해주겠다는 상태가 된다.
![image from hexo](https://i.imgur.com/X1iTaZC.jpg)

## 토큰 생성

생성된 앱에서 **Authentication** 메뉴로 들어가 scope를 설정하고 **Generate Token** 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/dgSUFer.jpg)
Create는 채널을 만드는거라 필요없고 **Edit, Delete, Upload** 권한정도를 설정하면 된다.

![image from hexo](https://i.imgur.com/B6EsyHP.jpg)
**Access Token, Client Identifier, Client Secret**를 모두 저장해둔다.
Access Token은 분실시 다시 확인할 수 없고, 재발급만 가능하니 잘 간직하자.

## 회신 기다리기

회원가입시 등록한 메일 주소로 Vimeo 측에서 Upload Access에 대한 회신메일이 온다.
Reject시 상세한 이유가 Approved시 환영한다라는 내용이다.
조건을 충족해 승인 완료가 되어 해당 앱에 다시 들어가보면 아래처럼 상태가 바뀐다.
![image from hexo](https://i.imgur.com/ogJd6AG.jpg)

[2. PHP API 사용](/2017/01/18/Vimeo-Upload-API-2-PHP-API/)으로 이어집니다.
