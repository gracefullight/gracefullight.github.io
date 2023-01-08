---
title: Workbox5 버전의 주요 변경사항
authors: me
tags: [javascript, pwa, serviceworker, workbox]
date: 2020-02-02 16:47:22

---

# Workbox5 버전

잘 돌던 `workbox-cli` 가 5버전 릴리즈 후부터 돌지 않아서 확인해보았다.
전체 문서는 [여기](https://developers.google.com/web/tools/workbox/guides/migrations/migrate-from-v4)서 확인 가능하다.

## injectManifest

`self.__WB_MANIFEST` 를 주입받는 방식으로 변경되었다.

``` js
// v4:
precacheAndRoute([]);

// v5:
precacheAndRoute(self.__WB_MANIFEST);
```

## NavigationRoute

blacklist, whitelist 에서 denylist, allowlist 로 키 명이 변경되었다.

## BroadcastChannel

broadcast-update 가 자체 API 에서 `postMessage()`로 변경되었다.
이벤트 리스너가 많아져 복잡해지고, 기존 API에서는 메세징의 버퍼 기능이 없었기 때문이다.

``` js
// v4:
const updatesChannel = new BroadcastChannel('api-updates');
updatesChannel.addEventListener('message', (event) => {
  const {cacheName, updatedUrl} = event.data.payload;
  // ... your code here ...
});

// v5:
// This listener should be added as early as possible in your page's lifespan
// to ensure that messages are properly buffered.
navigator.serviceWorker.addEventListener('message', (event) => {
  // Optional: ensure the message came from workbox-broadcast-update
  if (event.meta === 'workbox-broadcast-update') {
      const {cacheName, updatedUrl} = event.data.payload;
      // ... your code here ...
  }
});
```
