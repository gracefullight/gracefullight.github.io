---
title: 쿠버네티스 환경에서의 Node.js DNS Cache
authors: me
tags:
  - nodejs
  - dns
  - k8s
  - docker
date: 2020-11-30 00:06:31
---

## DNS Cache

쿠버네티스 환경에서는 Node.js 이미지를 올릴 시 종종 아래와 같은 IP 반환 에러메세지가 보인다.
이는 서비스 연결조차 불가능하게 만들어 운영에 지장을 주었다.

```bash
Error: getaddrinfo EAI_AGAIN your-service
```

먼저 Node.js 레벨에서부터 확인을 시작하였다.

### UV_THREAD_POOL_SIZE

Node.js Man 을 보면 다음과 같은 [주의사항](https://nodejs.org/dist/latest-v14.x/docs/api/dns.html#dns_dns_lookup)이 있다.

> Though the call to `dns.lookup()` will be asynchronous from JavaScript's perspective, it is implemented as a synchronous call to getaddrinfo(3) that runs on libuv's threadpool. This can have surprising negative performance implications for some applications, see the UV_THREADPOOL_SIZE documentation for more information.

연관된 _UV_HTREADPOOL_SIZE_ 문서는 다음과 같다.

> Asynchronous system APIs are used by Node.js whenever possible, but where they do not exist, libuv's threadpool is used to create asynchronous node APIs based on synchronous system APIs.

스레드 풀을 사용하는 API 는 다음과 같다.

- all fs APIs, other than the file watcher APIs and those that are explicitly synchronous
- asynchronous crypto APIs such as crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair()
- **dns.lookup()**
- all zlib APIs, other than those that are explicitly synchronous

이 메소드들을 사용할 때는 병렬 요청과 부하에 신경을 써야하며 `UV_THREADPOOL_SIZE` 사이즈를 Node.js 기본값인 **4**에서 적절히 증가시켜줘야한다.

### dns.lookup

`dns.lookup`가 비동기인척하는 동기 메소드임을 확인할 수 있었다.
보통 이 메소드를 직접 사용하는 경우는 거의 없다.

`axios` 등 http 연결을 하는 라이브러리에서 Hostname 을 IP 로 변경하기 위해 사용한다.

java 는 30s[¹](https://github.com/AdoptOpenJDK/openjdk-jdk/blob/97f8261e4190b8edf83c1d8f11ea57f6c8338284/src/java.base/share/classes/sun/net/InetAddressCachePolicy.java#L48), php 는 120s[²](https://www.php.net/manual/en/function.curl-setopt.php)의 도메인 캐시를 기본으로 제공하지만 Node.js 에서는 그런 것이 없다.

Node.js 커뮤니티에서는 [native dns lookup cache 기능이 제안](https://github.com/nodejs/node/issues/5893) 되었지만, `dns.resolve4` 와 `dns.resolve6` 에 서버에서 반환하는 `ttl` 값을 사용할 수 있게 추가되어 이걸 사용하여 DNS 캐싱을 하게 권장되었다.

### alpine

alpine 이미지에는 musl 을 사용하므로 다음과 같은 이슈가 발생할 수 있으나 해당 서비스는 그렇지 않았다.

- [docker-alpine#dns](https://github.com/gliderlabs/docker-alpine/blob/master/docs/caveats.md#dns)
- [musl#dns](https://wiki.musl-libc.org/functional-differences-from-glibc.html#Name-Resolver/DNS)

### kube-dns

남은 건 쿠버네티스 환경이었다. [kube-dns 대신 dnsmasq 를 사용하자 제안](https://github.com/kubernetes/kubernetes/issues/32749)이 있었고, [DNS intermittent delays of 5s](https://github.com/kubernetes/kubernetes/issues/56903) 이슈와 공식 문서의 [NodeLocal DNS Cache Daemonset](https://github.com/kubernetes/enhancements/blob/master/keps/sig-network/1024-nodelocal-cache-dns/README.md) 으로 이 문제를 해결할 수 있어보였다.

클러스터에서 데몬셋을 통해 캐싱된 DNS 를 리졸브하는 완전한 해결책이였으나 클라우드에는 접근 권한이 없어 이슈 내용을 공유할 수 밖에 없었다.

그렇다면 어플리케이션에서 해결할 방법을 찾아야했다.

### cacheable-lookup

Node.js 의 HTTP 모듈에서는 lookup 속성을 지원하며 이는 기본값으로 `dns.lookup` 을 사용한다.
결국 `Node.js(HTTP -> dns.lookup) -> Alpine(getaddrinfo) -> K8S(socket)` 의 어느 구간이라도 캐싱을 하면 되는 것이다.

`dns.lookup` 대신에 `dns.resolve4` 를 사용하며 `Map` 기반으로 캐시키를 관리하는 라이브러리로 [Cachable Lookup](https://github.com/szmarczak/cacheable-lookup/blob/master/source/index.js) 을 찾을 수 있었다.

`axios` 라이브러리는 lookup 속성을 지원하지 않으므로 `http.globalAgent` 에 다음과 같이 추가해야했다.

```js
import CacheableLookup from "cacheable-lookup";

const cacheable = new CacheableLookup();
cacheable.install(http.globalAgent);
```

전역 agent 를 오염시키는 느낌이라 아예 HTTP 라이브러리를 `got` 으로 변경하였다.
`got` 에서는 `dnsCache: true` 를 주어 이 기능을 [쉽게 활성화](https://github.com/sindresorhus/got/issues/661) 할 수 있었다.

## 결론

- 언어 수준에서의 DNS 캐시는 짧게나마 필요해보였다.
- `deno` 에선 [reqwest](https://docs.rs/reqwest/0.10.9/reqwest/) 모듈 위에 HTTP 를 올려놓았는데, `trust-dns` 란 DNS 캐시 모듈을 활성화하는 옵션은 [들어가있지 않았다.](https://github.com/denoland/deno/commit/35e3c06aed851f65ad0d561d73a447ab5765fc13) 따라서 쿠버네티스 환경에서 같은 오류를 뱉을지 테스트해보고 싶다.

## 참조

- [What does getaddrinfo do](https://jameshfisher.com/2018/02/03/what-does-getaddrinfo-do/)
