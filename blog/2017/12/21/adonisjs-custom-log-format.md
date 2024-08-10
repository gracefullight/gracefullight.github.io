---
title: adonisjs 로그 포맷 변경하기 (custom log format)
authors: me
tags: [nodejs, javascript]
date: 2017-12-21 15:25:45
---

아도니스는 로깅 모듈로 winston 을 사용하는데 winston 은 로그를 json 포맷으로 출력하고 심지어 timezone 변수가 따로 나온다.

> 로그는 기본적으로 프로젝트 폴더 하위의 **tmp** 폴더에 생성된다
> 이 폴더가 없으면 로깅이 되지 않으므로 먼저 만들어주자

예를 들면 다음과 같다.

```bash
{"level":"info","message":"serving app on http://127.0.0.1:3333","timestamp":"2017-12-21T05:34:50.235Z"}
{"level":"info","message":"serving app on http://127.0.0.1:3333","timestamp":"2017-12-21T05:45:32.220Z"}
```

이걸 다음과 같이 바꿔보자

```bash
[2017-12-21 15:01:03.506] INFO serving app on http://127.0.0.1:3333
```

## 수정

> 오늘 날짜를 구하기 위해 `moment`를 먼저 설치하자.
> `winston` 패키지는 `@adonisjs/framework` 패키지에 종속된다.

```js title="config/app.js"
const moment = use("moment");
const { config } = use("winston");

module.exports = {
  logger: {
    transport: "file",
    file: {
      driver: "file",
      name: "adonis-app",
      // 파일명을 바꿔준다
      filename: `adonis_${moment().format("YYYYMMDD")}.log`,
      level: "debug",
      // json 로그 포맷을 해제하고
      json: false,
      // 원하는 형태로 바꿔준다
      formatter: ({ level, message, meta }) => {
        const now = moment().format("YYYY-MM-DD HH:mm:ss.SSS");
        // 로그 레벨에 색상을 추가하는 작업인데, 굳이 필요하진 않다
        const logLevel = config.colorize(level, level.toUpperCase());
        const formattedMeta =
          meta && Object.keys(meta).length ? "\n\t" + JSON.stringify(meta) : "";

        return `[${now}] ${logLevel} ${message || ""} ${formattedMeta}`;
      },
    },
  },
};
```

## 버전

- @adonis/framework: 4.0.28
- winston: 2.4.0
