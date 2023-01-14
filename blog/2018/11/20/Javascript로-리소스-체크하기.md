---
title: Javascript로 리소스 체크
authors: me
tags: [javascript]
date: 2018-11-20 20:42:17
---

페이지나 리소스가 있는지 체크하는 방법은 서버사이드에선 엄청 간단하다.
단 두 가지 기능만 있으면 해결된다. 심지어 certinfo 값 안에선 인증서 만료일까지 확인할 수 있다.

- HEAD 메소드
- CURL

하지만 수 백개의 리소스를 동시에 체크해야할 경우는 어떨까?
리소스가 있는 서버에선 DDoS 공격으로 오인할 수 있고, 심지어 내 서버가 차단될 가능성도 있다.

클라이언트에서 리소스를 확인할 수 있는 방법이 있을까?

# 삽질

## ajax

- 당연하지만 크로스도메인 XHR 은 CORS 가 없는 이상 막힌다.
- HEAD 메소드도 똑같다.
- fetch 도 똑같다.

## script

- script tag 를 DOM 에 렌더링하는 것이므로 XSS 공격이 가능하다.
- 스크립트 태그에 한해서 onLoad 와 onError 로 체크가 가능하다.

## image

- 이미지 태그에 한해서 onLoad 와 onError 로 체크가 가능하다.

## link

- css 일 경우 onLoad 와 onError 로 체크가 가능하다.
- DOM 에 렌더링하는 것이므로 UI가 틀어질 수 있다.
- html 등의 페이지도 체크가 가능하지만 firefox 등의 브라우저에서 일관성이 없다.
- IE와 Edge 브라우저에서 없는 css 인 경우에도 onError 이벤트가 발생하지 않았다.

마지막 이슈는 크리티컬했는데, 다행히 에러를 만들어 낼 수 있었다.
**cssRules** 는 스타일시트가 없을 경우 접근할 수 없는 내부 값이기에 에러를 던진다.

```js
link.onload = (loadEvent) => {
  // ie, edge 체크
  const isIE = /MSIE|Trident|Edge/i.test(navigator.userAgent);

  // sheet 는 현재 로드 된 스타일시트 엘레먼트
  if (isIE && loadEvent.target.sheet) {
    try {
      // 강제로 시트 내의 cssRuls 값에 접근한다.
      let temp = loadEvent.target.sheet.cssRules;
    } catch (e) {
      // onError 와 같은 이벤트 처리
    }
  }
};
```

## video

- 없는 영상에 대해 onError 가 동작하지 않는다.

## 기타

- embed 나 iframe 은 _X-Frame-Options_ 헤더에 차단되거나 XSS 공격이 가능하다.
- onError 이벤트의 일관성이 없다.

# 해결

삽질의 결과로 js (script), css (link), image (img) 에 한해서 리소스 체크가 가능한 걸 확인했다.
하지만 js 와 css 의 렌더링으로 인해 페이지가 틀어지는 걸 어떻게 방지할 수 있을까?

불현듯 샌드박스란 단어가 떠올랐다.

## sandbox

보이지 않는 샌드박스 프레임을 만들고, 거기에서 위험한 일을 하면 된다.

```html
<iframe id="sandbox" src="about:blank" style="display:none;" />
```

만들고

```js
$sandbox.contentDocument.write(`
  <html>
    <head>
      <script>
      여기에 프레임간 메세징과 리소스별 onLoad, onError 체크 로직을 넣는다.
      </script>
    </head>
  </html>
`);
```

넣고

메인 프레임에선 샌드박스 메소드를 `postMessage` 하면 된다.
