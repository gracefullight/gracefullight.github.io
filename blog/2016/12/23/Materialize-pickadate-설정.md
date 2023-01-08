---
title: Materialize pickadate 설정
authors: me
tags: [javascript]
date: 2016-12-23 15:51:23
---

기본예제는 type="date" 로만 설정이 되있어서 type="text"에도 적용 가능하게 onSet callback 을 설정했고,
한글로 보이게 수정했다.

# 소스

```html
<input type="text" name="date" class="date" />

<script>
  $(function () {
    // pickadate 옵션 전역설정
    $.extend($.fn.pickadate.defaults, {
      monthsFull: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      monthsShort: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      weekdaysFull: ['일', '월', '화', '수', '목', '금', '토'],
      weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
      selectMonths: true,
      selectYears: 140,
      showMonthsShort: false,
      showWeekdaysFull: false,
      close: '닫기',
      clear: false,
      today: '오늘',
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy-mm-dd',
      max: true, // 이 옵션이 ture면 오늘까지밖에 날짜 선택을 못한다
      closeOnSelect: true,
      onSet: function (e) {
        if (e.select) {
          this.close();
        }
      },
    });

    // 활성화
    $('.date').pickadate();
  });
</script>
```

# 결과

![image from hexo](https://i.imgur.com/arG9DCJ.png)
