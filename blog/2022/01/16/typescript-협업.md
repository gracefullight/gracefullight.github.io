---
title: TypeScript 협업
description: An overview of the benefits and challenges of using TypeScript in collaboration, including its popularity and ability to prevent bugs.
authors: me
tags: [typescript]
date: 2022-01-16 20:09:51
---

써본 사람은 빠져나올 수 없지만 안 써본 사람에게 필요성과 타입스크립트가 어렵지않다라는 것을 어필하기 위한 삽질기랄까..

## 앞서

- 프로그래밍 언어를 잘 쓴 다는 건 그 언어에 대한 API (man)에 익숙해지고, 업데이트 이력을 꾸준히 팔로잉 하는 것이다.
- 언어는 컴퓨터공학 (운영체제, 네트워크, 자료구조) 위에 올라간 표현의 수단이니 한 언어에 익숙하다면 다른 언어가 어렵다라고 느껴지지는 않아야한다 하지만 그렇지 않은 경우가 생각보다 많다.

## 도입 전

### 동향 관련

- StackOverflow Developer Survey 2021: Most popular Technologies [1](https://insights.stackoverflow.com/survey/2021#most-popular-technologies-language-prof)
- MS, Google [2](https://news.dartlang.org/2017/04/dart-typescript-and-official-languages.html)
- Kakao [3](https://tech.kakao.com/2020/09/21/kakao-fe-platform-team/), Naver [4](https://d2.naver.com/helloworld/2177909), Toss [5](https://toss.tech/article/toss-frontend-chapter)

### 데이터

- To Type or Not to Type: Quantifying Detectable Bugs in JavaScript: 타입스크립트 사용시 자바스크립트 프로젝트에서 발견된 버그의 15%를 컴파일 시점에 미리 방지 가능 (UCL, MS 연구) [6](https://earlbarr.com/publications/typestudy.pdf)
- JSConf Hawaii 2019 (Airbnb): 진행된 프로젝트의 사후 분석 결과, 발견된 버그의 38%가 타입스크립트에서는 방지할 수 있었던 것 [7](https://youtu.be/P-J9Eg7hJwE?t=709)

### 유지보수

- param, return type 주석 필요 없음
- 헝가리안 표기법 필요 없음
- 타입 검증으로 컴파일시 사전 오류 제거
- 항상 최신 자바스크립트 문법 지원
  - 자바스크립트의 경우 stage 를 모니터링하고 바벨 플러그인을 유지보수 해야하나, 타입스크립트는 stage-3 이상 지원 [8](https://github.com/tc39/proposals)
  - 타입스크립트의 릴리즈노트만 팔로잉
- IDE 내에서 라이브러리 인터페이스 확인 가능 (d.ts)

## 도입 후

도입 후는 항상 타입관련 문제가 많다.

### tsconfig

- `noImplicityAny: true` 를 켜야 말아야하나는 소모적인 논쟁이라 생각한다.
  - any 는 마이그레이션 단계에서만 허용되어야한다. 그 경우 `any[]`, `{ [id: string]: any }` 로 더 구체적으로 정의하는 게 낫다.
  - 모르는 타입에 대해선 `unknown` 으로 정의할 수 있고, 이를 사용하는 측에서 타입 단언으로 처리할 수 있다.
- `strict: true` 를 항상 켜야한다. [9](https://www.typescriptlang.org/ko/tsconfig#strict)
- `target` 은 es2017 이상으로 한다. 더 낮은 브라우저 지원이 필요한 경우 한 벌 더 빌드한다. [10](https://web.dev/publish-modern-javascript/)

### type vs interface

> interface 를 사용한다.

- OCP: interface 는 확장에 열려있다. [11](https://www.typescriptlang.org/ko/docs/handbook/2/everyday-types.html#타입-별칭과-인터페이스의-차이점)
- 교차 타입에서 퍼포먼스적으로 좋다. [12](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)
- 핸드북에서 권장된다. `You should prefer interface. Use type when you need specific features.` [13](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html#defining-types)

### I prefix

> 인터페이스의 I prefix 는 제거한다.

- 개인적으로 이건 자바의 잔재라고 생각한다.
- typescript-eslint/recommeneded 룰에서 삭제되었다. [14](https://github.com/typescript-eslint/typescript-eslint/issues/374)
- MS/Typescript 컨트리뷰트 가이드라인에서 권장된다. [15](https://github.com/microsoft/TypeScript/wiki/Coding-guidelines)
- Bad naming 룰이다. [16](https://stackoverflow.com/questions/31876947/confused-about-the-interface-and-class-coding-guidelines-for-typescript/41967120#41967120)

### type-only import/export

> 타입을 명시적으로 import/export 한다.

- `import` 가 반 페이지를 넘어가다보면 어떤게 class 인지, interface 인지 한 눈에 파악하기 힘드나, type-only import 구문을 사용하면 해결 된다. [17](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#type-only-imports-and-export)
- 런타임 코드 사이즈를 줄일 수 있다. [18](https://www.typescriptlang.org/tsconfig#importsNotUsedAsValues)

### Array\<Type\> vs Type[]

> typescript-eslint/array-type: array-simple 룰을 따른다.

- Array with simple type: `number[]`
- Array with non-simple type: `Array<Foo & Bar>`
- Readonly array with simple type: `readonly number[]`
- Readonly array with non-simple type: `readonly Array<Foo & Bar>` [19](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/array-type.md)

### as const vs enum vs const enum

> `as const` 를 사용한다.

- 상수 속성으로 사용하기 위한다면 as const 으로 충분하다.
  - as const 는 상수 내 재할당을 금지 (readonly property로 선언, deeply const)
  - enum 은 참조코드 생김
  - const enum 은 값이 할당

```ts title="input"
// const
export const timezone = {
  KR: "Asia/Seoul",
  JP: "Asia/Tokyo",
  VN: "Asia/Ho_Chi_Minh",
  PH: "Asia/Manila",
} as const;

// enum
export enum TimezoneAsEnum {
  KR = "Asia/Seoul",
  JP = "Asia/Tokyo",
  VN = "Asia/Ho_Chi_Minh",
  PH = "Asia/Manila",
}

// const enum
export const enum TimezoneAsConstEnum {
  KR = "Asia/Seoul",
  JP = "Asia/Tokyo",
  VN = "Asia/Ho_Chi_Minh",
  PH = "Asia/Manila",
}

// const
console.log(timezone.KR);

// enum
console.log(TimezoneAsEnum.KR);

// const enum
console.log(TimezoneAsConstEnum.KR);
```

```ts title="output"
// const
export const timezone = {
  KR: "Asia/Seoul",
  JP: "Asia/Tokyo",
  VN: "Asia/Ho_Chi_Minh",
  PH: "Asia/Manila",
};

// enum
export let TimezoneAsEnum;

(function (TimezoneAsEnum) {
  TimezoneAsEnum["KR"] = "Asia/Seoul";
  TimezoneAsEnum["JP"] = "Asia/Tokyo";
  TimezoneAsEnum["VN"] = "Asia/Ho_Chi_Minh";
  TimezoneAsEnum["PH"] = "Asia/Manila";
})(TimezoneAsEnum || (TimezoneAsEnum = {}));
// const
console.log(timezone.KR);

// enum
console.log(TimezoneAsEnum.KR);

// const enum
console.log("Asia/Seoul" /* KR */);
```

- Proposal for ECMAScript enums 이 채택될 때를 위해 enum 을 사용해야한다는 주장이 있다. [20](https://github.com/rbuckton/proposal-enum), [21](https://www.typescriptlang.org/docs/handbook/enums.html#objects-vs-enums)

#### 역참조

enums 의 역참조를 사용하는 경우는 다음과 같다.

```ts
// enum 을 역참조하는 경우
enum Color {
  RED = 0,
  ORANGE = 1,
}

// let red = Color.RED;
// Color[0] === "RED"
```

#### 문자열 열거형

JS와 TS의 동작이 달라질 수 있으므로 (런타임에서 사용방법이 달라질 수 있으므로) 리터럴의 유니온을 사용하는 게 낫다.

```ts
// type Timezone = "Asia/Seoul" | "Asia/Tokyo" | "Asia/Ho_Chi_Minh" | "Asia/Manila";
export enum Timezone {
  KR = "Asia/Seoul",
  JP = "Asia/Tokyo",
  VN = "Asia/Ho_Chi_Minh",
  PH = "Asia/Manila",
}

// getTimezone(timezone: Timezone);
// JS 에서는 정상
// TS 에서는 Asia/Seoul 형식은 Timezone 형식의 매개변수에 할당될 수 없습니다.
getTimezone("Asia/Seoul");

// import 해야 정상
import { Timezone } from "./enums";
getTimezone(Timezone.KR);
```

### ES6 Private vs Private accessor

> Private accessor 를 사용한다.

- ES6 private 은 구현을 WeakSet 으로 해놨으므로 특별한 경우가 아니라면 (윈도우에서 접근 불가능하게 해야하는 경우) 접근자로도 충분하다.

```ts title="input"
class Test {
  // #es6Private() {}

  private accessorPrivate() {}
}
```

```ts title="output"
let _Test_instances, _Test_es6Private;

class Test {
  constructor() {
    _Test_instances.add(this);
  }
  accessorPrivate() {}
}

(_Test_instances = new WeakSet()),
  (_Test_es6Private = function _Test_es6Private() {});
```

### DOM

| Type           | Example                             |
| -------------- | ----------------------------------- |
| EventTarget    | window, XMLHttpRequest              |
| Node           | document, Text, comment             |
| Element        | HTMLElement, SVGElement             |
| HTMLElement    | \<b\>, \<i\>                        |
| HTML`*`Element | HTMLButtonElement, HTMLInputElement |

- 브라우저에 라이브러리를 만드는 경우나 ref 를 사용하는 경우는 위 DOM 구조를 확실히 알아야한다.
- 이벤트 핸들러를 구현할 시 인라인함수로 만들면 타입스크립트가 타입추론을 더 쉽게 할 수 있다.
- [g-plane/typed-query-selector](https://github.com/g-plane/typed-query-selector)이 타입을 추가하여 DOM 엘레먼트 선택시 타입을 바로 반환받을 수 있다.

### 유틸리티 라이브러리

> Lodash 와 같은 유틸리티 라이브러리를 사용하자.

- 타입 흐름을 개선하고, 가독성을 높이고, 명시적인 타입 구문의 필요성을 줄이기 위해 유틸 메소드를 직접 구현하는 것보단 유틸 라이브러리를 사용하는 것이 낫다.
- [Lodash](https://github.com/lodash/lodash) 나 [RxJS](https://github.com/ReactiveX/rxjs)가 있다.

### 유틸리티 타입

- 새로운 유틸리티 타입을 지정하기 전에 [sindresorhus/type-fest](https://github.com/sindresorhus/type-fest)에서 사용할 수 있는 유틸리티 타입이 있는지 확인하자.
- 왠만한 케이스는 커버가 가능하다.

### export internal interface

> 어차피 사용측에서 가져갈 수 있으므로 미리 내보낸다.

```ts
// 선언측
interface Name {
  first: string;
  last: string;
}

interface Employee {
  name: Name;
  joined: Date;
}

export function getEmployee(name: Name): Employee;

// 사용측
type Employee = ReturnType<typeof getEmployee>;
type Name = Parameters<typeof getEmployee>[0];
```

- 위처럼 사용측에서 가져갈 수 있다.
- 내부 인터페이스는 `export interface` 로 내보내주자.

### 마이그레이션

- 의존성 관계도를 뽑아서 바텀업으로 마이그레이션한다. 첫 번째 모듈은 유틸리티 모듈일 것이다. 툴은 [madge](https://github.com/pahen/madge)
- 자동으로 도전해보고 싶다면 [airbnb/ts-migrate](https://github.com/airbnb/ts-migrate)
- 점진적으로 진행하여 타입커버리지를 직접 확인하고 싶은 경우 [plaintain-00/type-coverage](https://github.com/plantain-00/type-coverage)

## 여담

- 추가할 게 생긴다면 계속 추가해볼 예정이다.
- [Typescript/Playground](https://www.typescriptlang.org/ko/play) 로 코드를 공유하면 시간절약이 가능하다.
