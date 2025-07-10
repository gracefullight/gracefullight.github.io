---
title: npm 업데이트시 npm 폴더가 사라졌을 때
authors: me
tags:
  - javascript
  - nodejs
date: 2017-02-06 19:46:53
---

npm으로 npm의 버전을 업데이트 할 때의 명령어는 다음과 같다.

```bash
npm install -g npm
```

업데이트 명령 실행 후 오류가 발생한 뒤 npm 명령어가 없다는 경우가 생길 수 있다.
당황하지 말고 아래 명령어를 실행한다.

```bash
## 캐시 강제 삭제
$ npm cache clean -f

## npm 다운로드
$ curl http://npmjs.org/install.sh | sh
```

다시 npm이 설치되어 npm 명령어를 실행할 수 있다.
