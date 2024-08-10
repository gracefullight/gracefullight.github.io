---
title: NodeJS에서 커맨드 파싱하기
authors: me
tags: [nodejs, javascript, bash]
date: 2020-02-16 20:10:12
---

## arg

[zeit/arg](https://github.com/zeit/arg) 패키지를 이용하면 된다.

### 사용법

arg 함수 하나로 파싱이 가능하다.

```js
const arg = require("arg");

// `options` is an optional parameter
const args = arg(
  spec,
  (options = { permissive: false, argv: process.argv.slice(2) }),
);
```

세부적인 사용방법은 다음과 같다.

1. 타입을 정하고
2. 옵션과 축약 옵션을 정하고
3. 검증을 넣는다.

### 소스

```js
// 계정정보를 받는 스크립트라면
const help = () => {
  console.log(`usage => ...`);
};

let args = {};
try {
  args = arg({
    "--help": Boolean,
    "--user": String,
    "--password": String,
    "--verbose": arg.COUNT,
    "--test": Boolean,

    "-h": "--help",
    "-u": "--user",
    "-p": "--password",
    "-v": "--verbose",
  });
} catch (err) {
  if (err.code === "ARG_UNKNOWN_OPTION") {
    help();
    process.exit(1);
  }
}

if (!(args["--user"] && args["--password"])) {
  help();
  process.exit(1);
}

if (args["--test"] === true) {
  process.env.TEST = 1;
}
```
