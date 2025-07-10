---
title: redux-form 사용하기
authors: me
tags:
  - javascript
  - react
date: 2018-02-05 12:15:39
---

react 로 form 을 만들어 사용하는 일은 생각보다 많은 걸 해야한다.

- `onSubmit`에 이벤트를 잡아서 `event.target.fieldName.value`로 하나씩 체크를 해서 validating 을 하다가
- 귀찮아질 때 쯤 function 을 만들어서 관리를 하고
- 자주 사용하는 form input 을 컴포넌트로 만들며
- form 에 초기값을 넣어줘야할 경우 (edit 페이지 같은) 값을 가져와 하나하나 바인딩하고
- input 에 값이 바뀌었는지에 따라 submit 버튼을 활성, 비활성화 하는 로직도 있어야한다

번거로운 일을 하는 것 보다 [redux-form](https://github.com/erikras/redux-form) 라이브러리를 사용해보자
검색시에 나오는 포스트들은 아주 기본적인 예제 밖에 없어서 문서를 매번 헤집는 시간이 필요했다.

> 먼저 이 라이브러리를 쓰기 위해선 다음 사전 지식이 필요하다
>
> - [redux](https://redux.js.org/), [react-redux](https://github.com/reactjs/react-redux)
> - [HOC](https://reactjs.org/docs/higher-order-components.html)

## 설치

```bash
yarn add redux-form
```

redux-form 의 리듀서를 연결시켜줘야한다

```js title="rootReducer"
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  // form 키를 사용해야한다
  form: formReducer,
});

export default rootRecuder;
```

## 사용

redux-form component 와 redux-form 이 들어갈 compoent 를 만들어야한다
편의상 **Login component**와 **LoginForm component**라고 하자

```jsx title="Login"
import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from "LoginForm";

class Login extends Component {
  submitLoginForm = (formData) => {
    console.log("LoginFormData => ", formData);
    // this.props.loginAuth(formData)
  };

  render() {
    return <LoginForm onSubmit={this.submitLoginForm} />;
  }
}

export default connect()(Login);
```

**LoginComponent**에서는 딱히 특별한게 없이 LoginForm Component 를 호출하고 함수 하나를 내려준 게 끝이다

```jsx title="LoginForm"
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class LoginForm extends Component {
  render() {
    const {
      handleSubmit, // submit 이벤트를 redux-form에서 관리하게 수정
      pristine, // form이 변경점이 없을 경우 true
      submitting, // form이 submit 중일 경우 true
    } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="id"
          type="text"
          component="input"
          placeholder="아이디를 입력하세요"
        />
        <Field
          name="password"
          type="password"
          component="input"
          placeholder="비밀번호를 입력하세요"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "LoginForm", // formReducer에 어떤 이름으로 이 폼을 등록할지
})(LoginForm);
```

**redux-form**에서 **Field Component**와 **reduxForm High Order Component**를 가져온 뒤
input tag 대신 Field Component 의 component 속성으로 input 을 만들어준다
그리고 해당 폼을 reduxForm 으로 감싸 redux 와 연결한다

`handleSubmit`은 onSubmit prop 으로 들어온 함수를 폼과 연결해준다 (`event.preventDefault()` 및 폼의 필드들을 serialize 해서 object 로 바꿔 onSubmit 함수의 parameter 로 넘겨준다)

말이 좀 어렵다면 `Login.js`의 `submitLoginForm` 속 `console.log(formData)`의 구조를 보자

```json
{
  "id": "idValue",
  "password": "passwordValue"
}
```

오 꽤 나이스하다
하지만 필드만 덩그라니 있는 경우는 없다 더 업그레이드 해보자

### 스타일이 필요한 필드

보통의 필드들은 `label`이 들어가 있고, `selectBox`, `checkBox`의 경우엔 스타일을 주기위해 대부분 외부 라이브러리를 쓴다
이럴 때 Field Component 의 **component** 속성에 원하는 모양을 만들어서 넣어주면 된다

```jsx title="LoginForm"
...

const renderInputField = ({ input, type, label, placeholder, meta: { touched, error }}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} type={type} placeholder={placeholder} />
      { touched && error &&
        <span className="error">{error}</span>
      }
    </div>
  )
}

class LoginForm extends Component {

  render() {
    const {
      handleSubmit,
      pristine,
      submitting
    } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="id"
          type="text"
          label="아이디"
          component={renderInputField}
          placeholder="아이디를 입력하세요"
        />
        <Field
          name="password"
          type="password"
          label="비밀번호"
          component={renderInputField}
          placeholder="비밀번호를 입력하세요"
        />
      </form>
    )
  }
}
```

`renderInputField`라는 함수형 컴포넌트를 만들어서 **Field.component** prop 에 넣긴했는데, `div>input`을 렌더링 해주는 것만 보이고 엄청난 파라미터들 때문에 정신이 아득할 것이다

component prop 에 함수형 컴포넌트를 넣으면 field prop 을 받게 된다
여기엔 내려준 prop 뿐 아니라 reduxForm 에서 넣어준 prop 도 존재한다
원래 해당 렌더링 컴포넌트는 아래와 같은 모습이다

```js
const renderInputField = (field) => {
  return <div>...</div>;
};
```

그럼 먼저 reduxForm 에서 넣어준 prop 을 보자

- field.input: input 은 모든 HTML input attribute 를 가지고 있는게 아니라 다음 몇가지만 갖고 있다
  - checked
  - name
  - onBlur
  - onChange
  - onDragStart
  - onDrop
  - onFocus
  - value
- field.meta: meta 는 해당 input 의 상태에 관한 데이터가 있다
  - touched: 해당 input 이 한 번이라도 클릭이 되어졌는지
  - valid: 해당 input 값이 valid 한지
  - error: 해당 input 값에 에러가 있으면 error message 가 들어온다
  - ... 나머진 [문서](https://redux-form.com/7.2.3/docs/api/field.md/)를 참조하자

이제 _type, label, placeholder 는 field.input prop 에 없어서 직접 넣어줬고, meta 는 이미 정의되어 있었구나_ 란 renderInputField 함수의 props 가 보일 것이고 Field Component 의 구조를 마음대로 변경할 수 있게 되었다

### 동적으로 value 를 바꿔야할 때

checkbox, select 의 경우엔 스타일이 들어가면 element 의 onClick 를 잡아서 hidden field 의 데이터를 바꿔줘야한다
checkbox 전체 영역을 클릭할 때마다 기존의 값을 toggle 해주는 component 를 만들 수 있다

```jsx title="LoginForm"
const renderCheckboxField = ({ input, label }) => {
  return (
    <div onClick={(event) => input.onChange(!input.value)}>
      <i
        className={`fa ${!input.value ? "fa-square-o" : "fa-check-square-o"}`}
      />
      <label>{label}</label>
      <input type="hidden" {...input} />
    </div>
  );
};
```

value 에 따라서 [font-awesome icon](https://fontawesome.com/v4.7.0/icon/check-square-o/)이 변경된다

함수로 값을 변경해야할 경우가 있을 수도 있다
이럴 땐 reduxForm prop 의 `change` 메소드를 사용하면 된다
바꿀 input 의 name 속성과 value 값을 넘겨주자

```js
changeInputValue = (targetInputName, val) => {
  this.props.change(targetInputName, val);
};
```

### 초기값

로그인 폼에는 **아이디 저장** 기능을 붙히면 폼이 초기화될 때 그 값을 가져와야한다

```jsx title="Login"
...

class Login extends Component {
  state = {
    userId: ''
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId')

    this.setState({
      userId
    })
  }

  render() {
    return (
      <LoginForm
        onSubmit={this.submitLoginForm}
        initialValues={{
          id: this.state.userId
        }}
      />
    )
  }
}
```

Login Component 에는 초기값을 가져와서 **initialValues** prop 안에 넣어준다

```jsx title="LoginForm"
class LoginForm extends Component {
  render() {
    return <form>...</form>;
  }
}

export default reduxForm({
  form: "LoginForm",
  // 이 값은 LoginForm 컴포넌트가 로드되고 나서
  // initialValues가 바뀔 경우 폼 값도 업데이트가 되야되는지의 여부이다
  enableReinitialize: true,
})(LoginForm);
```

`localStorage.userId`에 값이 들어있다면 그 값으로 id Field 가 초기화 된다
컴포넌트가 로딩되기 전에 값이 정해져있다면 `enableReinitialize` 옵션이 없어도 되지만, 수정 폼처럼 기존 데이터 fetch 후 또는 componentDidMount 후에 값을 가져온다면 해당 옵션값을 `true`로 넣어줘야한다

### validation

여기까지 이해했다면 validation 은 큰 어려움 없이 [문서](https://redux-form.com/7.2.3/examples/asyncchangevalidation/)의 예제소스를 참조하면 붙힐 수 있다

## 여담

react 라이브러리들은 읽은 뒤 바로 적용하긴 힘들다고 생각한다 매번 삽질이 필요한듯
