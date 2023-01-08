---
title: ecma 스펙으로 알아보는 prototype
authors: me
tags: [javascript]
date: 2021-05-01 18:16:27

---

# 개요

- prototype 은 constructor 와 상속을 이해하기 위해 필요하다.
- 여러 코드 예시를 가지고 이걸 설명하려고 하는 포스팅이 많은데 이것도 정작 중요한 스펙에 대한 내용이 다 빠져있다.

# Prototype

- [4.3.5 prototype 사양서](https://262.ecma-international.org/11.0/#sec-terms-and-definitions-prototype)의 내용은 다음과 같다.

> 다른 객체에 공유 프로퍼티를 제공하는 객체

- NOTE: 생성자가 객체를 만들 때 그 객체는 암묵적으로 생성자의 prototype 속성을 참조한다.
- 생성자의 prototype 프로퍼티는 `constructor.prototype` 에 의해 참조될 수 있고 객체의 프로토타입에 추가된 프로퍼티는 상속을 통해 프로토타입을 공유하는 모든 객체에 공유된다.
- `Object.create` 함수를 사용하여 명시적으로 지정된 프로토타입으로 객체를 만들 수 있다.

## new 실행 단계

- [9.2.2 [[Construct]] 사양서](https://262.ecma-international.org/11.0/#sec-ecmascript-function-objects-construct-argumentslist-newtarget)의 내용은 다음과 같다.

> ECMAScript의 function 객체 F에 대한 내부 메소드 `[[Construct]]` 가 argumentsList 와 newTarget 파라미터와 함께 호출된다. argumentsList 는 빈 List 가 가능하다.

1. Assert: F는 ECMAScript function object이다.
2. Assert: newTarget은 Object이다.
3. Let callerContext를 현재 execution context로 설정한다.
4. kind는 `F.[[ConstructorKind]]`로 설정한다.
5. if kind가 `base`라면
   - a. **thisArgument를 newTarget의 prototype을 가지는 새로운 객체로 설정한다.**
6. calleeContext는 `PrepareForOrdinaryCall(F, newTarget)`로 설정한다.
7. Assert: calleeContext는 이제 현재 실행 중인 execution context이다.
8. **If kind가 `base`라면, `OrdinaryCallBindThis(F, calleeContext, thisArgument)`로 this 바인딩을 한다.**
9. constructorEnv를 calleeContext의 LexicalEnvironment로 설정한다.
10. envRec를 constructorEnv의 EnvironmentRecord로 설정한다.
11. **함수 F를 argumentList로 실행한 결과를 result로 설정한다.**
12. calleeContext를 execution context stack에서 삭제하고 callerContext를 현재 execution context로 복구한다.
13. If `result.[[Type]]`이 return이면
    - a. `result.[[Value]]`가 객체이면 `result.[[Value]]`를 반환한다.
    - b. If kind가 `base`이면 thisArgument를 반환한다.
    - c. If `result.[[Value]]` 가 undefined 가 아니라면 TypeError를 발생시킨다.
14. 아니라면, result를 반환한다.
15. **EnviromnetRecord의 this를 반환한다.**

### 5.a

- 여기서 this를 newTarget의 prototype을 가지는 객체로 생성한다.
- 이 사양으로 프로토타입 체인이 실행된다.

### 8

- 위에서 생성된 객체를 this로 설정한다.

### 11

- argumentsList를 파라미터로 넘긴 생성자 함수 F로 새로운 객체를 초기화한다.

### 15

- 초기화된 this를 함수 호출의 결과로 반환한다.
- 이 사양으로 new 키워드로 실행시 `return this;` 구문이 없는데도 인스턴스가 반환된다.

## 기타 특성

- 함수 객체의 prototype은 Object.prototype에 대한 delegation link와 constructor 속성을 가진 객체의 참조를 가진다.
- constructor 속성은 함수 객체에 대한 역참조를 가지고 있다. (재귀적)
- 함수는 Function.prototype 에 대한 델리게이션 링크를 가지고 있어 apply와 call을 상속받는다.

## \_\_proto\_\_ 와 prototype 의 차이

- `__proto__` 는 내부 슬롯인 `[[Prototype]]`에 접근하는 접근자 프로퍼티다.
- 함수 객체만이 가지고 있는 `prototype` 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.
  - 따라서 화살표 함수나 메소드 축약 문법으로 생성한 함수는 프로토타입을 가지지 않는다.


# 참조

- [6.1.7.2 Object Internal Methods and Internal Slots](https://262.ecma-international.org/11.0/#table-6)
- [9.2.5 MakeConstructor](https://262.ecma-international.org/11.0/#sec-makeconstructor)
- [19.2.4.3 prototype](https://262.ecma-international.org/11.0/#sec-function-instances-prototype)
- [Additional Properties of the Object.prototype Object](https://262.ecma-international.org/11.0/#sec-additional-properties-of-the-object.prototype-object)
