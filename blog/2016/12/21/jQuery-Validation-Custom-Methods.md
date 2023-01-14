---
title: jQuery Validation Custom Methods
authors: me
tags: [javascript, jquery]
date: 2016-12-21 23:31:13
---

기본적으로 사용하는 기능 외에 custom method 를 추가해서 validation 을 해보자.

# 목차

1. 사업자등록번호
2. 법인등록번호
3. 바이트 제한
4. 아이디 체크 (alphanumeric, 숫자 첫글자 불가능)
5. 비밀번호 체크 (alpah && (number || special char))
6. datetime (YYYY-MM-DD HH:mm:ss)
7. date (YYYY-MM-DD)
8. Kakaotalk Yellow ID
9. alphanumeric (hyphen, underscore, space 포함)
10. phone (hyphen 포함)
11. mobile (hyphen 포함)

# 소스

```js
(function ($) {
  $.validator.addMethod(
    "biznum",
    function (bizID, element) {
      var checkID = [1, 3, 7, 1, 3, 7, 1, 3, 5, 1];
      var tmpBizID,
        i,
        chkSum = 0,
        c2,
        remander;
      bizID = bizID.replace(/-/gi, "");

      for (i = 0; i <= 7; i++) {
        chkSum += checkID[i] * bizID.charAt(i);
      }
      c2 = "0" + checkID[8] * bizID.charAt(8);
      c2 = c2.substring(c2.length - 2, c2.length);
      chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
      remander = (10 - (chkSum % 10)) % 10;
      return this.optional(element) || Math.floor(bizID.charAt(9)) === remander;
    },
    "사업자등록번호 형식에 맞지 않습니다"
  );

  $.validator.addMethod(
    "corpnum",
    function (corpID, element) {
      var result = true;
      if (corpID.length === 13) {
        var arr_regno = corpID.split("");
        var arr_wt = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
        var iSum_regno = 0;
        var iCheck_digit = 0;

        for (i = 0; i < 12; i++) {
          iSum_regno += Number(arr_regno[i]) * Number(arr_wt[i]);
        }

        iCheck_digit = 10 - (iSum_regno % 10);
        iCheck_digit = iCheck_digit % 10;

        if (iCheck_digit !== arr_regno[12]) {
          result = false;
        }
      } else {
        result = false;
      }

      return this.optional(element) || result;
    },
    "법인등록번호 형식에 맞지 않습니다"
  );

  $.validator.addMethod(
    "byte",
    function (str, element, param) {
      var byte = 0;
      var result = true;

      for (var i = 0, len = text.length; i < len; i++) {
        if (escape(text.charAt(i)).length > 4) {
          byte = byte + 2;
        } else {
          byte = byte + 1;
        }
      }

      if (byte > param) {
        result = false;
      }

      return this.optional(element) || result;
    },
    "최대 Byte 값을 넘었습니다"
  );

  // id 체크 (alphanumeric, _- 가능, 숫자가 처음에 올수 없음)
  $.validator.addMethod(
    "user",
    function (id, element) {
      return (
        this.optional(element) ||
        /^([a-zA-Z])[a-zA-Z_-]*[\w_-]*[\S]$|^([a-zA-Z])[0-9_-]*[\S]$|^[a-zA-Z]*[\S]$/.test(
          id
        )
      );
    },
    "올바른 아이디 형식이 아닙니다"
  );

  // pw 영문 && (숫자 || 특수문자)
  $.validator.addMethod(
    "pass",
    function (pass, element) {
      return (
        this.optional(element) ||
        /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W))./.test(pass)
      );
    },
    "올바른 비밀번호 형식이 아닙니다"
  );

  // datetime 형식
  $.validator.addMethod(
    "datetime",
    function (datetime, element) {
      return (
        this.optional(element) ||
        /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01]) (0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(
          datetime
        )
      );
    },
    "올바른 날짜, 시간형식이 아닙니다"
  );

  // date 형식
  $.validator.addMethod(
    "date",
    function (dt, element) {
      return (
        this.optional(element) ||
        /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/.test(dt)
      );
    },
    "올바른 날짜 형식이 아닙니다"
  );

  // 옐로아이디 형식
  $.validator.addMethod(
    "yellowid",
    function (yid, element) {
      return this.optional(element) || /^@[\W|\w]{2,15}/.test(yid);
    },
    "올바른 옐로아이디가 아닙니다"
  );

  // alpahnumeric _ - space
  $.validator.addMethod(
    "alphanumeric",
    function (v, element) {
      return this.optional(element) || /^[a-zA-Z\d\-_\s]+$/.test(v);
    },
    "올바른 형식이 아닙니다"
  );

  // 하이픈을 포함한 전화번호
  $.validator.addMethod(
    "phone",
    function (p, element) {
      return this.optional(element) || /^\d{2,3}-\d{3,4}-\d{4}$/.test(p);
    },
    "올바른 전화번호 형식이 아닙니다"
  );

  // 하이픈을 포함한 휴대폰 번호
  $.validator.addMethod(
    "mobile",
    function (m, element) {
      return (
        this.optional(element) ||
        /^01([0|1|6|7|8|9]?)-(\d{3,4})-(\d{4})$/.test(m)
      );
    },
    "올바른 휴대폰 번호 형식이 아닙니다"
  );
})(jQuery);
```

# 설명

biznum, byte...와 같은 속성을 추가해 사용하면 된다.
필요한 부분만 복사해 가져가도 되고.

# 예제

```javascript
$('form').validate({
    rules:{
        text_field: {byte:80},
        date_field: {date:true}
    },
    messages:{
        text_field: {byte:'80자 초과'}
        date_field: {date:'날짜 형식 아님'}
    }
});
```

# 여담

byte check 의 함수 로직이 많지만, 한글 및 특수문자를 2byte 로 정확히 체크해주는 것은 위의 함수 뿐이였다.
