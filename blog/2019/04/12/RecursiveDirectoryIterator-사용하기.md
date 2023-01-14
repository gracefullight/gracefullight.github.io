---
title: RecursiveDirectoryIterator 사용하기
authors: me
tags: [php]
date: 2019-04-12 19:42:34
---

# 앞서

보통 디렉토리 순회를 한다고하면 무슨 메소드를 쓸까?

```php
<?php
// 쉘실행하고?
exec('find dir');

// 아니면 for문과 scandir?
scandir('dir');
```

위 방법은 간단하지만 `/home/gracefullight/tmp/**/*.bak` 와 같은 중첩된 디렉토리 파일의 데이터를 가져오려면 엄청난 `if/else` 처리가 들어갈 것이다.

# RecursiveIterator

## RecursiveDirectoryIterator

오토로딩을 하기 위해 필수로 들어가있는 [Standard PHP Library](https://www.php.net/manual/en/book.spl.php)엔 파일 순회에 사용할 수 있는 이터레이터 클래스가 들어가 있다.

```php
<?php
// $path 하위를 가져오고 .. 와 . 는 제외한다.
$directory = new RecursiveDirectoryIterator($path, RecursiveDirectoryIterator::SKIP_DOTS);
$iterator = new RecursiveIteratorIterator($directory);

foreach ($iterator as $file) {
    $file->getPathname();
    $file->getMTime();
}
?>
```

`$file`은 [SplFileInfo](https://www.php.net/manual/en/class.splfileinfo.php) 이다.

## RecursiveFilterIterator

위의 `foreach` 문 안에서 조건을 줘서 필터링할 수 있지만 다른 깔끔한 방법이 있다.

```php
<?php
class TextFilterIterator extends RecursiveFilterIterator
{
    public static $FILTERS = [
        'txt'
    ];

    public function accept() {
        // 순회하기위해 자식 트리가 있을 경우 true
        if ($this->hasChildren()) {
            return true;
        }

        $current = $this->current();
        if (!$current->isFile()) {
            return false;
        }

        // 확장자가 txt 인 파일만 필터링
        return in_array($current->getExtension(), self::$FILTERS);
    }
}

// 감싸주면 끝난다.
$iterator = new RecursiveIteratorIterator(
    new TextFilterIterator($directory),
    // 이 옵션은 하위 폴더만 순회하게 해준다.
    RecursiveIteratorIterator::LEAVES_ONLY,
    // 이 옵션은 Read 에 실패할 경우 오류를 스킵한다.
    RecursiveIteratorIterator::CATCH_GET_CHILD
);
```

## RecursiveCallbackFilterIterator

콜백으로 만들어 더 예쁘게 짤 수 있다.

```php
<?php
$FILTERS = ['txt'];

$textFilterIterator = new RecursiveCallbackFilterIterator(
    $directory,
    function ($current, $key, $iterator) use ($FILTERS) {
        if ($iterator->hasChildren()) {
            return true;
        }

        if (!$current->isFile()) {
            return false;
        }

        return in_array($current->getExtension(), $FILTERS);
    }
);

$iterator = new RecursiveIteratorIterator($textFilterIterator);
```

# 여담

쓸 수 있다면 [symfony/finder](https://packagist.org/packages/symfony/finder) 쓰자.
