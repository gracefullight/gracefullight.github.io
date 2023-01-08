---
title: Laravel 5.5 - Eloquent ORM 사용하기
authors: me
tags: [php, laravel]
date: 2017-06-06 11:49:33

---

Eloquent ORM을 사용해 데이터를 가져와보자.
[이전 포스팅](/2017/05/16/Laravel-5-4-Start/)에서 이어진다. (Eloquent ORM 기능만 필요하다면 [3.Model](#Model)부터 보면 된다)

# Migration

DBMS에 상관 없이 테이블을 똑같이 생성하기 위한 기능이다.

## 생성

artisan 명령어로 간단히 생성할 수 있다. 날짜\_테이블 형식의 파일이 database/migrations 밑에 생성된다.
**이 파일들의 자동 생성된 이름을 절대 변경하지 말자** 내부적으로 언더스코어를 *explode*해 class를 호출하기 때문에 건들면 고생한다.

```bash
# 모델을 생성하면서 같이 생성
# m 옵션을 추가한다.
$ php artisan make:model -m 모델명

# 마이그레이션만 생성
$ php artisan make:migration 마이그레이션명
```

생성 후에 up 메소드 안에 테이블을 꾸며주고 down 메소드에 테이블을 지울 때 실행할 로직을 구현한다.
컬럼 타입을 지정하는 메소드는 [여기](https://laravel.com/docs/5.4/migrations#columns)를 참조하면 된다.

```php
<?php
public function up() {
  Schema::create('table_name', function (Blueprint $table) {
    $table->increments('idx');
    $table->string('id', 20)->unique();
    $table->string('name', 30);
    $table->string('email', 100)->unique();
    $table->string('password', 250);
    $table->tinyInteger('tiny')->nullable();
    $table->timestamps();
  });
}

// 테이블에 외래키 제약조건이 걸려있을 경우 migration으로 일괄 삭제시에
// 오류가 발생하므로, 외래키 체크 옵션을 비활성화 해줘야될 수 도 있다.
public function down() {
  DB::statement('SET FOREIGN_KEY_CHECKS = 0');
  Schema::dropIfExists('table_name');
  DB::statement('SET FOREIGN_KEY_CHECKS = 1');
}
```

## 실행

php artisan migrate 명령어로 실행하면 된다.

- migrate => 전체 실행
- migrate:refresh => 다시 실행
- migrate:rollback => 마지막 migrate 시점으로 돌림
- migrate:reset => 제거

## Tinker

이미 데이터가 들어간 테이블이 있어 migrate --path로 한 파일만을 실행해야 하는데, tinker를 사용하면 더 쉽게 해당 마이그레이션을 실행시킬 수 있다.
Tinker는 커맨드로 라라벨 쉘(실행환경)으로 들어간다고 생각하면 된다.

```bash
# tinker
$ php artisan tinker

# shell로 접속된다.
Psy Shell v0.8.5 (PHP 7.0.7 ??cli) by Justin Hileman
New version is available (current: v0.8.5, latest: v0.8.8)
>>>
# blueprint 의존성을 추가해주고 (Blueprint는 up 메소드에 DI로 들어가 있기에 읽지 못한다.)
$ use Illuminate\Database\Schema\Blueprint;
# 새로 실행하려 했던 스키마를 실행시켜주기만 하면 된다.
$ Schema::create('new_table', function (Blueprint $table) {
    $table->increments('idx');
    $table->string('id', 20)->unique();
    $table->timestamps();
  });
```

DB에 해당 테이블이 생성된 걸 확인할 수 있다.

# Seed

Seed는 테이블에 필수 데이터 또는 더미 데이터를 심어주는 과정이다.
테스트에 필요한 데이터를 넣어주는데 아주 효과적이다.

## 생성

```bash
$ php artisan make:seeder 시더명
```

database/seeds 아래에 파일이 생성된다.
파일을 열어보면 run() 메소드 하나가 있는데, 여기에 시드파일이 호출될 때 실행할 로직을 구현해주면 된다.

```php database/seeds/BoardSeed.php
<?php
public function run() {
  // 모델로 생성하기
  Board::create([
    'title' => '공지',
    'author' => '관리자',
    'content' => '공지입니다'
  ]);
  // DB 파사드로 생성하기
  DB::table('board')->insert([
    'title' => '공지',
    'author' => '관리자',
    'content' => '공지입니다'
  ]);
}
```

### Faker

랜덤한 테스트용 데이터가 많이 필요하다면, 가짜(더미) 데이터를 생성해주는 [라이브러리](https://github.com/fzaninotto/Faker)를 사용할 수 있다.
링크를 따라가보면 정말 엄청난 종류의 랜덤 데이터를 생성할 수 있음에 놀랄 것이다.

faker를 사용하려면 ModelFactory를 먼저 정의해야한다.
상품 모델을 가져와 가짜 데이터 타입을 정의해보자.

```php database/factories/ModelFactory.php
<?php
$factory->define(App\Models\Product::class, function(Faker\Generator $faker){
  return [
      // 메소드는 위의 라이브러리를 참고하자.
      // 상품명을 중복되지 않게 city(도시명)으로 가져온다.
      'name' => $faker->unique()->city,
      // 색상 헥스코드를 가져온다.
      'color' => $faker->safeColorName,
      // 1000~50000원 사이의 가격을 가져온다.
      'price' => $faker->numberBetween(1000, 50000),
      // lorempixel의 랜덤 이미지를 가져온다.
      'thumbnail' => $faker->imageUrl(200, 100),
      'detail_image' => $faker->imageUrl(300, 600),
      'qty' => $faker->numberBetween(1, 1000),
      'status' => 1,
      'owner' => $faker->name,
      'sorting' => $faker->numberBetween(1, 9999)
  ];
});
```

## 실행

위에서 선언한 faker 모델을 seed에서 호출해보자.

```php database/seeds/ProductSeed.php
<?php
public function run() {
  // 두번째 인자로 실행시킬 횟수를 넣어주면 된다.
  factory(App\Models\Product::class, 100)->create();
}
```

```bash
$ php artisan db:seed
```

테이블에 상품 더미데이터가 100개 생성된 것을 확인할 수 있다.

# Model

모델은 하나의 테이블의 타입을 정해 놓은 것이라 보면 된다.
데이터를 가져오거나 넣을 때 모델에 정의된 형태로 가져온다.

## 기본 구조

아래 구조 정도만 알아두면 된다. 더 자세한건 [Eloquent Model Class](https://github.com/laravel/framework/blob/5.4/src/Illuminate/Database/Eloquent/Model.php)를 확인해보자.

```php app/Models/Board.php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Board extends Model {
  // 임의의 생성 필드가 있다면 설정해준다. (기본값 created_at)
  const CREATED_AT = 'created_dt';
  // 사용하지 않을 경우 Null로 초기화해주자. (기본값 updated_at)
  const UPDATED_AT = null;
  // 둘 다 사용하지 않을 경우 timestamps만 꺼주면 된다. (기본값 true)
  public $timestamps = false;
  // PK가 auto increment가 아닐경우 false로 바꿔준다. (기본값 true)
  public $incrementing = false;

  // PK 값을 변경한다. (기본값 id)
  protected $primaryKey = 'idx';
  // 테이블 명을 변경한다. (기본값 모델명의 복수형)
  protected $table = 'board';

  // dump insert 및 dump update가 안되는 필드를 설정한다.
  protected $guarded = [
    'idx'
  ];

  // guarded와 fillable 중 하나만 있으면 된다. (써보니 guarded가 편하더라.)
  // dump insert 및 dump update가 가능한 필드를 설정한다.
  //protected $fillable = [
  //  'title', 'content'
  //];

  // 노출시키지 않을 필드가 있을 경우
  protected $hidden = [
    'password'
  ];
}
```

## Relationship

### 1:1

hasOne과 belongsTo로 연결한다.

### 1:n

hasMany와 belongsTo로 연결한다.

### n:m

belongsToMany로 연결한다.
처음에 제일 감이 안왔던 Relationship이지만 코드를 보면 이해하기가 쉽다.
주문(Order) - 주문 상품(OrderProduct) - 상품(Product) 테이블이 있다고 가정한다. 각각 시작 - 링크(피벗) - 종료 테이블이다.

```php
<?php App/Models/Order.php

public function product(){
  // 마지막으로 연결될 모델명, 링크 테이블 명, 시작->링크를 연결시킬 인덱스, 링크->종료를 연결시킬 인덱스
  return $this->belongsToMany('App\Models\Product', 'order_product', 'order_id', 'product_id')
          // 링크 테이블의 컬럼을 가져와야할 때
          ->withPivot(['price', 'quantity']);
}
```

이렇게 정의하면 뷰에서 **order->product**를 *foreach*로 돌려 **product->product_id**처럼 접근할 수 있고
**product->pivot->price**로 pivot 테이블의 데이터도 가져올 수 있다.

### 1:1:1

이런 관계가 있을 경우에 라라벨에서 관계메소드를 직접 지원하지는 않는다.
억지로 사용하려면, `hasOne`을 두 번 사용해 연결해야하는데, Select Query를 두 번 날려야 된다는 소리다. (참을 수 없다)

[BelongsToThrough](https://github.com/znck/belongs-to-through) trait 패키지를 통해 깔끔하게 해결할 수 있다.
메소드에서 `belongsToMany`처럼 커스텀 외래키를 사용해야할 경우엔 5번째 파라미터로 **[ 클래스 => 키 ]** 형식으로 넘겨주면 된다. ([여기](https://github.com/znck/belongs-to-through/pull/25/files)의 소스를 참고하자)

## 이슈

### ORM의 Join 방식

한 방 쿼리가 불가능하다. 오직 PK를 통해 Select된 데이터들을 다시 PHP 단에서 합쳐서 보여준다.
한 방이 필요할 때는 Database에서 View를 이용하거나 DB 파사드를 써야한다.

### Composite Key

라라벨 Eloquent Model에서 복합키를 사용할 수는 없다. 편법으로 [trait를 추가](https://stackoverflow.com/questions/31415213/how-i-can-put-composite-keys-in-models-in-laravel-5)할 수 있는데 find 메소드도 overriding 해야 된다.

### Timestamps

created_at과 updated_at은 timestamps 형식이라 date_format과 같은 쿼리함수 대신 whereDate 메소드로 연산을 실행해야한다.
물론 DB에 데이터가 들어가기 전 datetime으로 해당 컬럼을 변경해주면 된다.
(timestamps의 유효기간은 2035년까지므로.)

### Group By

GroupBy를 이용한 쿼리 사용시에 **Syntax error or access violation: 1055 'table.column' isn't in GROUP BY**라는 오류 메세지가 보이며 실행이 안 되는 경우가 있다. 해당 컬럼으로 GroupBy를 하지 않았는데도 발생한다.

database config의 strict 모드 중 **ONLY_FULL_GROUP_BY** 모드가 활성화 되어있어서 그런데 이 모드만 제외를 시켜주면 된다.

```php config/database.php
<?php
'connections' => [
  'mysql' => [
    // strict 속성을 false로 바꿔준다.
    'strict' => false,
    // modes 속성을 추가해 기본 strict 옵션을 다시 추가한다.
    'modes' => [
      'STRICT_TRANS_TABLES'
      'NO_ZERO_IN_DATE'
      'NO_ZERO_DATE'
      'ERROR_FOR_DIVISION_BY_ZERO'
      'NO_AUTO_CREATE_USER'
      'NO_ENGINE_SUBSTITUTION'
    ]
  ],
```

변경 후 config:cache로 config 파일들을 다시 캐싱해주자.

## 연동

만든 모델을 선언만 하면 [Eloquent Model 메소드](https://laravel.com/docs/5.4/eloquent#inserting-and-updating-models)와 [Query Builder 메소드](https://laravel.com/docs/5.4/queries)를 사용할 수 있다.

CRUD는 다음과 같다.

```php YourController.php
<?php

use App\Model;

public function test($id) {
  // PK로 데이터 1개 반환
  Model::find($id);
  Model::where('idx', $id)->first();

  // 전체 데이터 반환
  Model::all();
  // 조건 데이터 반환
  Model::where()->get();

  // Insert
  $model = new Model;
  $model->column = '추가 값';
  $model->column2 = '추가 값2';
  $model->save();

  // Mass Insert
  Model::create([
    'column' => '추가 값',
    'column2' => '추가 값2'
  ]);

  // Bulk Insert
  Model::insert([[
    'column' => '추가 값',
    'column2' => '추가 값2'
  ], [
    'column' => '추가 값',
    'column2' => '추가 값2'
  ]]);

  // Update
  $model = Model::find($id);
  $model->column = '변경 값';
  $model->column2 = '변경 값2';
  $model->save();

  // Mass Update
  Model::where()->update([
    'column' => '변경 값',
    'column2' => '변경 값2'
  ]);

  // Delete
  Model::destory($id);
  Model::find($id)->delete();
  Model::where()->delete();
}
```

## Collection과 Model의 차이

Model에서 쓸 수 있는 메소드와 Collection에서 쓸 수 있는 메소드가 다르다.
Model Class에서 정의하는 관계 메소드들은 Model에서만 사용 가능하다.

- **Collection**: `Array<Model>` 즉 모델의 집합이다.
- **Model**: 테이블에서 하나의 행이라고 생각하자.

# Paging

모델에서 paginate 메소드를 사용하면, querystring에 page 변수가 붙어 페이징이 된다. (예를들면 /boards?page=1)
라라벨의 기본 페이징은 Bootstrap의 Class를 사용한다.

```php
<?php
// 이렇게 모델을 가지고 왔다면
Model::where()->get();

// get을 paginate로 바꿔주기만 하면 된다. (뿌려지는 list item의 기본값은 15이다.)
Model::where()->paginate(10);

// next와 prev 버튼이 없는 pagination을 구현하고 싶다면
Model::where()->simplePaginate(10);
```

페이징 뷰를 꾸미고 싶다면 아래 명령어를 실행해 **resources/views/vendor/pagination**에 view가 생기고 **default.blade.php**를 수정하면 된다.

```bash
$ php artisan vendor:publish --tag=laravel-pagination
```

## ajax pagination

실무에선 Paging 호출을 GET보단 AJAX를 쓰는게 깔끔한데 List View와 ListItem View, Controller 세부분을 모두 변경해줘야한다.
아래 소스는 jQuery를 사용하고 있다고 가정한다. (Frontend Framework를 같이 사용하고 있다면 더 깔끔하게 처리 될 수 있을듯)

### Controller

```php YourController.php
<?php
public function list(Request $request) {
  // ajax 요청일 경우에 listitem 뷰 반환
  if ($request->ajax()) {
    return view('listitem', [
      'data' => Model::where()->paginate(10);
    ]);
  // get 요청일 경우에 list 뷰 반환
  } else {
    return view('list', [
      'data' => Model::where()->paginate(10);
    ])
  }
}
```

### List view

```php list.blade.php
<div id="list">
  @include('listitem')
</div>
<script>
var paging_listener = function () {
  // 페이지 버튼에 click listener 등록
  $('.pagination a').click(function (e) {
    // a href 로 페이지가 이동하는걸 방지한다.
    e.preventDefault();
    get_list($(this).attr('href'));
  });
};

var get_list = function (url) {
  $.get(url)
  .then(function(html) {
    $('#list').html(html);
    // 페이지가 다시 그려졌으므로 listener를 다시 등록한다.
    paging_listener();
  });
};

$(function () {
  paging_listener();
});
</script>
```

### ListItem view

```php listitem.blade.php
<ul>
@foreach($data as $item)
  <li>{{ $item->name }}</li>
@endforeach
</ul>
// pagination html이 반환되어 자동으로 보여진다.
{{ $data->links() }}
```

## multiple pagination

한 페이지에 여러 리스트가 있는 경우가 종종 있다. 먼저 [paginate 메소드](https://github.com/laravel/framework/blob/5.4/src/Illuminate/Database/Query/Builder.php#L1723)를 살펴보자.

```php
<?php
/**
* Paginate the given query into a simple paginator.
*
* @param  int  $perPage
* @param  array  $columns
* @param  string  $pageName
* @param  int|null  $page
* @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
*/
public function paginate($perPage = 15, $columns = ['*'], $pageName = 'page', $page = null)
```

- **perPage**: 한 페이지에 표시될 Item 수
- **columns**: 가져올 컬럼명의 배열
- **pageName**: page 변수명 (예를들면 /boards?page=1 에서 page 변수명을 변경 가능)
- **page**: 가져올 페이지

### Controller

Controller에서 paginate 메소드를 활용해보자.

```php YourController.php
<?php
public function list(Request $request) {
  if ($request->ajax()) {
    // list1_page 값이 들어올 경우
    if ($request->has('list1_page')) {
        // list1_item 뷰에 바인딩해준다.
      return view('list1_item', [
        'data1' => $this->get_list1()
      ]);
    } else if ($request->has('list2_page')) {
      return view('list2_item', [
        'data2' => $this->get_list2()
      ]);
    }
  }

  // 메인 요청
  $data1 = $this->get_list1();
  $data2 = $this->get_list2();
  return view('list', [
    'data1' => $data1,
    'data2' => $data2
  ]);
}

protected function get_list1() {
  return Model::where()->orderBy()->paginate(5, ['*'], 'list1_page');
}

protected function get_list2() {
  return Model::where()->paginate(10, ['*'], 'list2_page');
}
```

### List view

위의 script에서 조금만 수정해주면 된다.
(list item view는 위와 동일한 코드의 반복이므로 생략)

```php list.blade.php
<div id="list1">
  @include('list1_item')
</div>
<div id="list2">
  @include('list2_item')
</div>

<script>
var paging_listener = function () {
  $('.pagination a').click(function (e) {
    e.preventDefault();
    var page = $(this).attr('href').split('?')[1];
    // page.split('=')[0]은 페이지 변수명을 가져온다.
    var paging_type = page.split('=')[0] === 'list1_page'
                      ? 'list1'
                      : 'list2';
    get_list($(this).attr('href'), paging_type);
  });
};

var get_list = function (url, target) {
  $.get(url)
  .then(function(html) {
    $(`#${target}`).html(html);
    paging_listener();
  });
};
</script>
```

# 여담

이제 DB에서 데이터를 가져오는 것까지 끝났다.
[다음 포스팅](/2017/07/09/Laravel-5-4-Login-with-Auth/)에서는 User Login을 구현해보자.
