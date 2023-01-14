---
title: Detecting AdBlock
authors: me
tags: [javascript]
date: 2016-12-29 17:15:58
---

Google Analytics, Facebook Pixel, Naver Analytics 등의 분석 스크립트 및 Google Adsence 를 차단하는 AdBlock 을 감지해보자

# 소스

```js
/**
@author https://www.christianheilmann.com/2015/12/25/detecting-adblock-without-an-extra-http-overhead/
*/
(function (adBlockEnabled) {
  "use strict";
  var testAd = document.createElement("div");
  testAd.innerHTML = "&nbsp;";
  testAd.className = "adsbox";
  document.body.appendChild(testAd);

  setTimeout(function () {
    if (testAd.offsetHeight === 0) {
      adBlockEnabled = true;
    }
    testAd.remove();

    if (adBlockEnabled) {
      alert(
        "This Blog is made possible by displaying online advertisements\nPlease consider by disabling your ad blocker"
      );
    }
  }, 100);
})((window.adBlockEnabled = window.adBlockEnabled || false));
```

출처의 소스를 즉시실행함수로 변경하고, 문구를 추가했다.

# 설명

AdBlock 에 의해 차단되는 영역인 .adsbox div 의 생성유무를 확인해 AdBlock 의 adBlockEnabled 변수의 값을 정한다.

uBlock 도 잘 찾아낸다.
