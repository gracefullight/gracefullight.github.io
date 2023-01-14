---
title: Lodash 활용법
authors: me
tags: [javascript, lodash]
date: 2016-12-25 21:21:05
---

Lodash는 underscore에서 성능을 개선한 라이브러리며
IE의 하위 브라우저에서 es5, es6의 메소드를 사용할 수 있게 해줄 뿐만 아니라 통계 사용시에는 필수로 사용할 수 밖에 없다.
공식 문서를 봐도 되지만 구체적인 예시가 있어야 이해하기가 편하다 시작해보자.

# Collection

배열과 객체 모두 사용가능한 메소드

## filter

**\_.filter**( 콜렉션, 검색할 데이터 또는 콜백함수 )
콜렉션에서 해당 데이터 또는 콜백 조건에 맞는 데이터를 포함한 콜렉션을 반환한다.
리스트 검색 조건에 유용하다.

```javascript
var users = [
  { user: "barney", age: 36, active: true },
  { user: "fred", age: 40, active: false },
];

_.filter(users, (o) => !o.active);
// => [ { 'user': 'fred',   'age': 40, 'active': false } ]

// _.matches 메소드가 생략된 형태
_.filter(users, { age: 36, active: true });
// === _.filter(users, _.matches({ 'age': 36, 'active': true }))
// => [ { 'user': 'barney', 'age': 36, 'active': true } ]

// _.matchesProperty 메소드가 생략된 형태
_.filter(users, ["active", false]);
// => [ { 'user': 'fred',   'age': 40, 'active': false } ]

// _.property 메소드가 생략된 형태
_.filter(users, "active");
// => [ { 'user': 'barney', 'age': 36, 'active': true } ]
```

## reject

**\_.reject**( 콜렉션, 제외시킬 데이터 또는 콜백함수 )
콜렉션에서 해당 데이터 또는 콜백 조건에 맞는 데이터를 제외한 콜렉션을 반환한다.
Delete API를 호출 한 뒤 삭제된 결과값을 제외해서 리스트를 갱신하고 싶을 때 유용하다.

AngularJS와의 예시를 보자

```js
$scope.remove = function (data) {
  ApiService.delete(
    {
      id: data.id,
    },
    function (data) {
      // 삭제 성공시 해당 데이터를 제외한 리스트로 변경
      $scope.list = _.reject($scope.list, data);
    }
  );
};
```

## size

**\_.size**( 콜렉션 )
콜렉션의 사이즈를 반환한다. length와 같다고 생각하면 된다.

```javascript
_.size([1, 2, 3])
// => 3

_.size({ 'a': 1, 'b': 2 })
// => 2

_.size('apple'
// => 5
```

## sampleSize

**\_.sampleSize**( 콜렉션, [추출 갯수=1])
콜렉션에서 추출 갯수만큼 랜덤 값을 배열로 반환한다.

```javascript
_.sampleSize(_.range(1, 45), 7);
// => 로또 번호 추출
```

# Array

배열에 사용 가능한 메소드

## compact

**\_.compact**( 배열 )
배열에서 false, null, 0, ""(빈값), undefined, NaN의 값을 제외시킨 배열을 반환한다.

```javascript
_.compact([0, 1, false, 2, "", 3]);
// => [1, 2, 3]
```

## take

**\_.take**( 배열, [가져올 요소 수=1])
배열에서 앞에서부터 n개의 요소를 반환한다.

```javascript
_.take([3, 5, 4, 7, 9], 3);
// => [3, 5, 4]
```

## uniq

**\_.uniq**( 배열 )
배열의 중복 값을 제거한다.

```javascript
_.uniq([1, 1, 3]);
// => [1, 3]
```

## zip

**\_.zip**( 배열, 배열... )
배열의 인덱스에 따라 배열을 다시 만든다.
예제를 보는게 이해가 빠르다.

```javascript
_.zip(["a", "b"], [1, 2], [true, false]);
// => [['a', 1, true], ['b', 2, false]]
```

# Object

객체에 사용 가능한 메소드

## get

**\_.get**( 객체, 가져올 키, 기본값 )
객체에서 해당 키 값만을 가져온다.

```javascript
var object = { a: 1, b: 2, c: 3, e: { f: 5 } };

_.get(object, "a");
// => 1

_.get(object, "d");
// undefined

_.get(object, "d", 4);
// 4

_.get(object, "e.f");
// 5
```

## omit

**\_.omit**( 객체, 제외할 키 배열 )
객체에서 해당 키를 제외한 객체를 반환한다.

```javascript
var object = { a: 1, b: "2", c: 3 };

_.omit(object, ["a", "c"]);
// => { 'b': '2' }

_.omit(object, "a");
// => { 'b': '2', 'c': 3 }
```

## values

**\_.values**( 객체 )
객체에서 값만을 추출한 배열을 반환한다.

