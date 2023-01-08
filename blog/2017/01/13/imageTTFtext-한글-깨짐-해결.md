---
title: imageTTFtext 한글 깨짐 해결
authors: me
tags: [php]
date: 2017-01-13 13:46:17
---

텍스트를 이미지로 만드는 경우에 사용하는 imageTTFtext 함수는 한글이 깨지는 문제가 있다.

# 해결

imageTTFtext 전에 아래 함수로 한글을 컨버팅해준다.

```php
<?php
/**
* @author http://php.net/manual/en/function.imagettftext.php#57416
*/
function foxy_utf8_to_nce($utf = '') {
  if (empty($utf)) {
    return($utf);
  }

  $max_count = 5; // flag-bits in $max_mark ( 1111 1000 == 5 times 1)
  $max_mark = 248; // marker for a (theoretical ;-)) 5-byte-char and mask for a 4-byte-char;

  $html = "";
  for ($str_pos = 0; $str_pos < strlen($utf); $str_pos++) {
    $old_chr = $utf{$str_pos};
    $old_val = ord( $utf{$str_pos} );
    $new_val = 0;

    $utf8_marker = 0;

    // skip non-utf-8-chars
    if ( $old_val > 127 ) {
      $mark = $max_mark;
      for($byte_ctr = $max_count; $byte_ctr > 2; $byte_ctr--) {
        // actual byte is utf-8-marker?
        if( ( $old_val &; $mark  ) == ( ($mark << 1) &; 255 ) ) {
          $utf8_marker = $byte_ctr - 1;
          break;
        }
        $mark = ($mark << 1) & 255;
      }
    }

    // marker found: collect following bytes
    if ($utf8_marker > 1 && isset( $utf{$str_pos + 1} ) ) {
      $str_off = 0;
      $new_val = $old_val &; (127 >> $utf8_marker);
      for($byte_ctr = $utf8_marker; $byte_ctr > 1; $byte_ctr--) {

        // check if following chars are UTF8 additional data blocks
        // UTF8 and ord() > 127
        if( (ord($utf{$str_pos + 1}) & 192) == 128 ) {
          $new_val = $new_val << 6;
          $str_off++;
          // no need for Addition, bitwise OR is sufficient
          // 63: more UTF8-bytes; 0011 1111
          $new_val = $new_val | ( ord( $utf{$str_pos + $str_off} ) & 63 );
        }
        // no UTF8, but ord() > 127
        // nevertheless convert first char to NCE
        else {
          $new_val = $old_val;
        }
      }
      // build NCE-Code
      $html .= '&#'.$new_val.';';
      // Skip additional UTF-8-Bytes
      $str_pos = $str_pos + $str_off;
    } else {
      $html .= chr($old_val);
      $new_val = $old_val;
    }
  }
  return($html);
}
```

# 여담

원작자를 못 찾겠다.. 이걸 만든 사람은 binary 로 말을 할 것 같다.
