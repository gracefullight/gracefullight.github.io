---
title: "Array map, filter, values 분석"
authors: me
tags:
  - php
  - javascript
date: 2018-09-14 21:46:12
---

## Array map, filter, values 분석

아래 데이터로 php 와 js 의 다른 점을 확인해보자.
**id 가 3 이상인 id 만 추출**하고 싶었다.

```json title="users.json"
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz"
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv"
  },
  {
    "id": 3,
    "name": "Clementine Bauch",
    "username": "Samantha",
    "email": "Nathan@yesenia.net"
  },
  {
    "id": 4,
    "name": "Patricia Lebsack",
    "username": "Karianne",
    "email": "Julianne.OConner@kory.org"
  },
  {
    "id": 5,
    "name": "Chelsey Dietrich",
    "username": "Kamren",
    "email": "Lucio_Hettinger@annie.ca"
  }
]
```

### AS-IS

#### JS

머리 속으로 돌려본 원래 느낌은 이랬다.

```js
let userIdxs = users.map((user) => {
  if (user.id >= 3) {
    return user;
  }
});

// userIdxs [ null, null, 3, 4, 5 ]

userIdxs = userIdxs.filter(Boolean);

// userIdxs [ 3, 4, 5 ]
```

#### php

생각 없이 짜면 `array_map` 을 먼저 사용할 수 있다.

```php
$userIdxs = array_map(function ($user) {
  if ($user['id'] >= 3) {
    return $user['id'];
  }
}, $users);

// userIdxs [ null, null, 3, 4, 5 ]
// 참담한 결과가 나왔다.

$userIdxs = array_filter($userIdxs);

// 필터를 먹여도 id: 3의 인덱스는 2이다.
// 이걸 해결하려면 array_values 를 한번 더 사용한다.
$userIdxs = array_values($userIdxs);
// userIdxs [ 3, 4, 5 ]
```

`array_values(array_filter(array_map()))` 과 같이 호출할 수 있긴 하다.

너무 지저분했다.

### TO-BE

조금만 생각해도 FP 의 개념에 어긋남을 느낄 수 있다.
범위를 줄이고 나서 해당 값을 추출하는 게 맞다.

#### JS2

```js
const userIdxs = users.filter((user) => user.id >= 3).map((user) => user.id);

// userIdxs  [ 3, 4, 5 ]
```

#### php2

`array_values` 를 쓰지 않고도 깔끔한 코딩이 가능하다.

```php
$userIdxs = array_filter($users, function ($user) {
  return $user['id'] >= 3;
});

$userIdxs = array_map(function ($user) {
  return $user['id'];
}, $userIdxs);

// userIdxs [ 3, 4, 5 ]
```

#### lara

물론 더 멋진 방법이 있다.

```php
$userIdxs = collect($users)
  ->filter(function ($user) {
    return $user['id'] >= 3;
  })
  ->map(function ($user) {
    return $user['id'];
  })
  ->all();

// userIdxs [ 3, 4, 5 ]
```

### 여담

php, js, java, python 을 넘나들다보니 사용하는 언어의 흐름에 대한 개념이 1/n 로 줄어드는 것 같다.
