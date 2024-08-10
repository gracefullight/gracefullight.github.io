---
title: Laravel 5.5 - 다형성 관계
authors: me
tags: [php, laravel]
date: 2017-08-02 23:29:36
---

댓글 테이블이 있고 이 댓글은 여러 테이블에서 사용된다고 치자.
그럼 댓글 테이블에 type과 type_id를 가져가야할 것이다.
이 때 사용할 수 있는 관계가 다형성 관계(릴레이션)인데, [공식 문서](https://laravel.com/docs/5.4/eloquent-relationships#polymorphic-relations)의 설명이 조금은 부족하다고 느꼈다. 파헤쳐보자.

## morphTo

morphTo는 type과 type_id를 가진, 여러 테이블로 연결되어야할 테이블에서 사용하는 릴레이션 메소드이다.
공식 문서에는 데이터를 가져온 뒤 릴레이션을 연결하는 예시만 있고, Eager 로딩 (With 구문을 사용하는 방법) 후 specific한 필드를 사용하게 변경하는 경우에 대한 정보는 없다.

### 기본 문법

```php title="YourModel.php"
<?php

class YourModel extends Model {
  ...

  // 다형성 관계를 가질 함수를 data로 정의했다
  public function data() {
    return $this->morphTo();
  }
}
```

이렇게 정의시에 `YourModel::with('data')->get()` 으로 호출하면 불러와져야되지만, 필드명, 모델명이 정확하지 않으면 쿼리 호출조차 되지 않는다.
(심지어 에러도 발생하지 않는다)

### 필드명 정의

먼저 morphTo의 [소스코드](https://github.com/laravel/framework/blob/5.4/src/Illuminate/Database/Eloquent/Concerns/HasRelationships.php#L133-L150)를 를 살펴보자.

```php title="morphTo"
<?php
/**
  * Define a polymorphic, inverse one-to-one or many relationship.
  *
  * @param  string  $name
  * @param  string  $type
  * @param  string  $id
  * @return \Illuminate\Database\Eloquent\Relations\MorphTo
  */
public function morphTo($name = null, $type = null, $id = null)
```

**name**, **type**, **id**를 파라미터로 받는다. 그럼 파라미터를 넘겨보자.

```php title="YourModel.php"
<?php

class YourModel extends Model {
  ...

  public function data() {
    // morphTo의 paremeter로 null, 타입필드명, 타입인덱스 필드명을 넘긴다.
    return $this->morphTo(null, 'type', 'type_idx');
  }
}
```

> 여기서 **name**엔 도대체 뭘 넣어야 되는거야? 라고 의문이 생길 수가 있다.
> 함수 내에서 **name** 변수는 `$this->getMorphs(Str::snake($name), $type, $id);` 에만 딱 한 번 사용된다.

getMorphs 함수를 따라가보자.

```php title="getMorphs"
<?php
protected function getMorphs($name, $type, $id) {
  // $type과 $id가 명시되면 그 값을 먼저 반환한다.
  return [$type ?: $name.'_type', $id ?: $name.'_id'];
}
```

주석처럼 **type**과 **id**가 명시되면 **name**값은 사용되지 않는 쓰레기 값이 되어버린다.
따라서 `null`로 넘겨주면 된다.

### 타입-모델 바인딩

타입과 인덱스를 명시하면 드디어 오류메세지가 노출된다.
내가 정의한 type명을 가진 Class가 없다 라는 내용인데, 이제 타입과 모델을 연결시켜보자.

이 때 사용할 수 있는 메소드가 [공식 문서](https://laravel.com/docs/5.4/eloquent-relationships#polymorphic-relations)에서 조금 스크롤을 내리면 있는 **Custom Polymorphic Types**에 잘 설명되어 있다.

하지만 등록하는 부분에 대한 설명이 **You may register the morphMap in the boot function of your AppServiceProvider or create a separate service provider if you wish.**라고 되어있다. 즉 AppServiceProvider에 넣던지 Service Provider로 생성이다.

한 모델에만 쓸 건데 전체에 등록을 할 필요가 없으니, 사용할 모델에 기능을 넣어보자.

```php title="YourModel.php"
// Relation을 사용해야한다.
use Illuminate\Database\Eloquent\Relations\Relation;

<?php
class YourModel extends Model {
  // 이 메소드는 모델이 initialize될 때 실행된다.
  protected static function boot() {
    parent::boot();

    // 여기에 타입 별로 모델을 바인딩한다.
    Relation::morphMap([
      // type이 product일 경우 id는 product_id를 가리킨다.
      'product' => 'App\Models\Product',
      // type이 order일 경우 id는 order_id를 가리킨다.
      'order' => 'App\Models\Order'
    ]);
  }

  public function data() {
    // morphTo의 paremeter로 null, 타입필드명, 타입인덱스 필드명을 넘긴다.
    return $this->morphTo(null, 'type', 'type_idx');
  }
}
```

완벽해졌다. 이제 오류 없이 실행되는 것을 확인할 수 있다.

## morphOne

문서 상에는 설명 되지 않은 morphOne 이란 메소드도 있다.
morphMany는 관계가 설정된 값을 배열로 반환하지만 morphOne은 하나의 데이터로 반환한다. (hasOne과 hasMany처럼)

구조는 다음과 같다.

```php
<?php
public function morphOne($related, $name, $type = null, $id = null, $localKey = null)
```

## morphToMany

## morphedByMany

## 여담

다대다 다형성 관계 메소드 (morphToMany, morphedByMany)의 경우는 나중에 사용하게 되면 정리해야겠다.
Relation 메소드들은 문서를 대충 훑고 API Docs를 직접 까보는게, 효율적인 것 같다.
