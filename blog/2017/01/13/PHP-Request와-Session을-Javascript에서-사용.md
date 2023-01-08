---
title: PHP - Request와 Session을 Javascript에서 사용
authors: me
tags: [php, javascript]
date: 2017-01-13 13:49:58
---

# 소스

```html
<script>
  var request = JSON.parse('<?=addcslashes(json_encode($_REQUEST), '"\\')?>');
  var session = JSON.parse('<?=json_encode($_SESSION)?>');
  Object.freeze(request);
  Object.freeze(session);
</script>
```

# 설명

addcslashes 로 파싱을 안하면 json text 를 request 로 보낼 때 Unexpected Token [오류가 발생하는 경우](https://stackoverflow.com/questions/5611468/is-there-a-php-function-that-only-adds-slashes-to-double-quotes-not-single-quote)가 있다.
