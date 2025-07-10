---
title: Github Actions로 Hexo 배포 자동화하기
authors: me
tags:
  - github
  - hexo
  - javascript
date: 2019-08-20 23:25:15
---

## 개념

Docker 이미지로 생성된 후에 그 위에서 돌아간다.
자세한 개념은 시간날 때 추가 예정

## 레파지토리 토큰 발급

[여기](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)를 참조해 레파지토리의 secret 으로 등록한다.

## 서브모듈

themes directory 하위의 테마들은 각각의 repo를 가지고 있다.
이 테마들을 CI 중에 가져오기 위해선 서브모듈로 등록해주고 초기화시켜줘야한다.

```bash
## 서브모듈 테마 추가
git submodule add 테마깃경로 themes/테마명

## 싱크
git submodule update --init --remote
```

여기서 `remote` 옵션을 쓰지 않을 경우 최신 마스터를 pull 하지 않는다. 서브모듈을 쓰는 이유는 내가 관리하지 않기 위함이니 꼭 추가해주자.

## 소스

주석 없어도 하나하나가 무슨 느낌인지는 받아들여질 것 같다.

```yaml
name: Node CI

on:
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node: [20.x]

    steps:
      - uses: actions/checkout@master

      - name: SETUP_NODE_${{ matrix.node }}
        uses: actions/setup-node@master
        with:
          node-version: ${{ matrix.node }}

      - name: BEFORE_INSTALL
        run: npm i -g hexo workbox-cli

      - name: BEFORE_SCRIPT
        run: |
          git config --global user.name 'gracefullight'
          git config --global user.email 'gracefullight.dev@gmail.com'
          sed -i "s/__GITHUB_TOKEN__/${{ secrets.HEXO_DEPLOY_TOKEN }}/" _config.yml

      - name: THEME_INSTALL
        run: |
          git submodule update --init --remote --recursive

      - name: NPM_INSTALL
        run: npm install

      - name: HEXO_CLEAN
        run: hexo clean

      - name: HEXO_GENERATE
        run: hexo generate

      - name: WORKBOX_BUILD
        run: workbox injectManifest

      - name: HEXO_DEPLOY
        run: hexo deploy
```

### GITHUB_TOKEN

`secrets.GITHUB_TOKEN` 은 예약된 토큰이다.
빌드 이미지에서 현재 repo를 접근하기 위한 토큰임을 알아두자.

## 결론

> travis-ci 안녕

## 참조

- [Workflow syntax](https://help.github.com/en/articles/workflow-syntax-for-github-actions)
- [Virtual env](https://help.github.com/en/articles/virtual-environments-for-github-actions)
