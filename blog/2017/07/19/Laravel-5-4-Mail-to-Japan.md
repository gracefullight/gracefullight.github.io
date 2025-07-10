---
title: Laravel 5.5 - 일본으로 메일 보내기
authors: me
tags:
  - php
  - laravel
date: 2017-07-19 00:11:01
---

일본 통신사 중 소프트뱅크와 AU는 UTF8 메일이 깨져서 들어간다. (도코모는 정상적)
Laravel 뿐아니라 일본으로 메일을 보내고 싶다면, 이 포스팅의 방식대로 접근하면 된다.

## iso-2022-jp

먼저 인코딩을 iso-2022-jp로 바꿔줘야한다.

> 테스트 결과 JIS 인코딩과 같다.
> SJIS 인코딩도 있는데 위 인코딩에 몇가지 특수문자가 추가된 형태이다.

AppServiceProvider에 메일 인코딩을 전역으로 설정하자.

```php title="app/Providers/AppServiceProvider.php"
<?php
...
use Swift;
use Swift_DependencyContainer;
use Swift_Preferences;

class AppServiceProvider extends ServiceProvider
{
  ...
  public function register() {
    // laravel의 메일 패키지는 Swift이므로 당황하지말자
    Swift::init(function() {
      // 헤더를 추가하고
      Swift_DependencyContainer::getInstance()
        ->register('mime.qpheaderencoder')
        ->asAliasOf('mime.base64headerencoder');
      // 인코딩을 변경한다.
      Swift_Preferences::getInstance()->setCharset('iso-2022-jp');
    });
  }
}
```

## 7bit

위키를 참조해보면 iso-2022는 문자열을 7bit 또는 8bit로 표현하는 기술이다. 근데, 소프트뱅크 문서에 7bit로 달란다.
메일 폼을 열어서 build시에 인코딩 바이트를 변경하자.

```php title="app/Mail/YourMailForm.php"
<?php
...
use Swift_Mime_ContentEncoder_PlainContentEncoder;

class YourMailForm extends Mailable
{
  ...
  public function build() {
    return $this->subject('ご注文を承りました。')
            ->view('mail.your_mail_view')
            ->withSwiftMessage(function($message) {
              // 전역으로 설정한 뒤에 이 메소드를 빼보고 테스트를 못 해봤다.
              // 다음 분이 빼고 테스트 부탁드려요 : )
              $message->setCharset('iso-2022-jp')
              // 인코딩 바이트를 바꿔준다.
              ->setEncoder(new Swift_Mime_ContentEncoder_PlainContentEncoder('7bit'));
          });
  }
}
```

## mail.view

가장 중요한 것은 Mail View에서도 charset meta tag를 등록해줘야 한다는 것이다.
이 걸 세팅안하고 얼마나 삽질을 해댔는지, 없던 이두근이 생길지경.

```php title="resources/view/mail/your_mail_view.blade.php"
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=iso-2022-jp">
  </head>
  <body>
  ...
  </body>
</html>
```

이렇게 세팅을 하고 메일을 보내면 정상적으로 보내지는 걸 확인할 수 있다.

## 여담

세 가지만 기억하자.

- iso-2022-jp
- 7bit
- meta[charset="iso-2022-jp"]
