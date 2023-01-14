---
title: yarn, ts 스타터 체크리스트
authors: me
tags: [javascript, typescript, yarn]
date: 2022-07-30 14:28:02
---

# yarn, ts 스타터 체크리스트

## 개요

벤치마킹, 툴 테스팅, 엑셀 스트리밍, 맵 리듀스 등 여러가지 테스트를 위해서 빈 레파지토리를 시작해야하는 경우가 많다.
복사해서 사용하기 위해 기록해두자.

## CMD

```bash
yarn init -2
yarn add -D typescript ts-node @types/node
yarn tsc --init

touch src/index.ts
code .

# package.json
"start": "ts-node src/index.ts"
```

협업 여부에 따라 commitlint, eslint, yarn plugins 등등..

## 패키지

- csv/tsv: [csv-parse](https://csv.js.org/parse/options/delimiter/)
- zip: node zlib 로는 압축파일이 깨진다. 아래 스트리밍 unzip 라이브러리를 사용해야한다.
  - [maxogden/extract-zip](https://github.com/maxogden/extract-zip) 👍
  - [antelle/node-stream-zip](https://github.com/antelle/node-stream-zip)
  - [ZJONSSON/node-unzipper](https://github.com/ZJONSSON/node-unzipper)
