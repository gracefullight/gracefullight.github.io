---
title: number_format의 반대 함수
authors: me
tags: [php]
date: 2017-07-29 11:17:47
---

number_format 으로 쉽게 comma 가 들어간 숫자를 만들 수 있는데,
이 반대 방법은 preg_replace 를 통해 comma 를 제거한 뒤에 다시 int 로 형변환을 해야한다.

더 간단하게 변경할 수 있는 방법은 바로 **filter_var**를 사용하는 것이다.

## 소스

```php
<?php

$formatted_nubmer = number_format(10000);

echo $formatted_number; // 10,000;

$number = filter_var($formatted_nubmer, FILTER_SANITIZE_NUMBER_INT);
// FILTER_SANITIZE_NUMBER_INT 상수가 너무 길어서 외우기가 힘들다면 519
$number2 = filter_var($formatted_nubmer, 519);

echo $number; // 10000;
echo $number2; // 10000;
```

## 필터 옵션

필터 상수에 대해 궁금해졌다면 [공홈](https://php.net/manual/en/filter.filters.php)을 참조하자.
