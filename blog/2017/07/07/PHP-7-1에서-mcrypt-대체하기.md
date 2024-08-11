---
title: PHP 7.1에서 mcrypt 대체하기
authors: me
tags: [php, openssl]
date: 2017-07-07 22:33:46
---

## MCRYPT

- 암호화 함수인 `mcrypt` 가 PHP 7.1 버전부터 Deprecated 되었다.
- 왜 사라졌는지는 [링크](https://paragonie.com/blog/2015/05/if-you-re-typing-word-mcrypt-into-your-code-you-re-doing-it-wrong)에 자세하게 나와있다.

### 기존 소스

- PHP 구버전에서는 `mcrypt` 와 `MCRYPT_RIJNDAEL_128` 알고리즘을 통해 AES128 이 구현되어 있을 것이다.
- **MCRYPT_RIJNDAEL_128**은 **AES 128**과 **동일**하다.
- 타 언어와는 조금 다른데, 호환을 위해선 pkcs5 padding 으로 변경해주는 작업이 필요하다.
- php mcrypt function 의 기본 패딩은 zeros padding

```php
<?php
// 이런 식이거나
$cipherText = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, pkcs5_pad($plainText), MCRYPT_MODE_CBC, $iv);

// 이런 식일 것
$td = mcrypt_module_open("rijndael-128", "", "cbc", "");
@mcrypt_generic_init($td, $key, $iv);
$cipherText = @mcrypt_generic($td, pkcs5_pad($plainText));
mcrypt_generic_deinit($td);
mcrypt_module_close($td);

function pkcs5_pad($text, $blockSize = 16) {
  $pad = $blockSize - (strlen($text) % $blockSize);
  return $text . str_repeat(chr($pad), $pad);
}
```

### 대안

- PHP 5.3 부터 사용 가능한 **openssl_encrypt** 함수를 쓰면 된다.
- openssl 확장 모듈이 설치되어야한다.

## OPENSSL

### Encrypt

```php
<?php
$cipherText = openssl_encrypt($plainText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $iv);
// decrypt에서 오류가 발생해 PKCS5로 패딩을 맞춰주고 보내야한다면.
$cipherText = openssl_encrypt(pkcs5_pad($plainText), 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $iv);
```

### Decrypt

```php
<?php
$plainText = openssl_decrypt($cipherText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $iv);
// unpad가 필요하다면
$plainText = pkcs5_unpad(openssl_decrypt($cipherText, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $iv));

function pkcs5_unpad($text) {
  $pad = ord($text{strlen($text)-1});
  if ($pad > strlen($text)) {
    return $text;
  }
  if (!strspn($text, chr($pad), strlen($text) - $pad)) {
    return $text;
  }
  return substr($text, 0, -1 * $pad);
}
```

### PKCS5 vs PKCS7

- `openssl_encrypt`의 default padding 은 PKCS7 padding 인데, 어떻게 호환이 되는 것일까?
- [여기](https://social.msdn.microsoft.com/Forums/en-US/09fef7b7-b568-4895-8e52-f386be80aa2d/pkcs7-padding-in-net-vs-pkcs5-padding-in-java?forum=csharpgeneral)서 해답을 찾았다.

> The difference between the PKCS#5 and PKCS#7 padding mechanisms is the block size;
> PKCS#5 padding is defined for 8-byte block sizes, PKCS#7 padding would work for any block size from 1 to 255 bytes.
> So fundamentally PKCS#5 padding is a subset of PKCS#7 padding for 8 byte block sizes.
> so, data encrypted with PKCS#5 is able to decrypt with PKCS#7, but data encrypted with PKCS#7 may not be able to decrypt with PKCS#5.

### triple des

- `des-ede3-cbc`가 triple des 알고리즘이다.

```php
<?php
// encrypt
openssl_encrypt($text, "des-ede3-cbc", $key, OPENSSL_RAW_DATA, $iv);

// decrypt
openssl_decrypt($cipherText, "des-ede3-cbc", $key, OPENSSL_RAW_DATA, $iv);
```

## 패키지

- 이 모든 걸 커버하는 라이브러리를 사용하자. [phpseclib/mcrypt_compat](https://github.com/phpseclib/mcrypt_compat)
- _phpseclib_ 는 laravel/passport 에서도 사용되었다.

## 여담

카카오페이가 PHP 5 버전만 지원해 문의해봤지만 계획이 없어 이번 기회에 모듈을 다 뜯어봤는데 MCRYPT 만 만져주면 정상적으로 결제가 되었다.

곧 이 짓을 안해도 될 듯하다.
![KakaoPay 종료](https://i.imgur.com/QBA9xnP.jpg)
