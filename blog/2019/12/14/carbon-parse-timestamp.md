---
title: Carbon 으로 timestamp 파싱하기
authors: me
tags:
  - php
  - carbon
  - timezone
date: 2019-12-14 00:05:56
---

## Timestamp

`Carbon`으로 타임스탬프를 파싱하는 데에는 `createFromTimestamp` 메소드가 있다.

```php
Carbon::createFromTimestamp(1576249805)->format();
```

하지만 더 쉽게 `parse` 메소드를 사용해 파싱할 수도 있다.

```php
$timestamp = 1576249805;
Carbon::parse('@' . $timestamp)->format();
```

여기서의 `@`는 오류를 무시하는 기분이 들어서 찾아보았는데 표준이였다.

**Example #2 DateTime::setTimestamp() alternative in PHP 5.2**

```php
$ts = 1171502725;
$date = new DateTime("@$ts");
echo $date->format('U = Y-m-d H:i:s') . "\n";
?>
```

## 참조

- timestamp 는 UTC 기준이며 (1970년부터의 차이) timezone 을 정의할 수 없다.
- [php man: datetime.settimestamp](https://www.php.net/manual/en/datetime.settimestamp.php)
