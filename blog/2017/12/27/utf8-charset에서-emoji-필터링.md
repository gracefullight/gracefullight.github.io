---
title: utf8 charset에서 emoji 필터링하기
authors: me
tags: [php, nodejs, mariadb, mysql]
date: 2017-12-27 13:05:20
---

## 개요

utf8 charset 에서는 이모지를 처리할 수 없다.
[utf8mb4 언어셋 소개 및 표현범위](https://blog.lael.be/post/917) 포스팅에 따르면 이모지가 mysql 또는 maria 의 utf8 셋의 가변공간을 사용하려 들려 하는 문제인데, utf8mb4 셋으로 변경하면 해결 된다.

mysql 이거나 maria 의 charset 을 변경하기 힘들 때 text 를 모두 replace 치면 된다. 시작해보자

## php

[writing a simple removeEmoji function](https://stackoverflow.com/questions/12807176/php-writing-a-simple-removeemoji-function) stackoverflow 글에 좋은 함수가 있다.

### 소스

```php
<?php
// https://stackoverflow.com/questions/12807176/php-writing-a-simple-removeemoji-function
function removeEmoji($text) {
    $clean_text = "";
    // Match Emoticons
    $regexEmoticons = '/[\x{1F600}-\x{1F64F}]/u';
    $clean_text = preg_replace($regexEmoticons, '', $text);
    // Match Miscellaneous Symbols and Pictographs
    $regexSymbols = '/[\x{1F300}-\x{1F5FF}]/u';
    $clean_text = preg_replace($regexSymbols, '', $clean_text);
    // Match Transport And Map Symbols
    $regexTransport = '/[\x{1F680}-\x{1F6FF}]/u';
    $clean_text = preg_replace($regexTransport, '', $clean_text);
    // Match Miscellaneous Symbols
    $regexMisc = '/[\x{2600}-\x{26FF}]/u';
    $clean_text = preg_replace($regexMisc, '', $clean_text);
    // Match Dingbats
    $regexDingbats = '/[\x{2700}-\x{27BF}]/u';
    $clean_text = preg_replace($regexDingbats, '', $clean_text);
    // Match Flags
    $regexDingbats = '/[\x{1F1E6}-\x{1F1FF}]/u';
    $clean_text = preg_replace($regexDingbats, '', $clean_text);
    // Others
    $regexDingbats = '/[\x{1F910}-\x{1F95E}]/u';
    $clean_text = preg_replace($regexDingbats, '', $clean_text);
    $regexDingbats = '/[\x{1F980}-\x{1F991}]/u';
    $clean_text = preg_replace($regexDingbats, '', $clean_text);
    $regexDingbats = '/[\x{1F9C0}]/u';
    $clean_text = preg_replace($regexDingbats, '', $clean_text);
    $regexDingbats = '/[\x{1F9F9}]/u';
    $clean_text = preg_replace($regexDingbats, '', $clean_text);
    return $clean_text;
}
```

```php
<?php
$textWithEmoji = 'thumbs up👍👍';
$text = removeEmoji($textWithEmoji);

// text => thumbs up
```

## node

[emoji-regex](https://github.com/mathiasbynens/emoji-regex) 라이브러리를 쓰면 된다.

```bash
yarn add emoji-regex
```

### 소스

```js
const emojiRegex = require("emoji-regex");

// const regex = emojiRegex()
const textWithEmoji = "thumbs up👍👍";
const text = textWithEmoji.replace(emojiRegex(), "");

// text => thumbs up
```

## 여담

이모지처리 (붙히고 제거하고), linkify 를 합친 통합 모듈이 있다면 다운로드 수가 좀 될 것 같은데.
