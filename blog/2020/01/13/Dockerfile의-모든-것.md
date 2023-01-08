---
title: Dockerfile의 모든 것
authors: me
tags: [k8s, docker, notes]
date: 2020-01-13 22:36:44

---

# 인스트럭션

- **FROM**: 빌드하는 이미지의 기반 이미지 지정
- **RUN**: 이미지 빌드 시 컨테이너에서 실행할 명령어 정의
- **COPY**: 호스트에서 컨테이너로 파일 및 디렉토리 복사
- **ADD**: COPY + 압축 해제 + URL 다운로드
  - 운영 체제를 담은 기반 이미지를 만드는 경우처럼 특수한 경우에만 사용하면 된다.
  - 안정성 보장이 되지 않으므로 COPY 를 사용하자.
- **CMD**: 컨테이너에서 foreground로 실행할 명령어 정의
- **ENTRYPOINT**: 컨테이너를 실행 가능 파일로 사용할 때 정의하는 명령
  - CMD 와 ENTRYPOINT 둘 다 사용 가능
- **ARG**: docker image build를 실행할 때 사용하는 변수
- **ENV**: 컨테이너 안의 환경변수 정의
- **EXPOSE**: 컨테이너가 노출하는 포트
- **VOLUME**: 호스트나 다른 컨테이너에서 마운트할 수 있는 포인트 생성
- **LABEL**: 이미지에 추가하는 메타데이터
- **STOPSIGNAL**: 컨테이너에 전달되면 컨테이너를 종료하는 시스템 시그널 설정
- **HEALTHCHECK**: 컨테이너 안에서 명령을 실행 후 결과를 헬스 체크에 사용
- **USER**: 컨테이너 실행 시 컨테이너 사용자
  - 이미지 빌드시 USER 뒤에 나오는 RUN 인스트럭션도 해당 사용자의 권한으로 실행된다.
- **WORKDIR**: 컨테이너의 작업 디렉토리
- **ONBUILD**: 컨테이너 안에서 실행되는 명령 정의, 이미지에서 실행되지 않는다.
  - ONBUILD 를 정의한 이미지를 기반 이미지로 삼아 다른 이미지를 빌드할 때 실행된다.

# 이미지

## 린팅

[hadolint](https://github.com/hadolint/hadolint) 를 설치해 [Dockerfile best practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/) 에 기반해 이미지를 생성했는지 검증하자.

## 기반 이미지

- scratch: 아무 것도 없는 이미지
  - https 통신이 필요한 경우 cacert.pem 을 /etc/ssl/certs 에 추가해야한다.
  - 디버깅도 힘들다
- busybox: 기본 유틸리티 (echo, ls 등) 이 있는 이미지
  - 패키지 관리자가 없다.
  - 디버깅은 좀 낫다.
- alpine: busybox 기반으로 4MB 지만 `apk` 패키지 매니저가 있다.
  - `glibc` 대신 `musl`을 쓴다.
  - `apk add --no-cache package`
  - `apk add --no-cache --virtual=ailas package` && `apk del --no-cache ailas`

## 멀티스테이지 빌드

golang과 같은 빌드가 필요한 이미지에서는 멀티스테이지 빌드를 이용해 빌드 환경과 프로덕션 환경을 다르게 가져갈 수 있다.

```dockerfile
FROM golang:1.9 AS build

WORKDIR /
COPY . /go/src/github.com/...
RUN go get gokpg.in/gorp.v1
RUN cd /go/src/github.com/... && go build -o bin/start main.go

FROM alpine:3.7
COPY --from=build /go/src/.../bin/start /usr/local/bin/
CMD ["start"]
```

## distroless 이미지

- 운영체제 기능은 없이 언어에 중점을 둔 이미지이다.
- [distroless](https://github.com/GoogleContainerTools/distroless) 에서 확인 가능하며 주로 구글이 배포한다.
- gcr.io/distroless/base 이미지는 glibc 기반이며 컴파일 애플리케이션을 실행하는 데에 적합하다. (Go)
- ca-certificates 및 TLS/SSL 관련 라이브러리 등 최소한의 라이브러리만 있다.
- CVE 취약점도 업데이트 된다고 한다.

```dockerfile
FROM node:10.17.0 AS build-env
ADD . /app
WORKDIR /app

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
WORKDIR /app
CMD ["hello.js"]
```

## chucksum 검증

`ADD` 인스트럭션으로 추가 된 파일은 해시기반 체크섬 검증을 해주는 것이 좋다.

```dockerfile
ADD library.zip .
ADD library_SHA256 .
ADD library_SHA256.sig .

# Import PGP public key
RUN curl https://.../pgp_keys.asc | gpg --import

# 라이브러리 전자 서명 검증
RUN gpg --verify library_SHA256.sig library_SHA256

# Verify checksum
RUN cat library_SHA256 | grep linux_amd64 | sha256sum -cs
RUN unzip libary.zip
RUN mv library /usr/local/bin
# 실행
```

## dockerigonore

- Dockerfile 빌드 시에 따라 들어가지 않게 된다.
- Dockerfile 과 같은 레벨 디렉토리에 있어야한다.

```ini .dockerignore
.git
.idea
.vscode
.github
*.log
```

## 이미지 테스트

빌드 후의 이미지 내부에 상태가 적절한지 테스트하기 위해 아래 두 가지 yaml 기반의 테스트 툴을 사용할 수 있다.

- [container-structure-test](https://github.com/GoogleContainerTools/container-structure-test)
- [goss](https://github.com/aelsabbahy/goss)

이 중 **goss**는 실제 포트 및 서비스가 서빙 중인지 확인이 가능해 더 유용할 것으로 보인다.

## 이미지 보안

### user

호스트의 리소스를 컨테이너에서 공유하는 Docker는 사용자 UID도 0으로 같이 공유되므로 같은 권한을 갖게 된다.
이 문제를 방지하기 위해 `useradd` 로 어플리케이션 실행 유저를 만들어 주고 `USER` 인스트럭션을 사용해 실행을 해줘야한다.

```dockerfile
FROM golang:1.10

RUN mkdir /app
COPY main.go /app

RUN useradd gracefullight
USER gracefullight

CMD ["go", "RUN", "/app/main.go"]
```

### secret

- [Vault](https://www.vaultproject.io/docs/install/)

# dockerd 튜닝

- max-concurrent-downloads: 기본값은 3이며, `docker image pull` 로 한 번에 다운로드 되는 이미지 스레드 수를 증가시켜준다.
- max-concurrent-uploads: 기본값은 5이며, `docker image push` 시에 이미지 업로드 스레드 수를 증가시켜준다.
- registry-mirrors: Docker hub의 미러 레지스트리를 만들어 트래픽 향상에 이점을 줄 수 있다.

# private registry

빠른 이미지 푸쉬/풀과 소스 때문이라도 private registry 는 필수적이다.
docker 에서 제공하는 registry 이미지를 사용하면 된다.

GUI 기반으로 확인할 수 있는 툴은 아래와 같다.

- [Harbor](https://github.com/goharbor/harbor): 프라이빗 레포지토리를 위한 모든 기능이 다 있다. 쓰자.
- [Portus](https://github.com/SUSE/Portus): 인증 포함, 하지만 루비라 소스 개선이 힘들듯
- [docker-registry-ui](https://github.com/Joxit/docker-registry-ui): 20년 최근까지 개선 중
