---
title: React 시작하기
authors: me
tags: [javascript, react]
date: 2016-12-23 14:38:04
---

# ES6 과 this binding 에 대한 이해

ES5 스타일로 React 를 사용할 수 있지만 JSX 를 사용하기에 한 번은 컴파일이 필요하다.
따라서 ES6 의 문법을 사용하는게 낫다. (직관적이기도 하고)
그래서 ES6 의 문법이 익숙해져야하고, javascript 에서 this 를 왜 바인딩 하는지에 대한 이해가 필요하다.

# JSX 이란

React 를 제대로 사용하기 위해서는 JSX 라는 새로운 구문(확장자)로 javascript 를 짜야하는데,
JSX 는 **XML 스타일의 자바스크립트 표현식**이라고 생각하면 된다.
브라우저에서 돌아가게 하려면 순수한 자바스크립트 형태가 되어야 하기 때문에 컴파일이 필요하다.

React 구버전은 JSXTranspiler 를 통해 변환을 했는데, 지금은 지원하지 않고
[Babel](https://babeljs.io/)을 사용해 컴파일 해야한다.

# Babel 이란

Babel 은 ES6 의 구문을 구버전의 브라우저에서 사용할 수 있게 컴파일해주는 자바스크립트 컴파일러라고 생각하면 된다. 추가적으로 JSX 도 컴파일해준다.

NodeJS 환경에서는 Gulp 를 이용해 자동으로 컴파일이 되게 설정할 수 있지만,
브라우저에서 단독으로 사용할 수 있게 해보는 방법을 알아보자.

## 설치

```bash
# bower
$ bower install babel-standalone --save
# npm
$ npm install babel-standalone --save
```

또는 [여기서](https://github.com/babel/babel-standalone) 직접 받는다.

# React

## 설치

```bash
# bower
$ bower install react --save
# npm
$ npm install react --save
```

또는 [여기서](https://github.com/facebook/react) 직접 받는다.

## 실행

```html
<script src="/bower_components/babel-standalone/babel.min.js"></script>
<script src="/bower_components/react/react.min.js"></script>
<script src="/bower_components/react/react-dom.min.js"></script>

<script type="text/babel" src="/react_login_form.jsx"></script>
```

babel 과 react, 데이터 바인딩을 위한 react-dom 을 가져온다.

그리고 react_login_form.jsx 를 **text/babel** 타입으로 가져오면 된다.

## 예제

```js
// 리액트에 넣을 모듈을 선언한다.
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '', pw: '' };
  }

  // input의 데이터가 변할 때 state의 값이 변경할 수 있게한다
  handleChange(key, event) {
    this.state[key] = event.target.value;
    this.setState(this.state);
  }

  handleSubmit(event) {
    console.log(this.state);
    // 여기에 ajax 호출을 구현하면 된다
    // $.ajax().then(function(){
    //    this.setState와 같은 상태변경 처리
    // }.bind(this));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        아이디 :
        <input
          type="text"
          value={this.state.id}
          onChange={this.handleChange.bind(this, 'id')}
        />
        비밀번호 :
        <input
          type="password"
          value={this.state.pw}
          onChange={this.handleChange.bind(this, 'pw')}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// LoginForm class를 id="login"에 render
ReactDOM.render(<LoginForm />, document.getElementById('login'));
```

# 여담

주관적으론 데이터 바인딩을 위해서만 사용하려면 [Vue](https://vuejs.org/)를 사용하는게,
완벽한 SPA 를 만들고 싶다면 역시 [Angular2](https://angular.io/docs/ts/latest/)가 답인듯 싶다.

추가로 [React 와 Angular2 의 비교](https://sculove.github.io/blog/2016/07/11/react%EB%B3%B4%EB%8B%A4-angular2%EC%97%90-%EB%8D%94-%EC%A3%BC%EB%AA%A9%ED%95%B4%EC%95%BC%ED%95%98%EB%8A%94-%EC%9D%B4%EC%9C%A0/)를 보길 원한다.
