---
title: 타입스크립트에서 json import 방법
authors: me
tags: [javascript, typescript, nodejs, json]
date: 2019-11-26 21:39:39
---

## TS5071

node 에서 즐겨쓰는 `package.json` import 방법은 아래와 같다.

```js
import packageJson from "../package.json";
console.log(packageJson.version);
```

편안하게 잘 사용되는 로직인데 타입스크립트로 변경시에는 몇 가지 설정을 해줘야한다.
설명에 필요없는 설정은 생략했다.

```json title="tsconfig.json"
{
  "compilerOptions": {
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

또는 `tsc` 실행시에 `--esModuleInterop`, `--resolveJsonModule` 옵션을 추가해 빌드해줘야한다.

## 참조

- <https://github.com/microsoft/TypeScript/issues/26224>
- <https://github.com/microsoft/TypeScript/pull/26825/files>
