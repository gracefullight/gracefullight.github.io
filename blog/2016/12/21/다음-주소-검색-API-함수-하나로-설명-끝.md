---
title: "다음 주소 검색 API"
authors: me
tags: [javascript]
date: 2016-12-21 15:33:00
---

# 다음 주소검색 API

## 소스

```js
/**
 * [searchAddr 다음주소검색 API]
 * @return {[JsonArray]} [주소데이터]
 * <script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"> 선행되어야함
 */
const searchAddr = function () {
  new daum.Postcode({
    oncomplete: function (data) {
      let fullAddr = ""; // 최종 주소 변수
      let extraAddr = ""; // 조합형 주소 변수
      let engAddr = "";
      let zipcode = "";

      // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        fullAddr = data.roadAddress;
        zipcode = data.zonecode;
        engAddr = data.roadAddressEnglish;

        //법정동명이 있을 경우 추가한다.
        if (data.bname !== "") {
          extraAddr += data.bname;
        }
        // 건물명이 있을 경우 추가한다.
        if (data.buildingName !== "") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
        fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        fullAddr = data.jibunAddress;
        zipcode = data.postcode;
        engAddr = data.jibunAddressEnglish;
      }

      // 구버전일 경우 getElementById 로 변경
      document.querySelector("#zip").value = zipcode;
      document.querySelector("#address").value = fullAddr;
      document.querySelector("#address_eng").value = engAddr;

      document.querySelector("#address_detail").focus();
    },
  }).open();
};
```

## 설명

다음 주소검색 API 를 입맛에 맞게 조금 변경했다.
