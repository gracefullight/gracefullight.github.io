---
title: RESTful을 위한 PHP HTTP Method 처리
authors: me
tags: [php]
date: 2017-01-15 17:10:07
---

메소드를 분기해서 새로운 배열에 담아주면 된다.

# 소스

**contentType을 application/json으로 보냈을 경우**

```php
<?
$method = strtolower($_SERVER['REQUEST_METHOD']);
switch ($method) {
  case 'get':
    $input = json_decode(json_encode($_GET), true);
  break;
  case 'post':
    $input = json_decode(file_get_contents('php://input'), true);
  break;
  case 'put':
    $input = json_decode(file_get_contents('php://input'), true);
  break;
  case 'delete':
    $input = json_decode(file_get_contents('php://input'), true);
  break;
}
?>
```

contentType을 그냥 전송한다면 **file_get_contents('php://input')**으로 받으면 된다.

# 여담

GET을 제외한 method는 params를 JSON.stringify한 뒤에 file_get_contents로 읽어오면 되는데, GET으로는 file전송을 할 수 없기 때문에 위처럼 받으면 된다.
