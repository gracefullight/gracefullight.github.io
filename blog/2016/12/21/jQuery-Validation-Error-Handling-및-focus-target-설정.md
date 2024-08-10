---
title: "jQuery Validation Error Handling 및 focus, target 설정"
authors: me
tags: [javascript, jquery]
date: 2016-12-21 20:38:08
---

기본 기능만으론 checkbox 나 radio 사용시에 첫번째 element 뒤에 글자가 삽입이 되서 위치를 지정해주어야한다.

## 소스

```html
<script>
  $.validator.setDefaults({
    onfocusout: false,
    invalidHandler: function (form, validator) {
      // 커스텀 포커스 핸들링
      if (validator.numberOfInvalids()) {
        validator.errorList[0].element.focus();
        //alert(validator.errorList[0].message); // 경고창
      }
    },
    errorClass: "text-danger", // 에러 스타일을 입힐 클래스 지정
    errorPlacement: function (error, element) {
      // data-error 속성으로 해당 위치 삽입
      var placement = $(element).data("error");
      if (placement) {
        $(placement).append(error);
      } else {
        // 없을경우 마지막노드 뒤에 삽입
        element.parent().children().last().after(error);
      }
    },
  });
</script>

<!-- data-error 속성 사용 예시 -->
<input type="text" name="id" data-error="#id_error" />
<p id="id_error"></p>
```

## 설명

data-error attribute 를 통해 원하는 위치에 에러를 띄울 수 있고,
그렇지 않을 경우 마지막 노드 뒤에 에러를 출력한다.

7 줄에 주석을 지우면 첫번째 오류를 alert 으로 띄울 수 있다.
