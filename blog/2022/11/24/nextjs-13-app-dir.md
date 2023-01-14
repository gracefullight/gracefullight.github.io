---
title: Nextjs App Directory
authors: me
tags: [javascript, typescript, react, nextjs]
date: 2022-11-24 23:16:14
---

# Nextjs App Directory

## 개요

- nextjs 13버전에서 app 디렉토리가 생기면서 client/server 컴포넌트를 쉽게 사용할 수 있는 환경이 되었다.
- `getStaticProps`, `getServerSideProps` 와 같은 메소드가 사라졌고, 양쪽이 `fetch` 로 통합이 되었다.
- 페이지별 상태 초기화를 위한 HOC 중첩을 가져가지 않아도 될 것 같았다.

## App

### Node.js + React DOM Renderer

app 내의 모든 로직은 Node.js 이다. 따라서 이런 로직이 가능하다.

```tsx title="app/page.tsx"
import { hostname } from 'os';

export default function Main() {
  return <div>{hostname()}</div>;
}
```

이벤트를 바인딩할 수 없다.

```tsx title="app/page.tsx"
import type { SyntheticEvent } from 'react';

export default function Main() {
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    console.log('submitting');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">submit</button>
    </form>
  );
}
```

```html
Error: Event handlers cannot be passed to Client Component props.
<form onSubmit="{function}" children="...">
  ^^^^^^^^^^ If you need interactivity, consider converting part of this to a
  Client Component.
</form>
```

### Design system

대부분의 디자인 시스템 라이브러리는 `ThemeProvider` 로 테마 상태를 공유하고 Baseline StyleSheet를 전역에 넣어준다.
스타일시트를 위해 [RootStyleRegistry](https://beta.nextjs.org/docs/styling/css-in-js#styled-components) 란 HOC 만들어 Baseline StyleSheet 를 동적으로 넣어주면 초기화는 가능하지만,

문제는 Server Component 내에서 use 을 사용할 수 없으니 `ThemeProvider` 로 기능동작이 불가능하다.
어찌저찌 `'use-client'` directive 로 Client Component 로 설정한다고 하여도 Provider 로 인해 하위 모든 컴포넌트가 Client Component 로 동작해야할 것이다.

그래서 문서에서 [다음과 같이 표기](https://beta.nextjs.org/docs/styling/css-in-js#configuring-css-in-js-in-app)가 된 것으로 보인다.

> If you want to style Server Components, we recommend using CSS Modules or other solutions that output CSS files, like PostCSS or Tailwind CSS.

## 결론

- 아직 app 폴더를 사용하기엔 이르다.
- [vercel/app-playground](https://github.com/vercel/app-playground)에 충분한 예시가 갖춰지고, 생태계가 React Server Component 를 충분히 지원할 때까지는 프로덕션에서 사용은 불가능하다고 보인다.

## 사견

개인적으로는 왜 이렇게 많이 클라이언트에서 렌더링해야해? 그냥 필요한 영역만 클라이언트에서 그려주면 되잖아? 라는 접근방식은 디버깅 관점에서 마음에 들진 않는다. 웹을 하나의 Client 관점에서 본다면, 설치의 유무만 다를 뿐 앱에서 서버에서 렌더링된 HTML을 받고 일정부분만을 Server Driven UI 로 가는거와 마찬가지다. 복잡도가 크게 증가한다.

이러한 시도는 이미 Dotnet, Laravel Livewire 등 다른 언어에서 많이 진행되어왔고, Remix 에서는 이미 잘 동작 중이다.
단지 React 를 서버에서 쓰기 위해 다시 MVC 시절로 회귀하려는지 모르겠다.
