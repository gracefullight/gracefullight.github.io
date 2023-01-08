---
title: 자바스크립트 문자열
authors: me
tags: [javascript]
date: 2020-08-08 21:14:27

---

# 문자열

> 0~65535 사이의 크기를 가지는 Immutable unsigned int16 배열이다.

# 유니코드

- 모든 언어를 16bit 로 표시하는 것이 목적이였으나 후에 21bit로 바뀌었다.
- 자바스크립트는 16비트로 표현하려던 시절에 설계되어서 간극이 있다.
- 자바스크립트는 문자를 받아 **코드 유닛**과 **코드 포인트** 둘로 나눈다.
- 유니코드는 1,114,112개의 코드 포인트를 정의하고 있으며 한 평면당 65,536 코드포인트, 총 17개의 평면으로 나뉜다.
- 원래의 평면은 BMP (Basic Multilingual Plane)라고 불리우며 나머지 16개의 평면은 나중에 추가되었다.
- BMP에 있는 코드 포인트는 하나의 코드 유닛으로 식별가능하므로 사용이 쉽지만 그 외의 문자는 써로게이트 페어를 사용해야한다.

## 써로게이트 페어

- 써로게이트 페어는 두 개의 코드 유닛으로 구성되는데, 자바스크립트에서는 1024개의 상위 써로게이트 코드유닛과 1024개의 하위 써로게이트 코드유닛이 있다.
  - 상위 써로게이트 코드유닛: 0xD800 ~ 0xDBFF
  - 하위 써로게이트 코드유닛: 0xDC00 ~ 0xDFFF
- 계산식은 `SurrogatePair = ((High - 0xD800) * 0x400) + (Low - 0xDC00) + 0x10000;`이다.
- 따라서 😃는 0x1F603 이며 D83D + DE03 이다. 
  - `"\uD83D\uDE03" === "\u{1F603}"`
  - `String.fromCharCode(55357, 56835) === String.fromCodePoint(128515);`
- 비트 연산자로도 계산이 가능한데, 코드 포인트에서 0x10000 (65,536)을 빼고 상위 10bit에 0xD800 을 더한 값과 하위 10bit에 0xDC00을 더하면 된다.
- 비트 연산의 계산식은 다음과 같다.

``` js
SurrogatePair = SurrogatePair - 0x10000;
High = 0xD800 + (SurrogatePair >> 10);
Low = 0xDC00 + (SurrogatePair & 0x3FF);
return String.fromCharCode(High, Low);
```

전세계 사람들과 대화하기 위해 필요한 문자 대부분을 **BMP**에서 찾을 수 있지만, 유니코드 프로그램을 만들 경우에는 써로게이트 페어를 항상 염두해야한다. **Unicode-aware** 로 적혀지는 듯 하다.

## 정규화

- 유니코드 문자에서는 악센트나 기타 문자를 수정할 수 있는 조합 및 수정 문자, 쓰기 방향 제어 문자 등이 포함되어있다.
- 동일한 문자처럼 보이더라도 실제로는 다를 수 있다.

``` js
// 예시 1
"S\u0307" === "Ṡ"
"S\u0307\u0323" === "Ṩ"

let s1 = "S\u0307\u0323"; // Ṩ, S + 윗 점 + 아랫 점
let s2 = "S\u0323\u0307"; // Ṩ, S + 아랫 점 + 윗 점

s1 === s2; // false
s1.normalize() === s2.normalize(); // true

// 예시 2
let umlaut = "\u00FC"; // ü
let u_diaeresis = "u\u0308"; // u + 분음부호 ü

umlaut === u_diaeresis; // false
umlaut.normalize() === u_diaeresis.normalize(); // true
```
