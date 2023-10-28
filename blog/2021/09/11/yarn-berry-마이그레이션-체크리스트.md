---
title: yarn berry 마이그레이션 체크리스트
authors: me
tags: [javascript, typescript, yarn]
date: 2021-09-11 23:13:42
---

## 체크리스트

- [ ] `yarn set version berry`
- [ ] `rm -rf node_modules package-lock.json`
- [ ] `yarn`
- [ ] [.gitignore 추가](https://yarnpkg.com/getting-started/qa#which-files-should-be-gitignored)
- [ ] package.scripts 에서 다른 스크립트를 실행하는 경우, yarn 을 붙혀서 실행
- [ ] .husky 변경
  - [ ] package.scripts `"postinstall": "husky install"`
  - [ ] 실행 훅 스크립트를 `npx --no-install` 에서 `yarn` 으로 변경
- [ ] Dockerfile 변경 (node 기본이미지에 [yarn은 베이스로 설치되어 있음](https://github.com/nodejs/docker-node#image-variants))
  - [ ] yarn build
  - [ ] entrypoint 커맨드
- [ ] 의존관계 패키지 추가 설치
- [ ] 테스트

## 여담

- 2023년 난 pnpm에 정착했다. [yarn 에서 pnpm 으로 마이그레이션](/2023/06/17/migrate-yarn-to-pnpm)
