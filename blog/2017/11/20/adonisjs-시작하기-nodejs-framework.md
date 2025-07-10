---
title: adonisjs 시작하기 (nodejs framework)
authors: me
tags:
  - nodejs
  - javascript
date: 2017-11-20 18:53:10
---

## 개요

nodejs로 정말 간단한 _oauth2, jwt 등의 인증을 사용하지 않는_ API를 만들기에는 `express`가 정말 딱이다.

하지만 조금 더 깔끔한 코드를 원하거나 새롭지만 반복적인 기능을 넣기 위해선 더 큰 프레임워크가 필요했다.

### 조건

언제나 개발시간은 부족하기에 내가 필요한 기능들을 정리해 보았다.

- `await, async`를 아무 세팅 없이 사용해 `Promise chaining`에서 벗어나고 싶다. (`Babel`과 `Webpack`을 직접 세팅하는 시간 걸리는 짓을 안하고 싶다.)
- 기본적인 웹 보안기능 (validate, csrf, xss, injection) 및 API Throttle Request 기능이 있어야한다.
- `소셜 로그인`을 `passport`를 사용하지 않고 한 줄로 끝내고 싶었다.
- `JWT` 인증, `Log` 기능, `Bcrypt` 암호화를 직접 붙히고 싶지 않다.
- `ORM`에 맞게 E-commerce DB를 구조화했기 때문에 `ORM`이 꼭 필요하다.
- **직관**적이여야 한다. (Model과 Controller가 완벽히 나뉘는 구조를 원했다.)
- **문서화**가 완벽해야한다.
- **커뮤니티**나 **Github Issue**가 활성화 되어있어야한다.
- 관리자 기능을 SSR로 해야할 가능성이 있어 템플릿 기능이 있어야하며, `ejs`는 절대 쓰고 싶지 않고 다른 템플릿을 직접 세팅해야하는 일은 더더욱 없어야한다.

이 조건을 거르니 `adonisjs` 라는 처음 보는 프레임워크가 눈앞에 있었다.

### 성능

