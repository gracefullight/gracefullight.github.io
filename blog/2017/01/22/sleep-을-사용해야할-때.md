---
title: sleep()을 사용해야할 때
authors: me
tags: [php]
date: 2017-01-22 01:19:01
---

php에서 [sleep()](https://php.net/manual/kr/function.sleep.php) 메소드의 사용법은 이렇다.

```php title="1sec_delay.php"
<?php
    // sleep ( int $seconds )
    sleep(1);

    // usleep ( int $micro_seconds )
    usleep(1000000);
```

단순히 시간을 지연시키는 이 메소드를 어디에 사용하는 걸까?

## Curl Request

**Curl** 또는 **file_get_contents**로 내용을 가져올 때 지연없이 request를 보내면 차단을 당하거나 정상적인 응답이 오지 않을 수 있다.
요청을 보낸 후 sleep을 사용해 지연호출을 한다.

## Crawling

웹 크롤링 중 호출이 일정시간이상되야 응답을 돌려주는 경우가 있다.
요청을 닫기 전에 sleep을 사용해 연결시간을 늘려준다.

## Batch Update

많은 데이터를 cron을 사용해 update를 할 때 테이블이 Lock이 되는 경우를 방지하기 위해 사용한다.

```php
<?php
foreach ($dummy as $data) {
    // 5초가 걸리는 쿼리
    DB::query("UPDATE ...");

    // 5초를 지연시켜 그동안에 호출된 다른 로직을 실행할 수 있게 한다.
    sleep(5);
}
```

> 이 방법보다 테이블이 Lock 되지않게 Update Query를 만드 것이 더 바람직하다.