```javascript
_.values({ a: 1, b: 2, c: [3, 4] });
// => [ 1, 2, [3, 4] ]

_.values("hi");
// => ['h', 'i']
```

# Util

유틸성이 있는 메소드

## constant

**\_.constant**( 반환 값 )
반환 값을 반환해주는 함수이다.
단독으로는 거의 사용하지 않고, 다른 Lodash 함수들과 같이 사용한다.

```javascript
_.constant(0);
// => 0

_.constant({ a: 1 });
// => { a: 1 }
```

## times

**\_.times**( 반복횟수, 콜백함수 )
콜백함수 조건에 맞게 반복횟수만큼의 데이터를 배열로 반환한다.
초기화를 시킬 때 유용하다.

```javascript
_.times(3, _.constant(0));
// => [0, 0, 0]
```

## range

**\_.range**( [시작인덱스], 종료인덱스, [증가 폭=1])
배열을 초기화 시킬 때 유용하다. 단지 배열을 숫자로 초기화해야된다면 _.range가 속도면에서 _.times(n, _constant_)보다 [월등히 빠르다](https://jsperf.com/lodash-times-vs-range/1).

```javascript
_.range(0, 6, 0);
// => [0, 0, 0, 0, 0, 0]

_.range(4);
// => [0, 1, 2, 3]
```

# Why

이런 편리함이 있는데도 왜 안 쓰는지 모르겠지만, 몇 가지 이유가 더 있다

## Lazy Evaluation

[링크](http://filimanjaro.com/blog/2014/introducing-lazy-evaluation/)를 참조하자

코드로 요약하자면

```js
// 이런 구문을
var result = [],
  temp1 = [],
  temp2 = [],
  temp3 = [];

for (var i = 0; i < source.length; i++) {
  temp1[i] = func1(source[i]);
}

for (i = 0; i < source.length; i++) {
  temp2[i] = func2(temp1[i]);
}

for (i = 0; i < source.length; i++) {
  temp3[i] = func3(temp2[i]);
}

result = temp3;

// 아래처럼 바꿔 엄청난 속도 향상을 가져올 수 있다
var result = [];
for (var i = 0; i < source.length; i++) {
  result[i] = func3(func2(func1(source[i])));
}
```

## chaining

또 다른 큰 이유는 [chain](https://lodash.com/docs#chain)을 활용해 functional programming이 가능하단 것이다.
예를 들어 다음과 같은 데이터가 있다고 보자

```js title="data"
[
  {
    tag: {
      name: "tag1",
      media: {
        nodes: [
          {
            id: "uid1",
            user: "gracefullight",
            caption: "caption1",
            likes: 10,
          },
          {
            id: "uid2",
            user: "gracefullight",
            caption: "caption2",
            likes: 20,
          },
        ],
      },
    },
  },
  {
    tag: {
      name: "tag2",
      media: {
        nodes: [
          {
            id: "uid3",
            user: "gracefullight",
            caption: "caption3",
            likes: 30,
          },
          {
            id: "uid4",
            user: "gracefullight",
            caption: "caption4",
            likes: 40,
          },
        ],
      },
    },
  },
];
```

### js

이 데이터의 nodes 데이터만 가져와서 새로운 data 배열을 만들고 싶다면 어떻게 할까?
lodash를 모르는 상태라면 대충 이런식의 로직이 나온다.

```js
// for문 애호가
const data = ["위에 데이터 배열"];

let result = [];
for (let i = 0, len = data.length; i < len; i++) {
  let nodes = data[i].tag.media.nodes;

  for (let j = 0, len2 = nodes.length; j < len2; j++) {
    // 머리가 슬슬 아파진다.
  }
}

// 더 나은 방법
result = data
  .map((item) => {
    // 여기까지의 결과는 [[{}, {}], [{}, {}]] 모양이 될 것이다
    return item.tag.media.nodes;
  })
  .reduce((prev, item) => {
    // 아 여기서 난관이다. 배열을 벗기면서 내부의 오브젝트만 prev array에 push 또는 concat해줘야한다.
    return prev;
  }, []);
```

### With lodash

lodash를 사용하면 다음과 같이 직관적으로 구현이 가능하다.

```js
result = _.chain(data).map("tag.media.nodes").flatten().values()[
  // 결과는 다음과 같다
  ({ id: "uid1" }, { id: "uid2" }, { id: "uid3" }, { id: "uid4" })
];
```

# 여담

Lodash는 jQuery와 중복되는 이름을 가진 메소드가 몇 가지 있는데,
차이점은 콜백함수에서 value를 첫번째 인자로 받는다는 것이고 브라우저에서 native method를 사용할 수 있으면 그걸 사용한다는 것이다. (each를 예를들면 array.forEach)

```js
// lodash
_.each(["a", "b", "c"], (value, index, list) => {});

// jQuery
$.each(["a", "b", "c"], (index, value) => {});
```

따라서 lodash를 사용하는 것을 권한다. (속도도 더 빠르다)
