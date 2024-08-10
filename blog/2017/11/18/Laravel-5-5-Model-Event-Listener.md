---
title: Laravel 5.5 - Model Event Listener
authors: me
tags: [php, laravel]
date: 2017-11-18 11:12:21
---

라라벨 이벤트 리스너 기능을 붙혀보자.
Model이 Create 될 때 이벤트 리스너를 붙혀 다른 기능을 연결하는 예제가 가장 쉽다.
(예를 들면 로그가 생성될 때 SMS를 날리는 경우)

## 이벤트 생성

### EventServiceProvider

먼저 EventServiceProvider에 내가 사용할 이벤트와 리스너를 등록해줘야한다.

```php title="app/Providers/EventServiceProvider"
<?php
...
class EventServiceProvider extends ServiceProvider
{
  protected $listen = [
    // 로그 생성시 이벤트를
    'App\Events\LogCreated' => [
      // 로그 생성됨 리스너에 연결시켜준다.
      'App\Listeners\LogCreatedListener',
    ],
  ];
```

> `$listen` 변수에 기본으로 등록되어있는 이벤트는 지워주자

### generate

이제 소스 파일을 생성시켜준다.

```bash
php artisan event:generate
```

명령어를 실행하면 `app/Events`와 `app/Listeners`에 방금 등록한 이벤트 리스너 파일이 자동으로 생성된다.

## 바인딩

### 모델

모델에서 방금 추가된 이벤트를 연결시켜주자.

```php title="app/Models/Log"
<?php
use App\Events\LogCreated;

class Log extends Model
{
  ...
  protected $dispatchesEvents = [
    // 모델이 create(insert) 되면 해당 이벤트를 호출한다.
    'created' => LogCreated::class
    // use 구문을 사용하지 않고 여기에 직접 "App\Events\LogCreated" 로 정의해도 될 것 같은데 테스트는 안 해봤다.
  ];
}
```

### 이벤트

이벤트에서 해당 모델을 연결시켜주자.

```php title="app/Events/LogCreated"
<?php
use App\Models\Log;
...

class LogCreated
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  // 리스너에서 받을 모델 변수를 public으로 생성한다.
  public $log;

  // DI
  public function __construct(Log $log)
  {
    $this->log = $log;
  }

  public function broadcastOn()
  {
    // 채널을 이용하지 않을 것이기에 빈 배열을 리턴시킨다.
    return [];
  }
}
```

## 처리

리스너에서 받은 이벤트를 처리하자.

```php title="app/Listeners/LogCreatedListener"
<?php
...
use App\Events\LogCreated;

class LogCreatedListener
{
  ...
  public function handle(LogCreated $event)
  {
    // Events의 public으로 선언한 데이터가 $event 아래로 바인딩 된다.

    $log = $event->log;
    logger('LOG Received');
    logger($log);

    // 여기서 기능을 구현하면 된다.
  }
}
```

> `ShouldQueue`로 확장해 큐에 담을 수도 있다.

## 여담

메일 발송과 비슷한 플로우였다.
