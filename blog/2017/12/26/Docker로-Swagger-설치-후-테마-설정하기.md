---
title: Docker로 스웨거 설치 후 테마 설정하기 (swagger)
authors: me
tags: [swagger, docker]
date: 2017-12-26 22:03:44
---

[Swagger UI](https://hub.docker.com/r/swaggerapi/swagger-ui/)와 [Swagger Editor](https://hub.docker.com/r/swaggerapi/swagger-editor/)를 Docker 로 띄워서 빠르게 사용해보자.
[Swagger Hub](https://swaggerhub.com/)에서 작업하는건 한글 입력이 잘 되지 않는 경우가 있었고 [OAS3](https://github.com/OAI/OpenAPI-Specification)를 사용할 겸 설치하는 게 편하다.

# 설치

설치는 서버 하나만 있으면 충분하다.

## Editor

```bash
$ docker run -d \
    -p 7000:8080 \
    --restart always \
    --name swagger-editor \
    swaggerapi/swagger-editor
```

## UI

UI 에서는 API 문서를 상대경로로 사용하기 위해 볼륨 마운트를 했다.
*Docker for Windows*에서 c 드라이브를 마운트하기 위해서는 아래처럼 `//c/path` 로 접근하면 된다.

```bash
$ docker run -d \
    -p 9010:8080 \
    -v //c/swagger-spec:/usr/share/nginx/html/spec \
    --restart always \
    --name swagger-ui \
    swaggerapi/swagger-ui
```

# 테마 추가

테마는 [나이스한 라이브러리](https://github.com/ostranme/swagger-ui-themes)를 사용하자.
두 컨테이너 모두 `/usr/share/nginx/html/` 경로의 `index.html`을 열어 head 안에 넣어주면 된다.

`docker exec`로 쉘에 접근하는 건 다 하시리라 믿고 다만, 컨테이너에 bash 쉘이 없기에 기본 sh 쉘로 접근하면 된다.

```html title="index.html"
<link
  rel="stylesheet"
  href="https://unpkg.com/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css"
/>
```

# 여담

스웨거에 side menu 가 있는 버전이나 라이브러리가 있으면 좋을텐데, 누가 만들었을 것 같은데 아직 못 찾았다.
