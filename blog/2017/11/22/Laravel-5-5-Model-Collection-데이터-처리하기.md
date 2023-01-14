---
title: Laravel 5.5 - Model Collection 데이터 처리하기
authors: me
tags: [php, laravel]
date: 2017-11-22 16:39:54
---

Model Collection의 데이터를 처리하는 메소드를 사용하고 싶을 때 아래처럼 접근하면 된다.

> 회원 모델과 사용가능한 포인트를 산출하는 `availablePoint` 메소드가 있다고 가정한다.

# 해결

```php
<?php
$members = Member::where('status', 1)
                   ->get()
                   ->map(function($member) {
                     // Model에서 정의된 filter 메소드를 적용할 수 있다.
                     return $member->availablePoint();
                   });

// pagination 에서 사용하는 방법
$members = Member::where('status', 1)->paginate();
// 쉬운 방법
$members->map(function($member) {
  return $member->availablePoint();
});

// 긴 방법
//$members->getCollection()->transform(function($member) {
//  return $member->availablePoint();
//});

// pagination에서 data 필드만 필요하다면
$members = Member::where('status', 1)
            ->paginate()
            ->map(function($member) {
              return $member->availablePoint();
            });
```
