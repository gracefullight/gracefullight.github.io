---
title: react-intl로 번역 적용하기 (react i18n)
authors: me
tags: [javascript, react, react-intl]
date: 2018-01-15 16:21:41
---

리액트 앱에서 번역기능을 사용하려면 [react-intl](https://github.com/yahoo/react-intl) 패키지를 사용하면 된다.
근데 Documentation을 보면 format 기능들, HOC로 데이터를 넣는 등 여러 기능 덕에 정신이 아득하다

step by step으로 간단하게 적용해보자

## 설치

```bash
npm install react-intl
```

## 번역 데이터 생성

편의상 root에 **locale.js**로 만들었다. 서비스시엔 locale 폴더에 언어별로 파일을 나눠 관리하자.

```js title="locale.js"
export default {
  en: {
    hello: "Hello",
  },
  ko: {
    hello: "안녕하세요",
  },
  ja: {
    hello: "こんにちは",
  },
};
```

## 연동

```js title="index.js"
import { IntlProvider, addLocaleData } from "react-intl";
// 이 서브 라이브러리들이 내 locale 파일을 사용할 수 있게 해준다
import en from "react-intl/locale-data/en";
import ko from "react-intl/locale-data/ko";
import ja from "react-intl/locale-data/ja";
import locale from "./locale";

addLocaleData([...en, ...ko, ...ja]);

// 저장되어 있는 언어 데이터를 가져온다
const defaultLang = localStorage.getItem("lang") || "en";

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={defaultLang} messages={locale[defaultLang]}>
      <App />
    </IntlProvider>
  </Provider>,
  document.getElementById("root"),
);
```

## 사용

```js
import { FormattedMessage } from "react-intl";

<FormattedMessage id="hello" />;
// 저장되어 있는 언어 값에 따라 Hello, 안녕하세요, こんにちは 중 하나가 보여진다
```

### inject

placeholder 등에서 텍스트만 필요할 때 `component`를 사용하지않고 다음과 같이 intl을 주입해서 사용한다.

```jsx
import React, { Component } from "react";
import { injectIntl } from "react-intl";

class SignupForm extends Component {
  render() {
    const { intl } = this.props;

    return (
      <form>
        <input
          type="text"
          name="id"
          placeholder={intl.formatMessage({
            id: "hello",
          })}
        />
      </form>
    );
  }
}

export default injectIntl(SignupForm);
```

### child

HOC를 사용하지 않을 경우 `FormattedMessage`의 child로 번역된 문구를 받으면 된다

```js
<FormattedMessage id="hello">
  {(hello) => <input type="text" name="id" placeholder={hello} />}
</FormattedMessage>
```

### dynamic

Hello, `{Gracefullight}` 처럼 동적으로 문구가 변해야할 경우`values`prop을 활용하자
먼저,`locale.js`에서 변수가 될 부분을 {}로 감싸준다

```js title="locale.js"
export default {
  en: {
    helloUser: "Hello {user}",
  },
  ko: {
    helloUser: "{user} 안녕하세요",
  },
  ja: {
    helloUser: "{user} こんにちは",
  },
};
```

`values` 아래 object로 변수 값을 넣어주면 된다

```js
<FormattedMessage
  id="helloUser"
  values={{
    user: "Gracefullight",
  }}
/>
```

## 여담

mo, po 파일 건들던 시간들이 너무 아깝다
