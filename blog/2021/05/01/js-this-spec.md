---
title: ecma 스펙으로 알아보는 this
authors: me
tags: [javascript]
date: 2021-05-01 15:04:56

---

# 개요

- this 는 함수나 스코프 기반으로 결정되는 것이 아니라 호출 방법에 따라 변경된다.
- 여러 코드 예시를 가지고 이걸 설명하려고 하는 포스팅이 많은데 이것도 정작 중요한 스펙에 대한 내용이 다 빠져있다.
- this 가 어떻게 동작하나요? 에 대한 대답은 하나다. **ECMA OrdinaryCallBindThis 사양대로 동작합니다.**

# OrdinaryCallBindThis

- [사양서](https://262.ecma-international.org/#sec-ordinarycallbindthis)의 내용은 다음과 같다.

> OrdinaryCallBindThis가 호출되었을 때 함수 F와 실행 컨텍스트 calleeContext 그리고 ECMAScript 값인 thisArgument 를 활용하여 다음 단계를 수행한다.

1. thisMode 를 `F.[[thisMode]]` 으로 설정한다.
2. if thisMode가 lexical 이면 undefined 를 반환한다.
3. calleeRealm을 `F.[[Realm]]` 으로 설정한다.
4. localEnv를 calleeContenxt 의 LexicalEnvironment 로 설정한다.
5. **if thisMode 가 "strict" 라면 thisValue 는 thisArgument 로 설정한다.**
6. **else**
   - **a. if thisArgument 가 undefined 또는 null 이면**
     - i. globalEnv를 `calleeRealm.[[GlobalEnv]]` 로 설정한다.
     - ii. globalEnvRec는 globalEnv 의 EnvironmentRecord 로 설정한다.
     - iii. Assert: globalEnvRec 는 global EnvironmentRecord 이다.
     - **iv. thisValue 를 `GlobalEnvRec.[[GlobalThisValue]]` 로 설정한다.**
   - b. else
     - **i. thisValue 를 thisArgument 를 객체로 변환 (ToObject) 하여 설정한다.**
     - ii. NOTE: ToObject는 calleeRealm을 사용하여 래퍼 객체를 생성한다.
7. envRec 를 localEnv 의 EnviromentRecord 로 설정한다.
8. Assert: envRec 는 function EnviromentRecord 이다.
9. Assert: `envRec.[[ThisBindingStatus]]`가 초기화되지 않았으므로 10번은 abrupt completion 을 반환하지 않는다.
10. envRec.BindThisValue(thisValue) 를 반환한다.

- 볼드체로 표시한 부분을 잘 보자.

## 5

- 이 사양으로 인해 `use strict` 사용시에 동작이 변경된다.

## 6.a.iv

- 이 사양으로 인해 `this` 가 `window`로 선언된다.

## 6.b.i

- 이 사양으로 인해 `this`에 값을 넘길 경우 객체로 변경된다.

# 참조

- [ECMAScript Function Objects](https://262.ecma-international.org/#sec-ecmascript-function-objects)
- [The Strict Mode of ECMAScript](https://262.ecma-international.org/#sec-strict-mode-of-ecmascript)
