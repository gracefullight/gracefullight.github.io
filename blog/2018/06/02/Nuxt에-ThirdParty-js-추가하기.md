---
title: Nuxt에 ThirdParty js (particles.js) 추가하기
authors: me
tags:
  - javascript
  - nuxtjs
  - vue
date: 2018-06-02 13:42:11
---

## 시작하기 앞서

Nuxt Project 에 [Particles.js](https://vincentgarreau.com/particles.js/) 를 붙히고 싶었다.
어떻게하면 쉽게 붙힐 수 있을까 하다가 멀리 돌아오게 된 삽질기다.

## 시작

### vue-plugin 사용

[공식 문서](https://nuxtjs.org/guide/plugins/) 를 봤었고 Vue Plugin일 경우 너무나 쉽게 추가가 **가능한 것처럼** 보였다.
얼른 [vue-particles](https://github.com/creotip/vue-particles) 를 설치하고 플러그인을 만들어 등록했다.

만들고

```js title="vue-particles.js"
import Vue from "vue";
import VueParticles from "vue-particles";

Vue.use(VueParticles);
```

등록했다.

```js title="nuxt.config.js"
module.exports = {
  plugins: ["~/plugins/vue-particles"],
};
```

그런데 화면에 Particle이 보이지 않는다.

#### no-ssr

구글링을 하니, 플러그인에 no-ssr 옵션을 주면 해결이 된다고 한다.

```js title="nuxt.config.js"
module.exports = {
  plugins: [
    {
      src: "~/plugins/vue-particles",
      ssr: false,
    },
  ],
};
```

```html title="Particles.vue"
<template>
  <no-ssr>
    <vue-particles />
  </no-ssr>
</template>
```

대충 이런식으로 코딩했더니 화면에서 볼 수 있게 되었다.

그런데... IE11에서는 스크립트 오류가 발생하기 시작했다.

#### IE 오류

vue-particles 자체에 `const` 구문을 사용하고 있기 때문에, **no-ssr** 옵션을 준다면 번들링 시 로직을 건너 뛰기에, 크롬에서는 실행이 되지만 IE에서는 실행되지 않는 치명적인 오류가 발생했다.

그래서 다른 방법을 시도해봤다.

### script 삽입하기

`nuxt.config.js` 에서 `head` 태그를 이용하면 스크립트를 추가할 수 있고,
`window.particlesJS` 처럼 전역 변수로 참조하면 될 줄 알았다.

하지만 번들링 시 `window` 객체가 없어 `aframe` 벤더가 필요하다고 오류가 발생했다.
쓸데 없는 리소스를 추가해야되니 여기서 멈추었다.

## 해결

### process.browser

[window-document-undefined](https://nuxtjs.org/faq/window-document-undefined/) 문서에 따르면 이런 참조 문제를 해결할 수 있다고 한다.

```html title="Particles.vue"
<template>
  <vue-particles />
</template>
<script>
  if (process.browser) {
    require("vue-particles");
  }

  export default {
    mounted() {
      if (window.particlesJS) {
        window.particlesJS.load();
      }
    },
  };
</script>
```

위와 같이 로직을 변경해주니 IE11 에서도 정상 작동하였다.

## 여담

vue-particles 의 문서엔 완벽한 nuxt 호환이라 되어있지만 예외적인 상황이 있는 듯 하다.
