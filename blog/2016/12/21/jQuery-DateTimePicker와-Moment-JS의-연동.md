---
title: jQuery DateTimePicker와 Moment JS의 연동
authors: me
tags: [javascript, jquery, moment]
date: 2016-12-21 18:19:49
---

## Datetimepicker JS with Moment JS

개발을 하다보면 datetime 이 같이 필요한 경우가 생긴다.
pickadate 를 사용해 date 와 time picker 를 모두 사용해 만들 수도 있지만
[datetimepicker](https://github.com/xdan/datetimepicker)가 편하고 쉽다.

### 설치

```bash
## datetimepicker
$ bower install https://github.com/xdan/datetimepicker.git --save
## moment
$ bower install moment --save
```

### 예제

```html
<link
  rel="stylesheet"
  type="text/css"
  href="/bower_components/datetimepicker/build/jquery.datetimepicker.min.css"
/>
<!-- php.date.formatter.js 와 jquery.mousewheeel.js 를 포함하는 full.js-->
<!-- moment는 이미 선언되어있다고 가정합니다 -->
<script src="/bower_components/datetimepicker/build/jquery.datetimepicker.full.min.js"></script>

<script>
  // dateTimePicker localization
  $.datetimepicker.setLocale("ko");
  // dateTimePicker moment.js와 연동
  $.datetimepicker.setDateFormatter({
    parseDate: function (date, format) {
      var d = moment(date, format);
      return d.isValid() ? d.toDate() : false;
    },

    formatDate: function (date, format) {
      return moment(date).format(format);
    },
  });

  $(function () {
    // datetimepicker init
    $(".datetimepicker").datetimepicker({
      format: "YYYY-MM-DD HH:mm:ss",
      formatTime: "HH:mm",
      formatDate: "YYYY-MM-DD",
    });
  });
</script>

<input type="text" name="startDate" class="datetimepicker" /> ~
<input type="text" name="endDate" class="datetimepicker" />
```

### 여담

pickadate 에서 datetime 을 같이 지원해주는 모듈도 만들어주면 얼마나 좋을까?
