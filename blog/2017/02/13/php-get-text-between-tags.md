---
title: PHP에서 HTML tag 사이의 문자 가져오기
authors: me
tags: [php]
date: 2017-02-13 15:00:14
---

PHP 로 페이지를 크롤링한 후 HTML tag 안의 데이터가 필요할 때 함수 하나로 해결할 수 있다.

## 소스

```php
<?php
/**
 * [splitBetweenStr 텍스트 사이의 문자열을 배열로 반환]
 * @param  [string] $str        [전체 문자열]
 * @param  [string] $startWord  [찾을 시작 문자열]
 * @param  [string] $endWord    [찾을 종료 문자열]
 * @return [array]              [텍스트 사이의 문자열 배열]
 *
 * ex) splitBetweenStr('<br>hi</br><b>test</b><br>graceful_light</br>', '<br>', '</br>')
 *     => ['hi', 'graceful_light']
 */
function splitBetweenStr($str, $startWord, $endWord) {
  for ($i=0, $len=strlen($str); $i<$len; $i++) {
    $target = substr($str,$i);
    $prevStartIdx = strpos($target, $startWord);
    $startIdx = $prevStartIdx + strlen($startWord);
    $endIdx = strpos(substr($target, $startIdx), $endWord);

    if ($prevStartIdx===false || $endIdx===false) {
      break;
    } else {
      $betweenStrings[] = substr($target, $startIdx, $endIdx);
      $i += $startIdx + $endIdx + strlen($endWord) - 1;
    }
  }

  return $betweenStrings;
}
```

## 여담

물론 [다른 크롤러 라이브러리](https://packagist.org/search/?q=crawl&orderBys%5B0%5D%5Bsort%5D=downloads&orderBys%5B0%5D%5Border%5D=desc)를 사용하는게 속편하다.
호스팅 환경에서는 유용하게 사용할 수 있다.
