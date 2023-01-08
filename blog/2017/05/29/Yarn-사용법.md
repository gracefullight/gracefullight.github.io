---
title: Yarn 사용법
authors: me
tags: [javascript, nodejs, yarn]
date: 2017-05-29 22:17:44
---
Bower의 시대가 끝났다. [홈페이지](https://bower.io/)를 들어가보면 다음과 같은 문구가 보인다.

> ..psst! While Bower is maintained, we recommend **yarn** and **webpack** for new front-end projects!

**Yarn**을 사용해보자.

# 설치

> 2020년에는 npm 사용을 추천드립니다. 더 이상 느리지 않습니다.

NPM으로 설치할 수도 있는데 추천하는 방법은 [Installer](https://yarnpkg.com/en/docs/install)이니 다운받고 설치해주면 된다!
NPM으로 설치시에는 환경변수 등록을 거쳐야한다.

설치 후 Bash에서 확인해보자.

``` bash
$ yarn --version
0.24.5
```

# 사용법

npm 사용법과 아주 유사하다.
기존 NodeJS 패키지에서 **yarn** 명령어만을 입력하면 완벽히 호환이 되고, 새로운 프로젝트라면 **yarn init** 명령어를 실행하면 된다.
package.json을 사용하기 때문에 그냥 명령어만 바뀌었다고 생각하면 된다. (패키지들도 npm의 것을 공유한다.)

## 명령어 비교

install이 **add**로, uninstall이 **remove**로, update가 **upgrade**로 바뀐게 사실상 끝이다.
자세한 옵션은 [CLI Docs](https://yarnpkg.com/en/docs/cli/)를 참조하자.

| npm                                     | Yarn                               |
| --------------------------------------- | ---------------------------------- |
| npm install                             | yarn install                       |
| (N/A)                                   | yarn install --flat                |
| (N/A)                                   | yarn install --har                 |
| (N/A)                                   | yarn install --no-lockfile         |
| (N/A)                                   | yarn install --pure-lockfile       |
| npm install [package]                   | (N/A)                              |
| npm install --save [package]            | yarn add [package]                 |
| npm install --save-dev [package]        | yarn add [package] [--dev/-D]      |
| (N/A)                                   | yarn add [package] [--peer/-P]     |
| npm install --save-optional [package]   | yarn add [package] [--optional/-O] |
| npm install --save-exact [package]      | yarn add [package] [--exact/-E]    |
| (N/A)                                   | yarn add [package] [--tilde/-T]    |
| npm install --global [package]          | yarn global add [package]          |
| npm update --global                     | yarn global upgrade                |
| npm rebuild                             | yarn install --force               |
| npm uninstall [package]                 | (N/A)                              |
| npm uninstall --save [package]          | yarn remove [package]              |
| npm uninstall --save-dev [package]      | yarn remove [package]              |
| npm uninstall --save-optional [package] | yarn remove [package]              |
| npm cache clean                         | yarn cache clean                   |
| rm -rf node_modules && npm install      | yarn upgrade                       |

# Global 경로

* Windows: **%LOCALAPPDATA%/Yarn/config/global**

## 환경 변수 설정

설정을 확인한 뒤 prefix 경로를 PATH에 추가해주면 된다.

``` bash
$ yarn config list
{ prefix: 'C:\\Users\\{NAME}\\npm' }
```

# 결론

bower_components 안녕
이젠 node_modules만 있겠구나