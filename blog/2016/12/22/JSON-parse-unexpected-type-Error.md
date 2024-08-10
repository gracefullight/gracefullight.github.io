---
title: JSON.parse unexpected type Error
authors: me
tags: [javascript, json]
date: 2016-12-22 20:47:37
---

database 에 이미 json 으로 저장된 데이터를 가져와 JSON.parse 메소드로 JSON 데이터를 파싱하는 중에 값이 string 인데도 오류가 나는 경우가 있다.

로그를 확인해보면

```json
{"data":"[{"name":"gracefullight"},{"name","daniel"}]"}
```

[] 배열 기호 앞뒤로 따움표가 들어가 있다.
이중 object 가 있다면 선언문 {} 앞뒤로 따움표가 들어가 파싱 오류가 난다.

## 원인

jQuery.ajax 의 dataType 을 json 으로 설정해 데이터를 받는데, 이미 json 형태의 string 이 넘어와 두번 치환이 된 것 같다.

다시 json 을 인식할 수 있게 치환해보자

## 소스

```js
const jsonReplace = function (j) {
  if (j) {
    j = j
      .replace(/"\[/g, "[")
      .replace(/\]"/g, "]")
      .replace(/"\{/g, "{")
      .replace(/\}"/g, "}");
  }
  return j;
};
```

## 설명

해당 함수로 오류가 나는 json string 을 치환 후에 다시 JSON.parse 를 실행하면 된다.

## 여담

정규식을 활용해 replace 중첩을 피하게 짤 수 있을 것 같은데...
