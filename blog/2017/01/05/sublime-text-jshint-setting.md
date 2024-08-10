---
title: jshint 설정 (Sublime, VSCode)
authors: me
tags: [sublimetext, jslint, javascript]
date: 2017-01-05 18:11:50
---

javascript 에서 linter 의 역활은 중요하다.
Sublime Text 나 VSCode 에서 jshint linter 를 설치하고, 기본 설정을 수정해보자.

## 설치

### Sublime

#### 모듈 설치

Sublime Linter 패키지가 선행되어야한다.

**Package Control**을 열어 [Sublime-Linter jshint](https://github.com/SublimeLinter/SublimeLinter-jshint)를 설치한다.
간단히 jshint 로 검색해도 된다.

#### jshint 설치

```bash
## 전역으로 jshint를 설치한다.
$ npm install -g jshint
```

#### 설정 경로 변경

**Preferences > Package Settings > SublimeLinter > Settings - user** 메뉴로 들어가,
"users.linters.jshint.args"에 경로를 수정한다.

```json
{
  "linters": {
    "jshint": {
      "@disable": false,
      "args": [
        // 여기에 경로를 적어준다.
        "--config=C:\\Users\\사용자\\npm\\node_modules\\jshint\\jshint_config.json"
      ],
      "excludes": []
    }
  }
}
```

### VSCode

내장되어있다.
**파일 > 기본설정 > 설정**에서 아래 속성을 만져주면 된다.

```json
{
  "jshint.options": {}
}
```

## 설정 파일

### 소스

```json
{
  "esnext": true,
  "asi": false,
  "boss": false,
  "curly": true,
  "eqeqeq": true,
  "eqnull": false,
  "evil": false,
  "expr": true,
  "forin": true,
  "funcscope": false,
  "jquery": true,
  "latedef": true,
  "lastsemic": false,
  "loopfunc": false,
  "maxerr": 10,
  "nocomma": true,
  "nonbsp": true,
  "node": true,
  "nonew": false,
  "plusplus": false,
  "regexdash": false,
  "shadow": false,
  "strict": false,
  "supernew": false,
  "trailing": false,
  "undef": false,
  "unused": false,
  "white": false,
  "withstmt": false,
  "worker": true
}
```

### 설명

- **esnext** : es6 의 구문을 사용할 수 있음
- **asi** : 세미콜론이 없을 수 있음
- **boss** : 비교문(lt, gt..)이 올 자리에 할당문(a = 1)이 올 수 있음
- **curly** : 중괄호 생략할 수 없음
- **eqeqeq** : ==를 사용할 수 없음 (===를 사용)
- **eqnull** : null 비교를 사용할 수 있음
- **evil** : eval 을 사용할 수 있음
- **expr** : 할당이나 함수호출이 아닌 표현식 사용할 수 있음 ([예제](http://stackoverflow.com/questions/6248920/expressions-in-javascript-ternary-operator-and-jslint) 참조)
- **forin** : forin 반복문 사용시 if 으로 필터링을 해줘야함
- **funcscope** : 조건문 내의 선언된 변수를 조건문 바깥에서 참조 가능

```js
function test() {
  // eslint-disable-next-line no-constant-condition
  if (true) {
    var x = 0;
  }

  x += 1; // Default: 'x' used out of scope.
  // No warning when funcscope:true
}
```

- **jquery** : jQuery 의 전역변수를 미리 정의
- **latedef** : 호출보다 늦게 정의된 변수를 금지 (호이스팅 방지)
- **lastsemic** : 한 줄짜리 블록 코드에서 마지막 세미콜론이 없을 경우만 오류
- **loopfunc** : 반복문 안에서 함수 정의 가능
- **maxerr** : 총 보여줄 오류의 갯수
- **nocomma** : comma 연산자 사용 금지
- **nonbsp** : non-breaking whitespace 금지
- **node** : 노드 환경 사용 가능
- **nonew** : new 생성자 사용 불가
- **plusplus** : 단항 증감연산자 사용 불가
- **regexdash** : 정규식에서 대괄호 안에 escape 처리 되지 않은 대쉬(-) 가능
- **shadow** : 변수 재선언 가능 (inner 또는 false, outer, true 로 설정)
- **strict** : "use-strict" 선언이 없을시 오류
- **supernew** : 잘못 작성한 생성자의 오류 표시 안함
- **trailing** : 라인 끝의 불필요한 공백이 있으면 오류
- **undef** : 선언되지 않은 변수 사용시 오류
- **unused** : 선언이 되었으나 사용되지 않는 변수에 대해 오류
- **white** : jshint 가 더글락스 크락포드의 코딩 스타일 가이드에 따라 코드를 검사
- **withstmt** : with 구문 사용 가능
- **worker** : Web Worker 사용 가능
