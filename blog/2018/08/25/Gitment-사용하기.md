---
title: Gitment 사용하기
authors: me
tags:
  - gitment
  - git
  - javascript
date: 2018-08-25 12:35:05
---

## Gitment 사용하기

블로그에 붙힐만한 댓글 라이브러리로는 Disqus, Commento, livere 등이 있지만
깃헙 페이지라 [Gitment](https://github.com/imsun/gitment)를 사용하고 싶었다.

### 사전 준비

**Github > Settings > Developer settings > OAuth Apps** 메뉴로 들어가 새로운 OAuth App 을 만들어준다.

![준비](https://i.imgur.com/76Q1E1K.png)

Client ID 와 Client Secret 을 저장해 놓고
Authorization callback URL 은 Homepage URL 과 같은 주소를 입력한다.

```bash
## Application name
GracefulLight

## Homepage URL
https://gracefullight.github.io

## Application description
GracefulLights Blog

## Authorization callback URL
https://gracefullight.github.io
```

### 소스 추가

원하는 페이지에 소스를 추가한다.

```html
<script src="https://cdn.jsdelivr.net/npm/bluebird@3.5.1/js/browser/bluebird.core.min.js"></script>
<section class="comments" id="comments">
  <div id="gitment_thread"></div>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/gitment@0.0.3/style/default.css"
  />
  <script src="https://cdn.jsdelivr.net/npm/gitment@0.0.3/dist/gitment.browser.js"></script>
  <script>
    var gitment = new Gitment({
      id: "Gitment 를 구분할 아이디 (ex: 페이지 제목 또는 포스팅 일시)",
      owner: "github 아이디 (ex: gracefullight)",
      repo: "repository 명 (ex: gracefullight.github.io)",
      oauth: {
        client_id: "위에서 발급 받은 client_id",
        client_secret: "위에서 발급 받은 client_secret",
      },
    });
    gitment.render("gitment_thread");
  </script>
</section>
```

gitment.min.js 파일은 없으므로, 직접 minify 해서 사용하면 된다.
bluebird (promise) core 를 추가한 이유는, IE 에서 gitment 를 지원해야하기 때문이다.

### 옵션 관리

위 4개 옵션 외에 추가로 [옵션](https://github.com/imsun/gitment#options)을 더 줄 수 있다.
desc 와 labels 정도가 추가되면 좋을 것 같다.

### 댓글 쓰기

깃허브 아이디로 로그인한 뒤 **Initialize Comments** 를 누르고 댓글을 작성하면 된다.
