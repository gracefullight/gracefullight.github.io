---
title: Production ready nodejs dockerfile
authors: me
tags: [docker, nodejs]
date: 2020-06-06 13:30:01
---

## Production ready nodejs dockerfile

구글링으로 때워버린 `nodejs` 이미지라면 취약점, 실행 권한, 파드 배치에 있어 치명적이다.
그렇다면 실제환경에서 사용할 수 있을만한 이미지는 무엇일까?

### 린팅

- `hadolint` 를 사용하자.

### 취약점 분석

- `clair` 를 사용하자.

### 소스

- 모든 조건을 만족시킨 이미지는 다음과 같다.

```dockerfile
## 컨테이너를 위해 만들어진 alpine 이미지를 사용한다.
## 외부 레파지토리에 의존적인 모듈에 대해 latest 버전은 사용하지 않아야한다.
FROM node:16.13-alpine3.12

ENV HOME /usr/src/app

## tini 는 nodejs 파드를 PID 1 로 실행시켜 정상적인 종료를 가능하게 한다.
RUN apk add --no-cache tini=0.19.0-r0 \
  && mkdir -p $HOME \
  && chown node:node -R $HOME

WORKDIR $HOME
## 패키지 의존성을 먼저 설치한다.
COPY --chown=node:node package*.json ./

USER node
## node 권한으로 설치한다.
RUN npm install && npm cache clean --force

## 앱 소스를 복사한다.
COPY --chown=node:node . .
## 앱 빌드와 후처리 쉘에 권한을 준다.
RUN npm run build \
  && chmod u+x "bin/entrypoint.sh"

EXPOSE 3000
ENTRYPOINT [ "/sbin/tini", "--", "./bin/entrypoint.sh" ]
```

## 여담

- 빌드 환경과 실행 환경을 분리시켜 실제 환경에서는 `src` 폴더 없이 실행시킬 수 있다.
- 아예 단일실행파일([vercel/pkg](https://github.com/vercel/pkg)) 로 만들 수도 있다.
- deno 로 더 간단한 dockerfile 을 만들 수 있을 것 같다.

## 참조

- [hadolint/hadolint](https://github.com/hadolint/hadolint)
- [quay/clair](https://github.com/quay/clair)
