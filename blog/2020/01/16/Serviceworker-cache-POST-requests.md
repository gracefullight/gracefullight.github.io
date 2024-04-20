---
title: 서비스워커로 POST Request 캐싱하기
authors: me
tags: [javascript, pwa, serviceworker]
date: 2020-01-16 23:58:30
---

# 앞서

서비스워커로 Navigation Request 나 Static Assets 에 대한 리소스 캐시는 쉽다.
([이전 포스팅](/2017/12/22/PWA-ServiceWorker-Web-Caching/) 참조)

하지만 `POST Request` 에 대한 레퍼런스는 찾기 힘들어 결국 만들어버렸다.
복잡한 로직이지만 Request Body 를 SHA1로 해싱해 키로 IndexedDB 에 저장하고 그 키가 맞으면 꺼내주는 방식이다.

# 소스

```js
// IndexedDB 는 Promisify 되어있지 않아서 라이브러리가 필요하다.
importScripts(
  "https://cdn.jsdelivr.net/npm/localforage@1.7.3/dist/localforage.min.js",
);

// 캐시하고 싶은 POST 엔드포인트
const ENDPOINT = "https://your-domain/post-request";

const bin2Hex = (buffer) => {
  let digest = "";
  const dataView = new DataView(buffer);
  for (let i = 0, len = dataView.byteLength; i < len; i += 4) {
    const value = dataView.getUint32(i);
    // hex 로 바꾸면 패딩비트 0 이 제거된다.
    const hex = value.toString(16);
    // uint32 는 4bytes 로 나온다.
    const padding = "00000000";
    // 패딩을 더해서 뒤에서 잘라준다.
    const paddedValue = (padding + hex).slice(-padding.length);
    digest += paddedValue;
  }

  return digest;
};

const postRequestFetchListener = (fetchEvent) => {
  const requestUrl = fetchEvent.request.url;
  const method = fetchEvent.request.method.toUpperCase();
  // 맞는 엔드포인트인지 확인
  if (!(method === "POST" && requestUrl === ENDPOINT)) {
    return;
  }

  fetchEvent.respondWith(
    fetchEvent.request
      .clone()
      .arrayBuffer()
      .then((buffer) => {
        const requestBody = String.fromCharCode.apply(
          null,
          new Uint8Array(buffer),
        );
        // request body 에 원하는 조건만 캐시처리할 수 있게 한다.
        if (requestBody.includes("cache=1")) {
          // 속도면에서 다른 해싱 알고리즘을 사용해도 무방하다.
          return crypto.subtle.digest("SHA-1", buffer);
        }

        return Promise.reject();
      })
      .then((sha1Buffer) => {
        const sha1Hash = bin2Hex(sha1Buffer);
        console.log("SHA1 Hash => ", sha1Hash);

        // IndexedDB 에서 캐시된 키를 찾는다.
        return localforage.getItem(sha1Hash).then((cachedResponse) => {
          if (cachedResponse) {
            console.log("Cached repsonse => ", cachedResponse);
            return new Response(cachedResponse, {
              // 여기서 statusCode 를 304 로 내보내고 싶었으나, Body 를 반환할 수 없었다.
              status: 200,
              statusText: "OK",
              headers: {
                "Content-Length": cachedResponse.length,
                "Content-Type": "application/json",
                // 그래서 커스텀 헤더를 추가했다.
                "X-SW-Cache-Hit": 1,
                "X-SW-Cache-Type": "POST",
              },
            });
          }

          // 캐시된 데이터가 없을 경우 새로 요청한다.
          return fetch(fetchEvent.request).then((response) => {
            console.log("Fetching response => ", response.clone());

            // 정상적일 경우만 IndexedDB 에 저장한다.
            if (200 <= response.status && response.status < 400) {
              // 이 작업은 비동기지만 굳이 기다리지 않아도 된다.
              response
                .clone()
                .text()
                .then((textResponse) => {
                  console.log("Caching response => ", textResponse);
                  return localforage.setItem(sha1Hash, textResponse);
                });
            }

            return response;
          });
        });
      })
      .catch(() => fetch(fetchEvent.request)),
  );
};

// 리스너를 등록해준다.
self.addEventListener("fetch", postRequestFetchListener);
```

# 여담

- WorkBox 를 사용할 수 있다면 [CacheableResponse](https://developers.google.com/web/tools/workbox/modules/workbox-cacheable-response#caching_based_on_headers)와 CacheFirst 정책으로 단번에 처리 가능할 것이다.
- 굳이 해시를 키로 사용하지 않아도 된다. RequestBody 의 Serialize 를 키로 써도 된다. (만들면서 crypto 라이브러리를 사용해보고 싶었을 뿐)
