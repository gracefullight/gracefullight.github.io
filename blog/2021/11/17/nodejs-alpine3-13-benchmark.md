---
title: nodejs alpine3.13 테스트
authors: me
tags:
  - javascript
  - nodejs
  - alpine
  - docker
date: 2021-11-17 23:24:45
---

## 개요

- docker nodejs base image 에 alpine3.13 에 대한 이미지가 있어서 [릴리즈노트](https://alpinelinux.org/posts/Alpine-3.13.0-released.html)를 확인했다.
- `Node.js (LTS) is compiled with -O2 instead of -Os which noticeably improves performance.` 란 구문이 눈에 띄었다.
- noticeably improves 란 추상적인 표현은 호기심을 자극하기에 충분했다.

## 히스토리

- 처음에 빌드 플래그 변경을 제안한 사람에 따르면, 빌드 플래그 수정으로 [15% speedup 이 있을 것](https://lists.alpinelinux.org/~alpine/devel/%3C1593625212.dirkptm3b0.none%40localhost%3E)이라고 하였다.
- 이에 몇몇 알파인 패키지들이 O2 로 전환되었고, Node.js도 [2020-12-19 커밋](https://git.alpinelinux.org/aports/commit/?id=53dd8b58d838892bd9fe4849d7e239e0406e14eb)에 포함되었다.
- 여기엔 아래와 같은 코멘트가 달려있고, [v8/web-tooling-benchmark](https://github.com/v8/web-tooling-benchmark)를 사용한 것으로 보였다.

```bash
# Compiling with O2 instead of Os increases binary size by ~10%
# (53.1 MiB -> 58.6 MiB), but also increases performance by ~20%
# according to v8/web-tooling-benchmark
```

## 테스트1

- 빌드 플래그의 변경으로 nodejs 유저가 베이스 이미지의 버전을 하나 올려주는 것만으로 어플리케이션의 성능을 20% 까지 올릴 수 있다는 이야기로 보였다.
- [fastify/benchmarks](https://github.com/fastify/benchmarks) 레파지토리의 [Express.js](https://github.com/fastify/benchmarks/blob/master/benchmarks/express.js) 를 아래처럼 도커라이징했다.

### node:lts-alpine3.12

```dockerfile
# 테스트 당시 LTS === 14
FROM node:lts-alpine3.12

RUN mkdir -p /usr/src/app \
  && chown node:node -R /usr/src/app

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

USER node
RUN npm install && npm cache clean --force

COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "server.js" ]
```

### node:lts-alpine3.13

```dockerfile
# 테스트 당시 LTS === 14
FROM node:lts-alpine3.13

RUN mkdir -p /usr/src/app \
  && chown node:node -R /usr/src/app

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

USER node
RUN npm install && npm cache clean --force

COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "server.js" ]
```

### 결과1

컨테이너는 테스트되는 이미지만을 띄웠고, docker 4CPUs, 6G RAM 에서 실행했다.

`autocannon -c 100 -d 40 -p 10 localhost:3000`

부푼 기대만큼 결과가 같게 나왔으면 좋겠지만 결과 추가를 못할만큼 Latency, Req/Sec, Bytes/Sec 모든 수치에서 엎치락 뒤치락하는 모습을 보였다.

## 테스트2

- noticeably improves 는 CPU intensive Task 를 비교해봐야하는 것일까란 의문만 남았다.
- node official image 를 확인해보니 [nodejs.org의 배포본](https://github.com/nodejs/docker-node/blob/main/16/alpine3.13/Dockerfile)을 풀어 사용하는 것으로 보였다.
- 따라서 이미지를 alpine 패키지를 사용할 수 있게 재구성하고 테스트했다.

### alpine:3.13

```dockerfile
FROM alpine:3.13

RUN apk add --update nodejs npm
RUN addgroup -g 1000 node \
  && adduser -u 1000 -G node -s /bin/sh -D node \
  && mkdir -p /usr/src/app \
  && chown node:node -R /usr/src/app

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./

USER node
RUN npm install && npm cache clean --force

COPY --chown=node:node . .
EXPOSE 3000
CMD [ "node", "server.js" ]
```

### 결과2

- 더 느렸다.

## 결론

- noticeably improves, ~20% 란 문구로 인해 `fastify/benchmarks` 로직으로 도커라이징하여 테스트해보았으나 비슷한 퍼포먼스를 보여주었다.
- 위의 수치를 검증할 수 있는 테스트베드가 있다면 돌려보고 싶다. (링크 있으시면 공유부탁드립니다.)

## 참조

- Build flag 비교: [GCC Optimization Options](https://wiki.kldp.org/wiki.php/GccOptimizationOptions)
- [alpine3.13 nodejs apkbuild](https://git.alpinelinux.org/aports/tree/main/nodejs/APKBUILD?h=3.13-stable)
