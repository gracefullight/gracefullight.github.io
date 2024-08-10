---
title: PWA - 서비스 워커 웹 캐싱 (Web Caching)
authors: me
tags: [javascript, pwa, serviceworker]
date: 2017-12-22 20:53:41
---

## 개요

Progressive Web App의 시대가 왔다.
Client단에서 모든 static 파일을 브라우저에 캐시를 할 수 있고 **웹을 앱처럼 오프라인**에서 작업하게 할 수 있다.
그 첫번째로 캐싱에 대해 알아보자.

## 준비

Promise, Fetch, Worker 및 Javascript 의 실행 구조, DOM 에 대한 사전지식이 필히 있어야 한다.
HTTP Cache 를 걸어봤다면 이해가 쉬울 듯 싶다.

### ServiceWorker

서비스 워커는 **브라우저가 백그라운드에서 실행하는 스크립트**이며, **클라이언트에 설치되는 프록시**다.
이 개념은 중요해서 외워야한다. **브라우저 백그라운드에서 네트워크를 가로채는 Thread** 라고 보면 된다.

웹 캐싱 뿐만 아니라 백그라운드 동기화, 웹 푸쉬 등의 기능을 처리할 수 있다. 궁금하다면 [여기](https://serviceworke.rs/)를 들어가보자. (포스팅을 다 읽고 들어가보는 걸 추천한다.)

웹 캐싱은 [CacheStorage](https://developer.mozilla.org/ko/docs/Web/API/CacheStorage)를 사용한다. Sqlite 같은 클라이언트 데이터베이스인데, Key:value 로 구성된 데이터베이스라고 보면 된다.

#### 주의

> https 환경 또는 localhost 도메인에서만 이 기능을 사용할 수 있다.

브라우저별 지원상황은 [다음](https://jakearchibald.github.io/isserviceworkerready/#service-worker-enthusiasm)과 같다 1803기준 Safari에도 Shipped가 되었다!
~~1712 기준 Safari가 아직도 Developement 상태인게 조금 아쉽다~~

#### 세팅

`sw.js`란 파일을 `public`폴더(index.html이 있는)에 생성하자.
그리고 메인 script파일에 다음과 같이 service-worker를 불러오는 구문을 추가한다.

```js
// navigator (브라우저)에 serviceWorker 기능이 있는지 확인
if ("serviceWorker" in navigator) {
  // 서비스워커 설치시 DOM 블로킹을 막아준다.
  window.addEventListener("load", function () {
    // 서비스워커를 register 하면 promise를 반환한다.
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => {
        console.log("서비스 워커가 등록되었다.");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
```

개발자도구를 열고 **Application > ServiceWorkers** 탭으로 가면 설치가 된 것을 확인할 수 있다.

![image from hexo](https://i.imgur.com/zE1BefE.png)

이렇게 뜨면 설치된 것이다.

## Basic

서비스워커에서는 `self` 키워드로 자기 자신을 접근할 수 있다. 몇 가지 static 파일들을 캐싱처리 해보자.
모던 브라우저에서만 지원이 되므로 `arrow function`을 사용해도 된다.

```js title="sw.js"
const PRE_CACHE_NAME = "캐시-스토리지1";
// 캐시하고 싶은 리소스
const urlsToCache = [
  "/public/image/image1.png",
  "/public/css/font-awesome.min.css",
];

// 서비스워커가 설치될 때
self.addEventListener("install", (event) => {
  // 캐시 등록 이벤트가 끝날 때까지 기다려
  event.waitUntil(
    // '캐시-스토리지1'을 연다.
    // @return {Promise} 연결된 Cache Database를 반환한다.
    caches
      .open(PRE_CACHE_NAME)
      .then((cache) => {
        console.log("캐시 디비와 연결됨");
        // addAll 메소드로 내가 캐싱할 리소스를 다 넣어주자.
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // 설치 후에 바로 활성화 단계로 들어갈 수 있게 해준다.
        return self.skipWaiting();
      }),
  );
});
```

이렇게 추가해주고 개발자도구의 Application 탭으로 가서 좌측 메뉴의 **Cache Storage** 를 새로고침 하면 방금 추가한 **캐시-스토리지1**에 내 이미지와 css가 등록된 걸 확인할 수 있다.

그리고 개발자도구의 Network 탭에서 호출하는 이미지의 size에 **(from ServiceWorker)**가 보인다.

## Intermediate

내용이 업데이트 되야하는 페이지나 리소스에 대해서는 동적으로 캐싱 처리를 해야한다.

### Dynamic caching

```js title="sw.js"
const DYNAMIC_CACHE_NAME = "다이나믹-캐시-스토리지1";

// fetch event는 어딘가에서 리소스를 가져올 때 모두 실행된다.
// js를 가져오거나 이미지를 가져오거나 페이지를 가져오거나 등등
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시에 있으면 repsonse를 그대로 돌려준다.
      if (response) {
        return response;
      }

      // 여기서 request를 복사해준다.
      // request는 스트림으로 fetch 당 한 번만 사용해야하기 때문이다.
      // 근데 event.request로 받아도 실행은 된다
      const fetchRequest = event.request.clone();

      // if (response) return response 구문을 하나로 합칠 수도 있다.
      // return response || fetch(fetchRequest)
      return fetch(fetchRequest).then((response) => {
        // 응답이 제대로 왔는지 체크한다.
        // 구글 문서에는 다음과 같이 처리하라고 되어있는데
        // 이 경우 Cross Site Request에 대해 캐싱 처리를 할 수가 없다.
        // if(!response || response.status !== 200 || response.type !== 'basic') {
        if (!response) {
          return response;
        }

        // 응답은 꼭 복사 해줘야한다.
        const responseToCache = response.clone();

        // 캐시 스토리지를 열고 정말 캐싱을 해준다.
        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        // 여기서 response를 내보내줘야 캐싱 처리 후에 리소스를 반환한다.
        return response;
      });
    }),
  );
});
```

### 오래된 캐시 삭제

캐시 스토리지명을 바꿔 캐시의 버전을 올리면 기존 캐시 스토리지는 삭제해줘야한다.

```js title="sw.js"
// 서비스 워커가 활성화 될 때
self.addEventListener("activate", (event) => {
  // 영구적으로 가져갈 캐시 스트리지 화이트리스트
  const cacheWhiteList = [PRE_CACHE_NAME, DYNAMIC_CACHE_NAME];

  event.waitUntil(
    // 캐시 스토리지의 모든 스토리지명을 가져온다.
    caches.keys().then((cacheNames) => {
      // 캐시를 삭제하는 건 Promise를 반환하므로 Promise.all을 사용해 끝날 시점을 잡아야한다.
      return Promise.all(
        // 이 결과는 [Promise, Promise...] 형태가 되시겠다.
        cacheNames.map((cacheName) => {
          // 각각의 캐시 스토리지명이 화이트 리스트와 같지 않을 경우
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // 캐시를 삭제하는 Promise를 배열에 추가한다.
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );

  // activate 시에는 clients claim 메소드를 호출해서
  // 브라우저에 대한 제어권을 가져와야한다.
  return self.clients.claim();
});
```

결과적으로 `DYNAMIC_CACHE_NAME`이 아닌 캐시 스토리지는 삭제된다.

### offline fallback

캐시된 페이지와 리소스는 오프라인에서도 접근이 가능하다.
여기서 오류가 발생하면 offline.html 같은 페이지로 떨어지게 할 수 있다. (마치 404 오류 페이지처럼)

```js title="sw.js"
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // ...
      })
      .catch((error) => {
        // 에러 발생시 캐시되어있는 offline.html로 이동시킨다.
        return caches.open(CACHE_NAME).then((cache) => {
          // 들어온 요청의 Accept 헤더가 text/html 을 포함하고 있다면 (페이지 요청이라면)
          if (event.request.headers.get("accept").includes("text/html")) {
            // 캐시된 offline fallback 페이지를 보여준다.
            return cache.match("/offline.html");
          }
        });
      }),
  );
});
```

## Advanced

서비스워커에 static, dynamic cache를 첨가했는데 소스가 너무 지저분하다.
직관적으로 만들어보자.

### 리팩토링

```js title="sw.js"
(() => {
  const STATIC_CACHE_NAME = "STATIC_CACHE_VERSION_1";
  const DYNAMIC_CACHE_NAME = "DYNAMIC_CACHE_VERSION_1";

  const WEB_CACHE = {
    init() {
      self.addEventListener("install", this.staticCacheStrategy.bind(this));
      self.addEventListener("activate", this.deleteOldCache.bind(this));
      self.addEventListener("fetch", this.dynamicCacheStrategy.bind(this));
    },

    staticCacheStrategy(event) {
      // 스태틱 캐싱
    },

    deleteOldCache(event) {
      // 캐시 삭제
    },

    dynamicCacheStrategy(event) {
      // 다이나믹 캐싱
    },
  };

  WEB_CACHE.init();
})();
```

IIFE를 사용해 좀 더 예쁘게 변했다.

### cross domain request

서비스워커에서 fetch로 외부 리소스를 가지고오면 `opaque` response가 반환된다.
cors 정책이 설정되어 있지 않아 아무 정보도 가지고 올 수 없는 건데, 이런 리소스만 골라서 캐싱처리를 하고 싶다면 request url이나 response content-type을 가지고 처리할 수 있다.

```js title="sw.js"
const dynamicCacheStrategy = (event) => {
  // 캐싱 처리하고 싶은 content-type
  const cacheContentsTypes = [
    "image/png",
    "image/gif",
    "image/jpeg",
    "application/font-woff",
  ];

  event.respondWith(
    caches.match(event.request).then((response) => {
      const fetchRequest = event.request.clone();

      return (
        response ||
        fetch(fetchRequest)
          .then((response) => {
            if (!response) {
              return response;
            }

            // response header에서 content-type을 가져와 비교한다.
            // 아니면 request.url이 캐싱처리를 할 외부 url인지 확인한다.
            if (
              cacheContentsTypes.indexOf(
                response.headers.get("content-type"),
              ) !== -1 ||
              event.request.url.indexOf("external.url") !== -1
            ) {
              caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request, response.clone());
              });
            }

            return response;
          })
          .catch((error) => console.log(error))
      );
    }),
  );
};
```

## WorkBox

이제 클라이언트 캐시가 어떻게 돌아가는지 확인했으니 구글에서 만든 [멋진 라이브러리](https://developers.google.com/web/tools/workbox/)를 사용해보자.

간결하고 직관적인 문법으로 위의 구문들을 예쁘게 만들 수 있다.

### Stratergy

그 전에 캐싱 전략을 알아야한다.

#### cacheFirst

![image from hexo](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/images/ss-falling-back-to-network.png)

캐시부터 요청하고 네트워크를 접근해 리소스를 보여준다.

> 오프라인을 우선적으로 보여주는 페이지에 적합하다.

#### cacheOnly

![image from hexo](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/images/ss-cache-only.png)

캐시에서만 가져온다.

> static file들이 여기에 해당된다.

#### networkFirst

![image from hexo](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/images/ss-network-falling-back-to-cache.png)

네트워크를 먼저 접근하고 오프라인일 경우 캐시를 가져온다.
이 방법은 연결이 원활하지 않거나 느린 경우 네트워크가 실패할 때까지 기다린 뒤 리소스가 보여지므로 UX에 좋지 않을 수 있다.

#### networkOnly

![image from hexo](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/images/ss-network-only.png)

캐시가 필요없는 GET 메소드가 아닌 다른 메소드가 주로 여기에 해당된다.

#### staleWhileRevalidate

![image from hexo](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/images/cm-stale-while-revalidate.png)

이 방식은 그림을 보고 이해하는게 빠르다.
캐시를 먼저 가져오고 다음 요청은 네트워크에서 요청된 리소스의 캐시를 반환한다.

> 주로 이 방식이 사용된다.

#### Cache then network

![image from hexo](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/images/ss-cache-then-network.png)

페이지가 두 개의 요청(캐시에 요청, 네트워크에 요청)을 동시에 하고 캐시된 데이터를 먼저 표시한 다음 네트워크 데이터가 도착하면 페이지를 업데이트를 한다.
WorkBox에는 없는 strategy인데 networkFirst보다 UX상 좋다고 한다.

### 설치

ServiceWorker에서는 라우팅 기능을 사용하기 위해 구글 CDN에서 제공하는 스크립트를 사용하고
Pre-Cache를 정의하기 위해 로컬에서 `workbox-cli`를 추가해야한다.

#### importScript

[importScript](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts)는 ServiceWorker 파일에서만 사용가능한 구문으로 `import`나 `require`와 같다고 보면 된다.

```js
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js",
);
```

#### workbox-cli

```bash
yarn global add workbox-cli
```

### 메소드

#### precache

프리캐시는 정적 자원들을 미리 캐싱처리해서 **Cache Only Stratergy**를 사용하는 것이다.
주로 이미지나 css, vendor-js 등을 여기에 담아준다.

workbox-cli를 설치하고 wizard 명령어를 실행하면 [config 파일](https://developers.google.com/web/tools/workbox/modules/workbox-cli#configuration)이 생성된다.

```bash
workbox wizard
```

설정을 입맛에 맞게 변경해주고 pre-cache할 파일 목록을 생성해주는 명령어를 실행하자

```bash
workbox injectManifest config.js
```

ServiceWorker에 `workbox.precaching.precacheAndRoute([])` 구문이 있다면 목록이 들어가 있는 걸 확인할 수 있다.

```js
workbox.precaching.precacheAndRoute([
  {
    url: "css/fonts/fontawesome/fontawesome-webfont.eot",
    revision: "674f50d287a8c48dc19ba404d20fe713",
  },
  {
    //...
  },
]);
```

#### Routing

WorkBox를 사용하는 이유는 바로 이 라우팅에 있다.
위에서 많은 양의 라우팅 분기 코드로 캐싱을 처리했는데 WorkBox는 다음과 같이 간결해진다.
아래는 이 블로그에 사용하고 있는 코드이다.

```js
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js",
);

// importScripts 후 타이밍 차이로 인해 모듈을 못 불러오는 경우를 방지하기 위해
// 캐싱 정책 모듈 로드를 기다린다.
workbox.loadModule("workbox-strategies");

workbox.skipWaiting();
workbox.clientsClaim();

// accept 헤더에 text/html 값이 있으면 (html 페이지 요청일 경우)
// networkFirst 캐싱
workbox.routing.registerRoute((routeData) => {
  return routeData.event.request.headers.get("accept").includes("text/html");
}, workbox.strategies.networkFirst());

// imgur 요청일 경우 cacheFirst 캐싱
workbox.routing.registerRoute(
  /.*(?:imgur)\.com.*$/,
  workbox.strategies.cacheFirst(),
);

// jsdelivr 요청일 경우 stateWhileRevalidate 캐싱
workbox.routing.registerRoute(
  /.*(?:jsdelivr)\.net.*$/,
  workbox.strategies.staleWhileRevalidate(),
);

// bootcss 요청일 경우 stateWhileRevalidate 캐싱
workbox.routing.registerRoute(
  /.*(?:bootcss)\.com.*$/,
  workbox.strategies.staleWhileRevalidate(),
);
```

코드가 너무 예뻐졌다. callback으로 Request의 모든 걸 캐치해 낼 수 있다.
더 구체적으로 쓰고 싶으면 [문서](https://developers.google.com/web/tools/workbox/guides/route-requests)를 참조하자

### 부가 기능

이 기능 말고도 다음과 같은 멋진 기능을 사용할 수 있다, 하지만 언제 쯤 써볼 수 있을지..

- [backgroundSync](https://developers.google.com/web/tools/workbox/modules/workbox-background-sync) (오프라인이 되면 큐에 데이터를 넣고 연결될 시 서버에 전송)
- [broadcastUpdate](https://developers.google.com/web/tools/workbox/modules/workbox-broadcast-cache-update) (postMessage를 사용하는 그 것 맞다)
- [cacheableResponse](https://developers.google.com/web/tools/workbox/modules/workbox-cacheable-response)

#### offline GA

오프라인에서도 [Google Analytics](https://developers.google.com/web/tools/workbox/modules/workbox-google-analytics) 를 사용할 수 있다.

한 줄의 코드만 삽입해주면 된다.

```js
workbox.googleAnalytics.initialize();
```

### Webpack

웹팩에 [WorkBox-Webpack-Plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)을 붙힐 수 있는데 아직 도전을 안 해봤다. 후술할 sw-precache를 굳이 뺄 이유가 없고, 레퍼런스도 워낙 많기에..

## sw-precache

`create-react-app`이나 `Vue-Cli`나 `@angular/cli` 모두 클라이언트 캐싱에 WorkBox 대신 이 라이브러리를 사용하고 있다. (WorkBox에서 캐싱기능만 떼어낸 라이브러리라고 보면 된다)

기본 설정을 굳이 안 건들여도 되고, `exact`해서 사용 중이라면 옵션을 [라이브러리](https://github.com/GoogleChromeLabs/sw-precache)를 한 번 쯤 봐주는 것도 나쁘지 않다.

## 참고

- [Google Web Fundementals Guides Base Technology](https://developers.google.com/web/fundamentals/primers/service-workers/)
- [Google Web Fundamentals Offline cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/)
- [WorkBox Docs](https://developers.google.com/web/tools/workbox/reference-docs/latest/)
- [WorkBox](https://github.com/GoogleChrome/workbox)
- [sw-precache](https://github.com/GoogleChromeLabs/sw-precache)

## 여담

- 기술 정리하는 건 시간이 너무 오래 걸린다.
- Redis, eTag, Vanish, SW 까지 사용하면 성능상에 이점은 있겠지만 키를 어떻게 관리해야될지가 중요할 듯
