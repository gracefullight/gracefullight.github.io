---
title: 일본 우편번호(주소) 검색 API
authors: me
tags:
  - javascript
date: 2017-08-12 00:28:55
---

다음 우편번호 검색 API 처럼 일본 우편번호 검색도 간단히 구현할 수 있다.
[여기](https://zipaddress.net/)에서 내용을 확인할 수 있지만, 더 쉽게 써보자.

## 소스

```html
<input type="number" id="zip" />
<button type="button" onClick="search_addr();">住所検索</button>

<input type="text" id="address" />
<!-- 스크립트를 로드 -->
<script src="//api.zipaddress.net/sdk/zipaddr.min.js" async></script>
<script>
  var searchAddr = function () {
    var $zip = $("#zip");
    var zip = $zip.val();

    // 일본 우편번호는 7자리로 고정되어있다.
    // sample 6800001
    if (zip && zip.length === 7) {
      ZA.request(zip, function (data, err) {
        var $address = $("#address");
        if (err) {
          $address.val("");
          $zip.focus();
          return alert(data.message);
        }
        $address.val(data.fullAddress);
        $address.focus();
      });
    } else {
      alert("郵便番号に誤りがあります。");
      $zip.focus();
    }
  };
</script>
```

## 여담

주소지명으로 검색하는 API 는 찾아볼 수 없었다.
역시 주소검색은 다음
