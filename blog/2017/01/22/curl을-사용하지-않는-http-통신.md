---
title: curl을 사용하지 않는 http 통신
authors: me
tags: [php]
date: 2017-01-22 11:29:48
---

curl 기능이 확장되어있지 않아 http 통신을 할 수 없는 경우가 있다.
**fsockopen** 메소드를 사용해 같은 기능을 할 수 있다.

## 소스

### GET

```php
<?php
/**
 * [getData 외부파일을 GET 방식으로 읽기]
 * @param  [string]  $str  [url]
 * @param  [array]   $data [parameters]
 * @return [string]        [내용]
 */
function getData($str, $data) {
  $url = parse_url($str);

  switch(strtoupper($url['scheme'])) {
    case 'HTTP':
      if (!isset($url['port'])) {
        $url['port'] = 80;
      }
    break;
    case 'HTTPS':
      $url['ssl'] = 'ssl://';
      if (!isset($url['port'])) {
        $url['port'] = 443;
      }
    break;
  }

  $fp = @fsockopen($url['ssl'].$url['host'], $url['port'], $errno, $errstr, 10);
  if ($fp) {
    fwrite($fp, "GET $url[path]?".http_build_query($data)." HTTP/1.0\r\nHost: $url[host]\r\n");
    while (!feof($fp)) {
      $out .= fread($fp, 1024);
    }

    fclose($fp);
    $out = explode("\r\n\r\n",$out);
    array_shift($out);
    $out = implode("",$out);
  }

  return $out;
}
```

### POST

```php
<?php
<?
/**
 * [postData 외부파일을 POST 방식으로 읽기]
 * @param  [string]  $str     [url]
 * @param  [array]   $data    [parameters]
 * @param  [int]     $sleepMs [연결지연ms]
 * @return [string]           [내용]
 */
function postData($str, $data, $sleepMs=0) {
  $url = parse_url($str);

  switch(strtoupper($url['scheme'])) {
    case 'HTTP':
      if (!isset($url['port'])) {
        $url['port'] = 80;
      }
    break;
    case 'HTTPS':
      $url['ssl'] = 'ssl://';
      if (!isset($url['port'])) {
        $url['port'] = 443;
      }
    break;
  }

  $data_string = http_build_query($data);
  $referrer = $_SERVER['SCRIPT_URL'];

  $request = "POST {$url[path]} HTTP/1.1\r\nHost: {$url[host]}\r\nReferer: {$referrer}\r\n";
  $request .= "Content-type: application/x-www-form-urlencoded\r\n";
  $request .= "Content-length: " . strlen($data_string) . "\r\n";
  $request .= "Connection: close\r\n\r\n";
  $request .= "{$data_string}\r\n";

  $fp = @fsockopen($url['ssl'].$url[host], $url[port], $errno, $errstr, 10);
  if ($fp) {
    fwrite($fp, $request);
    usleep(($sleepMs * 1000));

    do {
      $header .= fread($fp, 1);
    } while (!preg_match('/\\r\\n\\r\\n$/', $header));

    if (preg_match('/Transfer\\-Encoding:\\s+chunked\\r\\n/', $header, $matches)) {
      // check encoding
      do {
        $byte = $chunk_size = "";
        do {
          $chunk_size .= $byte; $byte = fread($fp, 1);
        } while ($byte != "\r");
        fread($fp, 1);
        $chunk_size = hexdec($chunk_size);
        if ($chunk_size){
          $out .= @fread($fp, $chunk_size);
        }
        fread($fp, 2);
      } while ($chunk_size);

    } else if (preg_match('/Content\\-Length:\\s+([0-9]*)\\r\\n/', $header, $matches)) {
      $out = fread($fp,$matches[1]);

    } else {
      while (!feof($fp)) {
        $out .= fread($fp, 4096);
      }
    }

    fclose($fp);
  }

  return $out;
}
```

## 예제

```php
<?php
$param = array(
    'data1' => '1',
    'data2' => '2'
);

// get 요청
$get_data = getData('http://your.apiurl.com', $param);
// post 요청
$post_data = postData('http://your.apiurl.com', $param);
?>
```

## 설명

fsockopen 으로 소켓을 연 뒤 해당 host 로 request 만들어 전송한다.

stream 을 사용해 [통신하는 방법](http://wezfurlong.org/blog/2006/nov/http-post-from-php-without-curl/)도 있다.
