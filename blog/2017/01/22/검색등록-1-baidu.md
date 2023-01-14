---
title: 바이두 검색등록 및 전화인증 없이 회원가입하기
authors: me
tags: [webmaster]
date: 2017-01-22 12:45:45
---

# Baidu 검색 등록

중국 1 위 검색사이트인 바이두에 내 사이트를 추가해보자.
바이두 사이트에서 회원가입을 하는 경우 인증번호를 입력해야하는데 국외번호 인증이 안된다.

## 회원가입

[바이두 클라우드](http://pan.baidu.com/)로 이동하여 회원가입 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/HByclGb.png)

국제번호를 변경 후 휴대번호로 인증한다.
![image from hexo](https://i.imgur.com/cGyjl7h.png)

- 전화번호
- 아이디
- 인증번호
- 비밀번호

순으로 입력하면 된다.

인증하고 아래 큰 버튼을 누르면 가입과정이 완료된다.

## 웹 마스터

### 등록

[바이두 웹마스터](http://zhanzhang.baidu.com/site/index)로 들어가 사이트 등록 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/GkbwtRs.png)

URL 을 입력하고 아래 버튼을 클릭한다.
![image from hexo](https://i.imgur.com/jhhDcWn.png)

### 인증

파일업로드 방식과 meta 태그 추가 방식 중 후자를 선택했다.
![image from hexo](https://i.imgur.com/TXAA241.png)
메타 태그를 헤더에 추가해주자.

### 단순한 링크 등록

> 블로그 등 파일을 올릴 수 없는 사이트의 링크만 등록하고 싶다면 [여기](http://zhanzhang.baidu.com/linksubmit/url)서 URL 을 입력해준다.
> (Baidu 에서는 site 인증을 통한 방법을 권장하고 있다.)

### sitemap 등록

sitemap 등록 메뉴로 이동합니다.
![image from hexo](https://i.imgur.com/LF9htPD.png)

### 경로 입력

textarea 에 사이트맵 경로를 라인마다 입력한다.

- https://gracefullight.github.io/sitemap.xml
- https://gracefullight.github.io/feed.xml

### 인증문자 입력

간체자는 한자키로 입력할 수 없는 문자가 많기에 [네이버 중국어사전](http://cndic.naver.com/)의 필기 인식기 기능을 사용한다.
![image from hexo](https://i.imgur.com/cf3aOU2.png)
한글자씩 복사해 입력해준다.

### 제출

제출하면 아래 부분에 등록된 sitemap 이 보인다.
![image from hexo](https://i.imgur.com/gxsGTEX.png)

## Automatic Push

스크립트를 추가해 자동으로 페이지를 인덱싱할 수 있다.

### 소스

```html
<script>
  (function () {
    var bp = document.createElement("script");
    var curProtocol = window.location.protocol.split(":")[0];
    if (curProtocol === "https") {
      bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
    } else {
      bp.src = "http://push.zhanzhang.baidu.com/push.js";
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
  })();
</script>
```

sitemap 이 읽혀지지 않는다면 head 에 위 스크립트를 추가해주자.

## 여담

사이트 등록 중 추가 정보를 입력이 필요하면 [여기](https://zhanzhang.baidu.com/usercfg/editaccount)서 webmaster 관리자정보를 수정하면 된다.
![image from hexo](https://i.imgur.com/UB2UyEy.png)

이메일의 경우만 인증이 들어감으로 QQ 와 Wechat 의 경우는 대충 써주면 된다.
