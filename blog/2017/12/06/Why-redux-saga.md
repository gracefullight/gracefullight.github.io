---
title: 왜 리덕스 사가(Redux-saga) 인가?
authors: me
tags: [javascript, react]
date: 2017-12-06 09:50:37
---

`redux`, `redux-thunk`, `redux-promise-middleware`, `redux-actions`, `redux-saga` 머리가 뽀개질 지경이다. 결국엔 `redux-saga`를 써야만 했고 왜 **saga**로 수렴하게 되는지에 대한 삽질기다.

> 도대체 몇 개의 미들웨어 라이브러리를 파야하는지 화남을 포스팅했기에 _오 프론트엔드를 꾸미는데는 리액트가 최고야_ 라고 생각하는 분들에겐 마음이 안들 수도 있다.
> 정신건강을 위해 [mobx](https://github.com/mobxjs/mobx) 사용을 추천드립니다.

## 모듈의 필요성

### redux

하위, 상위 컴포넌트에 데이터를 props로 넘겨주는게 너무 관리하기 힘들어서 선택한다. 하나의 **Store**(Object)에 SPA의 모든 데이터를 보관한다. 대안으로는 Event Bus Component를 만들면 되는데, 하나의 스토어를 갖는게 그게 그거라 거의 강제된다.
redux를 적용하기에 앞서 기존 MVC 패턴에 쩌든 사상을 Flex(단방향) 패턴으로 바꾼다는게 거의 남북간 화합 수준이였다. 이 부분에 있어선 연습만이 답이다. 눈감고 코딩할 수 있을 만큼 예제 프로젝트를 반복해보자.
일단 몸에 익으면 action creator가 뭔지 왜 dispatch를 해야하고 reducer로 값을 처리해야 하는지가 뇌에서도 이해가 되는 느낌이였다. (counter 예제는 좋지 않다고 본다. shopping cart예제나 todo 예제가 더 이해하기 쉽다.)

- [Redux](https://github.com/reactjs/redux)

### redux-promise-middleware

redux에서 action의 payload를 비동기 데이터로 넘길 때를 알아서 처리해준다.
많은 포스팅이 있는데, 별 쓸모 없다. 실무에서 예제 포스팅을 따라할만한 간단한 비동기 처리 로직은 없다.

- [Redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)

### redux-thunk

하나의 action에서 여러 개의 다른 action을 호출하던지, action이 dispatch되는 걸 조작할 수 있어, 비동기 처리에도 사용한다.
멋진 라이브러리이지만 클로저 패턴을 사용해야하므로 소스가 지저분하다.
(이게 깔끔하다고 생각하면 쓰면 된다. promise then promise then chaning도 깔끔하다고 생각하다면)

- [Redux-thunk](https://github.com/gaearon/redux-thunk)

### redux-actions

action, type, reducer의 반복되는 코드를 더 깔끔하게 구현하길 원한다면 이게 답일 수 있다.
하지만 이 미들웨어는 구문적인 편의성을 제공하는 것일 뿐 비동기를 처리할 수 없어서 promise, thunk 또는 여기서 소개할 saga가 강제된다. [여기](https://github.com/reduxactions/redux-actions/issues/184)를 참조하자.

- [Redux-actions](https://github.com/reduxactions/redux-actions)

### rematch

1803 최근엔 이 모든 고민을 해결해주는 [rematch](https://github.com/rematch/rematch) 라는 라이브러리가 있다
`async/await`를 사용해 간결한 문법을 제공하는데 아직 삽질해보지 않아 소개정도만 하고 지나가겠다

## redux-saga

어떤 action은 promise payload를 뱉고, 어떤 action은 dispatch로 다른 action을 호출하고 어떤 action은 plain object를 뱉고 이런 일관성없는 짓을 계속하다보면 정말 비효율적이라는 느낌을 받는다. 안 받으셨다면 해보시면 느껴질 것이다.

더 극단적으로 든 생각은 `Vuex`를 사용하면 그냥 `mapGetters`, `mapActions` 두 함수만으로 직관적이고 디자이너도 알아볼 법한 코드로 구현이 가능한데 왜 `react`를 해야되지? 란 의문이 계속 들었다.

[Redux-saga](https://github.com/redux-saga/redux-saga)를 접하고는 드디어 state 관리의 친구를 만난 느낌이였다.
그렇다면 saga는 뭘까? 한 줄 표현만 기억해보자.

> saga란 **action에 대한 listener**이다.
> 음.. **액션 리스너**구나. 이벤트 리스너같은 것이군.

설치를 하기 전에 `redux`와 `generator`의 개념을 완벽히 이해했다고 가정한다.

### 설치

```bash
## yarn add redux react-redux
$ yarn add redux-saga
```

`create-react-app`으로 생성된 프로젝트로 폴더 구조를 다음과 같이 가져갔다.

```bash
.
├── public
└── src
    ├── components
    ├── containers
    └── store
      ├── actions
      ├── reducers
      ├── sagas
      └── types
├── package.json
├── App.js
└── index.js
```

### 연동

게시글을 가져오는 액션으로 시작해보자.
예시라 모든 코드를 해당 폴더의 index.js에 넣었다. 분리는 편하신대로 하면 되겠다.

> **빠르게 훑는 generator**
>
> - iterable (돌리고 돌릴 수 있다)
> - 비동기든 동기든 간에 `yield` 구문으로 순차적 처리가 가능하다.

#### type

```js title="types/index.js"
export const FETCH_BOARDS = "FETCH_BOARDS";
export const FETCH_BOARDS_FULFILLED = "FETCH_BOARDS_FULFILLED";
export const FETCH_BOARDS_REJECTED = "FETCH_BOARDS_REJECTED";
```

#### action

```js title="actions/index.js"
export const fetchBoards = () => ({
  type: FETCH_BOARDS,
});

// saga에서 호출하는 액션
export const fetchBoardsFulfilled = (boards) => ({
  type: FETCH_BOARDS_FULFILLED,
  payload: boards,
});

// saga에서 호출하는 액션
export const fetchBoardsRejected = (error) => ({
  type: FETCH_BOARDS_REJECTED,
  error,
});
```

action이 pure object만을 반환하는 것을 보고 있으면 아름답다는 생각이 저절로 든다.

#### reducer

```js title="reducers/index.js"
const INITIAL_STATE = {
  boards: [],
};

export default (state = INITIAL_STATE, { type, payload, error }) => {
  switch (type) {
    case FETCH_BOARDS_FULFILLED:
      return {
        ...state,
        boards: payload,
      };
    case FETCH_BOARDS_REJECTED:
      return {
        ...state,
        showError: true,
        error,
      };
    default:
      return state;
  }
};
```

#### saga

`saga`는 action을 listen(watch)한다.

```js title="saga/index.js"
import { call, spawn, put, takeEvery } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "axios";

function* fetchBoardsSaga() {
  // try catch finally 구문으로 오류 제어가 가능하다.
  try {
    // 이부분을 call 메소드를 이용해 테스트가 쉽게 바꿀 수 있다.
    // (yeild를 사용하기 때문에 next 명령어로 반복 가능하므로)
    // const { data } = yield call([axios, 'get'], '/boards')
    const { data } = yield axios.get("/boards");
    yield put(actions.fetchBoardsFulfilled(data));
  } catch (error) {
    yield put(actions.fetchBoardsRejected(error.response));
  }
}

function* watchBoard() {
  // type의 action이 실행되면 fetchBoardsSaga도 항상(Every) 실행한다
  yield takeEvery(FETCH_BOARDS, fetchBoardsSaga);
}

// 모든 listener(watcher)를 하나로 묶어준다.
// rootReducer에 묶어주는 그것과 같다고 보면 된다.
export default function* root() {
  yield spawn(watchBoard);
}
```

왜 watcher들을 `spawn`으로 묶어야하는지는 [이슈](https://github.com/redux-saga/redux-saga/issues/760)에 나와있다.
(여기엔 자동으로 saga가 재시작되는 패턴도 있는데, 아직 활용해본 적은 없다)

**action => saga => action => reducer** 로 연결되는 `saga`가 완성되었다.

#### store

스토어 담는건 각자의 취향이니 어떻게 연결하는지만 보면 된다.

```js title="store/index.js"
import createSagaMiddleware, { END } from "redux-saga";
const saga = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      inDevelopment && window.devToolsExtension
        ? window.devToolsExtension()
        : (f) => f,
    ),
  );

  store.runSaga = saga.run;
  store.close = () => store.dispatch(END);

  return store;
}
```

```js title="index.js"
const store = configureStore();
store.runSaga(rootSaga);
```

### 메소드

#### all

`yield` 구문으로 기다리는 건 순차적으로 실행되기 때문에, 동시에 실행되고 전부 `resolve`되는 패턴이 필요하다면 `all` 메소드를 사용하면 된다. (Promise.all을 생각하면 쉽다)

```js
export function* testSaga() {
  //  기존 포스팅들에는 이렇게 사용하라는 구문이 많은데
  // deprecated 경고를 뱉는다
  const [response1, response2] = yield [asyncTask1(), asyncTask2()];

  // 아래와 같이 사용하자
  const [response3, response4] = yield all([asyncTask1(), asyncTask2()]);
}
```

#### call

`Function.prototype.call()` 함수와 같다.

#### takeEvery

모든 액션시마다 실행 된다.
`GET` 메소드에 사용하자.

#### takeLatest

액션 호출시에 같은 액션이 실행 중이면 그 액션은 파기되고 마지막 호출만 실행된다.
`POST, PUT, DELETE` 같은 리소스 변경 메소드에 사용하자.

#### put

액션을 호출한다. `dispatch`라고 보면 된다.

## 다시보기

비유를 통한 설명이 좋으면 이렇게 이해해도 된다.
회사에서 주로 푸드플라이로 서브웨이를 주문하는데 거기에 빗대어 보았다.

### 1. Board를 가져오는 타입 만들기

- 서브웨이를 푸드플라이로 시킨다고 한다면
- `const 푸드플라이_서브웨이 = '푸드플라이_서브웨이'` 처럼 컴퓨터가 알 수 있게 `변수`로 행동(액션)의 종류를 설정해주는 것
- `const 푸드플라이_서브웨이_주문성공 = '푸드플라이_서브웨이_주문성공'` 처럼 주문이 완료됬을 때의 행동명도 만들 수 있다.

### 2. fetchBoards 액션 만들기

- 푸드플라이에서 주문서를 넣는 행동과 같다.
- 액션은 타입과 결과(payload)를 return하는 함수이다.
- 굳이 payload를 안 써도 되는데, 그게 예쁘다.

### 3. fetchBoards 사가 만들기

- 푸드플라이 서버에서 주문서를 처리하는 것
- 서버에서 디비 값을 바꾸고 서브웨이로 주문을 밀어넣어주는 것
- 마지막에 주문이 들어갔다는 다른 액션을 `put`으로 호출한다.

### 4. fetchBoards의 액션과 사가를 연결하기

- 주문서를 넣으면 푸드플라이의 주문서 로직을 실행해야된다는 걸 컴퓨터에게 알려주는 부분
- `takeEvery`로 감싸면 매번 주문서가 들어올 때마다 로직이 실행된다는 것
- `takeLatest`로 감싸면 매번 주문서가 들어올 때마다 마지막에 들어온 것만 실행하는 것
- `take`는 무한루프가 안 예쁘다.

### 5. fetchBoards 액션이 완료될 경우 발생하는 fetchBoardsFulfilled 액션의 리듀서를 만들기

- 서브웨이에서 주문서를 받아서 `서브웨이 멜트` 만드는 준비를 하는 부분

### 6. 리듀서에서 초기 상태 값을 업데이트 해주기

- 초기상태값은 `서브웨이 멜트`에 터키가 최소 2장, 햄 최소 2장 들어간다 같은 것
- 업데이트는 `서브웨이 멜트`를 진짜 만드는 행동

### 7. 컴포넌트(클래스)를 리덕스 스토어와 연결

### 8. Boards Prop과 fetchBoards Action을 가져오기 (map...toProps 아실 거에요)

### 9. componentDidMount, onClick에서 fetchBoards 실행

### 10. Boards.map 등 DOM에 바인딩

## 여담

- [Saga API Docs](https://redux-saga.js.org/)엔 action을 기다리는 `take` 기능 등 많은 고급 기능이 있다.
- `supervisor` 패턴으로 구성한 사람도 보이는데 아직 필요성을 잘 못 느끼겠다.
- 처음부터 `mobx`로 시작했어도 쉬웠을텐데
- saga에서 쓰는 개념들은 rx의 스트림과 비슷하게 느껴졌다.
- 2020년에는 [Redux hooks](https://react-redux.js.org/next/api/hooks)를 사용하면 된다.

> 잘 이해가 안 된다면 `mobx`를 이해하는 게 정신건강에 좋습니다.
