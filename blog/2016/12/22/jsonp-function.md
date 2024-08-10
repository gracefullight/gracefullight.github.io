---
title: jsonp function
authors: me
tags: [javascript]
date: 2016-12-22 18:04:28
---

jsonp (json with padding)은 다른 서버의 데이터를 내 브라우저에서 호출하기 위해 사용한다.
client 에서 callback 함수명과 전송할 값을 같이 보내어 server 에서 callback 함수 안에 data 를 담아 반환하는 방식이다.

전송할 값을 보낼 때, script 태그를 사용한다.

## 소스

```js
function jsonp(url, callback) {
  const callbackName = "jsonp_" + Math.round(100000 * Math.random());
  window[callbackName] = function (data) {
    delete window[callbackName];
    document.body.removeChild(script);
    callback(data);
  };

  const script = document.createElement("script");
  script.src =
    url + (url.indexOf("?") >= 0 ? "&" : "?") + "callback=" + callbackName;
  document.body.appendChild(script);
}
```

stackoverflow 에서 가져온 소스인데 현재 출처를 찾을 수 없다.

## 설명

임의의 함수명으로 callback 함수를 생성한 뒤 script 태그를 생성해 server 와 통신한다.

## 예제

```javascript
jsonp("http://aaa.com?data=" + data, function (result) {
  console.log(result);
});
```

## 여담

jQuery 가 있다면 [jQuery ajax](https://api.jquery.com/jquery.ajax/#jQuery-ajax-settings)의 dataType 을 jsonp 로 설정해주면 되고,
요새는 CORS 를 적용해 그냥 호출하는 방식으로 가는 추세다.
