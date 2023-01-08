---
title: Cross Domain Login 중 세션 생성시 IE 오류
authors: me
tags: [javascript, php]
date: 2016-12-22 12:46:21
---

aaa.com 에서 bbb.com 의 세션을 jsonp 방식을 활용해서 생성하고 싶을 때,
유독 IE 에서만 세션 생성이 안되는 경우가 있다.

이는 P3P (Platform for Personal Preferences) 규약이 적용되어 세션을 가져오지 않는 것인데, 아래와 같은 방법으로 해결할 수 있다.

# 소스

```php
<!-- 세션을 만들어줄 서버에서 P3P 헤더를 설정 -->
<?php
header('P3P: CP="CAO PSA OUR"');
?>

<!-- 세션을 가지고 오는 클라이언트 요청-->
<script>
$.ajax({
    url:'cross domain session create url',
    type:'post',
    data:{
        token1 : 'token1',
        token2 : 'token2'
    },
    dataType:'jsonp'
}).then(function (result) {

});
</script>
```
