---
title: MomentJS 활용법
authors: me
tags: [javascript, moment]
date: 2016-12-23 15:57:14
---

java에 joda-time이 있듯 javascript에는 moment가 있다.
기초적인 moment 사용법은 알고 있다고 가정한다.

## calendar

현재시각과 비교해 날짜를 **어제 오후 12:31**처럼 표시하고 싶은 경우 사용한다.

### 소스

```js
moment(date).calendar(today, { sameElse: "YYYY-MM-DD HH:mm:ss" });
```

date는 비교할 날짜, today는 현재시각 값이다.
일주일 이하일 경우 어제.. 그저께.. 등으로 반환되고, 이상일 경우 sameElse에 등록된 포맷으로 반환된다.

global locale 설정을 지정하지 않았을 경우 sameElse가 들어가는 option object 안에 locale을 커스터마이징 할 수 있다.

기타 옵션은 [API](https://momentjs.com/docs/#/displaying/calendar-time/) 참조

## diff

A에서 B의 차이를 구할 때 쓰는 diff method를 쓰다가, 월 또는 년도의 차이를 계산하는 경우가 생긴다.

### 소스

#### worst case

```js
moment("2016-06").diff("2015-01", "month");
```

이렇게 처리하면 되지 않을까? 동작은 하지만 오류가 날 수 있다고 console.warning 이 찍힌다.

#### good case

```js
moment([2016, 6]).diff([2015, 1], "month");
```

실행이 잘되지만, YYYY-MM을 split해서 넣어줘야하는 번거로움이 있다.

#### best case

```js
moment("2016-06", "YYYY-MM").diff("2015-01", "month");
```

moment 형식으로 변환시 두번째 파라미터에 포맷을 지정하면 console.warning도 없고 번거로움도 사라진다!
