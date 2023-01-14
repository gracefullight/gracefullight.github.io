---
title: Facebook Graph API를 활용한 Page 글쓰기
authors: me
tags: [javascript, fb]
date: 2017-01-10 16:14:21
---

# 페이스북 모듈 연동

```javascript
window.fbAsyncInit = function () {
  FB.init({
    appId: "앱 키",
    xfbml: true,
    version: "v2.8",
  });
};
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
```

# Page 권한 얻기 (선택)

앱공개를 한 뒤 **페이스북 개발자 > 앱 검수** 에서 **publish_pages, manage_pages** 권한을 부여해야한다.

```javascript
FB.login(
  function (login_result) {
    if (login_result.status === "connected") {
      // 여기에 3번 로직을 넣으면 된다.
    } else if (login_result.status === "not_authorized") {
      alert("페이스북 인증에 실패했습니다");
    } else {
      alert("페이스북 API 호출에 실패했습니다");
    }
  },
  { scope: "publish_pages,manage_pages" }
);
// 이 두 권한이 꼭 필요하다
```

# 해당 Page 관리자 권한 얻기

페이지 아이디가 필요한데, 내 페이지로 이동하면 뒤에보이는 주소 번호가 있다.
또는 페이지 아이디를 [여기](http://findmyfbid.com/)서 주소로 검색해보자

```javascript
FB.api(
  "/나의 페이지 아이디/",
  "GET",
  { fields: "access_token" },
  function (token_result) {
    // token_result.access_token 이 페이지 관리자로 글을 쓰기 위해 필요하다
    // 여기에 4번 로직을 넣으면 된다.
  }
);
```

# Page Feed 작성

Graph API 를 사용해 피드를 작성한다.
자세한 옵션 설정은 [API 문서](https://developers.facebook.com/docs/graph-api/reference/v2.8/page/feed)를 참조하자.

```javascript
FB.api(
  "/my page id/feed",
  "POST",
  {
    access_token: token_result.access_token,
    message: "내용",
    link: "링크 걸 주소",
    picture: "링크 이미지",
    name: "링크 제목",
    description: "링크 설명",
    caption: "링크 하단 캡션",
  },
  function (page_result) {
    if (page_result && !page_result.error) {
      // 여기에 성공시 로직을 넣는다.
    }
  }
);
```

# 소스

```js
FB.login(
  function (login_result) {
    if (login_result.status === "connected") {
      getFbAccessToken();
    } else if (login_result.status === "not_authorized") {
      alert("페이스북 인증에 실패했습니다");
    } else {
      alert("페이스북 API 호출에 실패했습니다");
    }
  },
  { scope: "publish_pages,manage_pages" }
);

function getFbAccessToken() {
  FB.api(
    "/나의 페이지 아이디/",
    "GET",
    { fields: "access_token" },
    function (token_result) {
      postFbPage(token_result);
    }
  );
}

function postFbPage(token_result) {
  FB.api(
    "/나의 페이지 아이디/feed",
    "POST",
    {
      access_token: token_result.access_token,
      message: "내용",
      link: "링크 걸 주소",
      picture: "링크 이미지",
      name: "링크 제목",
      description: "링크 설명",
      caption: "링크 하단 캡션",
    },
    function (page_result) {
      if (page_result && !page_result.error) {
        alert("성공");
      }
    }
  );
}
```

# 여담

OAuth 및 RESTful 의 개념이 잡혔다면 쉽게 접근할 수 있을듯
Graph API 로 모든 페이스북 API 이용이 가능한 것 같다.
