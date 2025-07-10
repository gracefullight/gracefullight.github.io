---
title: git add 안 되는 경우 확인해야될 것
authors: me
tags:
  - git
date: 2016-12-28 02:24:18
---

git add . 명령어 실행 후에 commit -m 명령어 실행 시,
또는 git commit -am 명령어로 바로 커밋시 add 가 되지 않은 것처럼 빨간 파일이 보일 경우

## add 확인

```bash
git add .
git add path_to_submodule
```

두 명령어를 다시 실행해본다.

## diff 확인

그래도 add 가 안 되는 경우 diff 를 먼저 실행해본다.

```bash
git diff
git diff path_to_submodule
```

### dirty diff 가 있을 경우

#### submodule 종속 제거

내 프로젝트 안에 git clone 으로 가져온 library 가 있는지 확인해보자.

```bash
git submodule foreach --recursive git checkout .
```

**모듈이 없다는 결과가 나올 경우**

- git 에서 가져온 library 를 모두 확인하고
- **.git 폴더가 생성되어있으면 삭제**

**모듈 결과가 있는 경우**

- .gitmodule 파일의 해당 모듈 부분 삭제
- git add .gitmodules
- .git/config 파일의 해당 모듈 부분 삭제
- git rm --cached path_to_submodule 캐시 삭제
- rm -rf .git/modules/path_to_submodule 모듈 폴더 삭제
- `git commit -m "Removed submodule {name}"` 모듈 종속 삭제를 커밋하고
- rm -rf path_to_submodule 모듈 파일 모두 삭제

### 없는 경우

#### cached 파일 제거

```bash
git rm -r --cached .
git rm -r --cached path_to_submodule
```

#### untracked 파일 제거

```bash
git clean -d -x -f
```

-d 는 디렉토리 포함, -x 는 ignored 파일 포함, -f === force

#### commit 으로 초기화

```bash
git reset --hard
```

이 명령어는 마지막 방법이 되어야한다. 작업량을 다 날릴 수 있다.

## 여담

git 버전이 높아지면서 프로젝트 내에 git 에 종속적인 모듈이 있으면 add 자체가 안 된다.
path_to_submodule 은 submodule 의 상대경로, 즉 add 가 안 되는 파일의 경로를 적으면 된다.