![image from hexo](https://raygun.com/blog/wp-content/uploads/2017/04/performance-results-1.png)

나쁘지 않다. 어차피 `nginx`에서 `reverse proxy` 처리에, `auto scaling` 걸꺼고 그래도 더 빠른 속도를 원하면 `golang`으로 가야지 왜 이 포스트를 보고있나!

- [여기](https://raygun.com/blog/node-js-performance-2017/)서 자세한 내용을 확인할 수 있다.

### 평판

이 프레임워크를 쓰는 다른 사람은 어떻게 생각할까도 궁금했다.

[Node.js broken ecosystem and rise of AdonisJs](https://medium.com/@Charles6Andy/node-js-broken-ecosystem-and-rise-of-adonisjs-46e3d63e5fcc)란 포스팅이 마음을 사로잡았다.
원문 읽을 시간이 없다면 이 글의 요약은 이 것이다.

> Why not use Express + Sequelize + Config manager + Passport + dotEnv + NodeMailer + Node Validator +30 other modules.
> How assembling 100+ modules manually can be better than a beautifully pre-configured framework?

한글로 번역하면 **왜 안 쓰시죠?** 정도가 되시겠다.

## 시작하기

### 요구사항

- Node >= 8.0
- NPM >= 3.0

1711 기준 8.9가 LTS 버전이기 때문에 그냥 쓰면 된다.

### Cli 설치

요즘 멋진 프레임워크들은 다들 cli를 가지고 있다.

```bash
yarn global add @adonisjs/cli
```

### 앱 설치

```bash
adonis new 프로젝트명
cd 프로젝트명
adonis serve --dev
```

`localhost:3333`에서 서버가 돌아간다.
![image from hexo](https://res.cloudinary.com/adonisjs/image/upload/q_100/v1502292352/welcome-page.png)

## 폴더 구조

```
.
├── ace
├── package.json
├── public
├── server.js
└── start
    ├── app.js
    ├── kernel.js
    └── routes.js
```

| 파일/폴더       | 설명                                                            |
| --------------- | --------------------------------------------------------------- |
| ace             | adonis에서 제공하는 cli 명령어 툴                               |
| package.json    | -                                                               |
| public          | css, js, images와 같은 public 리소스                            |
| server.js       | HTTP 서버를 부트스트래핑한다. `.env` 파일의 PORT 변수를 따른다. |
| start/app.js    | adonis 실행시 필요한 기능들을 부트스트래핑한다.                 |
| start/kernel.js | 미들웨어를 등록한다.                                            |
| start/routes.js | 라우팅                                                          |

## 라우팅

`start/routes.js`에서 등록한다.

### 메소드

Route 뒤에 method를 붙히면 된다.

```js
Route.get("/boards", async () => {});

Route.get("/boards/:id", async ({ params }) => {
  const board = await Board.find(params.id);
  return board;
});
```

#### 컨트롤러와 연결

```js
Route.get("boards", "BoardController.index");
/* 리소스로 사용시에 */
Route.resource("boards", "BoardController");

/* 리소스에서 create, edit 메소드를 빼고 사용시 */
Route.resource("boards", "BoardController").apiOnly();

/* 구미가 당기는 것만 사용시 */
Route.resource("boards", "BoardController").only(["index", "destroy"]);

/* 구미가 안 당기는 것을 제외할 시 */
Route.resource("boards", "BoardController").except(["index", "destroy"]);
```

### 그룹화

보통은 기능이 비슷한 것 끼리 그룹화를 해서 가독성을 높인다.

```js
/* /api/boards routes */
Route.group(() => {
  Route.get("/boards", "BoardController.index");
  Route.post("/boards", "BoardController.store");
}).prefix("api");
```

## 컨트롤러

cli에서 쉽게 생성이 가능하다.

```bash
adonis make:controller BoardController
```

### 리소스 컨트롤러

리소스가 대단한 건 아니고 미리 정의 된 메소드 7개로 RESTful API를 빠르게 만들기 위한 것이다.

```bash
adonis make:controller BoardController --resource
```

각 메소드들이 연결되는 건 다음과 같다.

- index: GET boards
- create: GET boards/create
- store: POST boards
- show: GET boards/:id
- edit: GET boards/:id/edit
- update: PUT boards/:id
- destory: DELETE boards/:id

## 모델

하나의 모델은 하나의 테이블과 매칭된다고 보면 된다.

```bash
adonis make:model Board
```

### 모델 구조

모델 생성 후에 몇 가지 설정을 해줘야한다.

```js title="Board.js"
class Board extends Model {
  // 테이블 명을 변경해야할 경우
  // (테이블 명이 모델명의 복수형이 아닐 경우)
  static get table() {
    return "board";
  }

  // 기본 커넥션이 변경될 경우
  static get connection() {
    return "mysql";
  }

  // PK 컬럼명이 id가 아닐 경우
  static get primaryKey() {
    return "uid";
  }

  // PK의 Auto Increment가 아닐 경우
  static get incrementing() {
    return false;
  }

  // 비밀번호 같은 컬럼을 보여주지 않아야 될 경우
  // 이 경우 모델에서 fetch 또는 first 메소드로 쿼리빌더를 실행해야된다
  static get hidden() {
    return ["password"];
  }

  // 생성일 컬럼이 변경될 경우
  static get createdAtColumn() {
    return "created_at";
  }

  // 업데이트일 컬럼이 변경될 경우
  static get updatedAtColumn() {
    return "updated_at";
  }
}
```

위 속성을 제외하고는 [문서](http://adonisjs.com/docs/4.0/lucid)를 참조해보자.

## 기존 코드를 내려받을 때

`.env.example` 파일을 `.env`로 복사해 환경설정을 해주고 로그를 남기기 위해 `tmp` 폴더를 생성해준다

```bash title="/"
$ cp .env.example .env
## .env 파일을 수정하고

$ mkdir tmp
```

## 여담

이 프레임워크는 라라벨 스타일로 만들어졌기 때문에 (개념이 같다) 모던 PHP 개발자가 되는 건 식은 죽 먹기가 될 수 있다.
